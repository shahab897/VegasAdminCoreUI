import React, { createContext, useState, useEffect } from "react";

export const SelectedOptionValuesContext = createContext({
  selectedOptionValues: [],
  checkSelectedOptionValues: () => {},
  unCheckSelectedOptionValues: () => {},
});

const SelectedOptionValuesProdvider = ({ children }) => {
  const [selectedOptionValues, setSelectedOptionValues] = useState([]);

  useEffect(() => {
    console.log(
      selectedOptionValues,
      "this is the list of product values to be sent"
    );
  }, [selectedOptionValues]);

  const checkSelectedOptionValues = () => {
    setSelectedOptionValues();
  };
  const unCheckSelectedOptionValues = () => {
    setSelectedOptionValues();
  };
  return (
    <SelectedOptionValuesContext.Provider
      value={{
        selectedOptionValues,
        checkSelectedOptionValues,
        unCheckSelectedOptionValues,
      }}
    >
      {children}
    </SelectedOptionValuesContext.Provider>
  );
};

export default SelectedOptionValuesProdvider;
