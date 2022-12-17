import React from "react";
import {
  Table,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
  Checkbox,
  Typography
} from "@mui/material";
import EditableRow from "./Helper";
import Footer from "./Footer";
import Header from "./Header";
import Row from "./Singlerow";
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import { Box } from "@mui/system";


/**
 * Returns the complete data of Table  in cartData by calling given api 
 *
 * @param { String } token
 *    Login token
 *
 * @param { NewAddress } newAddress
 *    Data on new address being added
 *
 * @param { Function } handleNewAddress
 *    Handler function to set the new address field to the latest typed value
 *
 * @param { Function } addAddress
 *    Handler function to make an API call to add the new address
 *
 * @returns { JSX.Element }
 *    JSX for the Add new address view
 *
 */

class EditableTable extends React.Component {

    /**
 * Represents all initial states.
 * @constructor
 */

  state = {
    allRowsData: [],
    isEditing: false,
    editingIndex: null,
    pageindex: 0,
    usersperPage: 10,
    currentusers: [],
    indexarray: [],
    userListlength: 0,
    filtered: [],
    isChecked: false,
    noOfrowsSelected: 0,
  };

  componentDidMount() {
    fetch(
      `https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json`
    ).then((res) =>
      res.json().then((data) => {
        this.setState({
          allRowsData: (data || []).map((item) => ({
            isEditing: false,
            isChecked: false,
            rowData: item,
          })),
          userListlength: data.length,
          filtered: (data || []).map((item) => ({
            isEditing: false,
            isChecked: false,
            rowData: item,
          })),
        });
      })
    );
  }


 /*handles select ALl option checkbox */

  handleChangeInParentCheckbox = (event) => {
    
    
    this.setState({
      isChecked: event.target.checked,
    });

    const arr = this.state.allRowsData.map((item, i) => {
      if (
        i >= this.state.usersperPage * this.state.pageindex &&
        i <
          this.state.usersperPage * this.state.pageindex +
            this.state.usersperPage
      ) {
        return {
          isEditing: false,
          isChecked: event.target.checked,
          rowData: item.rowData,
        };
      } else return item;
    });

    

    this.setState({
      allRowsData: arr,
      filtered: arr,
    });

  
  };

/**   handles checkbox selection of rows and stores the state 
   @param {number} index
   * selected index of current dispaying rows
   *@param {Object} e
   *selected event
*/

  handleCheckBoxSelection = (index, e) => {
    const arr = this.state.allRowsData.map((item, i) => {
      if (i === index) {
        return {
          isEditing: item.isEditing,
          isChecked: e.target.checked,
          rowData: item.rowData,
        };
      } else return item;
    });

    this.setState({
      allRowsData: arr,
    });
   

    if (e.target.checked) {
      this.setState({
        noOfrowsSelected: this.state.noOfrowsSelected + 1,
      });
    } else {
      this.setState({
        noOfrowsSelected: this.state.noOfrowsSelected - 1,
      });
    }
  };

  /**  this function handles change in data based on pagination,deletion,edit 
   @param {Array} list
   * array of all rows currently present 

*/

