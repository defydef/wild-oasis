import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import useSettings from "./useSettings";
import Spinner from "../../ui/Spinner";
import ErrorFallback from "../../ui/ErrorFallback";

function UpdateSettingsForm() {
  const { isLoadingSettings, settings, retrieveSettingsError } = useSettings();
  const {
    minBookingLength,
    maxBookingLength,
    maxGuestsPerBooking,
    breakfastPrice,
  } = settings || {};
  if (isLoadingSettings) return <Spinner />;
  if (retrieveSettingsError)
    return <ErrorFallback error={retrieveSettingsError} />;
  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input type="number" id="min-nights" defaultValue={minBookingLength} />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input type="number" id="max-nights" defaultValue={maxBookingLength} />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          id="max-guests"
          defaultValue={maxGuestsPerBooking}
        />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input
          type="number"
          id="breakfast-price"
          defaultValue={breakfastPrice}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
