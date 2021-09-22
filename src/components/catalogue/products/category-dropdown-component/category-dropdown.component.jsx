import styled from "styled-components";
import Select from "react-dropdown-select";
import { element } from "prop-types";

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

const CategoryDropDown = (props) => {
  const { options, setCategoryId, defaultCategory } = props;

  if (options !== undefined) {
    if (defaultCategory === "" || defaultCategory === undefined)
      return (
        <>
          <DropDown
            placeholder="Select a Category"
            options={options}
            values={[]}
            onChange={(selected) => setCategoryId(selected[0].value)}
          />
        </>
      );
    else {
      const defaultSelected = options.findIndex((element) => defaultCategory);
      return (
        <>
          <DropDown
            placeholder="Select a Category"
            options={options}
            values={[options[defaultSelected]]}
            onChange={(selected) => setCategoryId(selected[0].value)}
          />
        </>
      );
    }
  } else {
    return (
      <>
        <DropDown
          placeholder="Select a Category"
          options={options}
          values={[]}
          onChange={(selected) => setCategoryId(selected[0].value)}
        />
      </>
    );
  }
};

export default CategoryDropDown;
