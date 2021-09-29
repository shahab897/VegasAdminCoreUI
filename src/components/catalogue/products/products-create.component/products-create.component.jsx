import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import {
  CButton,
  CInput,
  CLabel,
  CForm,
  CTextarea,
  CInputCheckbox,
  CRow,
  CCol,
  CCard,
  CCardHeader,
  CCardBody,
  CDataTable,
} from "@coreui/react";
import { Redirect } from "react-router-dom";
import Loading from "../../../Loading-component/loading-component";
import CategoryDropDown from "../category-dropdown-component/category-dropdown.component";
import SubcategoryDropDown from "../category-dropdown-component/subcategory-dropdown.compoent";
import BrandDropDown from "../brand-dropdown.component/brand-dropdown.component";
import ProductTypeDropDown from "../product-type-dropdown.component/product-type-dropdown.component";
import ProductOptionValues from "../product-checkbox-subcategories.component/product-checkbox-subcategories.component";
import ProductUpload from "../product-image-upload.component/product-image-upload.component";
import { ProductOptionValuesContext } from "../../../../context-providers/product-options.context";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";

const Wrapper = styled.div`
  margin-bottom: 20px;
`;
const Option = styled.option`
  &:hover,
  &:focus {
    background: rgba(0, 116, 217, 0.1);
    outline: none;
  }

  padding: 5px 10px;
  cursor: pointer;
  border-bottom: 1px solid #fff;
`;

const fields = [
  { key: "p_name", label: "name" },
  { key: "ids", label: "id" },
];

