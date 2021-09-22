import React, { useState, useEffect } from "react";
import axios from "axios";
import { CButton, CInput, CLabel, CForm } from "@coreui/react";
import { Redirect } from "react-router-dom";
import Loading from "../../../Loading-component/loading-component";
import DropDownCore from "src/components/Dropdown/dropdown.component";
import styled from "styled-components";

const Wrapper = styled.div`
  margin-bottom: 20px;
`;

function CategoriesCreate() {
  const [categoryName, setCategoryName] = useState(undefined);
  const [categoryDetail, setCategoryDetail] = useState(undefined);
  const [categoryMeta, setCategoryMeta] = useState(undefined);
  const [categoryKeywords, setCategoryKeywords] = useState(undefined);
  const [categoryStatus, setCategoryStatus] = useState(undefined);
  const [categoryViewOrder, setCategoryViewOrder] = useState(undefined);
  const [categorySlug, setCategorySlug] = useState(undefined);
  const [categoryParentId, setCategoryParentId] = useState(undefined);
  const [categoryList, setCategoryList] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [redirect, setRedirect] = useState(undefined);

  const token_vegas =
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiMDBmOTU0Yjc4YjYxOGM5Yjg0OTFkMTkxYmUwMjAzNDdlMzFjODQ0NmQ5ZTY4OTRiOTkwZDdiMTQ1MmQ3ZWFiOGE0YTFjNDc0NjFjZjY5NjEiLCJpYXQiOjE2MjQ5NTc4NjUuMDk2ODk3LCJuYmYiOjE2MjQ5NTc4NjUuMDk2OTAzLCJleHAiOjE2NTY0OTM4NjUuMDg5NzA3LCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.OHSKmTqWfrPeYCo4tqGbgysoaLCXTctWhNMyxgzp74F3kAcS8bA2ii1t3A_r-auP3ZrHZ-zInuuHce_7ftwvS4bZpM3Xt2eDx6x1zttXo3CSh4ZBEXYR4NZjE2ijZCupgUlAniUIV6ynv2HVnz5Li2qrcltu5kpUwPh2ZI1rPNbezVpFL5qtc_l10jasAZSJP27Lt7UB8LU2WnZBGkpyQne7sbIgHLBTr2ajU_GgzHwf0kg2j2ZdNK6I5_NH1G1CfjMpilB6hy9Ahec1pPyrsc55_POfOuD0phOz1A9nT5P5-nAx7PECv0yvs7OD-CQRnNgjPblMMna87Vz-msXRxAZvsXa5Qtg7DPODyj7iUtLLw34YXftKPqoaRUwQzp6b6k1tMritCvKopo7CzbApNHb6bRex0BbiHJOZnju1NFj7hwoT3IhVzTIG6SdDpaboDNPqyhD5ZOznOYoUo84jlXoI8Pz5CCGuKSdx--tpRwJYzdUz7FTxFcLsekL_9YZB0pbODMGkw4VClBduR0gfsbFykBJ9z2RRgurANFSUvyRt-kDZaWX6ZwFopjkBCY9I3vCORvjRJ1X733WS4uBKUGyamzMHuMgEV5w44oPg_sbQhJL7UtCKgwPMJr8e3O4LjT7EhcrcmfVE6v3rhbO9LhAJHWJAvWc9G2P5ckQZagM";

  const fetch_a = () => {
    const config = {
      headers: { Authorization: `Bearer ${token_vegas}` },
    };
    axios
      .get("https://vegasapi.phebsoft-team.com/api/categories", config)
      .then((response) => {
        const cat = response.data.data.map((item) => {
          return { value: item.id, label: item.title };
        });
        setCategoryList(cat);
        setIsLoading(false);
      })
      .catch(console.log);
  };

  useEffect(() => {
    fetch_a();
    console.log(categoryList);
  }, []);

  const handleAdd = () => {
    if (categoryParentId == undefined) return;

    let catergoryData = {
      title: categoryName,
      details: categoryDetail,
      meta_description: categoryMeta,
      keywords: categoryKeywords,
      status: categoryStatus,
      view_order: categoryViewOrder,
      cat_slug: categorySlug,
      parent_id: categoryParentId,
    };

    let axiosConfig = {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${token_vegas}`,
      },
    };

    axios
      .post(
        "https://vegasapi.phebsoft-team.com/api/categories",
        catergoryData,
        axiosConfig
      )
      .then((result) => {
        console.log(result);
        setRedirect(true);
      })
      .catch((error) => console.log("error", error));
  };

  if (isLoading === true) return <Loading />;

  if (redirect === true) {
    return <Redirect to="/catalogue/categories" />;
  }

  return (
    <Wrapper>
      <CForm>
        <DropDownCore
          options={categoryList}
          setCategoryParentId={setCategoryParentId}
        />
        <div className="mb-3">
          <CLabel htmlFor="CategoryName">Title</CLabel>
          <CInput
            type="text"
            id="CategoryName"
            aria-describedby="category-name"
            onChange={(e) => setCategoryName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <CLabel htmlFor="CategoryDetail">Detail</CLabel>
          <CInput
            type="text"
            id="CategoryDetail"
            aria-describedby="category-detail"
            onChange={(e) => setCategoryDetail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <CLabel htmlFor="CategoryLocation">Meta Description</CLabel>
          <CInput
            type="text"
            id="CategoryMeta"
            aria-describedby="category-meta"
            onChange={(e) => setCategoryMeta(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <CLabel htmlFor="CategoryKeywords">Keywords</CLabel>
          <CInput
            type="text"
            id="CategoryKeywords"
            aria-describedby="category-keywords"
            onChange={(e) => setCategoryKeywords(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <CLabel htmlFor="CategoryStatus">Status</CLabel>
          <CInput
            type="text"
            id="CategoryStatus"
            aria-describedby="category-Status"
            onChange={(e) => setCategoryStatus(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <CLabel htmlFor="CategoryViewOrder">View Order</CLabel>
          <CInput
            type="text"
            id="CategoryViewOrder"
            aria-describedby="category-view-order"
            onChange={(e) => setCategoryViewOrder(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <CLabel htmlFor="CategorySlug">Slug</CLabel>
          <CInput
            type="text"
            id="CategorySlug"
            aria-describedby="category-slug"
            onChange={(e) => setCategorySlug(e.target.value)}
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
    </Wrapper>
  );
}

export default CategoriesCreate;
