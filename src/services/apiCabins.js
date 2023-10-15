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

export async function createEditCabin(newCabin, id) {
  // 1. Create Cabin
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );

  const isUploadingImage = typeof newCabin.image !== "string";

  const imagePath = isUploadingImage
    ? `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`
    : newCabin.image;
  let query = supabase.from("cabins");

  // A. CREATE
  if (!id) await query.insert([{ ...newCabin, image: imagePath }]);

  // B. EDIT
  if (id) await query.update({ ...newCabin, image: imagePath }).eq("id", id);

  const { data, error } = query.select().single();

  // .select().single();
  if (error) {
    console.error(error);
    throw new Error("Cabin could not be inserted");
  }

  // get the newCreatedCabin by image path
  let { data: newCreatedCabin } = await supabase
    .from("cabins")
    .select("*")
    .eq("image", imagePath);

  // only upload cabin image if the cabin does not exist yet, or when editing cabin
  if (!newCreatedCabin)
    await supabase.storage
      .from("cabin-images")
      .upload(imageName, newCabin.image);

  // 2. Upload image
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  if (storageError) {
    // Delete the new cabin if cabin image couldn't be uploaded
    deleteCabin(newCreatedCabin.id);
    console.error(storageError);
    throw new Error(
      "Cabin image could not be uploaded, the cabin has not been created"
    );
  }

  return data;
}
