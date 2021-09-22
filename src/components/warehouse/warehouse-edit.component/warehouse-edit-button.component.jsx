import React, { useState } from "react";
import { MdEdit } from "react-icons/md";
import { CButton } from "@coreui/react";
import { Redirect } from "react-router";

function WarehouseEditButton(props) {
  const [redirectTo, setRedirectTo] = useState(undefined);
  const { id } = props;

  if (redirectTo != undefined && redirectTo.isRedirected === true)
    return <Redirect to={`/warehouse/edit/${id}`} />;

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

export default WarehouseEditButton;
