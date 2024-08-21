import React from "react";
import { Card, CardBody } from "reactstrap";

const StatusDetailedInfo = function ({ title, subTitle, footer, footer2 }) {
  return (
    <Card style={{ paddingTop: 25, paddingLeft: 25 }}>
      <CardBody
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <h5 className="mb-3" style={{ marginBottom: "0.5rem" }}>
          {title}
        </h5>
        <p style={{ marginBottom: "1rem" }}>{subTitle}</p>
        <p>
          <strong>{footer}</strong>
        </p>
        <strong style={{ marginBottom: 25, marginTop: -15 }}>{footer2}</strong>
      </CardBody>
    </Card>
  );
};

export default StatusDetailedInfo;
