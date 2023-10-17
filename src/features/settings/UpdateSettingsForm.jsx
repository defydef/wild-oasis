import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import useSettings from "./useSettings";
import Spinner from "../../ui/Spinner";
import ErrorFallback from "../../ui/ErrorFallback";
import useUpdateSettings from "./useUpdateSettings";
import { useForm } from "react-hook-form";
import Button from "../../ui/Button";

function UpdateSettingsForm() {
  const { isLoadingSettings, settings, retrieveSettingsError } = useSettings();
  const {
    minBookingLength,
    maxBookingLength,
    maxGuestsPerBooking,
    breakfastPrice,
  } = settings || {};

  const { register, handleSubmit, formState } = useForm();

  const { isEditing, editSettings } = useUpdateSettings();

  function onSubmit(data) {
    editSettings(
      { newSettings: { ...data } },
      {
        onSuccess: (data) => {
          // console.log(data); // edited settings
        },
      }
    );
  }

  function onError(errors) {
    console.log(errors);
  }

  if (isLoadingSettings) return <Spinner />;
  if (retrieveSettingsError)
    return <ErrorFallback error={retrieveSettingsError} />;
  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          id="min-nights"
          defaultValue={minBookingLength}
          {...register("minBookingLength", {
            required: "This field is required",
          })}
          disabled={isEditing}
        />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          id="max-nights"
          defaultValue={maxBookingLength}
          {...register("maxBookingLength", {
            required: "This field is required",
          })}
          disabled={isEditing}
        />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          id="max-guests"
          defaultValue={maxGuestsPerBooking}
          {...register("maxGuestsPerBooking", {
            required: "This field is required",
          })}
          disabled={isEditing}
        />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input
          type="number"
          id="breakfast-price"
          defaultValue={breakfastPrice}
          {...register("breakfastPrice", {
            required: "This field is required",
          })}
          disabled={isEditing}
        />
      </FormRow>
      <FormRow>
        <Button>Update settings</Button>
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
