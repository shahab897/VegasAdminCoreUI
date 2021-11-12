import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  CButton,
  CInput,
  CLabel,
  CForm,
  CTextarea,
  CSwitch,
  CCol,
  CRow,
} from "@coreui/react";
import CouponDropDown from "../coupon-options-dropdown/coupon-dropdown.component";
import CouponOrAndDropDown from "../coupon-options-dropdown/coupon-and-or.component";
import TrueFalseDropDown from "../coupon-options-dropdown/coupon-true-false.component";
import ConditionTypeDropDown from "../coupon-options-dropdown/coupon-select-condition-type.component";
import IconButton from "@material-ui/core/IconButton";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";
import CategorySelectDropDown from "../coupon-options-dropdown/coupon-options-category.component";
import ProductSelectDropDown from "../coupon-options-dropdown/coupon-product-select-dropdown.component";
import BrandDropDown from "../coupon-options-dropdown/coupon-options-brands.component";
// import CouponTypeDropdown from "./coupon-type-dropdown.component";
// import StatusDropDown from "./coupon-status-dropdown.components";
// import BrandDropDown from "./coupon-brand-dropdown.component";

import { Redirect } from "react-router-dom";
import { Category } from "@material-ui/icons";
import BrandButtons from "src/views/buttons/brand-buttons/BrandButtons";
import { Icon, useEventCallback } from "@material-ui/core";

