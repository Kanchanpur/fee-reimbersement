import React from "react";
import { Button, Col, Row } from "reactstrap";
import CustomProgressBar from "./CustomProgressBar";
import { MdMoreHoriz, MdOutlineClose } from "react-icons/md";
import StatusDetailedInfo from "./StatusDetailedInfo";

const ExpandedView = function ({
  index,
  handleDetailsClick,
  expandedDetails,
  statusTitle,
  stages,
  detailsTitle,
  detailsSubTitle,
  detailsFooter,
  detailsFooter2,
}) {
  return (
    <tr>
      <td colSpan="9" align="center" style={{ backgroundColor: "#f2f2f2" }}>
        <Row className="flex" style={{margin:0}}>
          <Col md="11">
            <p
              style={{
                fontWeight: "bold",
                marginTop: 15,
                marginBottom: -25,
              }}
            >
              {statusTitle}
            </p>
            <CustomProgressBar stages={stages} />
          </Col>
          <Col
            md="1"
            className="d-flex justify-content-center align-items-center"
          >
            <Button
              color="link"
              style={{
                textDecoration: "none",
                fontSize: 15,
                padding: 0,
                marginBottom: 5,
              }}
              onClick={() => handleDetailsClick(index)}
            >
              {expandedDetails === index ? (
                <MdOutlineClose size={30} />
              ) : (
                <MdMoreHoriz size={30} />
              )}
            </Button>
          </Col>
        </Row>
        {expandedDetails === index && (
          <Col md="12" className="mt-3">
            <StatusDetailedInfo
              title={detailsTitle}
              subTitle={detailsSubTitle}
              footer={detailsFooter}
              footer2={detailsFooter2}
            />
          </Col>
        )}
      </td>
    </tr>
  );
};

export default ExpandedView;
