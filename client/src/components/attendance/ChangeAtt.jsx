import React, { useState } from "react";
import axios from "axios";
import Text from "../Text";
import { toast } from "react-toastify";
import StyledButton from "../StyledButton";

export default function ChangeAtt(props) {
  const [update, setUpdate] = useState({
    attended: "",
    tot_classes: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setUpdate((prevVal) => {
      return {
        ...prevVal,
        [name]: value,
      };
    });
  }

  function handleSubmit() {
    if (update.attended === null || update.tot_classes === null) {
      toast.warning("Input Fields cannot be Empty!");
    } else {
      axios
        .put("/updateAtt", {
          sub_att: props.sub,
          attended: update.attended,
          tot_classes: update.tot_classes,
        })
        .then((res) => {
          props.close(null);
          toast.success(res.data);
        });
    }
  }

  return (
    <div>
      <h1>Update Records</h1>
      <form>
        <Text
          label="Attended Classes"
          name="attended"
          value={update.attended}
          onChange={handleChange}
          autoFocus
        />
        <br />
        <br />
        <Text
          label="Total Classes Taken"
          name="tot_classes"
          value={update.tot_classes}
          onChange={handleChange}
        />
        <StyledButton
          text="Update"
          margin="30px 0px 0px 230px"
          onClick={handleSubmit}
        />
      </form>
    </div>
  );
}
