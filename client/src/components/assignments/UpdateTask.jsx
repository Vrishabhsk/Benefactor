import axios from "axios";
import React, { useState } from "react";
import Text from "../Text";
import { toast } from "react-toastify";
import TitleIcon from "@material-ui/icons/Title";
import DescriptionIcon from "@material-ui/icons/Description";
import StyledButton from "../StyledButton";

export default function UpdateTask(props) {
  const [task, setTask] = useState({
    sub: props.sub,
    des: props.des,
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setTask((prevVal) => {
      return {
        ...prevVal,
        [name]: value,
      };
    });
  }

  function handleSubmit() {
    if (task.sub === "" || task.des === "") {
      toast.warning("Input Fields cannot by Empty!");
    } else {
      axios
        .put(
          `/updateTask/${props.task_id}/${task.sub}/${task.des}`,
        )
        .then((res) => {
          props.close(null);
          toast.success(res.data);
        });
    }
  }

  return (
    <div>
      <h1>Update Your Subject and its Description</h1>
      <form>
        <Text
          label="Title"
          name="sub"
          value={task.sub}
          onChange={handleChange}
          tag={TitleIcon}
          autoFocus
        />
        <br />
        <br />
        <Text
          label="Description"
          name="des"
          value={task.des}
          multiline
          rows={4}
          onChange={handleChange}
          tag={DescriptionIcon}
        />
        <StyledButton text="Update" margin="30px 0px 0px 230px" onClick={handleSubmit} />
      </form>
    </div>
  );
}
