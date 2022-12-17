import SkipNextIcon from "@mui/icons-material/SkipNext";
import FastForwardIcon from "@mui/icons-material/FastForward";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import FastRewindIcon from "@mui/icons-material/FastRewind";
import "./Footer.css";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

 /**  returs JSX
   @param {Array} indexes
   *array to display page numbers

    @param {Function} handlepage
   *method to handle pagination

    @param {Function} handlePrevandNext
   *method to handle page movement

    @param {number} pageindex
   *index of dispaying page

   @param {Function} handleSelectedDelete
   *method to handle deletion of selected rows
   
   

*/


const Footer = ({
  indexes,
  handlepage,
  handlePrevandNext,
  pageindex,
  handleSelectedDelete,
}) => {
  return (
    <>
      {
        <div className="footer">
          <div className="deletebutton">
            <Button
              sx={{ color: "white" }}
              startIcon={<DeleteIcon />}
              onClick={handleSelectedDelete}
            >
              Delete Selected
            </Button>
          </div>
          
          <div onClick={() => handlepage(0)}>
            <FastRewindIcon />
          </div>
          <div>
            <SkipPreviousIcon onClick={() => handlePrevandNext(-1)} />
          </div>

          {indexes.map((item) => (
            <div
              onClick={() => handlepage(item)}
              key={item}
              className={pageindex === item ? "currentpage" : ""}
            >
              {item + 1}
            </div>
          ))}

          <div>
            <SkipNextIcon onClick={() => handlePrevandNext(1)} />
          </div>
          <div onClick={() => handlepage(indexes.length - 1)}>
            <FastForwardIcon />
          </div>
          
        </div>
      }
    </>
  );
};

export default Footer;
