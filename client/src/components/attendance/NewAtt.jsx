import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import ClassIcon from "@material-ui/icons/Class";
import Text from "../Text";
import StyledButton from "../StyledButton";

export default function NewAttendance(props) {
  const [sub, setSub] = useState("");

  function handleChange(event) {
    setSub(event.target.value);
  }

  function handleSubmit() {
    if (sub === "") {
      toast.warning("Input Field cannot be Empty!");
    } else {
      axios
        .post("/newAtt", {
          user_id: props.user_id,
          sub_att: sub,
        })
        .then((res) => {
          props.close(null);
          toast.success(res.data);
          axios
            .post("/subAtt", {
              sub_att: sub,
              attended: 0,
              tot_classes: 0,
            })
            .then((res) => {});
        });
    }
  }

  return (
    <div>
      <h1>Add a new Class</h1>
      <form>
        <Text
          label="Class"
          value={sub}
          onChange={handleChange}
          tag={ClassIcon}
          autoFocus
        />
        <StyledButton
          text="Add Subject"
          margin="30px 0px 0px 200px"
          onClick={handleSubmit}
        />
      </form>
    </div>
  );
}
