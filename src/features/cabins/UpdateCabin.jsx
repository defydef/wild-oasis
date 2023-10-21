import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CreateCabinForm from "./CreateCabinForm";

function UpdateCabin({ cabin, isWorking }) {
  return (
    <>
      <Modal>
        <Modal.Open
          opens="cabin-form"
          renderButton={(openFunction) => (
            <Button onClick={openFunction} disabled={isWorking}>
              Edit
            </Button>
          )}
        />
        <Modal.Window
          name="cabin-form"
          renderForm={(onClose) => (
            <CreateCabinForm onClose={onClose} cabinToEdit={cabin} />
          )}
        />
      </Modal>
    </>
  );
}

export default UpdateCabin;
