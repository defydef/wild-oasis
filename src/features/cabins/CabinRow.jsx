/* eslint-disable react/prop-types */
import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers";
import { useDeleteCabin } from "./useDeleteCabin";
import Button from "../../ui/Button";
import ButtonGroup from "../../ui/ButtonGroup";
import useCreateUpdateCabin from "./useCreateUpdateCabin";
import DeleteCabin from "./DeleteCabin";
import UpdateCabin from "./UpdateCabin";
import { HiDocumentDuplicate } from "react-icons/hi2";
import Table from "../../ui/Table";

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

function CabinRow({ cabin }) {
  const { id, name, maxCapacity, regularPrice, discount, description, image } =
    cabin;
  const { isDeleting } = useDeleteCabin();
  const { isCreating, createCabin } = useCreateUpdateCabin();
  const isWorking = isDeleting || isCreating;

  function handleDuplicate() {
    const duplicatedCabin = {
      name: `Copy of ${name}`,
      maxCapacity,
      regularPrice,
      discount,
      description,
      image,
    };
    createCabin({ ...duplicatedCabin });
  }

  // function handleDelete() {
  //   deleteCabin(id);
  // }

  return (
    <Table.Row role="row">
      <Img src={image} />
      <Cabin>{name}</Cabin>
      <div>Fits up to {maxCapacity} guests</div>
      <Price>{formatCurrency(regularPrice)}</Price>
      {discount ? (
        <Discount>{formatCurrency(discount)}</Discount>
      ) : (
        <span>&mdash;</span>
      )}
      <ButtonGroup>
        <Button disabled={isWorking} onClick={handleDuplicate}>
          <HiDocumentDuplicate />
        </Button>
        {/* <Button
            onClick={() => setShowForm((show) => !show)}
            disabled={isWorking}
          >
            Edit
          </Button> */}
        <UpdateCabin disabled={isWorking} cabin={cabin} />
        {/* <Button onClick={handleDelete} disabled={isWorking}>
            Delete
          </Button> */}
        <DeleteCabin id={id} isDisabled={isWorking} />
      </ButtonGroup>
    </Table.Row>
  );
}

export default CabinRow;
