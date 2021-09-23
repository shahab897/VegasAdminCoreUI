import React, { useEffect, useState, useContext } from "react";
import { CLabel, CInputCheckbox } from "@coreui/react";
import { ProductOptionValuesContext } from "../../../../context-providers/product-options.context";
import { v4 as uuidv4 } from "uuid";

function ProductOptionValues(props) {
  const { isChecked, options, value } = props;
  const [optionsShow, setOptionsShow] = useState(
    options.filter((item) => item.option_id === value)
  );
  const {
    addProductOptionValues,
    removeProductOptionValues,
    setOptionValues,
    optionsValues,
  } = useContext(ProductOptionValuesContext);
  const [selectedOptionValues, setSelectedOptionValues] = useState([]);

  useEffect(() => {
    console.log(selectedOptionValues, "props");
  }, [selectedOptionValues]);

  const handleOptionChange = (e, index, item) => {
    // this function adds checked values and removes unchecked values and also manages the state for showing checked and unchecked inside the check box

    console.log(item, "hello brother", e);
    if (e.target.checked === true) {
      setOptionsShow(
        optionsShow.map((option, i) => {
          if (index === i) {
            return { ...item, isChecked: true };
          } else {
            return option;
          }
        })
      );

      setSelectedOptionValues([
        ...selectedOptionValues,
        {
          name: e.target.name,
          value: e.target.value,
        },
      ]);

      addProductOptionValues(e, item);
    } else {
      setOptionsShow(
        optionsShow.map((option, i) => {
          if (index === i) {
            return { ...option, isChecked: false };
          } else {
            return option;
          }
        })
      );
      setSelectedOptionValues(
        selectedOptionValues.filter((option) => e.target.value !== option.value)
      );

      removeProductOptionValues(e, item);
    }
  };

  useEffect(() => {
    console.log(optionsShow, "values lene hain");
  }, [optionsShow]);

  if (isChecked === true) {
    return (
      <>
        {optionsShow.map((item, index) => (
          <div className="ml-2 d-sm-flex" key={index + Math.random()}>
            <CLabel htmlFor="ProductOption" key={index + Math.random()}>
              {item.value}
            </CLabel>
            <CInputCheckbox
              key={index + Math.random()}
              name={item.value}
              value={item.id}
              onChange={(e) => handleOptionChange(e, index, item)}
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
