import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
  CButton,
  CInput,
  CLabel,
  CForm,
  CRow,
  CCol,
  CCardHeader,
  CCardBody,
  CCard,
} from "@coreui/react";
import { Redirect, useLocation } from "react-router";
import Loading from "../../../Loading-component/loading-component";
import { DatePickerComponent } from "@syncfusion/ej2-react-calendars";
import { CSVLink } from "react-csv";

//add total cost and amount underneath
function ManagePOEdit() {
  const [supplier, setSupplier] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [supplierId, setSupplierId] = useState(undefined);
  const [products, setProducts] = useState([]);
  const [brand, setBrand] = useState(undefined);
  const [brandId, setBrandId] = useState(undefined);
  const [warehouse, setWarehouse] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("");
  const [dateValue, setDateValue] = useState(new Date());
  const [recievedQtyError, setRecievedQtyError] = useState(false);
  const [queryData, setQueryData] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [data, setData] = useState([]);
  const [totalPrice, setTotalPrice] = useState([]);
  const [totalQuantity, setTotalQuantity] = useState([]);
  const [totalRecievedQty, setTotalRecievedQty] = useState("");

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
    console.log(date);
  }, [date]);

  const { pathname } = useLocation();
  const id = pathname.slice(pathname.search("edit/") + 5);

  const handleVariationchange = (index, e) => {
    let newFormValues = [...products];
    newFormValues[index][e.target.name] = e.target.value;
    setProducts(newFormValues);

    console.log(products, "products");
  };

  const [redirect, setRedirect] = useState(undefined);

  const fetch_a = () => {
    axios
      .get(
        `http://vegasapi.phebsoft-team.com/api/purchaseorders/${id}/edit`,
        axiosConfig
      )
      .then((result) => {
        console.log(result);
        const { warehouse_id } = result.data.data.purchaseOrder;
        setQueryData(result.data.data);
        setSupplier(result.data.data.supplier.name);
        setDate(result.data.data.purchaseOrder.purchase_order_date);
        setBrand(result.data.data.brand.title);
        setStatus(result.data.data.purchaseOrder.status);
        setBrandId(result.data.data.purchaseOrder.brand_id);
        setSupplierId(result.data.data.purchaseOrder.supplier_id);
        const findWarehouse = result.data.data.warehouses.find(
          ({ id }) => id === warehouse_id
        );
        console.log(findWarehouse, " hello warehouses");
        setWarehouse(findWarehouse);
        const prod = result.data.data.purchaseOrder.po_products.map((item) => {
          if (item.product_type === "configurable") {
            return {
              title: item.title,
              barcode: item.barcode,
              options: item.options,
              cost: item.cost,
              product_id: item.product_id,
              product_type: item.product_type,
              product_variation_ids: item.product_variation_ids,
              id: item.id,
              variant_title: item.variant_title,
              variant_id: item.variant_id,
              quantity: item.qty,
              ...(item.recieved_qty == 0 || item.recieved_qty == null
                ? { recieved_qty: "" }
                : { recieved_qty: item.recieved_qty }),
            };
          } else {
            return {
              title: item.title,
              barcode: item.barcode,
              id: item.id,
              product_type: item.product_type,
              options: [],
              product_id: item.product_id,
              variant_title: item.variant_title,
              quantity: item.qty,
              recieved_qty: item.recieved_qty,
              cost: item.cost,
              ...(item.recieved_qty == 0 || item.recieved_qty == null
                ? { recieved_qty: "" }
                : { recieved_qty: item.recieved_qty }),
            };
          }
        });

        const filterTotal = prod.map(({ cost, quantity }) => totalPrice);
        const filterQuantity = prod.map(({ quantity }) => quantity);
        const reducer = (previous, current) => previous + current;
        const finalQuantity = filterQuantity.reduce(reducer);
        const finalTotal = filterTotal.reduce(reducer);
        setTotalPrice(finalTotal);
        setTotalQuantity(finalQuantity);

        if (prod[0].recieved_qty !== "") {
          const filterRecievedQuantity = prod.map(
            ({ recieved_qty }) => recieved_qty
          );
          const finalRecievedQuantity = filterRecievedQuantity.reduce(reducer);
          setTotalRecievedQty(finalRecievedQuantity);
        }

        setProducts(prod);
        setIsLoading(false);
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    fetch_a();
  }, []);

  const handleAdd = () => {
    let purchaseOrder;
    if (status === "approved") {
      purchaseOrder = {
        supplier_id: supplierId,
        purchase_order_date: dateValue,
        brand_id: brandId,
        status: status,
        products: products,
      };
    } else {
      purchaseOrder = {
        supplier_id: supplier,
        brand_id: brandId,
        warehouse_id: 15,
        status: status,
        products: products,
      };
    }

    console.log(purchaseOrder, "yeh horaha hai send");
    let axiosConfig = {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${token_vegas}`,
      },
    };

    axios
      .put(
        `https://vegasapi.phebsoft-team.com/api/purchaseorders/${id}`,
        purchaseOrder,
        axiosConfig
      )
      .then((result) => {
        console.log(result);
        setRedirect(true);
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    const formatData = () => {
      // this function formats and generates the data for the csv download
      console.log("its arriving here 1");
      let headersData = [];
      let prodData = [];
      const propertyNames = [];
      if (queryData != undefined && queryData.purchaseOrder != undefined) {
        console.log("its arriving here 2");
        const options = queryData.purchaseOrder.po_products.filter(
          (product) => product.options.length > 0
        );
        options.map(({ options }) => {
          options.map(({ options }) => {
            const { name } = options;
            if (!propertyNames.includes(name)) {
              propertyNames.push(name);
            }
          });
        });
        headersData = [
          { label: "Sno.", key: "sNo" },
          { label: "Barcode", key: "barcode" },
          { label: "Product Name", key: "product_title" },
          { label: "Quantity", key: "quantity" },
          ...propertyNames.map((name) => {
            return { label: name, key: name.split(" ").join("_") };
          }),
        ];
        console.log(headersData, "headers dta");
        let count = 1;
        setHeaders(headersData);
        prodData = [
          ...products.map((product) => {
            let normalProperties = {
              sNo: count++,
              barcode: product.barcode,
              product_title: product.title,
              quantity: product.quantity,
            };
            let dynamicProperties = {};
            let prop = [
              ...product.options.map((option) => {
                return {
                  [option.options.name.split(" ").join("_")]: option.value,
                };
              }),
            ];
            for (let i = 0; i < prop.length; i++) {
              dynamicProperties = { ...prop[i], ...dynamicProperties };
            }
            let collectedProps = { ...dynamicProperties, ...normalProperties };
            return collectedProps;
          }),
        ];
        setData(prodData);
        console.log(prodData, "hello did this work");
      }
    };
    console.log("its arriving here", queryData);
    formatData();
  }, [products, queryData]);

  const addToRef = (el) => {
    if (el && !quantityRef.current.includes(el)) {
      quantityRef.current.push(el);
    }
  };

  const handleRecieved = () => {
    const productError = products.map(({ recieved_qty }) => {
      if (recieved_qty === "" || recieved_qty == null) {
        setRecievedQtyError(true);
        return true;
      } else {
        return false;
      }
    });

    for (let i = 0; i < quantityRef.current.length; i++) {
      if (
        quantityRef.current[i].value === 0 ||
        quantityRef.current[i].value == null ||
        quantityRef.current[i].value === ""
      ) {
        quantityRef.current[i].scrollIntoView({
          behavior: "smooth",
          block: "center",
          inline: "nearest",
        });
        console.log("what just happened");
        quantityRef.current[i].style.borderColor = "red";
        break;
      }
    }

    if (productError.includes(true) === false) {
      setRecievedQtyError(false);
    }

    let purchaseOrder;
    if (status === "approved") {
      purchaseOrder = {
        supplier_id: supplierId,
        po_recieve_date: dateValue,
        brand_id: brandId,
        warehouse_id: 15,
        status: status,
        products: products,
      };
    } else {
      purchaseOrder = {
        supplier_id: supplier,
        brand_id: brandId,
        warehouse_id: 15,
        status: status,
        products: products,
      };
    }

    console.log(purchaseOrder, "yeh horaha hai send");
    let axiosConfig = {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${token_vegas}`,
      },
    };

    if (recievedQtyError === true) return;

    axios
      .post(
        `http://vegasapi.phebsoft-team.com/api/stock/receive/${id}`,
        purchaseOrder,
        axiosConfig
      )
      .then((result) => {
        console.log(result);
        setRedirect(true);
      })
      .catch((error) => console.log("error", error));
  };

  const isFilled = (e) => {
    if (e.target.value != null && e.target.value !== "") {
      e.target.style.borderColor = "#d8dbe0";
    }
  };

  if (redirect === true) {
    return <Redirect to="/purchase-order/manage-purchase-order" />;
  }
  if (isLoading === true) return <Loading />;

  return (
    <div>
      <CForm>
        <CSVLink data={data} headers={headers}>
          <CButton color="primary" className="mb-3">
            Download Purchase Order
          </CButton>
        </CSVLink>
        <div className="mb-3">
          <CLabel htmlFor="Warehouse">Warehouse</CLabel>
          <p
            id="Warehouse"
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
          <CLabel htmlFor="Supplier">Supplier</CLabel>
          <p
            id="Supplier"
            style={{
              background: "white",
              padding: "8px",
              borderRadius: "5px",
            }}
          >
            {supplier}
          </p>
        </div>
        <div className="mb-3">
          <CLabel htmlFor="date">Date</CLabel>
          <p
            id="date"
            style={{
              background: "white",
              padding: "8px",
              borderRadius: "5px",
            }}
          >
            {date}
          </p>
        </div>
        <div className="mb-3">
          <CLabel htmlFor="brand">Brand</CLabel>
          <p
            id="brand"
            style={{
              background: "white",
              padding: "8px",
              borderRadius: "5px",
            }}
          >
            {brand}
          </p>
        </div>
        <div className="mb-3">
          <CLabel htmlFor="status">Status</CLabel>
          <p
            id="status"
            style={{
              background: "white",
              padding: "8px",
              borderRadius: "5px",
              textTransform: "uppercase",
            }}
          >
            {status}
          </p>
        </div>
        {status === "approved" && (
          <>
            <CLabel htmlFor="date">Date</CLabel>
            <div
              style={{
                background: "white",
                padding: "8px",
                marginBottom: "18px",
                borderRadius: "5px",
              }}
            >
              <DatePickerComponent
                id="date"
                placeholder="Enter Date"
                value={dateValue}
                format="dd-MMM-yy"
                start="Decade"
                depth="Month"
                onChange={(e) => setDateValue(e.target.value)}
              ></DatePickerComponent>
            </div>
          </>
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
                                <CCol sm="12" className="ml-1">
                                  Title
                                </CCol>
                              </th>
                              <th>
                                <CCol sm="12" className="ml-1">
                                  Variant Title
                                </CCol>
                              </th>
                              <th>
                                <CCol sm="12" className="ml-1">
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
                                  Cost
                                </CCol>
                              </th>
                              <th>
                                <CCol sm="8" className="ml-1">
                                  Total Cost
                                </CCol>
                              </th>
                              <th>
                                <CCol sm="8" className="ml-1">
                                  Recieved Quantity
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
                                  cost,
                                  recieved_qty,
                                  totalPrice,
                                },
                                index
                              ) => {
                                return (
                                  <tr key={index}>
                                    {product_type === "simple" && (
                                      <>
                                        <td>
                                          <CCol sm="12">{title}</CCol>
                                        </td>
                                        <td>
                                          <CCol sm="12">{variant_title}</CCol>
                                        </td>
                                        <td>
                                          <CCol sm="12">{barcode}</CCol>
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
                                              value={cost}
                                              name="amount"
                                              onChange={(e) =>
                                                handleVariationchange(index, e)
                                              }
                                            />
                                          </CCol>
                                        </td>
                                        <td>
                                          <CCol sm="8">{totalPrice}</CCol>
                                        </td>
                                        <td>
                                          <CCol sm="8" className="ml-1">
                                            <CInput
                                              value={recieved_qty}
                                              name="recieved_qty"
                                              className="form-control"
                                              onChange={(e) =>
                                                handleVariationchange(index, e)
                                              }
                                              onBlur={isFilled}
                                              innerRef={addToRef}
                                            />
                                            {recievedQtyError === true &&
                                              (recieved_qty == null ||
                                                recieved_qty === "") && (
                                                <p
                                                  style={{
                                                    color: "red",
                                                    margin: "2px",
                                                    fontSize: "12px",
                                                  }}
                                                >
                                                  Add Recieved Quantities first!
                                                </p>
                                              )}
                                          </CCol>
                                        </td>
                                      </>
                                    )}
                                    {product_type === "configurable" && (
                                      <>
                                        <td>
                                          <CCol sm="12">{title}</CCol>
                                        </td>
                                        <td>
                                          <CCol sm="12">{variant_title}</CCol>
                                        </td>
                                        <td>
                                          <CCol sm="12">{barcode}</CCol>
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
                                              value={cost}
                                              name="amount"
                                              onChange={(e) =>
                                                handleVariationchange(index, e)
                                              }
                                            />
                                          </CCol>
                                        </td>
                                        <td>
                                          <CCol sm="8">{totalPrice}</CCol>
                                        </td>
                                        <td>
                                          <CCol sm="8" className="ml-1">
                                            <CInput
                                              value={recieved_qty}
                                              name="recieved_qty"
                                              innerRef={addToRef}
                                              className="form-control"
                                              onBlur={isFilled}
                                              onChange={(e) =>
                                                handleVariationchange(index, e)
                                              }
                                            />
                                            {recievedQtyError === true &&
                                              (recieved_qty == null ||
                                                recieved_qty === "") && (
                                                <p
                                                  style={{
                                                    color: "red",
                                                    margin: "2px",
                                                    fontSize: "12px",
                                                  }}
                                                >
                                                  Add Recieved Quantities first!
                                                </p>
                                              )}
                                          </CCol>
                                        </td>
                                      </>
                                    )}
                                  </tr>
                                );
                              }
                            )}
                            <tr>
                              <td colSpan={4}></td>
                              <td colSpan={2}>
                                Total Quantity: <strong>{totalQuantity}</strong>
                              </td>
                              <td colSpan={1}>
                                Total Cost: <strong>{totalPrice}</strong> PKR
                              </td>
                              {status === "Received" && (
                                <td>
                                  Total Recieved Quantity:{" "}
                                  <strong>{totalRecievedQty}</strong>
                                </td>
                              )}
                              {status !== "Received" && <td></td>}
                            </tr>
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
        <div style={{ marginBottom: "15px" }}>
          {status !== "Received" && (
            <>
              <CButton
                color="primary"
                style={{ margin: "0 15px" }}
                onClick={handleRecieved}
              >
                Recieved
              </CButton>
              <CButton color="primary" onClick={handleAdd}>
                Edit
              </CButton>
            </>
          )}
          <CButton
            color="danger"
            variant="outline"
            style={{ marginLeft: "15px" }}
            onClick={() => {
              setRedirect(true);
            }}
          >
            Back
          </CButton>
        </div>
      </CForm>
    </div>
  );
}

export default ManagePOEdit;
