import React, { useState } from "react";
import axios from "axios";
import { CButton, CInput, CLabel, CForm } from "@coreui/react";
import { Redirect } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
  margin-bottom: 20px;
`;

function BrandsCreate() {
  const [brandsName, setBrandsName] = useState(undefined);
  const [brandsDetail, setBrandsDetail] = useState(undefined);
  const [brandsMeta, setBrandsMeta] = useState(undefined);
  const [brandsKeywords, setBrandsKeywords] = useState(undefined);
  const [brandsStatus, setBrandsStatus] = useState(undefined);
  const [brandsViewOrder, setBrandsViewOrder] = useState(undefined);
  const [brandsSlug, setBrandsSlug] = useState(undefined);
  const [brandsFeatured, setBrandsFeatured] = useState(undefined);
  const [brandsDiscount, setBrandsDiscount] = useState(undefined);
  const [brandsFeaturedImage, setBrandsFeaturedImage] = useState(undefined);
  const [redirect, setRedirect] = useState(undefined);

  const token_vegas =
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiMDBmOTU0Yjc4YjYxOGM5Yjg0OTFkMTkxYmUwMjAzNDdlMzFjODQ0NmQ5ZTY4OTRiOTkwZDdiMTQ1MmQ3ZWFiOGE0YTFjNDc0NjFjZjY5NjEiLCJpYXQiOjE2MjQ5NTc4NjUuMDk2ODk3LCJuYmYiOjE2MjQ5NTc4NjUuMDk2OTAzLCJleHAiOjE2NTY0OTM4NjUuMDg5NzA3LCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.OHSKmTqWfrPeYCo4tqGbgysoaLCXTctWhNMyxgzp74F3kAcS8bA2ii1t3A_r-auP3ZrHZ-zInuuHce_7ftwvS4bZpM3Xt2eDx6x1zttXo3CSh4ZBEXYR4NZjE2ijZCupgUlAniUIV6ynv2HVnz5Li2qrcltu5kpUwPh2ZI1rPNbezVpFL5qtc_l10jasAZSJP27Lt7UB8LU2WnZBGkpyQne7sbIgHLBTr2ajU_GgzHwf0kg2j2ZdNK6I5_NH1G1CfjMpilB6hy9Ahec1pPyrsc55_POfOuD0phOz1A9nT5P5-nAx7PECv0yvs7OD-CQRnNgjPblMMna87Vz-msXRxAZvsXa5Qtg7DPODyj7iUtLLw34YXftKPqoaRUwQzp6b6k1tMritCvKopo7CzbApNHb6bRex0BbiHJOZnju1NFj7hwoT3IhVzTIG6SdDpaboDNPqyhD5ZOznOYoUo84jlXoI8Pz5CCGuKSdx--tpRwJYzdUz7FTxFcLsekL_9YZB0pbODMGkw4VClBduR0gfsbFykBJ9z2RRgurANFSUvyRt-kDZaWX6ZwFopjkBCY9I3vCORvjRJ1X733WS4uBKUGyamzMHuMgEV5w44oPg_sbQhJL7UtCKgwPMJr8e3O4LjT7EhcrcmfVE6v3rhbO9LhAJHWJAvWc9G2P5ckQZagM";

  const handleAdd = () => {
    let BrandsData = {
      title: brandsName,
      details: brandsDetail,
      meta_description: brandsMeta,
      keywords: brandsKeywords,
      status: brandsStatus,
      view_order: brandsViewOrder,
      brand_slug: brandsSlug,
      discount: brandsDiscount,
      featured: brandsFeatured,
      featuredimage: brandsFeaturedImage,
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
        "https://vegasapi.phebsoft-team.com/api/brands",
        BrandsData,
        axiosConfig
      )
      .then((result) => {
        console.log(result);
        setRedirect(true);
      })
      .catch((error) => console.log("error", error));
  };

  if (redirect === true) {
    return <Redirect to="/catalogue/brands" />;
  }

  return (
    <Wrapper>
      <CForm>
        <div className="mb-3">
          <CLabel htmlFor="BrandsName">Title</CLabel>
          <CInput
            type="text"
            id="BrandsName"
            onChange={(e) => setBrandsName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <CLabel htmlFor="BrandsDetail">Detail</CLabel>
          <CInput
            type="text"
            id="BrandsDetail"
            onChange={(e) => setBrandsDetail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <CLabel htmlFor="BrandsMeta">Meta Description</CLabel>
          <CInput
            type="text"
            id="BrandsMeta"
            onChange={(e) => setBrandsMeta(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <CLabel htmlFor="BrandsKeywords">Keywords</CLabel>
          <CInput
            type="text"
            id="BrandsKeywords"
            onChange={(e) => setBrandsKeywords(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <CLabel htmlFor="BrandsStatus">Status</CLabel>
          <CInput
            type="text"
            id="BrandsStatus"
            onChange={(e) => setBrandsStatus(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <CLabel htmlFor="BrandsViewOrder">View Order</CLabel>
          <CInput
            type="text"
            id="BrandsViewOrder"
            onChange={(e) => setBrandsViewOrder(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <CLabel htmlFor="BrandsSlug">Slug</CLabel>
          <CInput
            type="text"
            id="BrandsSlug"
            onChange={(e) => setBrandsSlug(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <CLabel htmlFor="BrandsFeatured">Featured</CLabel>
          <CInput
            type="text"
            id="BrandsFeatured"
            onChange={(e) => setBrandsFeatured(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <CLabel htmlFor="BrandsFeaturedImage">Featured Image</CLabel>
          <CInput
            type="text"
            id="BrandsFeaturedImage"
            onChange={(e) => setBrandsFeaturedImage(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <CLabel htmlFor="BrandsSlug">Discount</CLabel>
          <CInput
            type="text"
            id="BrandsSlug"
            onChange={(e) => setBrandsDiscount(e.target.value)}
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

export default BrandsCreate;
