import React, { useState } from "react";
import {
  TableRow,
  TableCell,
  Button,
  FormControl,
  MenuItem,
  Select,
  Checkbox,
} from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";

 /**
  * 
  * @param {string} error 
  * validation error on data if any
  * @param {Function} validation
  * validation function on each field
  * @returns {JSX}
  */

const Input = ({
  name,
  error,
  validation,
  childHasError,
  columnDataArr,
  value,
  classes,
  tableName,
  ...props
}) => {
  const [hasError, setError] = useState(false);
  const handleOnChange = (e) => {
    const hasError = validation(e, columnDataArr);
    if (!hasError) {
      childHasError(true);
      setError(true);
    } else {
      childHasError(false);
      setError(false);
    }
    props.onChange(e);
  };

  return (
    <>
      <div>
        <input name={name} value={value || ""} onChange={handleOnChange} />
        <p>{hasError && error}</p>
      </div>
    </>
  );
};

//To maintain role selection
/** method To maintain role selection 
 * 
 * @param {string} name 
 * one of the option name
 * @param {MenuItem} options
 * @param {string} selectMessage
 * @param {string} value
 * select value 
 * @returns 
 */
const OurSelect = ({
  name,
  value,
  selectMessage,
  options,
  classes,
  tableName,
  ...props
}) => {
  const handleSelect = (e) => {
    props.onChange(e);
  };
  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <Select
        labelId="demo-select-small"
        value={value || ""}
        onChange={handleSelect}
        inputProps={{
          name: name,
          id: name,
        }}
      >
        {(options || []).map((item) => {
          return (
            <MenuItem key={item.value} value={item.value}>
              {item.label}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

//To conrtrol when clicked on edit
 
/**
 * 
 * @param {Object} fieldsArr
 * object for validation of the fields
 * @param {Array} allRowsData
 * current datarows 
 * @param {number} editingIndex
 * index of row that to be edited/modified
 * @param {boolean} isEditing
 * flag to make row editable
 * @param {boolean} checked
 * flag that helps to maintain check/uncheck all rows
 * @param {Function} handleCheckBoxSelection
 * method that helps to select checkboxes for deletion
 * @param {boolean} isrowChecked
 * flag for a specific row to check/uncheck the checkbox
  * @returns 
 */

const EditableRow = ({
  fieldsArr = [],
  editData = {},
  allRowsData,
  tableName,
  classes = {},
  editingIndex,
  isEditing,
  selectClasses,
  inputClasses,
  handleCheckBoxSelection,
  checked,
  isrowChecked,
  ...props
}) => {
  let initializeObj = {};
  fieldsArr.forEach((item) => {
    initializeObj[item.name] = "";
  });
  const [rowHasError, setRowHasError] = useState(false);
  const [rowData, setRowData] = useState(
    editData ? Object.assign({}, initializeObj, editData) : initializeObj
  );
  const handleSave = () => {
    props.handleSave(rowData);
  };
  const handleOnChange = (e) => {
    const updatedData = Object.assign({}, rowData, {
      [e.target.name]: e.target.value,
    });
    setRowData(updatedData);
  };
  const handleCancel = () => {
    if (isEditing) {
      props.handleCancel(editingIndex);
    } else {
      props.handleCancel();
    }
  };
  return (
    <TableRow>
      <TableCell align="left" padding="none">
        <Checkbox
          checked={checked || isrowChecked}
          onChange={handleCheckBoxSelection}
        />
      </TableCell>
      {fieldsArr.map((item, i) => {
        return (
          <>
            <TableCell align="left" padding="none" key={i}>
              {item.type === "select" ? (
                <OurSelect
                  tableName={tableName}
                  name={item.name}
                  onChange={handleOnChange}
                  options={item.options}
                  value={rowData[item.name]}
                  childHasError={(bool) => setRowHasError(bool)}
                  error={item.error}
                  selectMessage={item.selectMessage}
                  validation={item.validation}
                />
              ) : (
                <Input
                  columnDataArr={(allRowsData || []).map(
                    (obj) => obj.rowData[item.name]
                  )}
                  tableName={tableName}
                  type={item.type}
                  name={item.name}
                  onChange={handleOnChange}
                  value={rowData[item.name]}
                  item={item.name}
                  childHasError={(bool) => setRowHasError(bool)}
                  error={item.error}
                  validation={item.validation}
                />
              )}
            </TableCell>
          </>
        );
      })}
      <TableCell align="left" padding="none">
        <Button disabled={rowHasError} type="button" onClick={handleSave}>
          <DoneIcon />
        </Button>

        <Button onClick={handleCancel}>
          <CloseIcon />
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default EditableRow;
