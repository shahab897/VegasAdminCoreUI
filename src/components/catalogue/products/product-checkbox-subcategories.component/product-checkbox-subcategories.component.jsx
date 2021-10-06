import React, { useState, useContext } from "react";
import { CLabel, CInputCheckbox } from "@coreui/react";
import { ProductOptionValuesContext } from "../../../../context-providers/product-options.context";

function ProductOptionValues(props) {
  const { isChecked, value } = props;
  const {
    addProductOptionValues,
    removeProductOptionValues,
    optionsValues,
    checkValues,
    unCheckValues,
  } = useContext(ProductOptionValuesContext);
  const [selectedOptionValues, setSelectedOptionValues] = useState([]);

  const handleOptionChange = (e, item, id) => {
    // this function adds checked values and removes unchecked values and also manages the state for showing checked and unchecked inside the check box

    console.log(item, "hello brother", e);
    if (e.target.checked === true) {
      setSelectedOptionValues([
        ...selectedOptionValues,
        {
          name: e.target.name,
          value: e.target.value,
        },
      ]);
      console.log(e, "lets see what this is !", item);
      checkValues(id);

      addProductOptionValues(e, item);
    } else {
      setSelectedOptionValues(
        selectedOptionValues.filter((option) => e.target.value !== option.value)
      );
      unCheckValues(id);
      removeProductOptionValues(e, item);
    }
  };

  if (isChecked === true) {
    return (
      <>
        {optionsValues
          .filter((item) => item.option_id === value)
          .map((item, index) => (
            <div className="ml-2 d-sm-flex" key={index + Math.random()}>
              <CLabel htmlFor="ProductOption" key={index + Math.random()}>
                {item.value}
              </CLabel>
              <CInputCheckbox
                key={index + Math.random()}
                name={item.value}
                value={item.id}
                onChange={(e) => handleOptionChange(e, item, item.id)}
                checked={item.isChecked}
              />
            </div>
          ))}
      </>
    );
  } else {
    return <></>;
  }
}

export default ProductOptionValues;
