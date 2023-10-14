import supabase, { supabaseUrl } from "./supabase";

export default async function getCabins() {
  let { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }
  return data;
}

export async function deleteCabin(id) {
  const { error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    console.error(error);
    throw new Error("Cabin could not be deleted");
  }
}

export async function createCabin(newCabin) {
  // 1. Create Cabin
  // https://ugrivjxpaqykelfdioev.supabase.co/storage/v1/object/public/cabin-images/cabin-008.jpg
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );

  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
  const { data, error } = await supabase
    .from("cabins")
    .insert([{ ...newCabin, image: imagePath }]);
  if (error) {
    console.error(error);
    throw new Error("Cabin could not be inserted");
  }

  // 2. Upload image
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  await supabase.storage.from("cabin-images").upload(imageName, newCabin.image);

  if (storageError) {
    // Get the newly created cabin
    let { data: newCreatedCabin } = await supabase
      .from("cabins")
      .select("*")
      .eq("image", imagePath);

    // Delete the new cabin if cabin image couldn't be uploaded
    deleteCabin(newCreatedCabin.at(0).id);
    console.error(storageError);
    throw new Error(
      "Cabin image could not be uploaded, the cabin has not been created"
    );
  }

  return data;
}
