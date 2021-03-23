import React from "react";
import PropTypes from "prop-types";
import {
  TextField,
  InputAdornment,
  withStyles,
  createMuiTheme,
  ThemeProvider,
} from "@material-ui/core";
import { red } from "@material-ui/core/colors";

const styled = (theme) => ({
  notchedOutline: {
    borderColor: "black !important",
    borderWidth: "3px",
  },
});

const theme = createMuiTheme({
  palette: {
    primary: red,
  },
});

function Text(props) {
  const { classes } = props;
  return (
    <ThemeProvider theme={theme}>
      <TextField
        label={props.label}
        variant="outlined"
        onChange={props.onChange}
        name={props.name}
        value={props.value}
        fullWidth
        rows={props.rows}
        multiline={props.multiline}
        required
        type={props.type}
        autoFocus={props.autoFocus}
        InputProps={{
          className: "col",
          classes: {
            notchedOutline: classes.notchedOutline,
          },
          startAdornment: props.tag ? (
            <InputAdornment position="start">
              <props.tag />
            </InputAdornment>
          ) : null,
        }}
        className={classes.textField}
      />
    </ThemeProvider>
  );
}

Text.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styled)(Text);
