import React from "react";
import { Button, Col, Row } from "reactstrap";

const AdminExpandedView = function ({
  index,
  handleDetailsClick,
  statusTitle,
  childrenCount,
  amount,
}) {
  return (
    <tr>
      <td colSpan="9" align="start" style={{ backgroundColor: "#f2f2f2" }}>
        <Row className="flex">
          <Col md="6">
            <p style={{ fontWeight: "bold" }}>{statusTitle}</p>
            <p>Children count: {childrenCount}</p>
            <p>Amount: {amount}</p>
          </Col>
          <Col
            md="2"
            className="d-flex justify-content-center align-items-center"
          >
            <Button
              color="success"
              style={{ width: "100%" }}
            >
              Accept
            </Button>
          </Col>
          <Col
            md="2"
            className="d-flex justify-content-center align-items-center"
          >
            <Button
              color="danger"
              style={{ width: "100%" }}
            >
              Reject
            </Button>
          </Col>
          <Col
            md="2"
            className="d-flex justify-content-center align-items-center"
          >
            <Button
              color="primary"
              style={{ width: "100%" }}
              onClick={() => handleDetailsClick(index)}
            >
              Advanced Details
            </Button>
          </Col>
        </Row>
      </td>
    </tr>
  );
};

export default AdminExpandedView;