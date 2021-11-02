import React, { useState, useEffect } from "react";
import axios from "axios";
import { CButton, CInput, CLabel, CForm } from "@coreui/react";
import StatusDropDown from "../../Dropdown/status-dropdown.component";
import { Redirect } from "react-router-dom";
import { useLocation } from "react-router";
import Loading from "../../Loading-component/loading-component";

function CouriersEdit() {
  const [title, setTitle] = useState("");
  const [idCourier, setIdCourier] = useState("");
  const [rate, setRate] = useState("");
  const [status, setStatus] = useState("");
  const [defaultStatus, setDefaultStatus] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const { pathname } = useLocation();
  const id = pathname.slice(pathname.search("edit/") + 5);
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
      .get(`https://vegasapi.phebsoft-team.com/api/couriers/${id}`, axiosConfig)
      .then((result) => {
        console.log(result.data.data);
        const cat = result.data.data;
        setTitle(cat.title);
        setRate(cat.rate);
        setStatus(cat.status);
        setIdCourier(cat.id);
        setDefaultStatus(cat.status);
        setIsLoading(false);
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    fetch_a();
  }, []);

  const handleAdd = () => {
    let supplierData = {
      id: idCourier,
      title,
      rate,
      status,
    };

    axios
      .put(
        `https://vegasapi.phebsoft-team.com/api/couriers/${id}`,
        supplierData,
        axiosConfig
      )
      .then((result) => {
        console.log(result);
        setRedirect(true);
      })
      .catch((error) => console.log("error", error));
  };

  if (isLoading === true) return <Loading />;
  if (redirect === true) {
    return <Redirect to="/couriers" />;
  }

  return (
    <div>
      <CForm>
        <div className="mb-3">
          <CLabel htmlFor="WarehouseName">Name</CLabel>
          <CInput
            type="text"
            id="WarehouseName"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <CLabel htmlFor="WarehouseDetail">Rate</CLabel>
          <CInput
            type="text"
            id="WarehouseDetail"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <CLabel htmlFor="WarehouseLocation">Status</CLabel>
          <StatusDropDown
            options={[
              {
                value: "YES",
                label: "Enabled",
              },
              {
                value: "No",
                label: "Disabled",
              },
            ]}
            setStatus={setStatus}
            defaultStatus={defaultStatus}
          />
        </div>
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

export default CouriersEdit;
