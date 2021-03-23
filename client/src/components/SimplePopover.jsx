import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { Modal } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2),
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "auto",
    width: 600,
    height: 600,
    ["@media (max-width: 420px)"]: { // eslint-disable-line no-useless-computed-key
      width: "95%",
      height: "70%"
    },
    backgroundColor: "#303841",
    border: '3px solid #ec4646',
  },
}));

export default function SimplePopover(props) {
  const classes = useStyles();
  const [anchorel, setAnchorel] = React.useState(null);

  const handleClick = (event) => {
    setAnchorel(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorel(null);
  };

  const close = (val) => {
    setAnchorel(val);
  };

  const open = Boolean(anchorel);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <div
        aria-describedby={id}
        variant="contained"
        className={classes.button}
        onClick={handleClick}
      >
        {props.name}
      </div>
      <Modal
        id={id}
        open={open}
        anchorel={anchorel}
        onClose={handleClose}
        className={classes.modal}
      >
        <Typography component={"span"} className={classes.typography}>
          {
            <props.content
              close={close}
              sub={props.sub}
              des={props.des}
              exam={props.exam_sub}
              user_id={props.user_id}
              task_id={props.task_id}
            />
          }
        </Typography>
      </Modal>
    </div>
  );
}
