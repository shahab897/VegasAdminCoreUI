import styled from "styled-components";
import Select from "react-dropdown-select";

const DropDown = styled(Select)`
  width: 100%;
  height: calc(1.5em + 0.75rem + 2px);
  padding: 0.375rem 0.75rem !important;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5;
  border: 1px solid;
  color: #768192;
  background-color: #fff;
  border-color: #d8dbe0;
  border-radius: 0.25rem !important;
  margin-bottom: 10px;
`;

const WareHousesDropDownMulti = (props) => {
  const { options, setWarehousesIds, warehousesIds } = props;
  if (options !== undefined && options.length !== 0) {
    if (warehousesIds.length === 0 && warehousesIds === undefined)
      return (
        <>
          <DropDown
            placeholder="Select Store/Stores"
            options={options}
            values={[]}
            multi
            onChange={(selected) => {
              setWarehousesIds(selected.map((select) => select.value));
            }}
          />
        </>
      );
    else {
      return (
        <>
          <DropDown
            multi
            placeholder="Select Store/Stores"
            options={options}
            values={options.filter((element) =>
              warehousesIds.includes(element.value)
            )}
            onChange={(selected) => {
              setWarehousesIds(selected.map((select) => select.value));
            }}
          />
        </>
      );
    }
  } else {
    return (
      <>
        <DropDown
          placeholder="Select Store/Stores"
          options={options}
          values={[]}
          onChange={(selected) => {
            setWarehousesIds(selected.map((select) => select.value));
          }}
        />
      </>
    );
  }
};

export default WareHousesDropDownMulti;
