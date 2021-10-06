import React, { createContext, useState, useEffect } from "react";

export const ProductOptionValuesContext = createContext({
  productOptionValues: [],
  optionsValues: [],
  optionList: [],
  changeOptions: () => {},
  checkValues: () => {},
  unCheckValues: () => {},
  checkOptions: () => {},
  unCheckOptions: () => {},
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

  const changeOptions = (options) => setOptionList(options);

  const setOptionValues = (options) => {
    setOptionsValues(options);
  };

  const checkValues = (id) => {
    const correctValues = optionsValues.map((item) => {
      if (item.id === id) {
        return {
          id: item.id,
          option_id: item.option_id,
          sort_order: item.sort_order,
          value: item.value,
          isChecked: true,
        };
      } else {
        return item;
      }
    });
    setOptionValues(correctValues);
  };

  const unCheckValues = (id) => {
    const correctValues = optionsValues.map((item) => {
      if (item.id === id) {
        return {
          id: item.id,
          option_id: item.option_id,
          sort_order: item.sort_order,
          value: item.value,
          isChecked: false,
        };
      } else {
        return item;
      }
    });
    setOptionValues(correctValues);
  };

  useEffect(() => {
    console.log(productOptionValues, "finally changed ;)");
  }, [productOptionValues]);

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
  const addProductOptionValuesWithoutClick = (options) => {
    const arr = [];
    options.map((option) =>
      arr.push({
        id: `${option.id}`,
        value: option.value,
        parent_id: option.option_id,
      })
    );
    setProductOptionValues(arr);
  };

  const removeProductOptionValues = (e) => {
    setProductOptionValues(
      productOptionValues.filter((option) => e.target.value !== option.id)
    );
  };
  return (
    <ProductOptionValuesContext.Provider
      value={{
        productOptionValues,
        addProductOptionValues,
        addProductOptionValuesWithoutClick,
        removeProductOptionValues,
        changeOptions,
        setChecked,
        setUnchecked,
        checkValues,
        unCheckValues,
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
