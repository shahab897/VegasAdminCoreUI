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

const BrandDropDown = (props) => {
  const { brands, setBrandsIds, brandsIds } = props;
  if (brands !== undefined && brands.length !== 0) {
    if (brandsIds.length === 0 && brandsIds === undefined)
      return (
        <>
          <DropDown
            placeholder="Select a Brand"
            options={brands}
            values={[]}
            multi
            onChange={(selected) => {
              setBrandsIds(selected.map((select) => select.value));
            }}
          />
        </>
      );
    else {
      return (
        <>
          <DropDown
            multi
            placeholder="Select a Brand"
            options={brands}
            values={brands.filter((element) =>
              brandsIds.includes(element.value)
            )}
            onChange={(selected) => {
              setBrandsIds(selected.map((select) => select.value));
            }}
          />
        </>
      );
    }
  } else {
    return (
      <>
        <DropDown
          placeholder="Select a Brand"
          options={brands}
          values={[]}
          onChange={(selected) => {
            setBrandsIds(selected.map((select) => select.value));
          }}
        />
      </>
    );
  }
};

export default BrandDropDown;
