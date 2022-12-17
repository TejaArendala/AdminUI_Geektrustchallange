import React from "react";
import EditableTable from "./EditableTable";
import fieldsArr from "./fields";
import "./styles.css";


function Main() {


  return (
    <div className="container">
      <EditableTable initWithoutHead  fieldsArr={fieldsArr} />
    </div>
  );
}

export default Main;
