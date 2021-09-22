import React, { createContext, useState, useEffect } from "react";

export const ProductOptionValuesContext = createContext({
  productOptionValues: [],
  optionsShow: [],
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
});

const ProductOptionValuesProdvider = ({ children }) => {
  const [productOptionValues, setProductOptionValues] = useState([]);
  const [optionShow, setOptionShow] = useState([]);
  const [optionList, setOptionList] = useState([]);
  // const [allOptionValueList, setAllOptionValueList] = useState([]);

  // setCheckBoxSubCategories(type, e) {

  // }

  const setChecked = (options, clicked) => {
    setOptionList(options);
    if (clicked.state === true) {
      setOptionList();
    }
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
        optionList,
      }}
    >
      {children}
    </ProductOptionValuesContext.Provider>
  );
};

export default ProductOptionValuesProdvider;
