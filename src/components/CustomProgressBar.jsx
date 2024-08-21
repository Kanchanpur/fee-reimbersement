import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const CustomProgressBar = ({ stages }) => {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ width: "70%" }}
    >
      {stages.map((step, index) => (
        <React.Fragment key={step.id}>
          <div style={{ minWidth: "10px", paddingTop: 50, marginBottom: 20 }}>
            <button
              className={`expand btn text-white btn-sm rounded-pill ${
                step.completed
                  ? step.isApproved
                    ? "bg-success"
                    : "bg-danger"
                  : "bg-secondary"
              }`}
              style={{ width: "1.5rem", height: "1.5rem" }}
              disabled={!step.completed}
            >
              {/* {step.id} */}
            </button>
            <div
              style={{
                marginTop: "0.5rem",
                width: "10rem",
                textAlign: "start",
                marginLeft: -20,
              }}
            >
              {step.label}
            </div>
          </div>
          {index < stages.length - 1 && (
            <div
              className="d-flex align-items-center"
              style={{ width: "190%" }}
            >
              <span
                className={`${
                  stages[index + 1].completed ? "bg-success" : "bg-secondary"
                }  rounded mx-1`}
                style={{ height: "0.2rem", width: "200%" }}
              ></span>
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default CustomProgressBar;
