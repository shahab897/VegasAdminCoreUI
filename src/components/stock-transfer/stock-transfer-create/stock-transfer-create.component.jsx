import React, { useState, useEffect, useRef, Suspense } from "react";
import axios from "axios";
import {
  CButton,
  CInput,
  CLabel,
  CForm,
  CCol,
  CRow,
  CCard,
  CCardBody,
  CCardHeader,
  CAlert,
} from "@coreui/react";
import { Redirect } from "react-router-dom";
import TransferTypeDropDown from "../dropdown/transfer-type-dropdown.component";
import WarehouseTransferDropDown from "../dropdown/warehouse-dropdown-component";
import StoreDropDown from "../dropdown/store-dropdown.component";
import BrandDropDown from "../dropdown/brands-dropdown.component";
import Loading2Component from "../../Loading-component/loading2-component";

function StockTransferCreate() {
  const [stores, setStores] = useState([]);
  const [storeId, setStoreId] = useState("");
  const [transferType, setTransferType] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [warehouses, setWarehouses] = useState([]);
  const [warehouseId, setWarehouseId] = useState("");
  const [warehouseId2, setWarehouseId2] = useState("");
  const [data, setData] = useState(undefined);
  const [brands, setBrands] = useState([]);
  const [brandId, setBrandId] = useState("");
  const [stockProducts, setStockProducts] = useState([]);
  const [redirect, setRedirect] = useState(undefined);
  const [recievedQtyError, setRecievedQtyError] = useState(false);

  const quantityRef = useRef([]);
  quantityRef.current = [];

  const token_vegas =
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiMDBmOTU0Yjc4YjYxOGM5Yjg0OTFkMTkxYmUwMjAzNDdlMzFjODQ0NmQ5ZTY4OTRiOTkwZDdiMTQ1MmQ3ZWFiOGE0YTFjNDc0NjFjZjY5NjEiLCJpYXQiOjE2MjQ5NTc4NjUuMDk2ODk3LCJuYmYiOjE2MjQ5NTc4NjUuMDk2OTAzLCJleHAiOjE2NTY0OTM4NjUuMDg5NzA3LCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.OHSKmTqWfrPeYCo4tqGbgysoaLCXTctWhNMyxgzp74F3kAcS8bA2ii1t3A_r-auP3ZrHZ-zInuuHce_7ftwvS4bZpM3Xt2eDx6x1zttXo3CSh4ZBEXYR4NZjE2ijZCupgUlAniUIV6ynv2HVnz5Li2qrcltu5kpUwPh2ZI1rPNbezVpFL5qtc_l10jasAZSJP27Lt7UB8LU2WnZBGkpyQne7sbIgHLBTr2ajU_GgzHwf0kg2j2ZdNK6I5_NH1G1CfjMpilB6hy9Ahec1pPyrsc55_POfOuD0phOz1A9nT5P5-nAx7PECv0yvs7OD-CQRnNgjPblMMna87Vz-msXRxAZvsXa5Qtg7DPODyj7iUtLLw34YXftKPqoaRUwQzp6b6k1tMritCvKopo7CzbApNHb6bRex0BbiHJOZnju1NFj7hwoT3IhVzTIG6SdDpaboDNPqyhD5ZOznOYoUo84jlXoI8Pz5CCGuKSdx--tpRwJYzdUz7FTxFcLsekL_9YZB0pbODMGkw4VClBduR0gfsbFykBJ9z2RRgurANFSUvyRt-kDZaWX6ZwFopjkBCY9I3vCORvjRJ1X733WS4uBKUGyamzMHuMgEV5w44oPg_sbQhJL7UtCKgwPMJr8e3O4LjT7EhcrcmfVE6v3rhbO9LhAJHWJAvWc9G2P5ckQZagM";
  let axiosConfig = {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${token_vegas}`,
    },
  };

  useEffect(() => {
    if (warehouseId !== "" && warehouseId != undefined) {
      let assosStores = [];
      warehouseId.stores.map((store) => {
        data.stores.map((selStore) => {
          if (selStore.id === store.store_id) {
            assosStores.push({ value: selStore.id, label: selStore.name });
          }
        });
      });
      setStores(assosStores);
    }
  }, [warehouseId]);

  useEffect(() => {
    console.log(transferType, "transfer ki type");
  }, [transferType]);

  const fetch_a = () => {
    axios
      .get(
        "https://vegasapi.phebsoft-team.com/api/stocktransfers/create",
        axiosConfig
      )
      .then((result) => {
        const warehousesResult = result.data.data.warehouses.map(
          ({ id, name, stores }) => {
            return { value: id, label: name, stores };
          }
        );
        const brandResults = result.data.data.brands.map(({ id, title }) => {
          return { value: id, label: title };
        });
        setBrands(brandResults);
        setWarehouses(warehousesResult);
        setData(result.data.data);
        console.log(warehousesResult, "warehouses filtered", result.data.data);
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    fetch_a();
  }, []);

  const addToRef = (el) => {
    if (el && !quantityRef.current.includes(el)) {
      quantityRef.current.push(el);
    }
  };

  const handleFetchProducts = () => {
    if (
      transferType === "" ||
      warehouseId === "" ||
      brandId === "" ||
      storeId === ""
    )
      return;
    let productStockData = {
      transfer_type: transferType,
      from: warehouseId.value,
      to: storeId,
      brand_id: brandId,
    };

    console.log(productStockData, "kia ja rhia hai", warehouseId);
    axios
      .post(
        "https://vegasapi.phebsoft-team.com/api/getProductswithstock",
        productStockData,
        axiosConfig
      )
      .then((result) => {
        console.log(result, "dekh lete hain");
        const prod = result.data.data
          .map((item) => {
            if (item.product_type === "configurable") {
              return {
                title: item.title,
                barcode: item.barcode,
                options: item.options,
                variant_id: item.variant_id,
                product_type: item.product_type,
                product_id: item.product_id,
                variant_title: item.variant_title,
                availableQuantity: parseInt(item.product_current_quantity),
                transferQuantity: "",
              };
            } else {
              return {
                title: item.title,
                barcode: item.barcode,
                product_id: item.product_id,
                product_type: item.product_type,
                options: "",
                variant_title: item.title,
                availableQuantity: parseInt(item.product_current_quantity),
                transferQuantity: "",
              };
            }
          })
          .flat();
        console.log(prod, "meri mehnat");
        setStockProducts(prod);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        console.log("error", error);
      });
  };

  const handleOnBlur = (index, e) => {
    if (
      stockProducts[index].transferQuantity <=
      stockProducts[index].availableQuantity
    ) {
      e.target.style.borderColor = "#d8dbe0";
    }
  };

  const handleVariationchange = (index, e) => {
    let newFormValues = [...stockProducts];
    if (e.target.value > newFormValues[index].availableQuantity) {
      quantityRef.current[index].style.borderColor = "red";
      return;
    }
    e.target.style.borderColor = "#d8dbe0";
    newFormValues[index][e.target.name] = e.target.value;

    setStockProducts(newFormValues);
  };

  const handleAdd = () => {
    if (
      transferType === "" ||
      warehouseId === "" ||
      brandId === "" ||
      storeId === ""
    )
      return;
    let productStockData = {
      transfer_type: transferType,
      from_id: warehouseId.value,
      to_id: storeId,
      brand_id: brandId,
      products: stockProducts,
    };

    console.log(productStockData, "stock transfer send data");

    axios
      .post(
        "https://vegasapi.phebsoft-team.com/api/stocktransfers",
        productStockData,
        axiosConfig
      )
      .then((result) => {
        console.log(result);
        setRedirect(true);
      })
      .catch((error) => console.log("error", error));
  };

  if (redirect === true) {
    return <Redirect to="/stock-transfer" />;
  }
  // po id, product id
  return (
    <Suspense fallback={Loading2Component}>
      <div>
        <CForm>
          <div className="mb-3">
            <CLabel htmlFor="TransferTypeDropDown">Transfer Type</CLabel>
            <TransferTypeDropDown
              id="TransferTypeDropDown"
              options={[
                { label: "Store To Store", value: 2 },
                { label: "Warehouse To Store", value: 1 },
              ]}
              disabled={stockProducts.length > 0}
              setTransferType={setTransferType}
            />
          </div>
          <div className="mb-3">
            <CLabel htmlFor="brand">Brand</CLabel>
            <BrandDropDown
              id="brand"
              options={brands}
              setBrandId={setBrandId}
              disabled={stockProducts.length > 0}
            />
          </div>
          {transferType === 1 && warehouses.length > 0 && (
            <>
              <div className="mb-3">
                <CLabel htmlFor="warhouse">Warehouse</CLabel>
                <WarehouseTransferDropDown
                  id="warhouse"
                  options={warehouses}
                  setWarehouseId={setWarehouseId}
                  disabled={stockProducts.length > 0}
                />
              </div>
              {stores.length > 0 && (
                <>
                  <div className="mb-3">
                    <CLabel htmlFor="store">Store</CLabel>
                    <StoreDropDown
                      id="store"
                      options={stores}
                      setStoreId={setStoreId}
                      disabled={stockProducts.length > 0}
                    />
                  </div>
                  <p>
                    <small>
                      <strong>Note:</strong> You must select all the above
                      options carefully before clicking fetch!
                    </small>
                  </p>
                  {stockProducts.length === 0 && (
                    <div className="mb-3">
                      <CButton color="primary" onClick={handleFetchProducts}>
                        Fetch Products
                      </CButton>
                    </div>
                  )}
                </>
              )}
            </>
          )}
          {stockProducts.length > 0 && (
            <CAlert fade color="info">
              Stock transfer generated successfully!
            </CAlert>
          )}
          <div>
            {stockProducts.length > 0 && (
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
                                    Available Quantity
                                  </CCol>
                                </th>
                                <th>
                                  <CCol sm="8" className="ml-1">
                                    Transfer Quantity
                                  </CCol>
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {stockProducts.map(
                                (
                                  {
                                    title,
                                    barcode,
                                    product_type,
                                    availableQuantity,
                                    options,
                                    variant_title,
                                    transferQuantity,
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
                                                value={availableQuantity}
                                                name="availableQuantity"
                                                disabled
                                                onChange={(e) =>
                                                  handleVariationchange(
                                                    index,
                                                    e
                                                  )
                                                }
                                              />
                                            </CCol>
                                          </td>
                                          <td>
                                            <CCol sm="8" className="ml-1">
                                              <CInput
                                                value={transferQuantity}
                                                name="transferQuantity"
                                                innerRef={addToRef}
                                                onBlur={(e) =>
                                                  handleOnBlur(index, e)
                                                }
                                                onChange={(e) =>
                                                  handleVariationchange(
                                                    index,
                                                    e
                                                  )
                                                }
                                              />
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
                                                value={availableQuantity}
                                                name="availableQuantity"
                                                disabled
                                                onChange={(e) =>
                                                  handleVariationchange(
                                                    index,
                                                    e
                                                  )
                                                }
                                              />
                                            </CCol>
                                          </td>
                                          <td>
                                            <CCol sm="8" className="ml-1">
                                              <CInput
                                                value={transferQuantity}
                                                name="transferQuantity"
                                                innerRef={addToRef}
                                                onBlur={(e) =>
                                                  handleOnBlur(index, e)
                                                }
                                                onChange={(e) =>
                                                  handleVariationchange(
                                                    index,
                                                    e
                                                  )
                                                }
                                              />
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
    </Suspense>
  );
}

export default StockTransferCreate;

// product stock data
//variant id
//product id
// quantity
