const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const pool = require("./db");
const jwtGenerator = require("./utils/jwtGenerator");
const auth = require("./middleware/auth");
const PORT = process.env.PORT;
const path = require("path");

const app = express();

app.use(express.json());
app.use(cors());

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));
}

//-------------------------------------------------- AUTHENTICATION AND AUTHORIZATION ---------------------------------

//authenticating new user using jwt
app.post("/registerUser", (req, res) => {
  const { username, email, password } = req.body;
  pool.query(
    "SELECT * FROM users WHERE username=$1",
    [username],
    (err, user) => {
      if (user.rows.length !== 0) {
        return res.json("User already exist");
      }
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, (err, hash) => {
          pool.query(
            "INSERT INTO users (username,email,password) VALUES ($1,$2,$3) RETURNING *",
            [username, email, hash],
            (err, user) => {
              const token = jwtGenerator(user.rows[0].user_id);
              res.json({ token });
            },
          );
        });
      });
    },
  );
});

//signing in the user if registered
app.post("/loginUser", (req, res) => {
  const { username, password } = req.body;
  pool.query(
    "SELECT * FROM users WHERE username=$1",
    [username],
    (err, user) => {
      if (err) res.json(err);
      if (user.rows.length === 0) {
        return res.json("Email or Password is incorrect!");
      }
      bcrypt.compare(password, user.rows[0].password, (err, result) => {
        if (err) throw err;
        else if (!result) res.json("Email or Password is incorrect");
        else {
          const token = jwtGenerator(user.rows[0].user_id);
          res.json({ token });
        }
      });
    },
  );
});

//checking if user is authorized
app.get("/verified", auth, (req, res) => {
  res.json(true);
});

//sending user_id to frontend
app.get("/dash", auth, (req, res) => {
  res.json(req.user);
});

// ---------------------------------------------------- ASSIGNMENTS -------------------------------------------------

//adding a new task
app.post("/newTask", (req, res) => {
  const { user_id, sub, des } = req.body;
  pool.query(
    "INSERT INTO tasks (user_id,sub,des) VALUES ($1,$2,$3) RETURNING *",
    [user_id, sub, des],
    (err, result) => {
      if (err) res.json("Not Authorized");
      if (result) res.json("New Task Added");
    },
  );
});

//sending all the tasks
app.get("/getTask/:id", (req, res) => {
  const id = req.params.id;
  pool.query("SELECT * FROM tasks WHERE user_id=$1", [id], (err, task) => {
    if (err) res.json("Not Authorized");
    if (task) res.json(task.rows);
  });
});

//sending a single task
app.get("/getSingle/:id", (req, res) => {
  const id = req.params.id;
  pool.query("SELECT * FROM tasks WHERE task_id=$1", [id], (err, task) => {
    if (task) res.json(task.rows[0]);
  });
});

//updating a single task
app.put("/updateTask/:task_id/:sub/:des", (req, res) => {
  const { task_id, sub, des } = req.params;
  pool.query(
    "UPDATE tasks SET sub=$1,des=$2 WHERE task_id=$3",
    [sub, des, task_id],
    (err, result) => {
      if (err) throw err;
      if (result) res.json("Task Updated SuccessFully");
    },
  );
});

//deleting a single Task
app.delete("/deleteTask/:taskId", (req, res) => {
  const { taskId } = req.params;
  pool.query("DELETE FROM tasks WHERE task_id=$1", [taskId], (err, result) => {
    if (err) throw err;
    if (result) res.json("Task Deleted SuccessFully");
  });
});

//---------------------------------------------------------- GRADES --------------------------------------------------------

//adding a new subject and exams for that particular subject
app.post("/newSub", (req, res) => {
  const { user_id, subject } = req.body;
  pool.query(
    "INSERT INTO subjects (user_id,sub) VALUES ($1,$2) RETURNING *",
    [user_id, subject],
    (err, result) => {
      if (err) throw err;
      if (result) res.json("New Subject Added");
    },
  );
});

//adding a new exam to a particular subject
app.post("/newExam", (req, res) => {
  const { subject, exam_name, max_marks, scored } = req.body;
  pool.query(
    "INSERT INTO exams VALUES($1,$2,$3,$4) RETURNING *",
    [subject, exam_name, max_marks, scored],
    (err, result) => {
      if (err) throw err;
      if (result) res.json("Exam Info Added");
    },
  );
});

//getting all the subjects
app.get("/getSubs/:id", (req, res) => {
  const { id } = req.params;
  pool.query("SELECT sub FROM subjects WHERE user_id=$1", [id], (err, sub) => {
    if (err) {
      res.json("Not Authorized");
    } else if (sub) {
      res.json(sub.rows);
    }
  });
});

