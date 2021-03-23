import React from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SimplePopover from "./SimplePopover";

function Work(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="work">
      <Button
        style={{color: "white"}}
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {props.objs.map((obj, index) => {
          return (
            <MenuItem onClick={handleClose} key={index}>
              <SimplePopover
                name={obj}
                user_id={props.user_id}
                tag="span"
                content={props.content}
              />
            </MenuItem>
          );
        })}
      </Menu>
    </div>
  );
}

export default Work;
