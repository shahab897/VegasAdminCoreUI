import React, { useEffect, useState } from "react";
import { CButton, CInput, CLabel, CForm } from "@coreui/react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import { useLocation } from "react-router";
import Loading from "../../../Loading-component/loading-component";
import styled from "styled-components";

const Wrapper = styled.div`
  margin-bottom: 20px;
`;

function BrandsEdit(props) {
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
  const [isLoading, setIsLoading] = useState(true);
  const [redirect, setRedirect] = useState(undefined);
  const [data, setData] = useState(undefined);

  //using location pathname to find the id for Brands, this needs to be changed to one of the built-in methdos from react-router-dom
  const { pathname } = useLocation();
  const id = pathname.slice(pathname.search("edit/") + 5);

  const token_vegas =
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiMDBmOTU0Yjc4YjYxOGM5Yjg0OTFkMTkxYmUwMjAzNDdlMzFjODQ0NmQ5ZTY4OTRiOTkwZDdiMTQ1MmQ3ZWFiOGE0YTFjNDc0NjFjZjY5NjEiLCJpYXQiOjE2MjQ5NTc4NjUuMDk2ODk3LCJuYmYiOjE2MjQ5NTc4NjUuMDk2OTAzLCJleHAiOjE2NTY0OTM4NjUuMDg5NzA3LCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.OHSKmTqWfrPeYCo4tqGbgysoaLCXTctWhNMyxgzp74F3kAcS8bA2ii1t3A_r-auP3ZrHZ-zInuuHce_7ftwvS4bZpM3Xt2eDx6x1zttXo3CSh4ZBEXYR4NZjE2ijZCupgUlAniUIV6ynv2HVnz5Li2qrcltu5kpUwPh2ZI1rPNbezVpFL5qtc_l10jasAZSJP27Lt7UB8LU2WnZBGkpyQne7sbIgHLBTr2ajU_GgzHwf0kg2j2ZdNK6I5_NH1G1CfjMpilB6hy9Ahec1pPyrsc55_POfOuD0phOz1A9nT5P5-nAx7PECv0yvs7OD-CQRnNgjPblMMna87Vz-msXRxAZvsXa5Qtg7DPODyj7iUtLLw34YXftKPqoaRUwQzp6b6k1tMritCvKopo7CzbApNHb6bRex0BbiHJOZnju1NFj7hwoT3IhVzTIG6SdDpaboDNPqyhD5ZOznOYoUo84jlXoI8Pz5CCGuKSdx--tpRwJYzdUz7FTxFcLsekL_9YZB0pbODMGkw4VClBduR0gfsbFykBJ9z2RRgurANFSUvyRt-kDZaWX6ZwFopjkBCY9I3vCORvjRJ1X733WS4uBKUGyamzMHuMgEV5w44oPg_sbQhJL7UtCKgwPMJr8e3O4LjT7EhcrcmfVE6v3rhbO9LhAJHWJAvWc9G2P5ckQZagM";

  const fetch_a = () => {
    const config = {
      headers: { Authorization: `Bearer ${token_vegas}` },
    };
    axios
      .get(`https://vegasapi.phebsoft-team.com/api/brands/${id}`, config)
      .then((response) => {
        setData(response.data.data);
        console.log(response);
      })
      .catch(console.log);
  };
  useEffect(() => {
    fetch_a();
  }, []);

  useEffect(() => {
    if (data !== undefined) {
      setIsLoading(false);
    }
  }, [data]);

  useEffect(() => {
    if (brandsName == undefined || brandsName === "") {
      if (data != undefined) setBrandsName(data.title);
    }
    if (brandsDetail == undefined || brandsDetail === "") {
      if (data != undefined) setBrandsDetail(data.details);
    }
    if (brandsMeta == undefined || brandsMeta === "") {
      if (data != undefined) setBrandsMeta(data.meta_description);
    }
    if (brandsKeywords == undefined || brandsKeywords === "") {
      if (data != undefined) setBrandsKeywords(data.keywords);
    }
    if (brandsStatus == undefined || brandsStatus === "") {
      if (data != undefined) setBrandsStatus(data.status);
    }
    if (brandsViewOrder == undefined || brandsViewOrder === "") {
      if (data != undefined) setBrandsViewOrder(data.view_order);
    }
    if (brandsSlug == undefined || brandsSlug === "") {
      if (data != undefined) setBrandsSlug(data.brand_slug);
    }
    if (brandsFeatured == undefined || brandsFeatured === "") {
      if (data != undefined) setBrandsFeatured(data.featured);
    }
    if (brandsFeaturedImage == undefined || brandsFeaturedImage === "") {
      if (data != undefined) setBrandsFeaturedImage(data.featuredimage);
    }
    if (brandsDiscount == undefined || brandsDiscount === "") {
      if (data != undefined) setBrandsDiscount(data.discount);
    }
  }, [
    brandsDetail,
    brandsDiscount,
    brandsFeatured,
    brandsFeaturedImage,
    brandsKeywords,
    brandsMeta,
    brandsName,
    brandsSlug,
    brandsStatus,
    brandsViewOrder,
    data,
  ]);

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
      .put(
        `https://vegasapi.phebsoft-team.com/api/brands/${id}`,
        BrandsData,
        axiosConfig
      )
      .then((result) => {
        console.log(result);
        setRedirect(true);
      })
      .catch((error) => console.log("error", error));
  };

  if (isLoading) {
    return <Loading />;
  }

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
            aria-describedby="brands-name"
            defaultValue={data.title}
            onChange={(e) => setBrandsName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <CLabel htmlFor="BrandsDetail">Detail</CLabel>
          <CInput
            type="text"
            id="BrandsDetail"
            aria-describedby="brands-detail"
            defaultValue={data.details}
            onChange={(e) => setBrandsDetail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <CLabel htmlFor="BrandsLocation">Meta Description</CLabel>
          <CInput
            type="text"
            id="BrandsMeta"
            aria-describedby="brands-meta"
            defaultValue={data.meta_description}
            onChange={(e) => setBrandsMeta(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <CLabel htmlFor="BrandsKeywords">Keywords</CLabel>
          <CInput
            type="text"
            id="BrandsKeywords"
            aria-describedby="brands-keywords"
            defaultValue={data.keywords}
            onChange={(e) => setBrandsKeywords(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <CLabel htmlFor="BrandsStatus">Status</CLabel>
          <CInput
            type="text"
            id="BrandsStatus"
            aria-describedby="brands-Status"
            defaultValue={data.status}
            onChange={(e) => setBrandsStatus(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <CLabel htmlFor="BrandsViewOrder">View Order</CLabel>
          <CInput
            type="text"
            id="BrandsViewOrder"
            aria-describedby="brands-view-order"
            defaultValue={data.view_order}
            onChange={(e) => setBrandsViewOrder(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <CLabel htmlFor="BrandsSlug">Slug</CLabel>
          <CInput
            type="text"
            id="BrandsSlug"
            defaultValue={data.brand_slug}
            onChange={(e) => setBrandsSlug(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <CLabel htmlFor="BrandsFeatured">Featured</CLabel>
          <CInput
            type="text"
            id="BrandsFeatured"
            defaultValue={data.featured}
            onChange={(e) => setBrandsFeatured(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <CLabel htmlFor="BrandsFeaturedImage">Featured Image</CLabel>
          <CInput
            type="text"
            id="BrandsFeaturedImage"
            defaultValue={data.featuredimage}
            onChange={(e) => setBrandsFeaturedImage(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <CLabel htmlFor="BrandsSlug">Discount</CLabel>
          <CInput
            type="text"
            id="BrandsSlug"
            defaultValue={data.discount}
            onChange={(e) => setBrandsDiscount(e.target.value)}
          />
        </div>
        <CButton color="primary" onClick={handleAdd}>
          Save
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

export default BrandsEdit;
