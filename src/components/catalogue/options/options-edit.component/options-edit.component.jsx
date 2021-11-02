import React, { useEffect, useState } from "react";
import { CButton, CInput, CLabel, CForm } from "@coreui/react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import { useLocation } from "react-router";
import Loading from "../../../Loading-component/loading-component";
import DualInputField from "../../../dynamic-fields/dual-input-field/dual-input-field-edit.component";
import { v4 as uuidv4 } from "uuid";

function OptionsEdit(props) {
  const [optionsName, setOptionsName] = useState(undefined);
  const [optionsType, setOptionsType] = useState(undefined);
  const [optionsSortOrder, setOptionsSortOrder] = useState("");
  const [optionValues, setOptionsValues] = useState({
    id: uuidv4(),
    value: "",
    sortorder: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [redirect, setRedirect] = useState(undefined);
  const [data, setData] = useState(undefined);

  //using location pathname to find the id for options
  const { pathname } = useLocation();
  const id = pathname.slice(pathname.search("edit/") + 5);

  const token_vegas =
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiMDBmOTU0Yjc4YjYxOGM5Yjg0OTFkMTkxYmUwMjAzNDdlMzFjODQ0NmQ5ZTY4OTRiOTkwZDdiMTQ1MmQ3ZWFiOGE0YTFjNDc0NjFjZjY5NjEiLCJpYXQiOjE2MjQ5NTc4NjUuMDk2ODk3LCJuYmYiOjE2MjQ5NTc4NjUuMDk2OTAzLCJleHAiOjE2NTY0OTM4NjUuMDg5NzA3LCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.OHSKmTqWfrPeYCo4tqGbgysoaLCXTctWhNMyxgzp74F3kAcS8bA2ii1t3A_r-auP3ZrHZ-zInuuHce_7ftwvS4bZpM3Xt2eDx6x1zttXo3CSh4ZBEXYR4NZjE2ijZCupgUlAniUIV6ynv2HVnz5Li2qrcltu5kpUwPh2ZI1rPNbezVpFL5qtc_l10jasAZSJP27Lt7UB8LU2WnZBGkpyQne7sbIgHLBTr2ajU_GgzHwf0kg2j2ZdNK6I5_NH1G1CfjMpilB6hy9Ahec1pPyrsc55_POfOuD0phOz1A9nT5P5-nAx7PECv0yvs7OD-CQRnNgjPblMMna87Vz-msXRxAZvsXa5Qtg7DPODyj7iUtLLw34YXftKPqoaRUwQzp6b6k1tMritCvKopo7CzbApNHb6bRex0BbiHJOZnju1NFj7hwoT3IhVzTIG6SdDpaboDNPqyhD5ZOznOYoUo84jlXoI8Pz5CCGuKSdx--tpRwJYzdUz7FTxFcLsekL_9YZB0pbODMGkw4VClBduR0gfsbFykBJ9z2RRgurANFSUvyRt-kDZaWX6ZwFopjkBCY9I3vCORvjRJ1X733WS4uBKUGyamzMHuMgEV5w44oPg_sbQhJL7UtCKgwPMJr8e3O4LjT7EhcrcmfVE6v3rhbO9LhAJHWJAvWc9G2P5ckQZagM";

  const fetch_a = () => {
    const config = {
      headers: { Authorization: `Bearer ${token_vegas}` },
    };
    axios
      .get(`https://vegasapi.phebsoft-team.com/api/options/${id}`, config)
      .then((response) => {
        setData(response.data.data);
        console.log(response);
      })
      .catch(console.log);
  };

  useEffect(() => {
    fetch_a();
    console.log(props);
  }, []);

  useEffect(() => {
    if (optionsName == undefined || optionsName === "") {
      if (data != undefined) setOptionsName(data.name);
    }

    if (optionsType == undefined || optionsType === "") {
      if (data != undefined) setOptionsType(data.type);
    }
    // if (optionsSortOrder == undefined || optionsSortOrder === "") {
    //   if (data != undefined) setOptionsSortOrder(data.sort_order);
    // }
    if (data != undefined) {
      if (
        typeof data.option_values === `object` &&
        data.option_values.length >= 0
      ) {
        console.log("just happened");
        setIsLoading(false);
      }
    }
    if (optionValues == undefined) {
      if (data != undefined) {
        const opt = [];
        if (data.option_values.length > 0) {
          data.option_values.map((option) => {
            opt.push({
              f_id: option.id,
              id: uuidv4(),
              value: option.value,
              sortorder: option.sort_order,
            });
          });
          setOptionsValues(opt);
        }
        console.log(opt, "ok hjaha");
      }
    }
  }, [data, optionsName, optionsType, optionsSortOrder, optionValues]);

  const handleSortOrderChange = (e) => {
    e.target.value = e.target.value.replace(/[^0-9]/g, "").toLowerCase();
    setOptionsSortOrder(e.target.value);
  };

  const handleAdd = () => {
    let optionsData = {
      name: optionsName,
      type: optionsType,
      sort_order: optionsSortOrder,
      option_values: optionValues,
    };

    let axiosConfig = {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${token_vegas}`,
      },
    };

    axios
      .put(
        `https://vegasapi.phebsoft-team.com/api/options/${id}`,
        optionsData,
        axiosConfig
      )
      .then((result) => {
        console.log(result);
        setRedirect(true);
      })
      .catch((error) => console.log("error", error));
  };

  if (data == undefined || isLoading === true) {
    return <Loading />;
  }

  if (redirect === true) {
    return <Redirect to="/catalogue/options" />;
  }

  return (
    <div>
      <CForm>
        <div className="mb-3">
          <CLabel htmlFor="OptionsName">Name</CLabel>
          <CInput
            type="text"
            id="OptionsName"
            defaultValue={data.name}
            onChange={(e) => setOptionsName(e.target.value)}
          />
        </div>
        {/* <div className="mb-3">
          <CLabel htmlFor="OptionsType">Type</CLabel>
          <CInput
            type="text"
            id="OptionsType"
            defaultValue={data.type}
            onChange={(e) => setOptionsType(e.target.value)}
          />
        </div> */}
        <div className="mb-3">
          <CLabel htmlFor="OptionsSortOrder">Sort Order</CLabel>
          <CInput
            type="text"
            id="OptionsSortOrder"
            value={optionsSortOrder}
            onChange={(e) => handleSortOrderChange(e)}
          />
        </div>
        <DualInputField
          setOptionsValues={setOptionsValues}
          optionValuesdata={data.option_values}
          optionValues={optionValues}
          fieldLabelOne={"Option Value Name"}
          fieldLabelTwo={"Option Value Sort Order"}
          setIsLoading={setIsLoading}
        />
        <CButton color="primary" onClick={handleAdd}>
          Save
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
    </div>
  );
}

export default OptionsEdit;
