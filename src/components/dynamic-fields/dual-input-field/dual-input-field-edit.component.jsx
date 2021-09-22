import React, { useState, useEffect } from "react";
import IconButton from "@material-ui/core/IconButton";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";
import { CInput, CLabel, CCol, CRow } from "@coreui/react";
import { v4 as uuidv4 } from "uuid";
import styled from "styled-components";

const AddRemoveButtonContainer = styled.div`
  display: inline-block;
  margin-top: 22px;
`;

function DualInputFieldEdit(props) {
  const {
    fieldLabelOne,
    fieldLabelTwo,
    setOptionsValues,
    optionValuesdata,
    setIsLoading,
  } = props;
  const [inputFields, setInputFields] = useState([
    {
      id: uuidv4(),
      value: "",
      sortorder: "",
    },
  ]);

  useEffect(() => {
    if (optionValuesdata != undefined) {
      if (optionValuesdata.length > 0) {
        const opt = [];
        optionValuesdata.map((option) => {
          opt.push({
            f_id: option.id,
            id: uuidv4(),
            value: option.value,
            sortorder: option.sort_order,
          });
        });
        setInputFields(opt);
      }
    }
    console.log(optionValuesdata, "hello");
    if (inputFields != undefined) {
      setIsLoading(false);
    }
  }, [optionValuesdata, setIsLoading]);

  const handleChangeInput = (id, event) => {
    const newInputFields = inputFields.map((i) => {
      if (id === i.id) {
        i[event.target.name] = event.target.value;
      }
      return i;
    });

    setInputFields(newInputFields);
  };

  const handleAddFields = () => {
    setInputFields([
      ...inputFields,
      { id: uuidv4(), value: "", sortorder: "" },
    ]);
  };

  const handleRemoveFields = (id) => {
    const values = [...inputFields];
    values.splice(
      values.findIndex((value) => value.id === id),
      1
    );
    setInputFields(values);
  };

  useEffect(() => {
    setOptionsValues(inputFields);
  }, [inputFields, setOptionsValues]);
  if (inputFields) {
    return (
      <>
        {inputFields.map((inputField) => (
          <div key={inputField.id}>
            <CRow>
              <CCol sm="auto">
                <div className="mb-3">
                  <CLabel htmlFor={`value`}>{fieldLabelOne}</CLabel>
                  <CInput
                    name={`value`}
                    defaultValue={inputField.value}
                    onChange={(event) =>
                      handleChangeInput(inputField.id, event)
                    }
                  />
                </div>
              </CCol>
              <CCol sm="auto">
                <div className="mb-3">
                  <CLabel htmlFor={`sortorder`}>{fieldLabelTwo}</CLabel>
                  <CInput
                    name={`sortorder`}
                    defaultValue={inputField.sortorder}
                    onChange={(event) =>
                      handleChangeInput(inputField.id, event)
                    }
                  />
                </div>
              </CCol>
              <CCol sm={2}>
                <AddRemoveButtonContainer>
                  <IconButton
                    disabled={inputFields.length === 1}
                    onClick={() => handleRemoveFields(inputField.id)}
                  >
                    <RemoveIcon />
                  </IconButton>
                  <IconButton onClick={handleAddFields}>
                    <AddIcon />
                  </IconButton>
                </AddRemoveButtonContainer>
              </CCol>
            </CRow>
          </div>
        ))}
      </>
    );
  } else {
    return <></>;
  }
}

export default DualInputFieldEdit;
