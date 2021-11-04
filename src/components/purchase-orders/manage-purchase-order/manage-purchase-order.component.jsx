import React, { useEffect, useState } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
} from "@coreui/react";
import axios from "axios";
import { Link } from "react-router-dom";

import Loading from "../../Loading-component/loading-component";
import ManagePODelete from "../manage-purchase-order/manage-purchase-order-delete/manage-purchase-order-delete.component";
import ManagePOEditButton from "./manage-purchase-order-edit/manage-purchase-order-edit-button.component";

function ManagePurchaseOrder() {
  const fields = [
    "purchase_number",
    "brand_name",
    "status",
    {
      key: "edit",
      label: "",
      _style: {
        width: "30px",
      },
      sorter: false,
      filter: false,
    },
    {
      key: "delete",
      label: "",
      _style: {
        width: "30px",
      },
      sorter: false,
      filter: false,
    },
  ];

  // const data = [
  //   {
  //     id: 2,
  //     supplier_id: "2",
  //     purchase_number: "purchase-test111",
  //     no_of_days: 2,
  //     status: "Enabled",
  //     brand_id: "1",
  //     brand_name: "test",
  //   },
  //   {
  //     id: 3,
  //     supplier_id: "2",
  //     brand_name: "test",
  //     purchase_number: "purchase-test111",
  //     no_of_days: 2,
  //     status: "Enabled",
  //     brand_id: "1",
  //   },
  //   {
  //     id: 4,
  //     supplier_id: "2",
  //     brand_name: "test",
  //     purchase_number: "purchase-test111",
  //     no_of_days: 2,
  //     status: "Enabled",
  //     brand_id: "1",
  //   },
  //   {
  //     id: 6,
  //     supplier_id: "2",
  //     brand_name: "test",
  //     purchase_number: "purchase-test111",
  //     no_of_days: 2,
  //     status: "Enabled",
  //     brand_id: "1",
  //   },
  //   {
  //     id: 9,
  //     supplier_id: "2",
  //     brand_name: "test",
  //     purchase_number: "purchase-test111",
  //     no_of_days: 2,
  //     status: "Enabled",
  //     brand_id: "1",
  //   },
  //   {
  //     id: 8,
  //     supplier_id: "2",
  //     brand_name: "test",
  //     purchase_number: "purchase-test111",
  //     no_of_days: 2,
  //     status: "Enabled",
  //     brand_id: "1",
  //   },
  // ];

  const [data, setData] = useState(undefined);
  const [updated, setUpdated] = useState(undefined);

  const fetch_a = () => {
    const token_vegas =
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiMDBmOTU0Yjc4YjYxOGM5Yjg0OTFkMTkxYmUwMjAzNDdlMzFjODQ0NmQ5ZTY4OTRiOTkwZDdiMTQ1MmQ3ZWFiOGE0YTFjNDc0NjFjZjY5NjEiLCJpYXQiOjE2MjQ5NTc4NjUuMDk2ODk3LCJuYmYiOjE2MjQ5NTc4NjUuMDk2OTAzLCJleHAiOjE2NTY0OTM4NjUuMDg5NzA3LCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.OHSKmTqWfrPeYCo4tqGbgysoaLCXTctWhNMyxgzp74F3kAcS8bA2ii1t3A_r-auP3ZrHZ-zInuuHce_7ftwvS4bZpM3Xt2eDx6x1zttXo3CSh4ZBEXYR4NZjE2ijZCupgUlAniUIV6ynv2HVnz5Li2qrcltu5kpUwPh2ZI1rPNbezVpFL5qtc_l10jasAZSJP27Lt7UB8LU2WnZBGkpyQne7sbIgHLBTr2ajU_GgzHwf0kg2j2ZdNK6I5_NH1G1CfjMpilB6hy9Ahec1pPyrsc55_POfOuD0phOz1A9nT5P5-nAx7PECv0yvs7OD-CQRnNgjPblMMna87Vz-msXRxAZvsXa5Qtg7DPODyj7iUtLLw34YXftKPqoaRUwQzp6b6k1tMritCvKopo7CzbApNHb6bRex0BbiHJOZnju1NFj7hwoT3IhVzTIG6SdDpaboDNPqyhD5ZOznOYoUo84jlXoI8Pz5CCGuKSdx--tpRwJYzdUz7FTxFcLsekL_9YZB0pbODMGkw4VClBduR0gfsbFykBJ9z2RRgurANFSUvyRt-kDZaWX6ZwFopjkBCY9I3vCORvjRJ1X733WS4uBKUGyamzMHuMgEV5w44oPg_sbQhJL7UtCKgwPMJr8e3O4LjT7EhcrcmfVE6v3rhbO9LhAJHWJAvWc9G2P5ckQZagM";

    const config = {
      headers: { Authorization: `Bearer ${token_vegas}` },
    };
    axios
      .get("https://vegasapi.phebsoft-team.com/api/purchaseorders", config)
      .then((response) => {
        const poData = response.data.data.map((data) => {
          return {
            id: data.id,
            purchase_number: data.purchase_order_no,
            brand_name: data.brand.title,
            status: data.status,
          };
        });
        setData(poData);
        console.log(response);
      })
      .catch(console.log);
  };

  useEffect(() => {
    fetch_a();
  }, []);

  useEffect(() => {
    if (updated === true) {
      fetch_a();
      setUpdated(false);
    }
  }, [updated]);

  // eslint-disable-next-line eqeqeq
  if (data == undefined) {
    return <Loading />;
  } else {
    return (
      <>
        <Link to="/purchase-order/manage-purchase-order/create">
          <CButton
            style={{
              marginBottom: "20px",
              marginLeft: "5px",
            }}
            size="md"
            color="primary"
          >
            Add
          </CButton>
        </Link>
        <CRow>
          <CCol>
            <CCard>
              <CCardHeader>Purchase Order</CCardHeader>
              <CCardBody>
                <CDataTable
                  items={data}
                  fields={fields}
                  hover
                  striped
                  sorter
                  tableFilter
                  columnFilter
                  bordered
                  size="sm"
                  itemsPerPage={10}
                  pagination
                  scopedSlots={{
                    delete: (item) => {
                      if (item.status === "pending") {
                        return (
                          <ManagePODelete
                            id={item.id}
                            setUpdated={setUpdated}
                          />
                        );
                      } else return <></>;
                    },
                    edit: (item) => {
                      return <ManagePOEditButton id={item.id} />;
                    },
                  }}
                />
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </>
    );
  }
}

export default ManagePurchaseOrder;
