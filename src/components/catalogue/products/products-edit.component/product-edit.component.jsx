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
} from "@coreui/react";
import { Redirect } from "react-router-dom";
import Loading from "../../../Loading-component/loading-component";
import CategoryDropDown from "../category-dropdown-component/category-dropdown.component";
import BrandDropDown from "../brand-dropdown.component/brand-dropdown.component";
import ProductTypeDropDown from "../product-type-dropdown.component/product-type-dropdown.component";
import ProductOptionValues from "../product-checkbox-subcategories.component/product-checkbox-subcategories.component";
import { ProductOptionValuesContext } from "../../../../context-providers/product-options.context";
import ProductUpload from "../product-image-upload.component/product-image-upload.component";
import styled from "styled-components";
import { useLocation } from "react-router";
import KeywordsTagsComponent from "../../../Keywords-tag.component/keywords-tag-component";
import "../style.css";

const Wrapper = styled.div`
  margin-bottom: 20px;
`;

function ProductsEdit() {
  const [productsName, setProductsName] = useState("");
  const [productsDetail, setProductsDetail] = useState("");
  const [productsMeta, setProductsMeta] = useState("");
  const [productsKeywords, setProductsKeywords] = useState("");
  const [tags, setTags] = useState([]);
  const [productsStatus, setProductsStatus] = useState("");
  const [productsViewOrder, setProductsViewOrder] = useState("");
  const [productsSlug, setProductsSlug] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [brandId, setBrandId] = useState("");
  const [brandList, setBrandList] = useState(undefined);
  const [pictures, setPictures] = useState("");
  const [price, setPrice] = useState("");
  const [menuTitle, setMenuTitle] = useState("");
  const [heading, setHeading] = useState("");
  const [storeOnly, setStoreOnly] = useState("");
  const [webOnly, setWebOnly] = useState("");
  const [cost, setCost] = useState("");
  const [gst, setGst] = useState("");
  const [barcode, setBarcode] = useState("");
  const [productType, setProductType] = useState("");
  const [shortDetail, setShortDetail] = useState("");
  const [visibility, setVisibility] = useState("");
  const [productOption, setProductOption] = useState([]);
  const [productOptionList, setProductOptionList] = useState([]);
  const [isClicked, setIsClicked] = useState(false);
  const [productOptionValuesList, setProductOptionValuesList] = useState([]);

  const [variantions, setVariations] = useState([]);
  const [variationOptions, setVariationptions] = useState([]);

  const [youtube, setYoutube] = useState(undefined);
  const [productData, setProductData] = useState(undefined);
  const [categoryList, setCategoryList] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [redirect, setRedirect] = useState(undefined);
  const [selected, setSelected] = useState([]);
  const [oldImages, setOldimages] = useState([]);
  const [whatt, setWhatt] = useState([]);

  const {
    productOptionValues,
    setChecked,
    optionList,
    setUnchecked,
    setOptionValues,
    optionsValues,
    changeOptions,
    addProductOptionValuesWithoutClick,
  } = useContext(ProductOptionValuesContext);
  const [fixedData, setFixedData] = useState(undefined);
  const [previewImages, setPreviewimages] = useState([]);

  const { pathname } = useLocation();
  const id = pathname.slice(pathname.search("edit/") + 5);

  useEffect(() => {
    return () => {
      setOptionValues([]);
      changeOptions([]);
    };
  }, []);

  useEffect(() => {
    console.log(productType, "aye lo gee product type");
  }, [productType]);

  const fetchVariants = () => {
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
          setVariationptions(
            result.data.data.map((variant) => {
              return {
                options: variant.options,
              };
            })
          );
          setIsLoading(false);
        })
        .catch((error) => console.log("error", error));
    }
  };

  useEffect(() => {
    console.log(productsKeywords);
  }, [productsKeywords]);

  useEffect(() => {
    return () => {
      setOptionValues([]);
      changeOptions([]);
      console.log(optionsValues, "options cleared");
    };
  }, []);

  useEffect(() => {
    if (isClicked === true) {
      fetchVariants();
    }
    setIsClicked(false);
  }, [isClicked]);

  const token_vegas =
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiMDBmOTU0Yjc4YjYxOGM5Yjg0OTFkMTkxYmUwMjAzNDdlMzFjODQ0NmQ5ZTY4OTRiOTkwZDdiMTQ1MmQ3ZWFiOGE0YTFjNDc0NjFjZjY5NjEiLCJpYXQiOjE2MjQ5NTc4NjUuMDk2ODk3LCJuYmYiOjE2MjQ5NTc4NjUuMDk2OTAzLCJleHAiOjE2NTY0OTM4NjUuMDg5NzA3LCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.OHSKmTqWfrPeYCo4tqGbgysoaLCXTctWhNMyxgzp74F3kAcS8bA2ii1t3A_r-auP3ZrHZ-zInuuHce_7ftwvS4bZpM3Xt2eDx6x1zttXo3CSh4ZBEXYR4NZjE2ijZCupgUlAniUIV6ynv2HVnz5Li2qrcltu5kpUwPh2ZI1rPNbezVpFL5qtc_l10jasAZSJP27Lt7UB8LU2WnZBGkpyQne7sbIgHLBTr2ajU_GgzHwf0kg2j2ZdNK6I5_NH1G1CfjMpilB6hy9Ahec1pPyrsc55_POfOuD0phOz1A9nT5P5-nAx7PECv0yvs7OD-CQRnNgjPblMMna87Vz-msXRxAZvsXa5Qtg7DPODyj7iUtLLw34YXftKPqoaRUwQzp6b6k1tMritCvKopo7CzbApNHb6bRex0BbiHJOZnju1NFj7hwoT3IhVzTIG6SdDpaboDNPqyhD5ZOznOYoUo84jlXoI8Pz5CCGuKSdx--tpRwJYzdUz7FTxFcLsekL_9YZB0pbODMGkw4VClBduR0gfsbFykBJ9z2RRgurANFSUvyRt-kDZaWX6ZwFopjkBCY9I3vCORvjRJ1X733WS4uBKUGyamzMHuMgEV5w44oPg_sbQhJL7UtCKgwPMJr8e3O4LjT7EhcrcmfVE6v3rhbO9LhAJHWJAvWc9G2P5ckQZagM";

  const fetch_c = () => {
    const config = {
      headers: { Authorization: `Bearer ${token_vegas}` },
    };
    axios
      .get(`https://vegasapi.phebsoft-team.com/api/products/${id}/edit`, config)
      .then((response) => {
        const cat = response.data.data.product;
        const selectedProductOption = response.data.data.product.options;
        console.log(cat, "check this out man", response);
        setProductData(cat);
        setProductsName(cat.title);
        setProductsDetail(cat.details);
        setProductsMeta(cat.meta_description);
        setProductsKeywords(cat.keywords);
        setProductsStatus(cat.status);
        setProductsViewOrder(cat.view_order);
        setProductsSlug(cat.product_slug);
        setCategoryId(cat.category_id);
        setBrandId(cat.brand_id);
        setOldimages(cat.pictures);
        setPrice(cat.price);
        setMenuTitle(cat.menu_title);
        setStoreOnly(cat.store_only);
        setWebOnly(cat.web_only);
        setHeading(cat.heading);
        setCost(cat.cost);
        setGst(cat.gst);
        setBarcode(cat.barcode);
        setShortDetail(cat.short_detail);
        setVisibility(cat.visibility);
        setYoutube(cat.youtube);
        setProductType(cat.product_type);
        const categories = response.data.data.categories.map((item) => {
          return { value: item.id, label: item.title };
        });
        setCategoryList(categories);
        const brands = response.data.data.brands.map((item) => {
          return { value: item.id, label: item.title };
        });
        setBrandList(brands);
        if (cat.product_type === "configurable") {
          setVariations(cat.variations);
          const varitionOptions = cat.variations.map((variant) => {
            return {
              options: variant.options,
            };
          });
          setVariationptions(varitionOptions);

          const options1 = response.data.data.options;
          const opts = options1.map((item) => {
            return {
              value: item.id,
              label: item.name,
              isChecked: item.isChecked,
            };
          });
          setOptionValues(opts);
          const optionData = response.data.data.options.map((item) => {
            if (
              selectedProductOption.find(
                (option) => option.option_id === item.id
              )
            ) {
              return { value: item.id, label: item.name, isChecked: true };
            } else {
              return { value: item.id, label: item.name, isChecked: false };
            }
          });
          console.log(optionData, "ye dekhien");
          changeOptions(optionData);
          // setProductOptionValuesList(
          //   options1
          //     .map((item) =>
          //       item.option_value.map((option) => {
          //         return {
          //           id: option.id,
          //           option_id: option.option_id,
          //           sort_order: option.sort_order,
          //           value: option.value,
          //           isChecked: option.isChecked,
          //         };
          //       })
          //     )
          //     .flat()
          // );
          setOptionValues(
            options1
              .map((item) =>
                item.option_value.map((option) => {
                  if (
                    selectedProductOption.find(
                      (options) => parseInt(options.value) === option.id
                    )
                  ) {
                    return {
                      id: option.id,
                      option_id: option.option_id,
                      sort_order: option.sort_order,
                      value: option.value,
                      isChecked: true,
                    };
                  } else {
                    return {
                      id: option.id,
                      option_id: option.option_id,
                      sort_order: option.sort_order,
                      value: option.value,
                      isChecked: false,
                    };
                  }
                })
              )
              .flat()
          );

          const what = response.data.data.options.map((item) =>
            item.option_value.map((option) => {
              if (
                selectedProductOption.find(
                  (options) => parseInt(options.value) === option.id
                )
              ) {
                // addProductOptionValuesWithoutClick(option);
                return option;
              }
            })
          );
          const what2 = what.flat().filter((item) => item !== undefined);
          console.log(what2, "what does this one have ");
          console.log(productOptionValues, "is this what I want");
          addProductOptionValuesWithoutClick(what2);
          handleGenerate(false);
        }
        setIsLoading(false);
      })
      .catch(console.log);
  };

  useEffect(() => {
    fetch_c();
    // console.log(productsList);
  }, []);

  useEffect(() => {
    if (productOptionValues.length > 0 && variationOptions.length > 0) {
      setIsLoading(false);
    }
  }, [productOptionValues, variationOptions.length]);

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

  const handleGenerate = (clicked) => {
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
    if (clicked === true) {
      setIsLoading(true);
      setIsClicked(true);
    }
  };

  const handleOptionChange = (e, index, option) => {
    // this function adds checked values and removes unchecked values and also manages the state for showing checked and unchecked inside the check box
    if (e.target.checked === true) {
      setChecked(optionList, { state: true, index: index });
      setProductOption([
        ...productOption,
        { name: e.target.name, value: e.target.value },
      ]);
      console.log(productOption, "ye thek hai");
    } else {
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
  const handleImageremove = (index, str) => {
    if (str == "preview") {
      setSelected(selected.filter((image, i) => index !== i));
      setPreviewimages(previewImages.filter((image, i) => index !== i));
    } else {
      setOldimages(oldImages.filter((image, i) => index !== i));
    }
  };
  function buildFormData(formData, data, parentKey) {
    if (
      data &&
      typeof data === "object" &&
      !(data instanceof Date) &&
      !(data instanceof File)
    ) {
      Object.keys(data).forEach((key) => {
        buildFormData(
          formData,
          data[key],
          parentKey ? `${parentKey}[${key}]` : key
        );
      });
    } else {
      const value = data == null ? "" : data;

      formData.append(parentKey, value);
    }
  }

  function jsonToFormData(data, formData) {
    buildFormData(formData, data);

    return formData;
  }
  const handleAdd = () => {
    let tagsToSend = "";
    if (tags.length > 0) {
      const convertTags = tags.map(({ text }) => text);
      tagsToSend = convertTags.join(",");
    }
    let catergoryData = {
      id: productData.id,
      title: productsName,
      details: productsDetail,
      meta_description: productsMeta,
      category_id: categoryId,
      brand_id: brandId,
      keywords: tagsToSend,
      status: productsStatus,
      view_order: productsViewOrder,
      pictures: pictures,
      oldImages: oldImages,
      menu_title: menuTitle,
      heading: heading,
      price: price,
      store_only: storeOnly,
      web_only: webOnly,
      barcode: barcode,
      product_type: productType,
      cost,
      gst,
      short_detail: shortDetail,
      visibility: visibility,
      productoption: fixedData,
      variations: variantions,
      product_slug: productsSlug,
      youtube: youtube,
      sub_category_id: 3,
    };

    console.log(catergoryData, "whats in here");

    let axiosConfig1 = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${token_vegas}`,
      },
      data: {},
    };
    console.log("should work ");
    const formData = new FormData();
    jsonToFormData(catergoryData, formData); //converting json to formdata
    formData.append("_method", "PUT");

    // Update the formData object
    selected.forEach((image) => {
      formData.append("images[]", image);
    });
    axios
      .post(
        `https://vegasapi.phebsoft-team.com/api/products/${id}`,
        formData,
        axiosConfig1
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
            value={productsName}
            onChange={(e) => setProductsName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <CLabel htmlFor="CategoryDetail">Detail</CLabel>
          <CTextarea
            type="textarea"
            id="CategoryDetail"
            value={productsDetail}
            onChange={(e) => setProductsDetail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <CLabel htmlFor="CategoryLocation">Meta Description</CLabel>
          <CInput
            type="text"
            id="CategoryMeta"
            value={productsMeta}
            onChange={(e) => setProductsMeta(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <CLabel htmlFor="CategoryKeywords">Keywords</CLabel>
          <KeywordsTagsComponent tags={tags} setTags={setTags} />
        </div>
        <div className="mb-3">
          <CLabel htmlFor="CategoryStatus">Status</CLabel>
          <CInput
            type="text"
            id="CategoryStatus"
            value={productsStatus}
            onChange={(e) => setProductsStatus(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <CLabel htmlFor="CategoryViewOrder">View Order</CLabel>
          <CInput
            type="text"
            id="CategoryViewOrder"
            value={productsViewOrder}
            onChange={(e) => setProductsViewOrder(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <CLabel htmlFor="CategorySlug">Slug</CLabel>
          <CInput
            type="text"
            id="CategorySlug"
            value={productsSlug}
            onChange={(e) => setProductsSlug(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <CLabel htmlFor="CategoryId">Category</CLabel>
          <CategoryDropDown
            defaultCategory={categoryId}
            options={categoryList}
            setCategoryId={setCategoryId}
          />
        </div>
        <div className="mb-3">
          <CLabel htmlFor="BrandId">Brand Id</CLabel>
          <BrandDropDown
            options={brandList}
            setBrandId={setBrandId}
            defaultBrand={brandId}
          />
        </div>

        <div className="mb-3">
          <CLabel htmlFor="Price">Price</CLabel>
          <CInput
            type="text"
            id="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <CLabel htmlFor="MenuTitle">Menu Title</CLabel>
          <CInput
            type="text"
            id="MenuTitle"
            value={menuTitle}
            onChange={(e) => setMenuTitle(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <CLabel htmlFor="Heading">Heading</CLabel>
          <CInput
            type="text"
            id="Heading"
            value={heading}
            onChange={(e) => setHeading(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <CLabel htmlFor="WebOnly">Web Only</CLabel>
          <CInput
            type="text"
            id="WebOnly"
            value={webOnly}
            onChange={(e) => setWebOnly(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <CLabel htmlFor="StoreOnly">Store Only</CLabel>
          <CInput
            type="text"
            id="StoreOnly"
            value={storeOnly}
            onChange={(e) => setStoreOnly(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <CLabel htmlFor="Cost">Cost</CLabel>
          <CInput
            type="text"
            id="Cost"
            onChange={(e) => setCost(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <CLabel htmlFor="GST">GST</CLabel>
          <CInput
            type="text"
            id="GST"
            onChange={(e) => setGst(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <CLabel htmlFor="Heading">Barcode</CLabel>
          <CInput
            type="text"
            id="Barcode"
            onChange={(e) => setBarcode(e.target.value)}
            value={barcode}
          />
        </div>
        <div className="mb-3">
          <CLabel htmlFor="ProductType">ProductType</CLabel>
          <ProductTypeDropDown
            options={[
              { value: "simple", label: "Simple Product" },
              { value: "configurable", label: "Configurable Product" },
            ]}
            defaultProductType={productType}
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
                                  Options
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
                                        defaultValue={`${productsSlug}-${title}`}
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
                                  <td>
                                    <CCol
                                      sm="8"
                                      className="ml-1 variation_options"
                                    >
                                      {variationOptions[index] &&
                                        variationOptions[index].options.map(
                                          ({ value, options }, key) => {
                                            return (
                                              <p key={key}>
                                                <b>{options.name}</b> : {value}
                                              </p>
                                            );
                                          }
                                        )}
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
              style={{ marginLeft: "15px", marginBottom: "20px" }}
              onClick={() => handleGenerate(true)}
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
            value={shortDetail}
            onChange={(e) => setShortDetail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <CLabel htmlFor="Visibility">Visibility</CLabel>
          <CInput
            type="text"
            id="Visibility"
            value={visibility}
            onChange={(e) => setVisibility(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <CLabel htmlFor="Youtube">Youtube</CLabel>
          <CInput
            type="text"
            id="Youtube"
            value={youtube}
            onChange={(e) => setYoutube(e.target.value)}
          />
        </div>
        <div className="galleryArea">
          <div className="mb-3">
            <h3>Pictures</h3>

            <ProductUpload
              id="Pictures"
              selected={selected}
              setSelected={setSelected}
              setPreviewimages={setPreviewimages}
              previewImages={previewImages}
            />
          </div>
          <div className="oldimages">
            <CRow>
              {oldImages.map((image, index) => {
                return (
                  <div key={index} className="py-3 p_image">
                    <label
                      onClick={(e) => handleImageremove(index, "old")}
                      className="cross_icon"
                    >
                      X
                    </label>
                    <img src={`https://vegasapi.phebsoft-team.com${image}`} />
                  </div>
                );
              })}
              {previewImages &&
                previewImages.map((image, index) => {
                  return (
                    <div key={index} className="py-3 p_image">
                      <label
                        onClick={() => handleImageremove(index, "preview")}
                        className="cross_icon"
                      >
                        X
                      </label>
                      <img src={image} />
                    </div>
                  );
                })}
            </CRow>
          </div>
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

export default ProductsEdit;
