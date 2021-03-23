import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import SimplePopover from "../SimplePopover";
import StyledButton from "../StyledButton";
import NewExam from "../grades/NewExam";
import axios from "axios";
import Chip from "@material-ui/core/Chip";
import { AccordionActions } from "@material-ui/core";
import LinearWithValueLabel from "../LinearWithValueLabel";
import UpdateGrade from "./UpdateGrade";
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
    ["@media (max-width: 420px)"]: { // eslint-disable-line no-useless-computed-key
      marginBottom: "10px",
      position: "relative",
      right: "35px",
    },
    ["@media (max-width: 600px)"]: { // eslint-disable-line no-useless-computed-key
      marginBottom: "10px",
      position: "relative",
      right: "35px",
    },
    ["@media (width: 700px)"]: { // eslint-disable-line no-useless-computed-key
      marginBottom: "10px",
      position: "relative",
      right: "5px",
    },
  },
}));

export default function DisplaySubs(props) {
  const classes = useStyles();
  const [exams, setExams] = useState([]);

  useEffect(() => {
    getExams();
  });

  function getExams() {
    axios.get(`/getExamInfo/${props.sub}`).then((res) => {
      setExams(res.data);
    });
  }

  function deleteSub() {
    axios.delete(`/deleteSub/${props.sub}`).then((res) => {
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
              {exams.map((exam, index) => {
                return (
                  <div key={index}>
                    <Chip
                      className={classes.chip}
                      color="secondary"
                      label={"Exam: " + exam.exam_name}
                    />{" "}
                    <Chip
                      className={classes.chip}
                      color="secondary"
                      label={"Score: " + exam.scored + "/" + exam.max_marks}
                    />
                    <StyledButton
                      text={
                        <SimplePopover
                          name="UPDATE"
                          sub={props.sub}
                          exam_sub={exam}
                          content={UpdateGrade}
                        />
                      }
                      float="right"
                      margin="0px 0px 0px 30px"
                    />
                    <LinearWithValueLabel
                      numer={exam.scored}
                      denom={exam.max_marks}
                    />
                  </div>
                );
              })}
            </Typography>
          </AccordionDetails>
          <AccordionActions>
            <StyledButton
              text={
                <SimplePopover name="ADD" content={NewExam} sub={props.sub} />
              }
            />

            <StyledButton text="DELETE" onClick={deleteSub} />
          </AccordionActions>
        </Accordion>
      </div>
    </div>
  );
}
