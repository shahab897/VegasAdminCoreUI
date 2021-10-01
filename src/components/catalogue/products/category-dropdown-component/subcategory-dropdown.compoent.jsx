import styled from "styled-components";
import Select from "react-dropdown-select";
import { useState, useEffect } from "react";

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

const SubcategoryDropDown = (props) => {
  const { options, setSubcategoryId, defaultSubcategory } = props;
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    if (options.length !== 0) setIsDisabled(false);
  }, [options]);
  const handleChange = async (selected) => {
    setSubcategoryId(selected[0].value);
  };

  if (options !== undefined) {
    if (defaultSubcategory === "" || defaultSubcategory === undefined)
      return (
        <>
          <DropDown
            placeholder="Select a Subcategory"
            options={options}
            values={[]}
            onChange={(selected) => handleChange(selected)}
            disabled={isDisabled}
          />
        </>
      );
    else {
      const defaultSelected = options.findIndex(
        (element) => defaultSubcategory
      );
      return (
        <>
          <DropDown
            placeholder="Select a Subcategory"
            options={options}
            values={[options[defaultSelected]]}
            onChange={(selected) => handleChange(selected)}
            disabled={isDisabled}
          />
        </>
      );
    }
  } else {
    return (
      <>
        <DropDown
          placeholder="Select a Subcategory"
          options={options}
          values={[]}
          onChange={(selected) => handleChange(selected)}
          disabled={isDisabled}
        />
      </>
    );
  }
};

export default SubcategoryDropDown;
