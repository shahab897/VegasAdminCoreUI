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
  const { options, setConditions, conditions, id, defaultOption, disabled } =
    props;

  const handleChange = (selected) => {
    let toChange = conditions.find((condition) => condition.id === id);
    let index = conditions.findIndex((condition) => condition.id === id);
    toChange = { brand: selected[0], ...conditions[index] };
    const filteredCon = conditions.filter((condition) => condition.id !== id);
    setConditions([toChange, ...filteredCon]);
  };

  if (options !== undefined) {
    if (defaultOption === "" || defaultOption === undefined)
      return (
        <>
          <DropDown
            placeholder="Select Brand"
            options={options}
            values={[]}
            onChange={(selected) => handleChange(selected)}
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
            placeholder="Select Brand"
            options={options}
            values={[options[defaultSelected]]}
            onChange={(selected) => handleChange(selected)}
            disabled={disabled}
          />
        </>
      );
    }
  } else {
    return (
      <>
        <DropDown
          placeholder="Select Brand"
          options={options}
          values={[]}
          onChange={(selected) => handleChange(selected)}
          disabled={disabled}
        />
      </>
    );
  }
};

export default BrandDropDown;
