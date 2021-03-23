import React from "react";
import Button from "@material-ui/core/Button";

export default function StyledButton(props) {
  return (
      <Button
        variant="contained"
        size={props.size}
        style={{ margin: props.margin, float: props.float }}
        onClick={props.onClick}
        color="primary"
      >
        {props.text}
      </Button>
  );
}