//getting exam records
app.get("/getExamInfo/:sub", (req, res) => {
  const { sub } = req.params;
  pool.query("SELECT * FROM exams WHERE sub=$1", [sub], (err, exam) => {
    if (err) throw err;
    if (exam) res.json(exam.rows);
  });
});

//update exam details
app.put("/updateInfo", (req, res) => {
  const { prev_name, exam_name, max_marks, scored, sub } = req.body;
  pool.query(
    "UPDATE exams SET exam_name=$1,max_marks=$2,scored=$3 WHERE sub=$4 AND exam_name=$5",
    [exam_name, max_marks, scored, sub, prev_name],
    (err, result) => {
      if (err) throw err;
      if (result) res.json("Exam Info Updated");
    },
  );
});

//deleting the subject and all its relevant exams
app.delete("/deleteSub/:sub", (req, res) => {
  const { sub } = req.params;
  pool.query("DELETE FROM exams WHERE sub=$1", [sub], (err, result) => {
    if (err) throw err;
    if (result) {
      pool.query("DELETE FROM subjects WHERE sub=$1", [sub], (err, del) => {
        if (err) throw err;
        if (del) res.json("Exam Info And Subject Deleted");
      });
    }
  });
});

//---------------------------------------------------------- ATTENDANCE ------------------------------------------------------

//adding new subject to attendance column
app.post("/newAtt", (req, res) => {
  const { user_id, sub_att } = req.body;
  pool.query(
    "INSERT INTO attendance VALUES ($1,$2) RETURNING *",
    [user_id, sub_att],
    (err, result) => {
      if (err) throw err;
      if (result) res.json("New Class Added");
    },
  );
});

//adding attendance records to each subject
app.post("/subAtt", (req, res) => {
  const { sub_att, attended, tot_classes } = req.body;
  pool.query(
    "INSERT INTO att VALUES ($1,$2,$3) RETURNING *",
    [sub_att, attended, tot_classes],
    (err, result) => {
      if (err) throw err;
    },
  );
});

//displaying the subjects
app.get("/getAtt/:id", (req, res) => {
  const { id } = req.params;
  pool.query("SELECT * FROM attendance WHERE user_id=$1", [id], (err, subs) => {
    if (err) throw err;
    if (subs) res.json(subs.rows);
  });
});

//displaying attendace records
app.get("/getSubAtt/:sub", (req, res) => {
  const { sub } = req.params;
  pool.query("SELECT * FROM att WHERE sub_att=$1", [sub], (err, att) => {
    if (err) throw err;
    if (att) res.json(att.rows);
  });
});

//update the records
app.put("/updateAtt", (req, res) => {
  const { sub_att, attended, tot_classes } = req.body;
  pool.query(
    "UPDATE att SET attended=$1,tot_classes=$2 WHERE sub_att=$3",
    [attended, tot_classes, sub_att],
    (err, result) => {
      if (err) throw err;
      if (result) res.json("Record Set");
    },
  );
});

//incrementing attended classes and total classes
app.put("/attended", (req, res) => {
  const { sub_att } = req.body;
  pool.query(
    "UPDATE att SET attended=attended+1,tot_classes=tot_classes+1 WHERE sub_att=$1",
    [sub_att],
    (err, result) => {
      if (err) throw err;
    },
  );
});

//inrementing only total classes
app.put("/missed", (req, res) => {
  const { sub_att } = req.body;
  pool.query(
    "UPDATE att SET tot_classes=tot_classes+1 WHERE sub_att=$1",
    [sub_att],
    (err, result) => {
      if (err) throw err;
    },
  );
});

//deleting records and the subject
app.delete("/delete/:sub", (req, res) => {
  // const { sub } = req.params;
  const { sub } = req.params;
  pool.query("DELETE FROM att WHERE sub_att=$1", [sub], (err, result) => {
    if (err) throw err;
    if (result) {
      pool.query(
        "DELETE FROM attendance WHERE sub_att=$1",
        [sub],
        (err, done) => {
          if (err) throw err;
          if (done) res.json("Attendance Record and Subject Deleted");
        },
      );
    }
  });
});
//----------------------------------------------------------------------------------------------------------------------------

//catch-all method for client side rendering
app.get("/*", (req, res) => {
  try {
    res.sendFile(path.join(__dirname, "client/build/index.html"));
  } catch (error) {
    res.send(500).send(error);
  }
});

//port
app.listen(PORT, () => {
  console.log(`server started on ${PORT}`);
});