function ProductsCreate() {
  const [productsName, setProductsName] = useState(undefined);
  const [productsDetail, setProductsDetail] = useState(undefined);
  const [productsMeta, setProductsMeta] = useState(undefined);
  const [productsKeywords, setProductsKeywords] = useState(undefined);
  const [productsStatus, setProductsStatus] = useState(undefined);
  const [productsViewOrder, setProductsViewOrder] = useState(undefined);
  const [productsSlug, setProductsSlug] = useState(undefined);
  const [categoryId, setCategoryId] = useState(undefined);
  const [brandId, setBrandId] = useState(undefined);
  const [brandList, setBrandList] = useState(undefined);
  const [multiColors, setMultiColors] = useState(undefined);
  const [pictures, setPictures] = useState(undefined);
  const [price, setPrice] = useState(undefined);
  const [menuTitle, setMenuTitle] = useState(undefined);
  const [heading, setHeading] = useState(undefined);
  const [storeOnly, setStoreOnly] = useState(undefined);
  const [webOnly, setWebOnly] = useState(undefined);
  const [quantity, setQuantity] = useState(undefined);
  const [barcode, setBarcode] = useState(undefined);
  const [productType, setProductType] = useState(undefined);
  const [shortDetail, setShortDetail] = useState(undefined);
  const [visibility, setVisibility] = useState(undefined);
  const [productOption, setProductOption] = useState([]);
  const [productOptionList, setProductOptionList] = useState(undefined);
  const [subcategories, setSubcategories] = useState([]);
  const [subcategoryId, setSubcategoryId] = useState(undefined);
  const [productOptionValuesList, setProductOptionValuesList] =
    useState(undefined);
  const [selected, setSelected] = useState([]);
  const [freeProduct, setFreeProduct] = useState("YES");
  const [variantions, setVariations] = useState();
  const [youtube, setYoutube] = useState(undefined);
  const [productsList, setProductsList] = useState(undefined);
  const [categoryList, setCategoryList] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [redirect, setRedirect] = useState(undefined);

  const {
    productOptionValues,
    setChecked,
    optionList,
    setUnchecked,
    setOptionValues,
    optionsValues,
  } = useContext(ProductOptionValuesContext);
  const [fixedData, setFixedData] = useState(undefined);

  useEffect(() => {
    console.log(selected, "whatas going on here");
  }, [selected]);

  const token_vegas =
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiMDBmOTU0Yjc4YjYxOGM5Yjg0OTFkMTkxYmUwMjAzNDdlMzFjODQ0NmQ5ZTY4OTRiOTkwZDdiMTQ1MmQ3ZWFiOGE0YTFjNDc0NjFjZjY5NjEiLCJpYXQiOjE2MjQ5NTc4NjUuMDk2ODk3LCJuYmYiOjE2MjQ5NTc4NjUuMDk2OTAzLCJleHAiOjE2NTY0OTM4NjUuMDg5NzA3LCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.OHSKmTqWfrPeYCo4tqGbgysoaLCXTctWhNMyxgzp74F3kAcS8bA2ii1t3A_r-auP3ZrHZ-zInuuHce_7ftwvS4bZpM3Xt2eDx6x1zttXo3CSh4ZBEXYR4NZjE2ijZCupgUlAniUIV6ynv2HVnz5Li2qrcltu5kpUwPh2ZI1rPNbezVpFL5qtc_l10jasAZSJP27Lt7UB8LU2WnZBGkpyQne7sbIgHLBTr2ajU_GgzHwf0kg2j2ZdNK6I5_NH1G1CfjMpilB6hy9Ahec1pPyrsc55_POfOuD0phOz1A9nT5P5-nAx7PECv0yvs7OD-CQRnNgjPblMMna87Vz-msXRxAZvsXa5Qtg7DPODyj7iUtLLw34YXftKPqoaRUwQzp6b6k1tMritCvKopo7CzbApNHb6bRex0BbiHJOZnju1NFj7hwoT3IhVzTIG6SdDpaboDNPqyhD5ZOznOYoUo84jlXoI8Pz5CCGuKSdx--tpRwJYzdUz7FTxFcLsekL_9YZB0pbODMGkw4VClBduR0gfsbFykBJ9z2RRgurANFSUvyRt-kDZaWX6ZwFopjkBCY9I3vCORvjRJ1X733WS4uBKUGyamzMHuMgEV5w44oPg_sbQhJL7UtCKgwPMJr8e3O4LjT7EhcrcmfVE6v3rhbO9LhAJHWJAvWc9G2P5ckQZagM";

  const fetch_c = () => {
    const config = {
      headers: { Authorization: `Bearer ${token_vegas}` },
    };
    axios
      .get("https://vegasapi.phebsoft-team.com/api/products/create", config)
      .then((response) => {
        const categoriesData = response.data.data.categories.map((item) => {
          return { value: item.id, label: item.title };
        });
        setCategoryList(categoriesData);

        const brandsData = response.data.data.brands.map((item) => {
          return { value: item.id, label: item.title };
        });

        setBrandList(brandsData);

        const optionData = response.data.data.options.map((item) => {
          return { value: item.id, label: item.name, isChecked: false };
        });
        console.log(optionData, "ye dekhien");
        setProductOptionList(optionData);
        setChecked(optionData, { state: false });
        const optionValsData = response.data.data.options
          .map((item) =>
            item.option_value.map((option) => {
              return {
                id: option.id,
                option_id: option.option_id,
                sort_order: option.sort_order,
                value: option.value,
                isChecked: false,
              };
            })
          )
          .flat();

        setProductOptionValuesList(optionValsData);
        setOptionValues(optionValsData);

        setIsLoading(false);
      })
      .catch(console.log);
  };

  useEffect(() => {
    console.log(optionsValues);
  }, [optionsValues]);
  useEffect(() => {
    console.log(freeProduct);
  }, [freeProduct]);
  useEffect(() => {
    fetch_c();
    // console.log(productsList);
  }, []);

  useEffect(() => {
    console.log("configurable");
    // console.log(productsList);
  }, [productType]);

  useEffect(() => {
    console.log(optionList, " ye hogya");
  }, [optionList]);

  useEffect(() => {
    console.log(productOptionValuesList);
  }, [productOptionValuesList]);

  // useEffect(() => {
  //   console.log(productOptionList, "ah yes teh power");
  // }, [productOptionList]);
  // useEffect(() => {
  //   console.log(productOption, "options selected");
  // }, [productOption]);

  // useEffect(() => {
  //   console.log(productOptionValuesList, "ye bhi change horaha hai");
  // }, [productOptionValuesList]);

  // useEffect(() => {
  //   console.log(productOptionList, "ye bhi change hogaaaaaaaaaaaaaaaaaaaaa");
  // }, [productOptionList]);

  useEffect(() => {
    console.log(fixedData, "this is the fixed data to be sent for generation");
    let axiosConfig = {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${token_vegas}`,
      },
    };
    if (fixedData != undefined) {
      axios
        .post(
          "https://vegasapi.phebsoft-team.com/api/generateCombinations",
          { options: fixedData },
          axiosConfig
        )
        .then((result) => {
          console.log(result.data, "ye walal");
          setVariations(
            result.data.data.map((variant) => {
              return {
                title: variant.p_name,
                price: price,
                sku: `${productsSlug}-${variant.p_name}`,
                status: "Enabled",
                option_ids: variant.ids,
              };
            })
          );
        })
        .catch((error) => console.log("error", error));
    }
  }, [fixedData]);

  const handleGenerate = () => {
    // function groupBy(arr, property) {
    //   return arr.reduce(function (memo, x) {
    //     if (!memo[x[property]]) {
    //       memo[x[property]] = [];
    //     }
    //     memo[x[property]].push(x);
    //     return memo;
    //   }, {});
    // }
    function groupBy(xs, prop) {
      var grouped = {};
      for (var i = 0; i < xs.length; i++) {
        var p = xs[i][prop];
        if (!grouped[p]) {
          grouped[p] = [];
        }
        grouped[p].push(xs[i]);
      }
      return grouped;
    }
    setFixedData(groupBy(productOptionValues, "parent_id"));
    console.log("ye wala function");
  };

  const handleOptionChange = (e, index, option) => {
    // this function adds checked values and removes unchecked values and also manages the state for showing checked and unchecked inside the check box
    if (e.target.checked === true) {
      // setProductOptionList(
      //   productOptionList.map((productOption, i) => {
      //     if (index === i) return { ...productOption, isChecked: true };
      //     else return productOption;
      //   })
      // );
      setChecked(optionList, { state: true, index: index });
      setProductOption([
        ...productOption,
        { name: e.target.name, value: e.target.value },
      ]);
      console.log(productOption, "ye thek hai");
    } else {
      // setProductOptionList(
      //   productOptionList.map((productOption, i) => {
      //     if (index === i) return { ...productOption, isChecked: false };
      //     else return productOption;
      //   })
      // );
      setUnchecked(optionList, { state: true, index: index });
      setProductOption(
        productOption.filter((option) => e.target.value !== option.value)
      );
    }
  };

  let handleVariationchange = (index, e) => {
    let newFormValues = [...variantions];
    newFormValues[index][e.target.name] = e.target.value;
    setVariations(newFormValues);

    console.log(variantions, "variantions");
  };

  const handleFreeProduct = (e) => {
    if (e.target.value === "Enabled") {
      setFreeProduct("YES");
    } else {
      setFreeProduct("NO");
    }
  };

  const handleAdd = () => {
    if (selected.length === 0) {
      return;
    }

    // const productData = {
    //   title: "maSER",
    //   product_slug: "product",
    //   category_id: "3",
    //   brand_id: "1",
    //   meta_description: "product",
    //   keywords: "product",
    //   details: "Product Test",
    //   status: "Enabled",
    //   view_order: "0",
    //   multi_colors: "No",
    //   pictures: "Test",
    //   menu_title: "Test",
    //   heading: "Test",
    //   youtube: "Test",
    //   price: "10",
    //   store_only: "No",
    //   web_only: "No",
    //   barcode: "Test",
    //   sub_category_id: "3",
    //   product_type: "configurable",
    //   quantity: "Test quantity",
    //   short_detail: "short detail",
    //   visibility: "Visible",
    //   variations: [
    //     {
    //       title: "XL-75Hz",
    //       price: "500",
    //       sku: "alienware-XL-75Hz",
    //       status: "Enabled",
    //       option_ids: "31-36",
    //     },
    //     {
    //       title: "XL-120Hz",
    //       price: "500",
    //       sku: "alienware-XL-120Hz",
    //       status: "Enabled",
    //       option_ids: "31-35",
    //     },
    //     {
    //       title: "L-75Hz",
    //       price: "500",
    //       sku: "alienware-L-75Hz",
    //       status: "Enabled",
    //       option_ids: "37-36",
    //     },
    //     {
    //       title: "L-120Hz",
    //       price: "500",
    //       sku: "alienware-L-120Hz",
    //       status: "Enabled",
    //       option_ids: "37-35",
    //     },
    //   ],
    //   productoption: {
    //     29: [
    //       {
    //         id: "31",
    //         value: "XL",
    //         parent_id: 29,
    //       },
    //       {
    //         id: "37",
    //         value: "L",
    //         parent_id: 29,
    //       },
    //     ],
    //     32: [
    //       {
    //         id: "36",
    //         value: "75Hz",
    //         parent_id: 32,
    //       },
    //       {
    //         id: "35",
    //         value: "120Hz",
    //         parent_id: 32,
    //       },
    //     ],
    //   },
    // };
    let productData = {
      title: productsName,
      details: productsDetail,
      meta_description: productsMeta,
      category_id: categoryId,
      brand_id: brandId,
      keywords: productsKeywords,
      status: productsStatus,
      view_order: productsViewOrder,
      multi_colors: multiColors,
      menu_title: menuTitle,
      heading: heading,
      price: price,
      store_only: storeOnly,
      web_only: webOnly,
      barcode: barcode,
      product_type: productType,
      quantity: quantity,
      short_detail: shortDetail,
      visibility: visibility,
      productoption: fixedData,
      variations: variantions,
      product_slug: productsSlug,
      youtube: youtube,
      sub_category_id: subcategoryId,
    };

    const formData = new FormData();
    formData.append("productData", JSON.stringify(productData));
    // Update the formData object
    selected.forEach((image) => {
      formData.append("images[]", image);
    });

    let axiosConfig = {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${token_vegas}`,
      },
    };
    console.log("should work ");
    axios
      .post(
        "https://vegasapi.phebsoft-team.com/api/products",
        // "https://vegasapi.phebsoft-team.com/api/uploadImage",
        formData,
        axiosConfig
      )
      .then((result) => {
        console.log(result, "haha");
        setRedirect(true);
      })
      .catch((error) => console.log("error", error));
  };

  if (isLoading === true) return <Loading />;

  if (redirect === true) {
    return <Redirect to="/catalogue/products" />;
  }

  return (
    <Wrapper>
      <CForm>
        <div className="mb-3">
          <CLabel htmlFor="CategoryName">Title</CLabel>
          <CInput
            type="text"
            id="CategoryName"
            onChange={(e) => setProductsName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <CLabel htmlFor="CategoryDetail">Detail</CLabel>
          <CTextarea
            type="textarea"
            id="CategoryDetail"
            onChange={(e) => setProductsDetail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <CLabel htmlFor="CategoryLocation">Meta Description</CLabel>
          <CInput
            type="text"
            id="CategoryMeta"
            aria-describedby="category-meta"
            onChange={(e) => setProductsMeta(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <CLabel htmlFor="CategoryKeywords">Keywords</CLabel>
          <CInput
            type="text"
            id="CategoryKeywords"
            aria-describedby="category-keywords"
            onChange={(e) => setProductsKeywords(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <CLabel htmlFor="CategoryStatus">Status</CLabel>
          <CInput
            type="text"
            id="CategoryStatus"
            aria-describedby="category-Status"
            onChange={(e) => setProductsStatus(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <CLabel htmlFor="CategoryViewOrder">View Order</CLabel>
          <CInput
            type="text"
            id="CategoryViewOrder"
            aria-describedby="category-view-order"
            onChange={(e) => setProductsViewOrder(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <CLabel htmlFor="CategorySlug">Slug</CLabel>
          <CInput
            type="text"
            id="CategorySlug"
            aria-describedby="category-slug"
            onChange={(e) => setProductsSlug(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <CLabel htmlFor="CategoryId">Category</CLabel>
          <CategoryDropDown
            options={categoryList}
            setCategoryId={setCategoryId}
            setSubcategories={setSubcategories}
          />
        </div>
        <div className="mb-3">
          <CLabel htmlFor="CategoryId">Subcategory</CLabel>
          <SubcategoryDropDown
            options={subcategories}
            setSubcategoryId={setSubcategoryId}
          />
        </div>
        <div className="mb-3">
          <CLabel htmlFor="BrandId">Brand Id</CLabel>
          <BrandDropDown options={brandList} setBrandId={setBrandId} />
        </div>
        <div className="mb-3">
          <CLabel htmlFor="MultiColors">MultiColors</CLabel>
          <CInput
            type="text"
            id="MultiColors"
            onChange={(e) => setMultiColors(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <CLabel htmlFor="Pictures">Pictures</CLabel>
          <ProductUpload
            id="Pictures"
            selected={selected}
            setSelected={setSelected}
          />
        </div>
        <div className="mb-3">
          <CLabel htmlFor="Price">Price</CLabel>
          <CInput
            type="text"
            id="Price"
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <CLabel htmlFor="MenuTitle">Menu Title</CLabel>
          <CInput
            type="text"
            id="MenuTitle"
            onChange={(e) => setMenuTitle(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <CLabel htmlFor="Heading">Heading</CLabel>
          <CInput
            type="text"
            id="Heading"
            onChange={(e) => setHeading(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <CLabel htmlFor="WebOnly">Web Only</CLabel>
          <CInput
            type="text"
            id="WebOnly"
            onChange={(e) => setWebOnly(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <CLabel htmlFor="StoreOnly">Store Only</CLabel>
          <CInput
            type="text"
            id="StoreOnly"
            onChange={(e) => setStoreOnly(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <CLabel htmlFor="Quantity">Quantity</CLabel>
          <CInput
            type="text"
            id="Quantity"
            onChange={(e) => setQuantity(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <CLabel htmlFor="Heading">Barcode</CLabel>
          <CInput
            type="text"
            id="Barcode"
            onChange={(e) => setBarcode(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <CLabel htmlFor="ProductType">ProductType</CLabel>
          <ProductTypeDropDown
            options={[
              { value: "simple", label: "Simple Product" },
              { value: "configurable", label: "Configurable Product" },
            ]}
            setProductType={setProductType}
          />
        </div>
        {productType === "configurable" && (
          <>
            <div className="mb-3">
              <CLabel htmlFor="ProductOption">Product Options</CLabel>
              {optionList.map((option, index) => (
                <div className="mb-3 ml-4" key={index + Math.random()}>
                  <div className="d-sm-flex">
                    <CLabel htmlFor="ProductOption">{option.label}</CLabel>
                    <CInputCheckbox
                      key={index + Math.random()}
                      name={option.label}
                      value={option.value}
                      onChange={(e) => handleOptionChange(e, index, option)}
                      checked={option.isChecked}
                    />
                  </div>
                  <ProductOptionValues
                    key={index + Math.random()}
                    value={option.value}
                    isChecked={option.isChecked}
                    options={productOptionValuesList}
                    setProductOptionValuesList={setProductOptionValuesList}
                  />
                </div>
              ))}
            </div>
            <div>
              {variantions !== undefined && (
                <CRow>
                  <CCol>
                    <CCard>
                      <CCardHeader>Variants</CCardHeader>
                      <CCardBody>
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
                                  Name
                                </CCol>
                              </th>
                              <th>
                                <CCol sm="8" className="ml-1">
                                  SKU
                                </CCol>
                              </th>
                              <th>
                                <CCol sm="8" className="ml-1">
                                  Price
                                </CCol>
                              </th>
                              <th>
                                <CCol sm="8" className="ml-1">
                                  Status
                                </CCol>
                              </th>
                              <th>
                                <CCol sm="8" className="ml-1">
                                  Save
                                </CCol>
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {variantions.map(
                              ({ title, status, price, sku }, index) => (
                                <tr key={index}>
                                  <td>
                                    <CCol sm="8">
                                      <CInput
                                        type="text"
                                        defaultValue={title}
                                        name="title"
                                        onChange={(e) =>
                                          handleVariationchange(index, e)
                                        }
                                      />
                                    </CCol>
                                  </td>
                                  <td>
                                    <CCol sm="8">
                                      <CInput
                                        type="text"
                                        value={`${productsSlug}-${title}`}
                                        name="sku"
                                        onChange={(e) =>
                                          handleVariationchange(index, e)
                                        }
                                      />
                                    </CCol>
                                  </td>
                                  <td>
                                    <CCol sm="8">
                                      <CInput
                                        type="text"
                                        defaultValue={price}
                                        name="price"
                                        onChange={(e) =>
                                          handleVariationchange(index, e)
                                        }
                                      />
                                    </CCol>
                                  </td>
                                  <td>
                                    <CCol sm="8" className="ml-1">
                                      <select
                                        className="form-control"
                                        name="status"
                                        defaultValue={status}
                                        onChange={(e) =>
                                          handleVariationchange(index, e)
                                        }
                                      >
                                        <option>Enabled</option>
                                        <option>Disabled</option>
                                      </select>
                                    </CCol>
                                  </td>
                                </tr>
                              )
                            )}
                          </tbody>
                        </table>
                      </CCardBody>
                    </CCard>
                  </CCol>
                </CRow>
              )}
            </div>
            <CButton
              color="primary"
              variant="outline"
              style={{ marginLeft: "15px" }}
              onClick={handleGenerate}
              disabled={productOptionValues.length === 0}
            >
              Generate Variants
            </CButton>
          </>
        )}
        <div className="mb-3">
          <CLabel htmlFor="ShortDetail">ShortDetail</CLabel>
          <CInput
            type="text"
            id="ShortDetail"
            onChange={(e) => setShortDetail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <CLabel htmlFor="Visibility">Visibility</CLabel>
          <CInput
            type="text"
            id="Visibility"
            onChange={(e) => setVisibility(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <select
            className="form-control"
            name="status"
            defaultValue={"Enabled"}
            onChange={(e) => handleFreeProduct(e)}
          >
            <option>Enabled</option>
            <option>Disabled</option>
          </select>
        </div>
        <div className="mb-3">
          <CLabel htmlFor="Youtube">Youtube</CLabel>
          <CInput
            type="text"
            id="Youtube"
            onChange={(e) => setYoutube(e.target.value)}
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

export default ProductsCreate;
