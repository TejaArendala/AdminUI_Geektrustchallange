import React from "react";
import { TableRow, TableCell, Button, Checkbox } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import './styles.css';


/**
 * 
 * @param {Object} data
 * a single row element
 * @param {Function} handleEditRow
 * method to handle modification of data
 * @param {Function} handleDeleteRow
 * method to handle deletion of row
 * @param {boolean} checked
 * flag that helps to maintain check/uncheck all rows
 * @param {Function} handleCheckBoxSelection
 * method that helps to select checkboxes for deletion
 * @param {boolean} isrowChecked
 * flag for a specific row to check/uncheck the checkbox
 * @param {boolean} isEditing
 * flag to make row editable
 * @returns {JSX}
 */

const Row = ({
  data,
  handleEditRow,
  handleDeleteRow,
  isEditing,
  handleCheckBoxSelection,
  checked,
  isrowChecked,
}) => {


  return (
    <TableRow    sx={{ '&:last-child td, &:last-child th': { border: 0 } }} className={isrowChecked?"rowSelected":""}>
      <TableCell align="left" padding="none">
        <Checkbox
          checked={checked || isrowChecked}
          onChange={handleCheckBoxSelection}
        />
      </TableCell>

      <TableCell align="left" padding="none">
        {data.name}
      </TableCell>
      <TableCell align="left" padding="none">
        {data.email}
      </TableCell>
      <TableCell align="left" padding="none">
        {data.role}
      </TableCell>

      <TableCell align="left" padding="none">
        <Button disabled={isEditing} onClick={handleEditRow}>
          <EditIcon />
        </Button>

        <Button color="error" disabled={isEditing} onClick={handleDeleteRow}>
          <DeleteIcon />
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default Row;
