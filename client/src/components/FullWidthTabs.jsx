import React, { useEffect, useState } from "react";
import Work from "./Work";
import axios from "axios";
import DisplayTask from "./assignments/DisplayTask";
import CreateTask from "./assignments/CreateTask";
import NewSubject from "./grades/NewSubject";
import { toast } from "react-toastify";
import DisplaySubs from "./grades/DisplaySubs";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import NewAtt from "./attendance/NewAtt";
import DisplayAtt from "./attendance/DisplayAtt";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography component={"span"}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#393232",
    margin: "auto",
    width: "60%",
    ["@media (max-width: 420px)"]: {  // eslint-disable-line no-useless-computed-key
      width: "98%",
    },
    height: "100%",
    textAlign: "center",
    border: "3px solid black",
  },
  tabs: {
    backgroundColor: "#393e46",
    color: "white",
    fontFamily: "Space Mono, monospace",
  },
}));

export default function FullWidthTabs(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const [tasks, setTasks] = useState([]);
  const [subs, setSubs] = useState([]);
  const [subs_att, setSubs_Att] = useState([]);
  const [id, setId] = useState("");

  useEffect(() => {
    setId(props.id);
    if (value === 0) getTasks();
    if (value === 1) getSubs();
    if (value === 2) getAtt();
  });


  function getTasks() {
    axios
      .get(`/getTask/${id}`)
      .then((res) => {
        if (res.data === "Not Authorized") {
          toast.warning("Session Ended Login Again");
        } else {
          if (res.data !== undefined) {
            setTasks(res.data);
          }
        }
      })
      .catch((err) => {});
  }

  function getSubs() {
    axios.get(`/getSubs/${id}`).then((res) => {
      if (res.data === "Not Authorized") {
        toast.warning("Session Ended Login Again");
      } else {
        if (res.data !== undefined) {
          setSubs(res.data);
        }
      }
    });
  }

  function getAtt() {
    axios.get(`/getAtt/${id}`).then((res) => {
      if (res.data === "Not Authorized") {
        toast.warning("Session Ended Login Again");
      } else {
        if (res.data !== undefined) {
          setSubs_Att(res.data);
        }
      }
    });
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab className={classes.tabs} label="Assignments" {...a11yProps(0)} />
          <Tab className={classes.tabs} label="Grades" {...a11yProps(1)} />
          <Tab className={classes.tabs} label="Attendance" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <div>Remaining Assignments</div>
          <Work user_id={id} objs={["Add Tasks"]} content={CreateTask} />
          {tasks.map((task, index) => {
            return (
              <div key={index}>
                <DisplayTask
                  key={index}
                  task_id={task.task_id}
                  sub={task.sub}
                  des={task.des}
                />
                <br />
              </div>
            );
          })}
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <div>Subjects</div>
          <Work user_id={id} objs={["Add Subject"]} content={NewSubject} />
          {subs.map((subject, index) => {
            return (
              <div key={index}>
                <DisplaySubs sub={subject.sub} />
                <br />
              </div>
            );
          })}
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          <div>Classes</div>
          <Work user_id={id} objs={["Add Class"]} content={NewAtt} />
          {subs_att.map((subs, index) => {
            return (
              <div key={index}>
                <DisplayAtt sub={subs.sub_att} />
                <br />
              </div>
            );
          })}
        </TabPanel>
      </SwipeableViews>
    </div>
  );
}