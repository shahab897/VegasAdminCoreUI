import React, { useState, useEffect } from "react";
import axios from "axios";
import { CButton, CInput, CLabel, CForm } from "@coreui/react";
import CouponTypeDropdown from "./coupon-type-dropdown.component";
import StatusDropDown from "./coupon-status-dropdown.components";
import BrandDropDown from "./coupon-brand-dropdown.component";
import { Redirect } from "react-router-dom";

function CouponCreate() {
  const [couponType, setCouponType] = useState([]);
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState("");
  const [limit, setLimit] = useState("");
  const [brands, setBrands] = useState(undefined);
  const [minAmount, setMinAmount] = useState("");
  const [name, setName] = useState("");
  const [cell, setCell] = useState("");
  const [order, setOrder] = useState("");
  const [status, setStatus] = useState([]);
  const [brandId, setBrandId] = useState([]);

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
    console.log(brandId, "the data of brands that will be sent");
  }, [brandId]);

  const handleAdd = () => {
    if (couponType.length === 0) return;
    let suppliersData = undefined;
    if (couponType === "percentage") {
      suppliersData = {
        coupon,
        coupon_type: couponType,
        discount,
        no_of_times: limit,
        min_price: minAmount,
        status,
      };
    } else if (couponType === "amount") {
      suppliersData = {
        coupon_type: couponType,
        discount,
        name,
        cell,
        order_no: order,
        no_of_times: limit,
        min_price: minAmount,
        status,
      };
    } else if (couponType === "brand") {
      suppliersData = {
        coupon,
        coupon_type: couponType,
        discount,
        brand_id: brandId,
        no_of_times: limit,
        min_price: minAmount,
        status,
      };
    }

    axios
      .post(
        "https://vegasapi.phebsoft-team.com/api/coupons",
        suppliersData,
        axiosConfig
      )
      .then((result) => {
        console.log(result);
        setRedirect(true);
      })
      .catch((error) => console.log("error", error));
  };

  if (redirect === true) {
    return <Redirect to="/coupons" />;
  }

  return (
    <div>
      <CForm>
        {couponType !== "amount" && (
          <div className="mb-3">
            <CLabel htmlFor="Coupon">Coupon</CLabel>
            <CInput
              type="text"
              id="Coupon"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
            />
          </div>
        )}
        <div className="mb-3">
          <CLabel htmlFor="Coupon_type">Type</CLabel>
          <CouponTypeDropdown
            type="text"
            id="Coupon_type"
            options={[
              { value: "percentage", label: "Percentage" },
              { value: "amount", label: "Amount" },
              { value: "brand", label: "Brand" },
            ]}
            setCouponType={setCouponType}
          />
        </div>
        {couponType === "brand" && (
          <div className="mb-3">
            <CLabel htmlFor="BrandID">Brand</CLabel>
            <BrandDropDown
              type="text"
              id="BrandID"
              options={brands}
              setBrandId={setBrandId}
            />
          </div>
        )}
        <div className="mb-3">
          <CLabel htmlFor="Discount">Discount</CLabel>
          <CInput
            type="text"
            id="Discount"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
          />
        </div>{" "}
        <div className="mb-3">
          <CLabel htmlFor="MinAmount">Min Amount</CLabel>
          <CInput
            type="text"
            id="MinAmount"
            value={minAmount}
            onChange={(e) => setMinAmount(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <CLabel htmlFor="Limit">Total Limit</CLabel>
          <CInput
            type="text"
            id="Limit"
            value={limit}
            onChange={(e) => setLimit(e.target.value)}
          />
        </div>
        {couponType === "amount" && (
          <>
            <div className="mb-3">
              <CLabel htmlFor="WarehouseLocation">Name</CLabel>
              <CInput
                type="text"
                id="WarehouseLocation"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <CLabel htmlFor="WarehouseLocation">Cell</CLabel>
              <CInput
                type="text"
                id="WarehouseLocation"
                value={cell}
                onChange={(e) => setCell(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <CLabel htmlFor="WarehouseLocation">Order No</CLabel>
              <CInput
                type="text"
                id="WarehouseLocation"
                value={order}
                onChange={(e) => setOrder(e.target.value)}
              />
            </div>
          </>
        )}
        <div className="mb-3">
          <CLabel htmlFor="Status">Status</CLabel>
          <StatusDropDown
            type="text"
            id="Status"
            options={[
              { value: 1, label: "Enabled" },
              { value: 0, label: "Disabled" },
            ]}
            setStatus={setStatus}
          />
        </div>
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
    </div>
  );
}

export default CouponCreate;
