import React, { useState, useEffect } from "react";
import axios from "axios";
import { CButton, CInput, CLabel, CForm } from "@coreui/react";
import { Redirect } from "react-router-dom";
import SuppliersDropDown from "../dropdowns/suppliers-dropdown.component";
import BrandDropDown from "../../../catalogue/products/brand-dropdown.component/brand-dropdown.component";

function ManagePOCreate() {
  const [suppliers, setSuppliers] = useState([]);
  const [supplierId, setSupplierId] = useState(undefined);
  const [brands, setBrands] = useState([]);
  const [brandId, setBrandId] = useState([]);
  const [days, setDays] = useState("");

  const token_vegas =
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiMDBmOTU0Yjc4YjYxOGM5Yjg0OTFkMTkxYmUwMjAzNDdlMzFjODQ0NmQ5ZTY4OTRiOTkwZDdiMTQ1MmQ3ZWFiOGE0YTFjNDc0NjFjZjY5NjEiLCJpYXQiOjE2MjQ5NTc4NjUuMDk2ODk3LCJuYmYiOjE2MjQ5NTc4NjUuMDk2OTAzLCJleHAiOjE2NTY0OTM4NjUuMDg5NzA3LCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.OHSKmTqWfrPeYCo4tqGbgysoaLCXTctWhNMyxgzp74F3kAcS8bA2ii1t3A_r-auP3ZrHZ-zInuuHce_7ftwvS4bZpM3Xt2eDx6x1zttXo3CSh4ZBEXYR4NZjE2ijZCupgUlAniUIV6ynv2HVnz5Li2qrcltu5kpUwPh2ZI1rPNbezVpFL5qtc_l10jasAZSJP27Lt7UB8LU2WnZBGkpyQne7sbIgHLBTr2ajU_GgzHwf0kg2j2ZdNK6I5_NH1G1CfjMpilB6hy9Ahec1pPyrsc55_POfOuD0phOz1A9nT5P5-nAx7PECv0yvs7OD-CQRnNgjPblMMna87Vz-msXRxAZvsXa5Qtg7DPODyj7iUtLLw34YXftKPqoaRUwQzp6b6k1tMritCvKopo7CzbApNHb6bRex0BbiHJOZnju1NFj7hwoT3IhVzTIG6SdDpaboDNPqyhD5ZOznOYoUo84jlXoI8Pz5CCGuKSdx--tpRwJYzdUz7FTxFcLsekL_9YZB0pbODMGkw4VClBduR0gfsbFykBJ9z2RRgurANFSUvyRt-kDZaWX6ZwFopjkBCY9I3vCORvjRJ1X733WS4uBKUGyamzMHuMgEV5w44oPg_sbQhJL7UtCKgwPMJr8e3O4LjT7EhcrcmfVE6v3rhbO9LhAJHWJAvWc9G2P5ckQZagM";

  let axiosConfig = {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${token_vegas}`,
    },
  };

  const fetch_supplierBrand = () => {
    axios
      .get(
        `http://vegasapi.phebsoft-team.com/api/getSupplierbrands/${supplierId}`,
        axiosConfig
      )
      .then((result) => {
        console.log(result);
        const sup = result.data.data.map((brand) => {
          return { value: brand.id, label: brand.title };
        });
        setBrands(sup);
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    console.log(supplierId);
    if (supplierId !== undefined) fetch_supplierBrand();
  }, [supplierId]);

  const [redirect, setRedirect] = useState(undefined);

  const fetch_a = () => {
    axios
      .get(
        "http://vegasapi.phebsoft-team.com/api/purchaseorders/create",
        axiosConfig
      )
      .then((result) => {
        console.log(result);
        const sup = result.data.data.suppliers.map((supplier) => {
          return { value: supplier.id, label: supplier.name };
        });
        setSuppliers(sup);
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    fetch_a();
  }, []);

  if (redirect === true) {
    return <Redirect to="/purchase-order/suppliers" />;
  }

  return (
    <div>
      <CForm>
        <div className="mb-3">
          <CLabel htmlFor="Supplier">Supplier</CLabel>
          <SuppliersDropDown
            id="Supplier"
            options={suppliers}
            setSupplierId={setSupplierId}
          />
        </div>
        <div className="mb-3">
          <CLabel htmlFor="days">No of Days</CLabel>
          <CInput
            type="text"
            id="days"
            value={days}
            onChange={(e) => setDays(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <CLabel htmlFor="Brands">Brands</CLabel>
          <BrandDropDown
            id="Brands"
            options={brands}
            setBrandId={setBrandId}
            disabled={supplierId === undefined}
          />
        </div>

        <CButton color="primary">Add</CButton>
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

export default ManagePOCreate;