function CouponOptionsCreate() {
  const [couponType, setCouponType] = useState([]);
  const [coupon, setCoupon] = useState("");
  const [description, setDescription] = useState("");
  const [option, setOption] = useState("");
  const [ruleName, setRuleName] = useState("");
  const [trueFalse, setTrueFalse] = useState(undefined);
  const [showSelectCondition, setShowSelectCondition] = useState(false);
  const [conditions, setConditions] = useState([]);
  const [conditionTypes, setConditionType] = useState("");
  const [discount, setDiscount] = useState("");
  const [limit, setLimit] = useState("");
  const [brands, setBrands] = useState(undefined);
  const [minAmount, setMinAmount] = useState("");
  const [priority, setPriority] = useState("");
  const [cell, setCell] = useState("");
  const [order, setOrder] = useState("");
  const [status, setStatus] = useState(false);
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

  const handleAddCondition = () => {
    const con = [...conditions];
    con.push({ id: conditions.length + 1 });
    console.log(con, "whats in this?");
    setConditions(con);
    console.log(conditions, "why is this happening?");
  };

  const fetch_a = () => {
    // axios
    //   .get("https://vegasapi.phebsoft-team.com/api/brands", axiosConfig)
    //   .then((result) => {
    //     console.log(result);
    //     setBrands(
    //       result.data.data.map((brand) => {
    //         return { value: brand.id, label: brand.title };
    //       })
    //     );
    //   })
    //   .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    fetch_a();
  }, []);

  useEffect(() => {
    console.log(conditions, "the conditions are changing");
  }, [conditions]);

  useEffect(() => {
    console.log(brandId, "the data of brands that will be sent");
  }, [brandId]);

  const handleAdd = () => {
    // if (couponType.length === 0) return;
    // let suppliersData = undefined;
    // if (couponType === "percentage") {
    //   suppliersData = {
    //     coupon,
    //     coupon_type: couponType,
    //     discount,
    //     no_of_times: limit,
    //     min_price: minAmount,
    //     status,
    //   };
    // } else if (couponType === "amount") {
    //   suppliersData = {
    //     coupon_type: couponType,
    //     discount,
    //     name,
    //     cell,
    //     order_no: order,
    //     no_of_times: limit,
    //     min_price: minAmount,
    //     status,
    //   };
    // } else if (couponType === "brand") {
    //   suppliersData = {
    //     coupon,
    //     coupon_type: couponType,
    //     discount,
    //     brand_id: brandId,
    //     no_of_times: limit,
    //     min_price: minAmount,
    //     status,
    //   };
    // }
    // axios
    //   .post(
    //     "https://vegasapi.phebsoft-team.com/api/coupons",
    //     suppliersData,
    //     axiosConfig
    //   )
    //   .then((result) => {
    //     console.log(result);
    //     setRedirect(true);
    //   })
    //   .catch((error) => console.log("error", error));
  };

  // To Add:
  //Conditions
  // to and from date
  // conditions:
  // Category(dropdown multi)
  // Brand
  // Product
  // Cart Total (total amount)
  // No of quantity(item quantity)
  // user birthday
  //Actions
  //fixed amount discount
  //percentage
  //free product(also the amount of  products and then the selection for those products)

  if (redirect === true) {
    return <Redirect to="/coupons" />;
  }

  return (
    <div>
      <CForm>
        <h4>Rules</h4>
        <div className="mb-3">
          <CLabel htmlFor="Rule">Rule Name</CLabel>
          <CInput
            type="text"
            id="Rule"
            value={ruleName}
            onChange={(e) => setRuleName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <CLabel htmlFor="Description">Description</CLabel>
          <CTextarea
            type="text"
            id="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <CLabel htmlFor="Status" style={{ display: "block" }}>
            Status
          </CLabel>
          <CSwitch
            id="Status"
            color="primary"
            variant="3d"
            checked={status}
            style={{ display: "block" }}
            onChange={() => setStatus(!status)}
          />
        </div>
        <div className="mb-3">
          <CLabel htmlFor="MinAmount">Coupon</CLabel>
          <CouponDropDown
            options={[
              { label: "coupon1", value: "coupon1" },
              { label: "coupon2", value: "coupon2" },
            ]}
            setCoupon={setCoupon}
          />
        </div>
        <div className="mb-3">
          <CLabel htmlFor="Limit">Uses Per Customer</CLabel>
          <CInput
            type="text"
            id="Limit"
            value={limit}
            onChange={(e) => setLimit(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <CLabel htmlFor="priority">Priority</CLabel>
          <CInput
            type="text"
            id="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          />
        </div>
        <hr />
        <h4>Conditions</h4>
        <div className="mb-3">
          <CRow>
            <p colSpan={1} style={{ margin: "7px 15px" }}>
              If
            </p>
            <CouponOrAndDropDown
              colSpan={1}
              setOption={setOption}
              options={[
                { label: "All", value: "AND" },
                { label: "Some", value: "OR" },
              ]}
            />
            <p style={{ margin: "7px 15px" }}>of these conditions are</p>
            <TrueFalseDropDown
              options={[
                { label: "True", value: true },
                { label: "False", value: false },
              ]}
              setTrueFalse={setTrueFalse}
            />
          </CRow>
          {conditions.length > 0 && (
            <>
              {conditions.map((condition) => {
                return (
                  <div key={condition.id} style={{ margin: "15px" }}>
                    <CRow>
                      <ConditionTypeDropDown
                        colSpan={3}
                        options={[
                          { label: "Category", value: "1" },
                          { label: "Brand", value: "2" },
                          { label: "Product", value: "3" },
                          { label: "Cart Total(Amount)", value: "4" },
                          { label: "Item Quantity", value: "5" },
                        ]}
                        id={condition.id}
                        setConditions={setConditions}
                        conditions={conditions}
                      />
                      {condition.value === "1" && (
                        <CategorySelectDropDown
                          colSpan={3}
                          options={[
                            { label: "category 1", value: "1" },
                            { label: "category 2", value: "2" },
                            { label: "category 3", value: "3" },
                          ]}
                          conditions={conditions}
                          id={condition.id}
                          setConditions={setConditions}
                        />
                      )}
                      {condition.value === "2" && (
                        <BrandDropDown
                          colSpan={3}
                          options={[
                            { label: "Brand 1", value: "1" },
                            { label: "Brand 2", value: "2" },
                            { label: "Brand 3", value: "3" },
                          ]}
                          conditions={conditions}
                          id={condition.id}
                          setConditions={setConditions}
                        />
                      )}
                      {condition.value === "3" && (
                        <ProductSelectDropDown
                          colSpan={3}
                          options={[
                            { label: "Product 1", value: "1" },
                            { label: "Product 2", value: "2" },
                            { label: "Product 3", value: "3" },
                          ]}
                          conditions={conditions}
                          id={condition.id}
                          setConditions={setConditions}
                        />
                      )}
                      <IconButton
                        style={{ position: "relative", top: "-5px" }}
                        onClick={() => {
                          console.log(
                            conditions.filter((con) => con.id !== condition.id),
                            "conditions filter"
                          );
                          const filtered = conditions.filter(
                            (con) => con.id !== condition.id
                          );
                          setConditions(filtered);
                        }}
                      >
                        <RemoveIcon />
                      </IconButton>
                    </CRow>
                  </div>
                );
              })}
            </>
          )}
          <IconButton onClick={handleAddCondition}>
            <AddIcon />
          </IconButton>
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

export default CouponOptionsCreate;
