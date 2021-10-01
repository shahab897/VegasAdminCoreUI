import React, { createContext, useState, useEffect } from "react";

export const ProductOptionValuesContext = createContext({
  productOptionValues: [],
  optionsValues: [],
  optionList: [],
  changeOptionValueList: () => {},
  setChecked: () => {},
  setUnchecked: () => {},
  setCheckedSubOptions: () => {},
  setUncheckedSubOptions: () => {},
  setCheckBoxCategories: () => {},
  setCheckBoxSubCategories: () => {},
  addProductOptionValues: () => {},
  removeProductOptionValues: () => {},
  setOptionValues: () => {},
});

const ProductOptionValuesProdvider = ({ children }) => {
  const [productOptionValues, setProductOptionValues] = useState([]);
  const [optionsValues, setOptionsValues] = useState([]);
  const [optionList, setOptionList] = useState([]);
  // const [allOptionValueList, setAllOptionValueList] = useState([]);

  // setCheckBoxSubCategories(type, e) {

  // }

  const setChecked = (options, clicked) => {
    if (clicked.state === true)
      setOptionList(
        optionList.map((productOption, i) => {
          if (clicked.index === i) return { ...productOption, isChecked: true };
          else return productOption;
        })
      );
    else setOptionList(options);
  };
  const setUnchecked = (options, clicked) => {
    if (clicked.state === true)
      setOptionList(
        optionList.map((productOption, i) => {
          if (clicked.index === i)
            return { ...productOption, isChecked: false };
          else return productOption;
        })
      );
    else setOptionList(options);
  };
  const setOptionValues = (options) => {
    setOptionsValues(options);
  };

  useEffect(() => {
    console.log(optionList);
  }, [optionList]);

  useEffect(() => {
    console.log(
      productOptionValues,
      "this is the list of product values to be sent"
    );
  }, [productOptionValues]);

  const addProductOptionValues = (e, option) => {
    const isSameValue = productOptionValues.find(
      (item) => item.id === e.target.value
    );
    if (!isSameValue) {
      setProductOptionValues([
        ...productOptionValues,
        {
          id: e.target.value,
          value: e.target.name,
          parent_id: option.option_id,
        },
      ]);
    }
  };
  const removeProductOptionValues = (e) =>
    setProductOptionValues(
      productOptionValues.filter((option) => e.target.value !== option.id)
    );
  return (
    <ProductOptionValuesContext.Provider
      value={{
        productOptionValues,
        addProductOptionValues,
        removeProductOptionValues,
        setChecked,
        setUnchecked,
        optionsValues,
        optionList,
        setOptionValues,
      }}
    >
      {children}
    </ProductOptionValuesContext.Provider>
  );
};

export default ProductOptionValuesProdvider;
