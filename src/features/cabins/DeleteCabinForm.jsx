import Button from "../../ui/Button";
import ButtonGroup from "../../ui/ButtonGroup";
import FormRow from "../../ui/FormRow";
import { useModal } from "../../ui/Modal";
import { useDeleteCabin } from "./useDeleteCabin";

function DeleteCabinForm({ id }) {
  const { close } = useModal();
  const { deleteCabin } = useDeleteCabin();
  function handleDelete() {
    deleteCabin(id);
    close();
  }

  return (
    <>
      <FormRow>Are you sure you want to delete this cabin?</FormRow>
      <FormRow>
        <ButtonGroup>
          <Button $variation="secondary" onClick={close}>
            No
          </Button>
          <Button $variation="danger" onClick={handleDelete}>
            Yes
          </Button>
        </ButtonGroup>
      </FormRow>
    </>
  );
}

export default DeleteCabinForm;
