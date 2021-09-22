import React, { useState } from "react";
import { MdEdit } from "react-icons/md";
import { CButton } from "@coreui/react";
import { Redirect } from "react-router";

function CategoriesEditButton(props) {
  const [redirectTo, setRedirectTo] = useState(undefined);
  const { id } = props;

  if (redirectTo != undefined && redirectTo.isRedirected === true)
    return <Redirect to={`/catalogue/categories/edit/${id}`} />;

  return (
    <td>
      <CButton
        size="md"
        color="info"
        onClick={() => setRedirectTo({ id: id, isRedirected: true })}
      >
        <MdEdit />
      </CButton>
    </td>
  );
}

export default CategoriesEditButton;
