import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  CButton,
  CInput,
  CLabel,
  CForm,
  CRow,
  CCol,
  CDataTable,
  CCardHeader,
  CCardBody,
  CCard,
} from "@coreui/react";
import { Redirect } from "react-router";
import SuppliersDropDown from "../dropdowns/suppliers-dropdown.component";
import BrandDropDown from "../../../catalogue/products/brand-dropdown.component/brand-dropdown.component";
import Loading2Component from "../../../Loading-component/loading2-component";

//add total cost and amount underneath
function ManagePOCreate() {
  const [suppliers, setSuppliers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [supplierId, setSupplierId] = useState(undefined);
  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [brandId, setBrandId] = useState(undefined);
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

  const handleVariationchange = (index, e) => {
    let newFormValues = [...products];
    newFormValues[index][e.target.name] = e.target.value;
    setProducts(newFormValues);

    console.log(products, "products");
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

  const fetch_brandProduct = () => {
    setIsLoading(true);
    axios
      .get(
        `http://vegasapi.phebsoft-team.com/api/getBrandproducts/${brandId}`,
        axiosConfig
      )
      .then((result) => {
        console.log(result, "dekh lete hain");
        const prod = result.data.data
          .map((item) => {
            if (item.product_type === "configurable") {
              return item.variations.map((conproduct) => {
                return {
                  title: item.title,
                  barcode: conproduct.barcode,
                  options: conproduct.options,
                  parent_id: conproduct.parent_id,
                  product_type: item.product_type,
                  product_variation_ids: conproduct.product_variation_ids,
                  id: conproduct.id,
                  variant_title: conproduct.title,
                  quantity: "",
                  amount: "",
                };
              });
            } else {
              return {
                title: item.title,
                barcode: item.barcode,
                id: item.id,
                product_type: item.product_type,
                options: "",
                variant_title: item.title,
                quantity: "",
                amount: "",
              };
            }
          })
          .flat();
        console.log(prod, "meri mehnat");
        setProducts(prod);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        console.log("error", error);
      });
  };

  useEffect(() => {
    console.log(supplierId);
    if (supplierId !== undefined) fetch_supplierBrand();
  }, [supplierId]);

  useEffect(() => {
    if (brandId !== undefined) fetch_brandProduct();
  }, [brandId]);

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

  const handleAdd = () => {
    let purchaseOrder = {
      supplier_id: supplierId,
      days: days,
      brand_id: brandId,
      products: products,
    };

    console.log(purchaseOrder, "yeh horaha hai send");
    let axiosConfig = {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${token_vegas}`,
      },
    };

    axios
      .post(
        "https://vegasapi.phebsoft-team.com/api/purchaseorders",
        purchaseOrder,
        axiosConfig
      )
      .then((result) => {
        console.log(result);
        setRedirect(true);
      })
      .catch((error) => console.log("error", error));
  };

  if (redirect === true) {
    return <Redirect to="/purchase-order/manage-purchase-order" />;
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

        {isLoading && (
          <Loading2Component
            className="mb-3 mt-3"
            style={{ display: "block", width: "100%" }}
          />
        )}
        <div>
          {products.length > 0 && (
            <div>
              <CRow>
                <CCol>
                  <CCard>
                    <CCardHeader>Products</CCardHeader>
                    <CCardBody className="position-relative table-responsive">
                      <div className="position-relative table-responsive">
                        <table className="table table-sm  table-hover">
                          <thead
                            style={{
                              background: "rgb(48 60 84)",
                              color: "#fff",
                            }}
                          >
                            <tr>
                              <th>
                                <CCol sm="8" className="ml-1">
                                  Title
                                </CCol>
                              </th>
                              <th>
                                <CCol sm="8" className="ml-1">
                                  Variant Title
                                </CCol>
                              </th>
                              <th>
                                <CCol sm="8" className="ml-1">
                                  Barcode
                                </CCol>
                              </th>
                              <th>
                                <CCol sm="8" className="ml-1">
                                  Options
                                </CCol>
                              </th>
                              <th>
                                <CCol sm="8" className="ml-1">
                                  Quantity
                                </CCol>
                              </th>
                              <th>
                                <CCol sm="8" className="ml-1">
                                  Amount
                                </CCol>
                              </th>
                              <th>
                                <CCol sm="8" className="ml-1">
                                  Remove
                                </CCol>
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {products.map(
                              (
                                {
                                  title,
                                  barcode,
                                  product_type,
                                  quantity,
                                  options,
                                  variant_title,
                                  amount,
                                },
                                index
                              ) => {
                                return (
                                  <tr key={index}>
                                    {product_type === "simple" && (
                                      <>
                                        <td>
                                          <CCol sm="8">{title}</CCol>
                                        </td>
                                        <td>
                                          <CCol sm="8">{variant_title}</CCol>
                                        </td>
                                        <td>
                                          <CCol sm="8">{barcode}</CCol>
                                        </td>
                                        <td>
                                          <CCol sm="8">{options}</CCol>
                                        </td>
                                        <td>
                                          <CCol sm="8" className="ml-1">
                                            <CInput
                                              value={quantity}
                                              name="quantity"
                                              onChange={(e) =>
                                                handleVariationchange(index, e)
                                              }
                                            />
                                          </CCol>
                                        </td>
                                        <td>
                                          <CCol sm="8" className="ml-1">
                                            <CInput
                                              value={amount}
                                              name="amount"
                                              onChange={(e) =>
                                                handleVariationchange(index, e)
                                              }
                                            />
                                          </CCol>
                                        </td>
                                        <td>
                                          <CCol sm="8" className="ml-1">
                                            Delete
                                          </CCol>
                                        </td>
                                      </>
                                    )}
                                    {product_type === "configurable" && (
                                      <>
                                        <td>
                                          <CCol sm="8">{title}</CCol>
                                        </td>
                                        <td>
                                          <CCol sm="8">{variant_title}</CCol>
                                        </td>
                                        <td>
                                          <CCol sm="8">{barcode}</CCol>
                                        </td>
                                        <td>
                                          <CCol sm="8">
                                            {options.map(
                                              (
                                                { value, options: { name } },
                                                key
                                              ) => {
                                                return (
                                                  <p key={key}>
                                                    <b>{name}</b> : {value}
                                                  </p>
                                                );
                                              }
                                            )}
                                          </CCol>
                                        </td>
                                        <td>
                                          <CCol sm="8" className="ml-1">
                                            <CInput
                                              value={quantity}
                                              name="quantity"
                                              onChange={(e) =>
                                                handleVariationchange(index, e)
                                              }
                                            />
                                          </CCol>
                                        </td>
                                        <td>
                                          <CCol sm="8" className="ml-1">
                                            <CInput
                                              value={amount}
                                              name="amount"
                                              onChange={(e) =>
                                                handleVariationchange(index, e)
                                              }
                                            />
                                          </CCol>
                                        </td>
                                        <td>
                                          <CCol sm="8" className="ml-1">
                                            Delete
                                          </CCol>
                                        </td>
                                      </>
                                    )}
                                  </tr>
                                );
                              }
                            )}
                          </tbody>
                        </table>
                      </div>
                    </CCardBody>
                  </CCard>
                </CCol>
              </CRow>
            </div>
          )}
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

export default ManagePOCreate;
