import styled from "styled-components";
import Select from "react-dropdown-select";
import { CLabel } from "@coreui/react";

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

const DropDownCore = (props) => {
  const { options, setCategoryParentId } = props;
  return (
    <>
      <CLabel htmlFor="drop-down">Parent</CLabel>
      <DropDown
        placeholder="Select the parent category"
        id="drop-down"
        options={options}
        values={[]}
        onChange={(selected) => setCategoryParentId(selected[0].value)}
      />
    </>
  );
};

export default DropDownCore;
