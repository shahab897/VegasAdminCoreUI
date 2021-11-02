import React, { useState, useEffect } from "react";
import axios from "axios";
import { CButton, CInput, CLabel, CForm, CAlert } from "@coreui/react";
import BrandDropDown from "./supplier-brand-dropdown.component";
import TypeDropdown from "../supplier-dropdowns/supplier-type-dropdown.component";
import { Redirect } from "react-router-dom";

function SuppliersCreate() {
  const [suppliersName, setSuppliersName] = useState(undefined);
  const [suppliersEmail, setSuppliersEmail] = useState("");
  const [brands, setBrands] = useState(undefined);
  const [type, setType] = useState("");
  const [brandsIds, setBrandsIds] = useState([]);
  const [cell, setCell] = useState(undefined);
  const [error, setError] = useState(false);
  const [errorOnSubmit, setErrorOnSubmit] = useState([]);

  const EMAIL_REGEX =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const handleBlur = (e) => {
    if (!EMAIL_REGEX.test(e.target.value)) {
      e.target.style.borderColor = "red";
      setError(true);
    } else if (EMAIL_REGEX.test(e.target.value)) {
      e.target.style.borderColor = "#d8dbe0";
      setError(false);
    }
  };

  const token_vegas =
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiMDBmOTU0Yjc4YjYxOGM5Yjg0OTFkMTkxYmUwMjAzNDdlMzFjODQ0NmQ5ZTY4OTRiOTkwZDdiMTQ1MmQ3ZWFiOGE0YTFjNDc0NjFjZjY5NjEiLCJpYXQiOjE2MjQ5NTc4NjUuMDk2ODk3LCJuYmYiOjE2MjQ5NTc4NjUuMDk2OTAzLCJleHAiOjE2NTY0OTM4NjUuMDg5NzA3LCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.OHSKmTqWfrPeYCo4tqGbgysoaLCXTctWhNMyxgzp74F3kAcS8bA2ii1t3A_r-auP3ZrHZ-zInuuHce_7ftwvS4bZpM3Xt2eDx6x1zttXo3CSh4ZBEXYR4NZjE2ijZCupgUlAniUIV6ynv2HVnz5Li2qrcltu5kpUwPh2ZI1rPNbezVpFL5qtc_l10jasAZSJP27Lt7UB8LU2WnZBGkpyQne7sbIgHLBTr2ajU_GgzHwf0kg2j2ZdNK6I5_NH1G1CfjMpilB6hy9Ahec1pPyrsc55_POfOuD0phOz1A9nT5P5-nAx7PECv0yvs7OD-CQRnNgjPblMMna87Vz-msXRxAZvsXa5Qtg7DPODyj7iUtLLw34YXftKPqoaRUwQzp6b6k1tMritCvKopo7CzbApNHb6bRex0BbiHJOZnju1NFj7hwoT3IhVzTIG6SdDpaboDNPqyhD5ZOznOYoUo84jlXoI8Pz5CCGuKSdx--tpRwJYzdUz7FTxFcLsekL_9YZB0pbODMGkw4VClBduR0gfsbFykBJ9z2RRgurANFSUvyRt-kDZaWX6ZwFopjkBCY9I3vCORvjRJ1X733WS4uBKUGyamzMHuMgEV5w44oPg_sbQhJL7UtCKgwPMJr8e3O4LjT7EhcrcmfVE6v3rhbO9LhAJHWJAvWc9G2P5ckQZagM";

  let axiosConfig = {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${token_vegas}`,
    },
  };

  const [redirect, setRedirect] = useState(undefined);

  const fetch_a = () => {
    axios
      .get("https://vegasapi.phebsoft-team.com/api/brands", axiosConfig)
      .then((result) => {
        console.log(result);
        setBrands(
          result.data.data.map((brand) => {
            return { value: brand.id, label: brand.title };
          })
        );
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    fetch_a();
  }, []);

  useEffect(() => {
    console.log(brandsIds, "the data of brands that will be sent");
  }, [brandsIds]);

  const handleAdd = () => {
    let suppliersData = {
      name: suppliersName,
      email: suppliersEmail,
      supplier_type: type,
      brand_ids: brandsIds,
      cell: cell,
    };

    axios
      .post(
        "https://vegasapi.phebsoft-team.com/api/suppliers",
        suppliersData,
        axiosConfig
      )
      .then((result) => {
        console.log(result, "kia result hai");
        if (result.data.status === false) {
          setErrorOnSubmit(result.data.messages);
          return;
        }
        setRedirect(true);
      })
      .catch((error) => {
        console.log("error", error);
        setErrorOnSubmit([error.response.statusText]);
      });
  };

  if (redirect === true) {
    return <Redirect to="/purchase-order/suppliers" />;
  }

  return (
    <div>
      <CForm>
        {errorOnSubmit.length > 0 && (
          <>
            {errorOnSubmit.map((error, index) => (
              <CAlert key={index} color="danger" fade className="mb-3">
                {error}
              </CAlert>
            ))}
          </>
        )}
        <div className="mb-3">
          <CLabel htmlFor="Name">Name</CLabel>
          <CInput
            type="text"
            id="Name"
            onChange={(e) => setSuppliersName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <CLabel htmlFor="WarehouseDetail">Email</CLabel>
          <CInput
            type="email"
            id="WarehouseDetail"
            onBlur={(e) => handleBlur(e)}
            onChange={(e) => setSuppliersEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <CLabel htmlFor="Type">Type</CLabel>
          <TypeDropdown
            id="Type"
            options={[
              {
                label: "Manage By Vegas",
                value: 1,
              },
              {
                label: "Manage Self",
                value: 2,
              },
            ]}
            setType={setType}
          />
        </div>
        <div className="mb-3">
          <CLabel htmlFor="WarehouseLocation">Brands</CLabel>
          <BrandDropDown
            brands={brands}
            setBrandsIds={setBrandsIds}
            brandsIds={[]}
          />
        </div>
        <div className="mb-3">
          <CLabel htmlFor="WarehouseLocation">Cell</CLabel>
          <CInput
            type="text"
            id="WarehouseLocation"
            onChange={(e) => setCell(e.target.value)}
          />
        </div>
        <CButton color="primary" className="mb-3 mt-3" onClick={handleAdd}>
          Add
        </CButton>
        <CButton
          color="danger"
          variant="outline"
          className="mb-3 mt-3"
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

export default SuppliersCreate;
