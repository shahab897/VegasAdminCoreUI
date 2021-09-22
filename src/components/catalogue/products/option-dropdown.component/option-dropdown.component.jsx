import styled from "styled-components";
import { useEffect } from "react";
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

const ProductOptionDropDown = (props) => {
  const { options, setProductOption, productOption } = props;
  useEffect(() => {
    console.log(productOption);
  }, [productOption]);
  return (
    <>
      <DropDown
        placeholder="Select a Product Option"
        multi
        options={options}
        values={[]}
        onChange={(selected) => setProductOption(selected[0].value)}
      />
    </>
  );
};

export default ProductOptionDropDown;
