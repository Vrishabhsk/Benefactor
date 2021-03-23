import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import Text from "../Text";
import StyledButton from "../StyledButton";
import SubjectIcon from "@material-ui/icons/Subject";

export default function NewSubject(props) {
  const [sub, setSub] = useState("");

  function handleChange(event) {
    setSub(event.target.value);
  }

  function handleSubmit() {
    if (sub === "") {
      toast.warning("Input Field cannot be Empty!");
    } else {
      axios
        .post("/newSub", {
          user_id: props.user_id,
          subject: sub,
        })
        .then((res) => {
          toast.success(res.data);
          props.close(null);
        });
    }
  }

  return (
    <div>
      <h1>Add New Subject</h1>
      <form>
        <Text
          label="Subject"
          name="sub"
          value={sub}
          onChange={handleChange}
          autoFocus
          tag={SubjectIcon}
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