  handleChange = (list) => {
    this.setState({
      userListlength: list.length,
    });

    const no_of_pages = Math.ceil(list.length / this.state.usersperPage);
    const indexes = [];
    for (let i = 0; i < no_of_pages; i++) {
      indexes.push(i);
    }

    this.setState({
      indexarray: indexes,
    });

    if (this.state.pageindex + 1 > no_of_pages) {
      this.setState({
        pageindex: 0,
      });
    }

    let currentlist = [];
    if (this.state.pageindex === 0)
      currentlist = list.slice(0, this.state.usersperPage);
    else {
      currentlist = list.slice(
        this.state.usersperPage * this.state.pageindex,
        this.state.usersperPage * this.state.pageindex + this.state.usersperPage
      );
    }
    this.setState({
      currentusers: currentlist,
    });
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.userListlength !== prevState.userListlength ||
      this.state.pageindex !== prevState.pageindex ||
      this.state.isEditing !== prevState.isEditing ||
      this.state.isChecked !== prevState.isChecked ||
      this.state.noOfrowsSelected !== prevState.noOfrowsSelected
    ) {
      this.handleChange(this.state.allRowsData);
      
    }
  }
 
    /**  this function handles saving of modified data on edit mode of a row
   @param {Object} row
   * one of the data rows which is in edit mode

*/

  handleSave = (row) => {
    if (this.state.isEditing) {
      const arr = this.state.allRowsData.map((item, i) => {
        if (i === this.state.editingIndex) {
          return {
            isEditing: false,
            isChecked: false,
            rowData: row,
          };
        } else return item;
      });
      this.setState(
        {
          allRowsData: arr,
          editingIndex: null,
          isEditing: false,
          filtered: arr,
        },
        this.setToParent
      );
    }
  };


  /**  this function handles cancelling of modified data on edit mode of a row
   @param {number} index
   * index of one of the data rows which is in edit mode

*/
  handleCancel = (index) => {
    if (this.state.isEditing) {
      const arr = this.state.allRowsData.map((item, i) => {
        if (i === index) {
          return {
            isEditing: false,
            isChecked: false,
            rowData: item.rowData,
          };
        } else return item;
      });
      this.setState({
        allRowsData: arr,
        editingIndex: null,
        isEditing: false,
        filtered: arr,
      });
    }
  };
  /**  this function handles deletion of one of the data row
   @param {number} index
   * index of one of the data rows which is in edit mode

*/
  handleDeleteRow = (index) => {
    const arr = this.state.allRowsData.filter((item, i) => i !== index);
    this.setState(
      {
        allRowsData: arr,
        userListlength: arr.length,
        filtered: arr,
      },
      this.setToParent
    );
  };

    /**  this function handles deletion of selected data rows
   @param {Object} e
   * selected checkbox event that to deleted

*/

  handleSelectedDelete = (e) => {
    const arr = this.state.allRowsData.filter(
      ({ isChecked, rowData }, i) => !isChecked
    );
    
    this.setState(
      {
        allRowsData: arr,
        userListlength: arr.length,
        filtered: arr,
        isChecked: false,
        isEditing: false,
      },
      this.setToParent
    );
  };

    /**  this function handles modification datarow on edit mode
   @param {number} index
   *index of  one of the data rows which is in edit mode

*/

  handleEditRow = (index) => {
    const arr = this.state.allRowsData.map((item, i) => {
  
      if (i === index) {
        return {
          isEditing: true,
          isChecked: false,
          rowData: item.rowData,
        };
      } else return item;
    });
    this.setState({
      allRowsData: arr,
      editingIndex: index,
      isEditing: true,
      filtered: arr,
    });
  };

     /**  this function handles pagination  
   @param {number} item
   *index of  one of the pages 

*/

  handlepage = (item) => {
    this.setState({
      pageindex: item,
    });
  };

   /**  this function handles pagination movement 
   @param {number} move
   *increment/decrement of pageindex

*/

  handlePrevandNext = (move) => {
    if ((this.state.pageindex !== 0 && move < 0) || move>0) {
      this.setState({
        pageindex: this.state.pageindex + move,
      });
    }
  };

   /**  this function handles serach result from serachbar input 
   @param {Array} filteredrows
   *filtered data after search input

*/

  handleSearch = (filteredrows) => {
    this.setState({
      allRowsData: filteredrows,
      userListlength: filteredrows.length,
    });
  };

  render() {
    const { fieldsArr = [], tableName, initWithoutHead } = this.props;

    const {
      allRowsData = [],
      editingIndex,
      currentusers,
      filtered,
      userListlength,
    } = this.state;

    let headRow = [
      ...fieldsArr.map((item) => ({ label: item.label, name: item.name })),
      { label: "Actions", name: "actions" },
    ];
    const showHeader = initWithoutHead && !allRowsData.length ? false : true;

    return (
      <>
        <Header
          rows={allRowsData}
          originallist={filtered}
          handleSearch={this.handleSearch}
        />
        <Table >
          {showHeader && (
            <TableHead >
              <TableRow>
                <TableCell align="left" padding="none" variant="head">
                  <Checkbox
                    onChange={this.handleChangeInParentCheckbox}
                    checked={this.state.isChecked}
                  />
                </TableCell>
                {headRow.map(({ label, name }, i) => (
                  <TableCell sx={{fontSize:'1rem',fontWeight:650}} key={i} align="left" padding="none" variant="head">{label}</TableCell>
                ))}
              </TableRow>
            </TableHead>
          )}
          <TableBody>
            {userListlength > 0 ? (
              <>
                {!!currentusers.length &&
                  currentusers.map(({ isEditing, isChecked, rowData }, i) => {
                    return isEditing ? (
                      <EditableRow
                        tableName={tableName}
                        isEditing={isEditing}
                        editingIndex={editingIndex}
                        allRowsData={this.state.currentusers}
                        editData={rowData}
                        handleSave={this.handleSave}
                        handleCancel={this.handleCancel}
                        fieldsArr={fieldsArr}
                        isrowChecked={isChecked}
                        checked={this.state.isChecked}
                        handleCheckBoxSelection={(e) =>
                          this.handleCheckBoxSelection(
                            this.state.pageindex * 10 + i,
                            e
                          )
                        }
                      />
                    ) : (
                      <Row
                        key={i}
                        tableName={tableName}
                        isEditing={this.state.isEditing}
                        handleEditRow={() =>
                          this.handleEditRow(this.state.pageindex * 10 + i)
                        }
                        handleDeleteRow={() => this.handleDeleteRow(i)}
                        data={rowData}
                        isrowChecked={isChecked}
                        checked={this.state.isChecked}
                        handleCheckBoxSelection={(e) =>
                          this.handleCheckBoxSelection(
                            this.state.pageindex * 10 + i,
                            e
                          )
                        }
                      />
                    );
                  })}
              </>
            ) : (
              // <div className="Oops"><SentimentDissatisfiedIcon/> Oops No Data Found</div> 
              <Box className="Oops" color="gray">
                  <SentimentDissatisfiedIcon />
                  <Typography >Oops No Data Found</Typography>
                </Box>
            )}
          </TableBody>
        </Table>
        <Footer
          indexes={this.state.indexarray}
          handlepage={this.handlepage}
          handlePrevandNext={this.handlePrevandNext}
          pageindex={this.state.pageindex}
          handleSelectedDelete={this.handleSelectedDelete}
        />
      </>
    );
  }
}

export default EditableTable;
