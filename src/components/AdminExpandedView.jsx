import React from "react";
import { Button, Col, Row } from "reactstrap";
import { FaCheck,FaTimes} from 'react-icons/fa';
import '../pages/Style.scss';
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
            md="4"
            className="d-flex justify-content-right align-items-center"
          >
            <Button
              color="success"
              className="appr btn-success"
            >
             <FaCheck/> Accept
            </Button>
          
            <Button
              color="danger"
              className="rej btn-danger"
            >
             <FaTimes/> Reject
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
              More Details
            </Button>
          </Col>
        </Row>
      </td>
    </tr>
  );
};

export default AdminExpandedView;