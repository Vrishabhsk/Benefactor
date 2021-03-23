import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Text from "../Text";
import StyledButton from "../StyledButton";

export default function NewExam(props) {
  const [exam, setExam] = useState({
    exam_name: "",
    max_marks: "",
    scored: "",
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
        .post("/newExam", {
          subject: props.sub,
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
    <div className="popup">
      <h1>Add Exam and related marks scored</h1>
      <form>
        <Text
          label="Exam"
          name="exam_name"
          value={exam.exam_name}
          onChange={handleChange}
          autoFocus
        />
        <br />
        <br />
        <Text
          label="Total Marks"
          name="max_marks"
          value={exam.max_marks}
          onChange={handleChange}
        />
        <br />
        <br />
        <Text
          label="Marks Scored"
          name="scored"
          value={exam.scored}
          onChange={handleChange}
        />
        <StyledButton
          text="Add Exam"
          margin="30px 0px 0px 230px"
          onClick={handleSubmit}
        />
      </form>
    </div>
  );
}
