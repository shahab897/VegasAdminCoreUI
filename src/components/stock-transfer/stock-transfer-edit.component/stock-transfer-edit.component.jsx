import React, { useState, useEffect, useRef } from "react";
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
import { Redirect, useLocation } from "react-router";
import LoadingComponent from "../../Loading-component/loading-component";

function StockTransferEdit() {
  const [transferType, setTransferType] = useState("");
  const [transferred, setTransferred] = useState(false);
  const [store, setStore] = useState("");
  const [warehouse, setWarehouse] = useState("");
  const [data, setData] = useState(undefined);
  const [stockProducts, setStockProducts] = useState([]);
  const [redirect, setRedirect] = useState(undefined);

  const quantityRef = useRef([]);
  quantityRef.current = [];

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

  // useEffect(() => {
  //   if (warehouseId !== "" && warehouseId != undefined) {
  //     let assosStores = [];
  //     warehouseId.stores.map((store) => {
  //       data.stores.map((selStore) => {
  //         if (selStore.id === store.store_id) {
  //           assosStores.push({ value: selStore.id, label: selStore.name });
  //         }
  //       });
  //     });
  //     setStores(assosStores);
  //   }
  // }, [warehouseId]);

  const handleOnBlur = (index, e) => {
    if (
      stockProducts[index].transferQuantity <=
      stockProducts[index].availableQuantity
    ) {
      e.target.style.borderColor = "#d8dbe0";
    }
  };

  const addToRef = (el) => {
    if (el && !quantityRef.current.includes(el)) {
      quantityRef.current.push(el);
    }
  };

  const handleVariationchange = (index, e) => {
    if (data.transfer.status !== "pending" || transferred) {
      return;
    }
    let newFormValues = [...stockProducts];
    if (e.target.value > newFormValues[index].availableQuantity) {
      e.target.style.borderColor = "red";
      return;
    }
    e.target.style.borderColor = "#d8dbe0";
    newFormValues[index][e.target.name] = e.target.value;

    setStockProducts(newFormValues);
  };

  useEffect(() => {
    console.log(transferType, "transfer ki type");
  }, [transferType]);

  const fetch_a = () => {
    axios
      .get(
        `https://vegasapi.phebsoft-team.com/api/stocktransfers/${id}/edit`,
        axiosConfig
      )
      .then((result) => {
        console.log("stock transfer result", result.data.data);
        setData(result.data.data);
        const { transfer_type, from_id, to_id, stock_products } =
          result.data.data.transfer;
        const { stores, warehouses } = result.data.data;
        if (transfer_type === "1") {
          setTransferType({ transfer_type, name: "Warehouse To Store" });
          const warehouse = warehouses.find(({ id }) => id === from_id);
          setWarehouse(warehouse);
          const store = stores.find(({ id }) => id === to_id);
          setStore(store);
        }
        const prod = stock_products
          .map((item) => {
            if (item.options.length > 0) {
              return {
                title: item.title,
                barcode: item.barcode,
                options: item.options,
                variant_id: item.variant_id,
                product_id: item.product_id,
                product_type: "configurable",
                variant_title: item.variant_title,
                availableQuantity: item.availableqty,
                transferQuantity: item.quantity,
                id: item.id,
              };
            } else {
              return {
                title: item.title,
                barcode: item.barcode,
                product_id: item.product_id,
                options: "",
                product_type: "simple",
                variant_title: item.title,
                availableQuantity: item.availableqty,
                transferQuantity: item.quantity,
                id: item.id,
              };
            }
          })
          .flat();
        console.log(prod, "meri mehnat");
        setStockProducts(prod);
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    fetch_a();
  }, []);

  useEffect(() => {
    console.log(stockProducts, " stock produdcts ");
  }, [stockProducts]);

  const handleTransfer = () => {
    if (data.transfer.status !== "pending") {
      return;
    }
    const isFilled = stockProducts.map((prod) => {
      if (prod.transferQuantity === "" || prod.transferQuantity == false) {
        return false;
      } else {
        return true;
      }
    });
    if (isFilled.includes(false)) {
      return;
    }
    let productStockData = {
      transfer_type: transferType.transfer_type,
      from_id: data.transfer.from_id,
      to_id: data.transfer.to_id,
      brand_id: data.transfer.brand_id,
      products: stockProducts,
    };

    console.log(productStockData, "stock transfer send data");

    axios
      .post(
        `https://vegasapi.phebsoft-team.com/api/stock/transfer/${id}`,
        productStockData,
        axiosConfig
      )
      .then((result) => {
        console.log(result);
        setTransferred(true);
      })
      .catch((error) => console.log("error", error));
  };

  const handleAdd = () => {
    let productStockData = {
      transfer_type: transferType.transfer_type,
      from_id: data.transfer.from_id,
      to_id: data.transfer.to_id,
      brand_id: data.transfer.brand_id,
      products: stockProducts,
    };

    axios
      .put(
        `https://vegasapi.phebsoft-team.com/api/stocktransfers/${id}`,
        productStockData,
        axiosConfig
      )
      .then((result) => {
        console.log(result);
        setRedirect(true);
      })
      .catch((error) => console.log("error", error));
  };

  if (data === undefined) return <LoadingComponent />;

  if (redirect === true) {
    return <Redirect to="/stock-transfer" />;
  }
  // po id, product id
  return (
    <div>
      <CForm>
        <div className="mb-3">
          <CLabel htmlFor="Supplier">Transfer Type</CLabel>
          <p
            id="Supplier"
            style={{
              background: "white",
              padding: "8px",
              borderRadius: "5px",
            }}
          >
            {transferType.name}
          </p>
        </div>
        <div className="mb-3">
          <CLabel htmlFor="Brand">Brand</CLabel>
          <p
            id="Brand"
            style={{
              background: "white",
              padding: "8px",
              borderRadius: "5px",
            }}
          >
            {data.brand.title}
          </p>
        </div>
        {transferType.transfer_type === "1" && (
          <>
            <div className="mb-3">
              <CLabel htmlFor="From">From</CLabel>
              <p
                id="From"
                style={{
                  background: "white",
                  padding: "8px",
                  borderRadius: "5px",
                }}
              >
                {warehouse.name}
              </p>
            </div>
            <div className="mb-3">
              <CLabel htmlFor="To">To</CLabel>
              <p
                id="To"
                style={{
                  background: "white",
                  padding: "8px",
                  borderRadius: "5px",
                }}
              >
                {store.name}
              </p>
            </div>
          </>
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
                                  availableQuantity,
                                  options,
                                  variant_title,
                                  transferQuantity,
                                },
                                index
                              ) => {
                                return (
                                  <tr key={index}>
                                    {options.length === 0 && (
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
                                            />
                                          </CCol>
                                        </td>
                                        <td>
                                          <CCol sm="8" className="ml-1">
                                            <CInput
                                              value={transferQuantity}
                                              name="transferQuantity"
                                              innerRef={addToRef}
                                              disabled={
                                                data.transfer.status !==
                                                  "pending" || transferred
                                              }
                                              onBlur={(e) =>
                                                handleOnBlur(index, e)
                                              }
                                              onChange={(e) =>
                                                handleVariationchange(index, e)
                                              }
                                            />
                                          </CCol>
                                        </td>
                                      </>
                                    )}
                                    {options.length > 0 && (
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
                                            />
                                          </CCol>
                                        </td>
                                        <td>
                                          <CCol sm="8" className="ml-1">
                                            <CInput
                                              value={transferQuantity}
                                              name="transferQuantity"
                                              innerRef={addToRef}
                                              disabled={
                                                data.transfer.status !==
                                                  "pending" || transferred
                                              }
                                              onBlur={(e) =>
                                                handleOnBlur(index, e)
                                              }
                                              onChange={(e) =>
                                                handleVariationchange(index, e)
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
              {data.transfer.status !== "Transferred" && (
                <CButton
                  color="primary"
                  className="mb-3"
                  onClick={handleTransfer}
                >
                  Transfer
                </CButton>
              )}
              {transferred && (
                <CAlert fade color="info" className="mb-3">
                  Stock transferred successfully!
                </CAlert>
              )}
            </div>
          )}
        </div>
        {data.transfer.status !== "Transferred" && (
          <CButton color="primary" onClick={handleAdd}>
            Add
          </CButton>
        )}
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

export default StockTransferEdit;
