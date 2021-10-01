import React, { useRef } from "react";
import { CButton } from "@coreui/react";

function ProductUpload(props) {
  const fileRef = useRef(null);
  const { selected, setSelected, setPreviewimages } = props;
  const onFileChange = (event) => {
    // Update the state
    setSelected([...selected, ...event.target.files]);
    let allImages = [];
    if (event.target.files && event.target.files[0]) {
      event.target.files.forEach((image) => {
        allImages.push(URL.createObjectURL(image));
      });
      setPreviewimages(allImages);
    }
  };
  const onBtnClick = () => {
    /*Collecting node-element and performing click*/
    fileRef.current.click();
  };

  return (
    <div>
      <input
        className="hide"
        type="file"
        ref={fileRef}
        onChange={onFileChange}
        multiple
      />
      <CButton color="success" onClick={onBtnClick}>
        Choose Images
      </CButton>
    </div>
  );
}

export default ProductUpload;
