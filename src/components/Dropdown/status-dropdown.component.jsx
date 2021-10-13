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

const StatusDropDown = (props) => {
  const options = [
    {
      value: "YES",
      label: "Enabled",
    },
    {
      value: "No",
      label: "Disabled",
    },
  ];
  const { setStatus, defaultStatus } = props;

  if (defaultStatus === "" || defaultStatus === undefined)
    return (
      <>
        <DropDown
          key={Math.random()}
          placeholder="Select Status"
          options={options}
          values={[]}
          onChange={(selected) => setStatus(selected[0].value)}
        />
      </>
    );
  else {
    const defaultSelected = options.findIndex((element) => defaultStatus);
    return (
      <>
        <DropDown
          placeholder="Select Status"
          options={options}
          values={[options[defaultSelected]]}
          onChange={(selected) => setStatus(selected[0].value)}
        />
      </>
    );
  }
};

export default StatusDropDown;
