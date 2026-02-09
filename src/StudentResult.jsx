import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addResult, deleteResult } from "./resultSlice";
import "./StudentResult.css";

const StudentResult = () => {
  const dispatch = useDispatch();
  const results = useSelector((state) => state.results);

  const [form, setForm] = useState({
    name: "",
    subject: "",
    marks: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = () => {
    if (!form.name || !form.subject || !form.marks) {
      alert("Please fill all fields");
      return;
    }

    const marks = Number(form.marks);

    dispatch(
      addResult({
        id: Date.now(),
        name: form.name,
        subject: form.subject,
        marks: marks,
        result: marks >= 35 ? "Pass" : "Fail"
      })
    );

    setForm({ name: "", subject: "", marks: "" });
  };

  return (
    <div className="result-container">
      <h2>Student Result System</h2>

      {/* Form */}
      <div className="result-form">
        <input
          type="text"
          name="name"
          placeholder="Student Name"
          value={form.name}
          onChange={handleChange}
        />

        <input
          type="text"
          name="subject"
          placeholder="Subject"
          value={form.subject}
          onChange={handleChange}
        />

        <input
          type="number"
          name="marks"
          placeholder="Marks"
          value={form.marks}
          onChange={handleChange}
        />

        <button className="add-btn" onClick={handleSubmit}>
          Add Result
        </button>
      </div>

      <hr className="divider" />

      {/* Result List */}
      <ul className="result-list">
        {results.length === 0 ? (
          <p style={{ textAlign: "center", color: "#777" }}>
            No results added yet
          </p>
        ) : (
          results.map((student) => (
            <li className="result-item" key={student.id}>
              <span>
                {student.name} | {student.subject} | {student.marks} |{" "}
                <span
                  className={
                    student.result === "Pass" ? "pass" : "fail"
                  }
                >
                  {student.result}
                </span>
              </span>

              <button
                className="delete-btn"
                onClick={() => dispatch(deleteResult(student.id))}
              >
                ❌
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default StudentResult;
