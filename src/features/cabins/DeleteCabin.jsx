import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import DeleteCabinForm from "./DeleteCabinForm";

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
        renderForm={(onClose) => <DeleteCabinForm onClose={onClose} id={id} />}
      />
    </Modal>
  );
}

export default DeleteCabin;
