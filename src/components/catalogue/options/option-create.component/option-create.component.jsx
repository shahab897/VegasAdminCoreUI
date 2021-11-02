import React, { useState, useEffect } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { CButton, CInput, CLabel, CForm } from "@coreui/react";
import DualInputField from "../../../dynamic-fields/dual-input-field/dual-input-field.component";
import styled from "styled-components";

const Wrapper = styled.div`
  margin-bottom: 20px;
`;

function OptionsCreate() {
  const [optionsName, setOptionsName] = useState(undefined);
  const [optionsType, setOptionsType] = useState("hidden");
  const [optionsSortOrder, setOptionsSortOrder] = useState("");
  const [optionsValue, setOptionsValue] = useState(undefined);
  const [redirect, setRedirect] = useState(undefined);

  const SORT_ORDER_REGEX = /^[0-9]\d*$/;

  const handleSortOrderChange = (e) => {
    let newOption = optionsSortOrder;
    if (
      SORT_ORDER_REGEX.test(e.target.value) ||
      e.target.value === null ||
      e.target.value === ""
    ) {
      e.target.style.borderColor = "#d8dbe0";
      newOption = e.target.value;
    } else if (SORT_ORDER_REGEX.test(e.target.value) === false) {
      e.target.style.borderColor = "red";
      return;
    }
    setOptionsSortOrder(newOption);
  };

  useEffect(() => {
    console.log(optionsValue, "ann de o");
  }, [optionsValue]);

  const handleAdd = () => {
    const token_vegas =
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiMDBmOTU0Yjc4YjYxOGM5Yjg0OTFkMTkxYmUwMjAzNDdlMzFjODQ0NmQ5ZTY4OTRiOTkwZDdiMTQ1MmQ3ZWFiOGE0YTFjNDc0NjFjZjY5NjEiLCJpYXQiOjE2MjQ5NTc4NjUuMDk2ODk3LCJuYmYiOjE2MjQ5NTc4NjUuMDk2OTAzLCJleHAiOjE2NTY0OTM4NjUuMDg5NzA3LCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.OHSKmTqWfrPeYCo4tqGbgysoaLCXTctWhNMyxgzp74F3kAcS8bA2ii1t3A_r-auP3ZrHZ-zInuuHce_7ftwvS4bZpM3Xt2eDx6x1zttXo3CSh4ZBEXYR4NZjE2ijZCupgUlAniUIV6ynv2HVnz5Li2qrcltu5kpUwPh2ZI1rPNbezVpFL5qtc_l10jasAZSJP27Lt7UB8LU2WnZBGkpyQne7sbIgHLBTr2ajU_GgzHwf0kg2j2ZdNK6I5_NH1G1CfjMpilB6hy9Ahec1pPyrsc55_POfOuD0phOz1A9nT5P5-nAx7PECv0yvs7OD-CQRnNgjPblMMna87Vz-msXRxAZvsXa5Qtg7DPODyj7iUtLLw34YXftKPqoaRUwQzp6b6k1tMritCvKopo7CzbApNHb6bRex0BbiHJOZnju1NFj7hwoT3IhVzTIG6SdDpaboDNPqyhD5ZOznOYoUo84jlXoI8Pz5CCGuKSdx--tpRwJYzdUz7FTxFcLsekL_9YZB0pbODMGkw4VClBduR0gfsbFykBJ9z2RRgurANFSUvyRt-kDZaWX6ZwFopjkBCY9I3vCORvjRJ1X733WS4uBKUGyamzMHuMgEV5w44oPg_sbQhJL7UtCKgwPMJr8e3O4LjT7EhcrcmfVE6v3rhbO9LhAJHWJAvWc9G2P5ckQZagM";

    if (optionsValue.length === 0) return;

    const optionsValues = optionsValue.map((item) => {
      return { value: item.value, sortorder: item.sortorder };
    });

    let optionsData = {
      name: optionsName,
      type: optionsType,
      sort_order: optionsSortOrder,
      option_values: optionsValues,
    };

    let axiosConfig = {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${token_vegas}`,
      },
    };

    axios
      .post(
        "https://vegasapi.phebsoft-team.com/api/options",
        optionsData,
        axiosConfig
      )
      .then((result) => {
        console.log(result);
        setRedirect(true);
      })
      .catch((error) => console.log("error", error));
  };

  if (redirect === true) {
    return <Redirect to="/catalogue/options" />;
  }

  return (
    <Wrapper>
      <CForm>
        <div className="mb-3">
          <CLabel htmlFor="OptionName">Option Name</CLabel>
          <CInput
            type="text"
            id="OptionName"
            onChange={(e) => setOptionsName(e.target.value)}
          />
        </div>
        {/* This field is selecting the options Type, it is being set statically at the moment */}
        {/* <div className="mb-3">
          <CLabel htmlFor="OptionType">Option Type</CLabel>
          <CInput
            type="text"
            id="OptionType"
            onChange={(e) => setOptionsType(e.target.value)}
          />
        </div> */}
        <div className="mb-3">
          <CLabel htmlFor="optionSortOrder">Option Sort Order</CLabel>
          <CInput
            type="text"
            id="optionSortOrder"
            value={optionsSortOrder}
            onChange={(e) => handleSortOrderChange(e)}
          />
        </div>
        <DualInputField
          setOptionsValue={setOptionsValue}
          fieldLabelOne={"Option Value Name"}
          fieldLabelTwo={"Option Value Sort Order"}
        />
        <CButton color="primary" onClick={handleAdd}>
          Add
        </CButton>
        <CButton
          color="danger"
          variant="outline"
          style={{ marginLeft: "15px" }}
          onClick={() => {
            setRedirect(true);
          }}
        >
          Cancel
        </CButton>
      </CForm>
    </Wrapper>
  );
}

export default OptionsCreate;
