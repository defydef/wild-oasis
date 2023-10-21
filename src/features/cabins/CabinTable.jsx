import Spinner from "../../ui/Spinner";
import ErrorFallback from "../../ui/ErrorFallback";
import CabinRow from "./CabinRow";
import useCabins from "./useCabins";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";

function CabinTable() {
  const { isLoading, cabins, retrieveCabinsError } = useCabins();
  if (isLoading) return <Spinner />;
  if (retrieveCabinsError) return <ErrorFallback error={retrieveCabinsError} />;

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body
          arr={cabins}
          renderArrItem={(cabin) => (
            <CabinRow key={cabin.id} cabin={cabin} arrItemName="cabin" />
          )}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;
