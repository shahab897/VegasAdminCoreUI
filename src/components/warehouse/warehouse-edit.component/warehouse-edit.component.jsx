import React, { useEffect, useState } from "react";
import { CButton, CInput, CLabel, CForm } from "@coreui/react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import { useLocation } from "react-router";
import Loading from "../../Loading-component/loading-component";
import StoresDropDownMulti from "../warehouse-dropdown.component/warehouse-dropdown.component";

function WareHouseEdit(props) {
  const [warehouseName, setWarehouseName] = useState(undefined);
  const [warehouseDetail, setWarehouseDetail] = useState(undefined);
  const [warehouseLocation, setWarehouseLocation] = useState(undefined);
  const [stores, setStores] = useState([]);
  const [storesIds, setStoresIds] = useState([]);
  const [redirect, setRedirect] = useState(undefined);
  const [data, setData] = useState(undefined);

  //using location pathname to find the id for warehouse
  const { pathname } = useLocation();
  const id = pathname.slice(pathname.search("edit/") + 5);

  const token_vegas =
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiMDBmOTU0Yjc4YjYxOGM5Yjg0OTFkMTkxYmUwMjAzNDdlMzFjODQ0NmQ5ZTY4OTRiOTkwZDdiMTQ1MmQ3ZWFiOGE0YTFjNDc0NjFjZjY5NjEiLCJpYXQiOjE2MjQ5NTc4NjUuMDk2ODk3LCJuYmYiOjE2MjQ5NTc4NjUuMDk2OTAzLCJleHAiOjE2NTY0OTM4NjUuMDg5NzA3LCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.OHSKmTqWfrPeYCo4tqGbgysoaLCXTctWhNMyxgzp74F3kAcS8bA2ii1t3A_r-auP3ZrHZ-zInuuHce_7ftwvS4bZpM3Xt2eDx6x1zttXo3CSh4ZBEXYR4NZjE2ijZCupgUlAniUIV6ynv2HVnz5Li2qrcltu5kpUwPh2ZI1rPNbezVpFL5qtc_l10jasAZSJP27Lt7UB8LU2WnZBGkpyQne7sbIgHLBTr2ajU_GgzHwf0kg2j2ZdNK6I5_NH1G1CfjMpilB6hy9Ahec1pPyrsc55_POfOuD0phOz1A9nT5P5-nAx7PECv0yvs7OD-CQRnNgjPblMMna87Vz-msXRxAZvsXa5Qtg7DPODyj7iUtLLw34YXftKPqoaRUwQzp6b6k1tMritCvKopo7CzbApNHb6bRex0BbiHJOZnju1NFj7hwoT3IhVzTIG6SdDpaboDNPqyhD5ZOznOYoUo84jlXoI8Pz5CCGuKSdx--tpRwJYzdUz7FTxFcLsekL_9YZB0pbODMGkw4VClBduR0gfsbFykBJ9z2RRgurANFSUvyRt-kDZaWX6ZwFopjkBCY9I3vCORvjRJ1X733WS4uBKUGyamzMHuMgEV5w44oPg_sbQhJL7UtCKgwPMJr8e3O4LjT7EhcrcmfVE6v3rhbO9LhAJHWJAvWc9G2P5ckQZagM";

  const fetch_a = () => {
    const config = {
      headers: { Authorization: `Bearer ${token_vegas}` },
    };
    axios
      .get("https://vegasapi.phebsoft-team.com/api/stores", config)
      .then((result) => {
        const stores = result.data.data.map(({ id, name }) => {
          return { value: id, label: name };
        });
        setStores(stores);
      })
      .catch((error) => console.log("error", error));
    axios
      .get(`https://vegasapi.phebsoft-team.com/api/warehouses/${id}`, config)
      .then((response) => {
        setData(response.data.data);
        // const ids = `${response.data.data.stores_ids}`;
        // setStoresIds([
        //   ...stores,
        //   ...ids.split("|").map((el) => parseInt(el, 10)),
        // ]);
        console.log(response);
      })
      .catch(console.log);
  };

  useEffect(() => {
    fetch_a();
    console.log(props);
  }, []);

  useEffect(() => {
    if (warehouseName == undefined || warehouseName === "") {
      if (data != undefined) setWarehouseName(data.name);
    }

    if (warehouseDetail == undefined || warehouseDetail === "") {
      if (data != undefined) setWarehouseDetail(data.detail);
    }
    if (warehouseLocation == undefined || warehouseLocation === "") {
      if (data != undefined) setWarehouseLocation(data.location);
    }
  }, [warehouseName, warehouseDetail, warehouseLocation, data]);

  const handleAdd = () => {
    let warehouseData = {
      name: warehouseName,
      detail: warehouseDetail,
      location: warehouseLocation,
      stores_ids: storesIds,
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
        `https://vegasapi.phebsoft-team.com/api/warehouses/${id}`,
        warehouseData,
        axiosConfig
      )
      .then((result) => {
        console.log(result);
        setRedirect(true);
      })
      .catch((error) => console.log("error", error));
  };

  if (data == undefined) {
    return <Loading />;
  }

  if (redirect === true) {
    return <Redirect to="/warehouse" />;
  }

  return (
    <div>
      <CForm>
        <div className="mb-3">
          <CLabel htmlFor="WarehouseName">Warehouse Name</CLabel>
          <CInput
            type="text"
            id="WarehouseName"
            aria-describedby="warehouse-name"
            defaultValue={data.name}
            onChange={(e) => setWarehouseName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <CLabel htmlFor="WarehouseDetail">Warehouse Detail</CLabel>
          <CInput
            type="text"
            id="WarehouseDetail"
            aria-describedby="warehouse-detail"
            defaultValue={data.detail}
            onChange={(e) => setWarehouseDetail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <CLabel htmlFor="WarehouseLocation">Warehouse Location</CLabel>
          <CInput
            type="text"
            id="WarehouseLocation"
            aria-describedby="warehouse-location"
            defaultValue={data.location}
            onChange={(e) => setWarehouseLocation(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <CLabel htmlFor="WarehouseStore">Associated Store(s)</CLabel>
          <StoresDropDownMulti
            options={stores}
            setStoresIds={setStoresIds}
            storesIds={storesIds}
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

export default WareHouseEdit;
