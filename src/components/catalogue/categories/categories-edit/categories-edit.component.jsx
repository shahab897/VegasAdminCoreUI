import React, { useEffect, useState } from "react";
import { CButton, CInput, CLabel, CForm } from "@coreui/react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import { useLocation } from "react-router";
import DropDownCore from "../../../Dropdown/dropdown.component";
import KeywordsTagsComponent from "../../../Keywords-tag.component/keywords-tag-component";
import StatusDropDown from "../../../Dropdown/status-dropdown.component";
import Loading from "../../../Loading-component/loading-component";

function CategoriesEdit(props) {
  const [categoryName, setCategoryName] = useState(undefined);
  const [categoryDetail, setCategoryDetail] = useState(undefined);
  const [categoryMeta, setCategoryMeta] = useState(undefined);
  const [tags, setTags] = useState([]);
  const [status, setStatus] = useState(undefined);
  const [categoryParentId, setCategoryParentId] = useState(undefined);
  const [categoryViewOrder, setCategoryViewOrder] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [categoryList, setCategoryList] = useState(undefined);
  const [redirect, setRedirect] = useState(undefined);
  const [data, setData] = useState(undefined);

  //using location pathname to find the id for Category, this needs to be changed to one of the built-in methdos from react-router-dom
  const { pathname } = useLocation();
  const id = pathname.slice(pathname.search("edit/") + 5);

  const token_vegas =
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiMDBmOTU0Yjc4YjYxOGM5Yjg0OTFkMTkxYmUwMjAzNDdlMzFjODQ0NmQ5ZTY4OTRiOTkwZDdiMTQ1MmQ3ZWFiOGE0YTFjNDc0NjFjZjY5NjEiLCJpYXQiOjE2MjQ5NTc4NjUuMDk2ODk3LCJuYmYiOjE2MjQ5NTc4NjUuMDk2OTAzLCJleHAiOjE2NTY0OTM4NjUuMDg5NzA3LCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.OHSKmTqWfrPeYCo4tqGbgysoaLCXTctWhNMyxgzp74F3kAcS8bA2ii1t3A_r-auP3ZrHZ-zInuuHce_7ftwvS4bZpM3Xt2eDx6x1zttXo3CSh4ZBEXYR4NZjE2ijZCupgUlAniUIV6ynv2HVnz5Li2qrcltu5kpUwPh2ZI1rPNbezVpFL5qtc_l10jasAZSJP27Lt7UB8LU2WnZBGkpyQne7sbIgHLBTr2ajU_GgzHwf0kg2j2ZdNK6I5_NH1G1CfjMpilB6hy9Ahec1pPyrsc55_POfOuD0phOz1A9nT5P5-nAx7PECv0yvs7OD-CQRnNgjPblMMna87Vz-msXRxAZvsXa5Qtg7DPODyj7iUtLLw34YXftKPqoaRUwQzp6b6k1tMritCvKopo7CzbApNHb6bRex0BbiHJOZnju1NFj7hwoT3IhVzTIG6SdDpaboDNPqyhD5ZOznOYoUo84jlXoI8Pz5CCGuKSdx--tpRwJYzdUz7FTxFcLsekL_9YZB0pbODMGkw4VClBduR0gfsbFykBJ9z2RRgurANFSUvyRt-kDZaWX6ZwFopjkBCY9I3vCORvjRJ1X733WS4uBKUGyamzMHuMgEV5w44oPg_sbQhJL7UtCKgwPMJr8e3O4LjT7EhcrcmfVE6v3rhbO9LhAJHWJAvWc9G2P5ckQZagM";

  const fetch_a = () => {
    const config = {
      headers: { Authorization: `Bearer ${token_vegas}` },
    };
    axios
      .get(`https://vegasapi.phebsoft-team.com/api/categories/${id}`, config)
      .then((response) => {
        setData(response.data.data);
        const stringToArray = response.data.data.keywords.split(",");
        const tagsForUse = stringToArray.map((tag) => {
          return { id: tag, text: tag };
        });
        setTags(tagsForUse);
        console.log(response);
      })
      .catch(console.log);
  };

  const fetch_b = () => {
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
      })
      .catch(console.log);
  };

  useEffect(() => {
    fetch_a();
    fetch_b();
  }, []);

  useEffect(() => {
    if (data !== undefined && categoryList !== undefined) {
      setIsLoading(false);
    }
  }, [categoryList, data]);

  useEffect(() => {
    if (categoryName == undefined || categoryName === "") {
      if (data != undefined) setCategoryName(data.title);
    }
    if (categoryDetail == undefined || categoryDetail === "") {
      if (data != undefined) setCategoryDetail(data.details);
    }
    if (categoryMeta == undefined || categoryMeta === "") {
      if (data != undefined) setCategoryMeta(data.meta_description);
    }
    if (status == undefined || setStatus === "") {
      if (data != undefined) setStatus(data.status);
    }
    if (categoryViewOrder == undefined || categoryViewOrder === "") {
      if (data != undefined) setCategoryViewOrder(data.view_order);
    }
    if (categoryParentId == undefined || categoryParentId === "") {
      if (data != undefined) setCategoryParentId(data.parent_id);
    }
  }, [
    categoryDetail,
    tags,
    categoryMeta,
    categoryName,
    categoryParentId,
    status,
    categoryViewOrder,
    data,
  ]);

  const handleAdd = () => {
    let tagsToSend = "";
    if (tags.length > 0) {
      const convertTags = tags.map(({ text }) => text);
      tagsToSend = convertTags.join(",");
    }

    let CatergoryData = {
      title: categoryName,
      details: categoryDetail,
      meta_description: categoryMeta,
      keywords: tagsToSend,
      status: status,
      view_order: categoryViewOrder,
      cat_slug: data.cat_slug,
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
      .put(
        `https://vegasapi.phebsoft-team.com/api/categories/${id}`,
        CatergoryData,
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
    return <Redirect to="/catalogue/categories" />;
  }

  return (
    <div>
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
            defaultValue={data.title}
            onChange={(e) => setCategoryName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <CLabel htmlFor="CategoryDetail">Detail</CLabel>
          <CInput
            type="text"
            id="CategoryDetail"
            aria-describedby="category-detail"
            defaultValue={data.details}
            onChange={(e) => setCategoryDetail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <CLabel htmlFor="CategoryLocation">Meta Description</CLabel>
          <CInput
            type="text"
            id="CategoryMeta"
            aria-describedby="category-meta"
            defaultValue={data.meta_description}
            onChange={(e) => setCategoryMeta(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <KeywordsTagsComponent tags={tags} setTags={setTags} />
        </div>
        <div className="mb-3">
          <CLabel htmlFor="CategoryStatus">Status</CLabel>
          <StatusDropDown setStatus={setStatus} defaultStatus={status} />
        </div>
        <div className="mb-3">
          <CLabel htmlFor="CategoryViewOrder">View Order</CLabel>
          <CInput
            type="text"
            id="CategoryViewOrder"
            aria-describedby="category-view-order"
            defaultValue={data.view_order}
            onChange={(e) => setCategoryViewOrder(e.target.value)}
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
    </div>
  );
}

export default CategoriesEdit;
