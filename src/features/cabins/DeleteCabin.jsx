import { HiTrash } from "react-icons/hi2";
import Button from "../../ui/Button";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Modal from "../../ui/Modal";
import { useDeleteCabin } from "./useDeleteCabin";

function DeleteCabin({ id, isDisabled }) {
  const { deleteCabin } = useDeleteCabin();
  return (
    <Modal>
      <Modal.Open
        opens="delete-cabin-form"
        renderButton={(openFunction) => (
          <Button onClick={openFunction} disabled={isDisabled}>
            <HiTrash />{" "}
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
            onConfirm={() => deleteCabin(id)}
          />
        )}
      />
    </Modal>
  );
}

export default DeleteCabin;
