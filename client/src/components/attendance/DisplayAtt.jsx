import React, { useEffect, useState } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import SimplePopover from "../SimplePopover";
import { AccordionActions, Chip } from "@material-ui/core";
import StyledButton from "../StyledButton";
import LinearWithValueLabel from "../LinearWithValueLabel";
import ChangeAtt from "./ChangeAtt";
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
  chip: {
    ["@media (max-width: 420px)"]: {// eslint-disable-line no-useless-computed-key
      marginBottom: "10px",
    },
  },
}));

export default function DisplayAtt(props) {
  const classes = useStyles();
  const [att, setAtt] = useState([]);

  useEffect(() => {
    getAtts();
  });

  function getAtts() {
    axios.get(`/getSubAtt/${props.sub}`).then((res) => {
      setAtt(res.data);
    });
  }

  function attended() {
    axios
      .put("/attended", {
        sub_att: props.sub,
      })
      .then((res) => {
        console.log("success");
      });
  }

  function missed() {
    axios
      .put("/missed", {
        sub_att: props.sub,
      })
      .then((res) => {
        console.log("success");
      });
  }

  function deleteAtt() {
    axios.delete(`/delete/${props.sub}`).then((res) => {
      toast.success(res.data);
    });
  }

  return (
    <div className={classes.root}>
      <div>
        <Accordion className={classes.back}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography component={"span"} className={classes.heading}>
              {props.sub}
            </Typography>
          </AccordionSummary>
          <hr />
          <AccordionDetails>
            <Typography component={"span"}>
              {att.map((singleAtt, index) => {
                return (
                  <div key={index}>
                    <Chip
                      className={classes.chip}
                      color="secondary"
                      label={"Attended Classes: " + singleAtt.attended}
                    />
                    {"    "}
                    <Chip
                      color="secondary"
                      label={"Total Classes: " + singleAtt.tot_classes}
                    />
                    <LinearWithValueLabel
                      numer={singleAtt.attended}
                      denom={singleAtt.tot_classes}
                    />
                  </div>
                );
              })}
            </Typography>
          </AccordionDetails>
          <AccordionActions>
            <StyledButton text="ATTENDED" onClick={attended} />
            <StyledButton text="SKIPPED" onClick={missed} />
            <StyledButton
              text={
                <SimplePopover name="SET" sub={props.sub} content={ChangeAtt} />
              }
            />
            <StyledButton text="DELETE" onClick={deleteAtt} />
          </AccordionActions>
        </Accordion>
      </div>
    </div>
  );
}
