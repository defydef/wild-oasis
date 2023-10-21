import {
  HiDocumentDuplicate,
  HiEllipsisVertical,
  HiPencil,
  HiSquare2Stack,
  HiTrash,
} from "react-icons/hi2";
import Menus from "../../ui/Menus";
import Modal from "../../ui/Modal";
import CreateCabinForm from "./CreateCabinForm";
import DeleteCabinForm from "./DeleteCabinForm";

function CabinMenus({ id, onDuplicate, cabin }) {
  return (
    <Modal>
      <Menus.Menu>
        <Menus.Toggle id={id}>
          <HiEllipsisVertical />
        </Menus.Toggle>

        <Menus.List id={id}>
          <Menus.Button icon={<HiSquare2Stack />} onClick={onDuplicate}>
            Duplicate
          </Menus.Button>

          <Modal.Open opens="edit">
            <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
          </Modal.Open>

          <Modal.Open opens="delete">
            <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
          </Modal.Open>
        </Menus.List>
        <Modal.Window name="edit">
          <CreateCabinForm cabinToEdit={cabin} />
        </Modal.Window>
        <Modal.Window name="delete">
          <DeleteCabinForm id={id} />
        </Modal.Window>
      </Menus.Menu>
    </Modal>
  );
}

export default CabinMenus;
