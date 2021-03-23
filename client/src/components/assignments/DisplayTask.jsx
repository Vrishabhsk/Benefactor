import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionActions from "@material-ui/core/AccordionActions";
import Typography from "@material-ui/core/Typography";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import axios from "axios";
import SimplePopover from "../SimplePopover";
import UpdateTask from "./UpdateTask";
import Divider from "@material-ui/core/Divider";
import StyledButton from "../StyledButton";
import { toast } from "react-toastify";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  back: {
    border: "3px solid black",
    backgroundColor: "#2a363b",
    color: "white",
  },
}));

export default function DisplayTask(props) {
  const classes = useStyles();
  const [task, setTask] = useState({
    sub: "",
    des: "",
  });

  useEffect(() => {
    getSingle();
  });

  function getSingle() {
    axios
      .get(`/getSingle/${props.task_id}`)
      .then((res) => {
        setTask({
          sub: res.data.sub,
          des: res.data.des,
        });
      });
  }

  function deleteTask() {
    axios
      .delete(`/deleteTask/${props.task_id}`)
      .then((res) => {
        toast.success(res.data);
      });
  }

  return (
    <>
      <div className={classes.root}>
        <div>
          <Accordion className={classes.back}>
            <AccordionSummary
              component={"span"}
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <FormControlLabel
                aria-label="Acknowledge"
                onClick={(event) => event.stopPropagation()}
                onFocus={(event) => event.stopPropagation()}
                control={<Checkbox color="primary" />}
                label={props.sub}
              />
            </AccordionSummary>
            <hr />
            <AccordionDetails component={"span"}>
              <Typography component={"span"}>{props.des}</Typography>
            </AccordionDetails>
            <Divider />
            <AccordionActions>
              <StyledButton
                text={
                  <SimplePopover
                    name="EDIT"
                    content={UpdateTask}
                    sub={task.sub}
                    des={task.des}
                    task_id={props.task_id}
                  />
                }
              />
              <StyledButton onClick={deleteTask} text="DELETE" />
            </AccordionActions>
          </Accordion>
        </div>
      </div>
    </>
  );
}
