import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

function LinearProgressWithLabel(props) {
  const classes = useStyles();
  return (
    <Box display="flex" alignItems="center">
      <Box width="100%" mr={1}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box minWidth={35}>
        <Typography component={"span"} variant="body2" className={classes.col} >{`${Math.round(
          props.value,
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

LinearProgressWithLabel.propTypes = {
  value: PropTypes.number.isRequired,
};

const useStyles = makeStyles({
  root: {
    width: "100%",
    marginTop: "10px",
  },
  col: {
    color: "#fff"
  }
});

export default function LinearWithValueLabel(props) {
  const classes = useStyles();

  const perc = (props.numer / props.denom) * 100;
  return (
    <div className={classes.root}>
      <LinearProgressWithLabel value={perc} />
    </div>
  );
}
