import styled from "styled-components";
import Select from "react-dropdown-select";
import { Math } from "core-js";

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

const ProductTypeDropDown = (props) => {
  const { options, setProductType, defaultProductType } = props;
  if (options !== undefined) {
    if (defaultProductType === "" || defaultProductType === undefined)
      return (
        <>
          <DropDown
            key={Math.random()}
            placeholder="Select a Product Type"
            options={options}
            values={[]}
            onChange={(selected) => setProductType(selected[0].value)}
          />
        </>
      );
    else {
      const defaultSelected = options.findIndex(
        ({ value }) => value === defaultProductType
      );
      console.log(defaultSelected, "kia horha hai jigr");
      console.log(defaultProductType, "defaultProductType kia horha hai jigr");
      console.log(options, "options kia horha hai jigr");

      return (
        <>
          <DropDown
            placeholder="Select a Brand"
            options={options}
            values={[options[defaultSelected]]}
            onChange={(selected) => setProductType(selected[0].value)}
          />
        </>
      );
    }
  } else {
    return (
      <>
        <DropDown
          key={Math.random()}
          placeholder="Select a Product Type"
          options={options}
          values={[]}
          onChange={(selected) => setProductType(selected[0].value)}
        />
      </>
    );
  }
};

export default ProductTypeDropDown;
