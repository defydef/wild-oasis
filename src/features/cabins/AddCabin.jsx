import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CabinTable from "./CabinTable";
import CreateCabinForm from "./CreateCabinForm";

function AddCabin() {
  return (
    <>
      <Modal>
        <Modal.Open
          opens="cabin-form"
          renderButton={(openFunction) => (
            <Button onClick={openFunction}>Add new cabin</Button>
          )}
        />
        <Modal.Window
          name="cabin-form"
          renderForm={(onClose) => <CreateCabinForm onClose={onClose} />}
        />
        <Modal.Open
          opens="table"
          renderButton={(openFunction) => (
            <Button onClick={openFunction}>Show table</Button>
          )}
        />
        <Modal.Window
          name="table"
          renderForm={(onClose) => <CabinTable onClose={onClose} />}
        />
      </Modal>
    </>
  );
}

// function AddCabin() {
//   const [isOpenModal, setIsOpenModal] = useState(false);

//   function handleClose() {
//     setIsOpenModal(false);
//   }

//   return (
//     <>
//       <Button onClick={() => setIsOpenModal((show) => !show)}>
//         Add new cabin
//       </Button>
//       {isOpenModal && (
//         <Modal onClose={handleClose}>
//           <CreateCabinForm onClose={handleClose} />
//         </Modal>
//       )}
//     </>
//   );
// }

export default AddCabin;
