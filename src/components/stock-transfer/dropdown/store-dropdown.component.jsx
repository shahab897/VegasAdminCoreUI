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

const StoreDropDown = (props) => {
  const { options, setStoreId, defaultStore, disabled } = props;

  if (options !== undefined) {
    if (defaultStore === "" || defaultStore === undefined)
      return (
        <>
          <DropDown
            placeholder="Select Store"
            options={options}
            values={[]}
            disabled={disabled}
            onChange={(selected) => setStoreId(selected[0].value)}
          />
        </>
      );
    else {
      const defaultSelected = options.findIndex((element) => defaultStore);
      return (
        <>
          <DropDown
            placeholder="Select Store"
            options={options}
            disabled={disabled}
            values={[options[defaultSelected]]}
            onChange={(selected) => setStoreId(selected[0].value)}
          />
        </>
      );
    }
  } else {
    return (
      <>
        <DropDown
          placeholder="Select Store"
          options={options}
          disabled={disabled}
          values={[]}
          onChange={(selected) => setStoreId(selected[0].value)}
        />
      </>
    );
  }
};

export default StoreDropDown;
