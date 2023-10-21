import Button from "../../ui/Button";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Modal, { useModal } from "../../ui/Modal";
import DeleteCabinForm from "./DeleteCabinForm";
import { useDeleteCabin } from "./useDeleteCabin";

function DeleteCabin({ id, isDisabled }) {
  return (
    <Modal>
      <Modal.Open
        opens="delete-cabin-form"
        renderButton={(openFunction) => (
          <Button onClick={openFunction} disabled={isDisabled}>
            Delete
          </Button>
        )}
      />
      <Modal.Window
        name="delete-cabin-form"
        // renderForm={(onClose) => <DeleteCabinForm onClose={onClose} id={id} />}
        renderForm={(onClose) => (
          <ConfirmDelete
            onClose={onClose}
            id={id}
            resourceName="cabin"
            disabled={isDisabled}
          />
        )}
      />
    </Modal>
  );
}

export default DeleteCabin;
