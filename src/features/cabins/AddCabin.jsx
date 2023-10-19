import { useState } from "react";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CreateCabinForm from "./CreateCabinForm";

function AddCabin() {
  const [isOpenModal, setIsOpenModal] = useState(false);

  function handleClose() {
    setIsOpenModal(false);
  }

  return (
    <>
      <Button onClick={() => setIsOpenModal((show) => !show)}>
        Add new cabin
      </Button>
      {isOpenModal && (
        <Modal onClose={handleClose}>
          <CreateCabinForm onClose={handleClose} />
        </Modal>
      )}
    </>
  );
}

export default AddCabin;
