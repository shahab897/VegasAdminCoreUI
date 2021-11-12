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

const TrueFalseDropDown = (props) => {
  const { options, setTrueFalse, defaultOption, disabled } = props;
  if (options !== undefined) {
    if (defaultOption === "" || defaultOption === undefined)
      return (
        <>
          <DropDown
            placeholder="Select True/False"
            options={options}
            values={[]}
            onChange={(selected) => setTrueFalse(selected[0].value)}
            disabled={disabled}
          />
        </>
      );
    else {
      const defaultSelected = options.findIndex(
        (element) => defaultOption === element
      );
      return (
        <>
          <DropDown
            placeholder="Select True/False"
            options={options}
            values={[options[defaultSelected]]}
            onChange={(selected) => setTrueFalse(selected[0].value)}
            disabled={disabled}
          />
        </>
      );
    }
  } else {
    return (
      <>
        <DropDown
          placeholder="Select True/False"
          options={options}
          values={[]}
          onChange={(selected) => setTrueFalse(selected[0].value)}
          disabled={disabled}
        />
      </>
    );
  }
};

export default TrueFalseDropDown;
