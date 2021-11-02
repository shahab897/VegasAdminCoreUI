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

import Loading from "../../../Loading-component/loading-component";
import BrandsDelete from "../Brand-delete/brand-delete.component";
import BrandsEditButton from "../../../catalogue/Brands/Brand-edit/brand-edit-button.component";

const BrandList = (props) => {
  const fields = [
    "title",
    "details",
    "status",
    "discount",
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

  const [data, setData] = useState(undefined);
  const [updated, setUpdated] = useState(undefined);

  const fetch_a = () => {
    const token_vegas =
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiMDBmOTU0Yjc4YjYxOGM5Yjg0OTFkMTkxYmUwMjAzNDdlMzFjODQ0NmQ5ZTY4OTRiOTkwZDdiMTQ1MmQ3ZWFiOGE0YTFjNDc0NjFjZjY5NjEiLCJpYXQiOjE2MjQ5NTc4NjUuMDk2ODk3LCJuYmYiOjE2MjQ5NTc4NjUuMDk2OTAzLCJleHAiOjE2NTY0OTM4NjUuMDg5NzA3LCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.OHSKmTqWfrPeYCo4tqGbgysoaLCXTctWhNMyxgzp74F3kAcS8bA2ii1t3A_r-auP3ZrHZ-zInuuHce_7ftwvS4bZpM3Xt2eDx6x1zttXo3CSh4ZBEXYR4NZjE2ijZCupgUlAniUIV6ynv2HVnz5Li2qrcltu5kpUwPh2ZI1rPNbezVpFL5qtc_l10jasAZSJP27Lt7UB8LU2WnZBGkpyQne7sbIgHLBTr2ajU_GgzHwf0kg2j2ZdNK6I5_NH1G1CfjMpilB6hy9Ahec1pPyrsc55_POfOuD0phOz1A9nT5P5-nAx7PECv0yvs7OD-CQRnNgjPblMMna87Vz-msXRxAZvsXa5Qtg7DPODyj7iUtLLw34YXftKPqoaRUwQzp6b6k1tMritCvKopo7CzbApNHb6bRex0BbiHJOZnju1NFj7hwoT3IhVzTIG6SdDpaboDNPqyhD5ZOznOYoUo84jlXoI8Pz5CCGuKSdx--tpRwJYzdUz7FTxFcLsekL_9YZB0pbODMGkw4VClBduR0gfsbFykBJ9z2RRgurANFSUvyRt-kDZaWX6ZwFopjkBCY9I3vCORvjRJ1X733WS4uBKUGyamzMHuMgEV5w44oPg_sbQhJL7UtCKgwPMJr8e3O4LjT7EhcrcmfVE6v3rhbO9LhAJHWJAvWc9G2P5ckQZagM";

    const config = {
      headers: { Authorization: `Bearer ${token_vegas}` },
    };
    axios
      .get("https://vegasapi.phebsoft-team.com/api/brands", config)
      .then((response) => {
        setData(response.data.data);
        console.log(response, data, "hogaya hai");
      })
      .catch(console.log);
  };

  useEffect(() => {
    fetch_a();
    console.log(props);
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
        <Link to="/catalogue/brands/create">
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
              <CCardHeader>Product Brands</CCardHeader>
              <CCardBody>
                <CDataTable
                  items={data}
                  fields={fields}
                  hover
                  sorter
                  tableFilter
                  columnFilter
                  striped
                  bordered
                  size="sm"
                  itemsPerPage={10}
                  pagination
                  scopedSlots={{
                    delete: (item) => {
                      return (
                        <BrandsDelete id={item.id} setUpdated={setUpdated} />
                      );
                    },
                    edit: (item) => {
                      return <BrandsEditButton id={item.id} />;
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
};

export default BrandList;
