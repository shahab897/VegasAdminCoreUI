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

const TransferTypeDropDown = (props) => {
  const { options, setTransferType, defaultType, disabled } = props;

  if (options !== undefined) {
    if (defaultType === "" || defaultType === undefined)
      return (
        <>
          <DropDown
            placeholder="Select Type"
            options={options}
            values={[]}
            disabled={disabled}
            onChange={(selected) => setTransferType(selected[0].value)}
          />
        </>
      );
    else {
      const defaultSelected = options.findIndex((element) => defaultType);
      return (
        <>
          <DropDown
            placeholder="Select Type"
            options={options}
            values={[options[defaultSelected]]}
            disabled={disabled}
            onChange={(selected) => setTransferType(selected[0].value)}
          />
        </>
      );
    }
  } else {
    return (
      <>
        <DropDown
          placeholder="Select Type"
          options={options}
          values={[]}
          disabled={disabled}
          onChange={(selected) => setTransferType(selected[0].value)}
        />
      </>
    );
  }
};

export default TransferTypeDropDown;
