import React from "react";
import { CInputFile } from "@coreui/react";

function ProductUpload(props) {
  const { selected, setSelected } = props;
  const onFileChange = (event) => {
    // Update the state
    setSelected([...selected, ...event.target.files]);
  };
  return (
    <div>
      <CInputFile type="file" onChange={onFileChange} multiple />
    </div>
  );
}

export default ProductUpload;
