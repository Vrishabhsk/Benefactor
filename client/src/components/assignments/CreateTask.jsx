import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import TitleIcon from "@material-ui/icons/Title";
import DescriptionIcon from "@material-ui/icons/Description";
import Text from "../Text";
import StyledButton from "../StyledButton";

export default function CreateTask(props) {
  const [task, setTask] = useState({
    sub: "",
    des: "",
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
        .post("/newTask", {
          user_id: props.user_id,
          sub: task.sub,
          des: task.des,
        })
        .then((res) => {
          props.close(null);
          toast.success(res.data);
        });
    }
  }

  return (
    <div>
      <h1>Add your Title and its related Task</h1>
      <form>
        <Text
          label="Title"
          name="sub"
          value={task.sub}
          onChange={handleChange}
          autoFocus
          tag={TitleIcon}
        />
        <br />
        <br />
        <Text
          label="Description"
          name="des"
          multiline
          rows={4}
          value={task.des}
          onChange={handleChange}
          tag={DescriptionIcon}
        />
        <StyledButton text="Add Task" margin="30px 0px 0px 230px" onClick={handleSubmit} />
      </form>
    </div>
  );
}
