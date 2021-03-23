import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Text from "../Text";
import StyledButton from "../StyledButton";

export default function UpdateGrade(props) {
  const [exam, setExam] = useState({
    exam_name: props.exam.exam_name,
    max_marks: props.exam.max_marks,
    scored: props.exam.scored,
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setExam((prevVal) => {
      return {
        ...prevVal,
        [name]: value,
      };
    });
  }

  function handleSubmit() {
    if (
      exam.exam_name === "" ||
      exam.max_marks === null ||
      exam.scored === null
    ) {
      toast.warning("Input Fields cannot be Empty!");
    } else {
      axios
        .put("/updateInfo", {
          prev_name: props.exam.exam_name,
          exam_name: exam.exam_name,
          max_marks: exam.max_marks,
          scored: exam.scored,
        })
        .then((res) => {
          toast.success(res.data);
          props.close(null);
        });
    }
  }

  return (
    <div>
      <h1>Update the given Exam details</h1>
      <form>
        <Text
          label="Exam"
          name="exam_name"
          value={exam.exam_name}
          onChange={handleChange}
          autoFocus
        />
        <br/><br/>
        <Text
          label="Max Marks Scoreable"
          name="max_marks"
          value={exam.max_marks}
          onChange={handleChange}
        />
        <br/><br/>
        <Text
          label="Marks Scored"
          name="scored"
          value={exam.scored}
          onChange={handleChange}
        />
        <StyledButton text="Update" margin="30px 0px 0px 230px" onClick={handleSubmit} />
      </form>
    </div>
  );
}
