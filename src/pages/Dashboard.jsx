import React, { useState, useEffect, useRef } from "react";
import Layout from "../components/Layout";
import child from "../Assets/images/child.png";
import totamt from "../Assets/images/totamt.png";
import penamt from "../Assets/images/penamt.png";
import {
  Card,
  CardBody,
  CardTitle,
  Row,
  Col,
  Button,
  Table,
  Input,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { FaUser, FaCog, FaBell, FaSearch, FaSignOutAlt } from "react-icons/fa";
import "./Style.scss";
import { MdAdd, MdOutlineRemove } from "react-icons/md";
import ExpandedView from "../components/ExpanedView";
import { dummyResponse } from "../utils/constants";
import { useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";

const Dashboard = () => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [expandedRow, setExpandedRow] = useState(null);
  const [expandedDetails, setExpandedDetails] = useState(null);

  const toggleDropdown = () => {
    setDropdownOpen((prevState) => !prevState);
  };
  const handleRowClick = (rowId) => {
    setExpandedRow(expandedRow === rowId ? null : rowId);
    setExpandedDetails(null);
  };

  const handleDetailsClick = (detailId) => {
    setExpandedDetails(expandedDetails === detailId ? null : detailId);
  };

  //modifieing with exist one features

  //const navigate = useNavigate();
  const location = useLocation();

  const [employeeData, setEmployeeData] = useState(null);
  const [reqData, setReqData] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [error, setError] = useState(null);

  // Extract OTCS ticket from location state
  const otcsTicket = location.state?.otcsTicket;
  const eimsTicket = location.state?.eimsTicket;

  const [childDetails, setChildDetails] = useState([]);

  const [dynamicData, setDynamicData] = useState([]);

  const [retryCount, setRetryCount] = useState(0);

  const hasFetchedData = useRef(false);
  const isRetrying = useRef(false);

  // const fetchEmployeeData = async () => {
  //   if (!otcsTicket) {
  //     setError("Authentication failed !!");
  //     return;
  //   }

  //   const apiUrl = "http://MANSAGWM01:7777/devgtw/manapp/employee";
  //   const headers = {
  //     "x-Gateway-APIKey": "98376315-6f9b-4c80-964e-4d11560a379c",
  //     "Content-Type": "application/json",
  //     OTCSTicket: otcsTicket,
  //   };

  //   try {
  //     const response = await fetch(apiUrl, {
  //       method: "GET",
  //       headers: headers,
  //     });

  //     if (response.status === 500) {
  //       throw new Error("Server error (500)");
  //     }

  //     if (!response.ok) {
  //       throw new Error(`Network response was not ok: ${response.statusText}`);
  //     }

  //     if (response.status === 200) {
  //       const empData = await response.json();
  //       console.log(empData);

  //       setEmployeeData(empData.empData);
  //       setReqData(empData.reqData);
  //       setChildDetails(empData);
  //       setDynamicData(empData);
  //       setRetryCount(0); // Reset the count
  //       isRetrying.current = false; // Reset the retry flag

  //     } else if (response.status === 204) {
  //       // Handle 204 No Content response appropriately
  //       console.log("No content available");
  //       Swal.fire("Employee is not registered !!");
  //       setRetryCount(0); // Reset the count
  //       isRetrying.current = false;
  //     }
  //   } catch (error) {
  //     if (retryCount < 4) {
  //       setRetryCount((prev) => prev + 1);
  //       isRetrying.current = true;
  //       setTimeout(() => fetchEmployeeData(), 1000); // Retry after 1 second
  //     } else {
  //       setError(error.message);
  //       isRetrying.current = false;
  //       navigate("/"); // Navigate to login page after 5 failed attempts
  //     }
  //   }
  // };

  // useEffect(() => {
  //   if (!hasFetchedData.current && otcsTicket && !isRetrying.current) {
  //     fetchEmployeeData();
  //     hasFetchedData.current = true;
  //   }
  // }, [otcsTicket]);

  const fetchEmployeeData = async () => {
    if (!otcsTicket) {
      setError("Authentication failed !!");
      return;
    }

    const apiUrl = "http://MANSAGWM01:7777/devgtw/manapp/employee";
    const headers = {
      "x-Gateway-APIKey": "98376315-6f9b-4c80-964e-4d11560a379c",
      "Content-Type": "application/json",
      OTCSTicket: otcsTicket,
    };

    try {
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: headers,
      });

      if (response.status === 500) {
        throw new Error("Server error (500)");
      }

      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }

      if (response.status === 200) {
        const empData = await response.json();
        console.log(empData);

        setEmployeeData(empData.empData);
        setReqData(empData.reqData);
        setChildDetails(empData);
        setDynamicData(empData);
        setRetryCount(0); // Reset the count
        isRetrying.current = false; // Reset the retry flag
      } else if (response.status === 204) {
        // Handle 204 No Content response appropriately
        console.log("No content available");
        Swal.fire("Employee is not registered !!");
        setRetryCount(0); // Reset the count
        isRetrying.current = false;
      }
    } catch (error) {
      if (retryCount < 4) {
        if (
          error.message.includes("Failed to fetch") ||
          error.message.includes("NetworkError")
        ) {
          console.error("CORS error or network error:", error.message);
          setError(
            "CORS error or network error. Please check your network connection or CORS settings."
          );
          isRetrying.current = false;
          Swal.fire({
            title: "Contact to system administrator !!",
            icon: "error",
            confirmButtonText: "OK",
          }).then(() => {
            navigate("/");
          });
          return;
        }
        setRetryCount((prev) => prev + 1);
        isRetrying.current = true;
        setTimeout(() => fetchEmployeeData(), 1000); // Retry after 1 second
      } else {
        setError(error.message);
        isRetrying.current = false;
        navigate("/"); // Navigate to login page after 5 failed attempts
      }
    }
  };

  useEffect(() => {
    if (!hasFetchedData.current && otcsTicket && !isRetrying.current) {
      fetchEmployeeData();
      hasFetchedData.current = true;
    }
  }, []);

  function handleNavigateToDependentFees() {
    // Additional logic if needed before navigation
    console.log("Navigating to Dependent Fees");

    // Navigate programmatically
    navigate("/dependent-fees", {
      state: { childDetails, otcsTicket, eimsTicket },
    });
  }

  function handleNavigateToHRPending() {
    // Navigate programmatically
    navigate("/HRPendingRequest", {
      state: { childDetails, otcsTicket, eimsTicket },
    });
  }

  useEffect(() => {
    //debugginh selected request is working or not
    console.log(selectedRequest);
  }, [selectedRequest]);

  function handleNextClick() {
    if (
      (selectedRequest && selectedRequest.RequestStatus === "Submitted") ||
      selectedRequest.RequestStatus === "Approved" ||
      selectedRequest.RequestStatus === "ActionRequired"
    ) {
      console.log(selectedRequest);

      navigate(`/dependent-view?${selectedRequest.RequestID}`, {
        state: { childDetails, selectedRequest, otcsTicket, eimsTicket },
      });
    } else if (selectedRequest && selectedRequest.RequestStatus === "Draft") {
      navigate(`/dependent-fees?${selectedRequest.RequestID}`, {
        state: { childDetails, selectedRequest, otcsTicket, eimsTicket },
      });
    } else {
      Swal.fire("Please select a request to proceed !!");
    }
  }

  const headersToShow = [
    "RequestID",
    "RequestDate",
    "Number of Child",
    "RequestStatus",
    "updateDate",
  ]; 

  const handleLogout=()=>{
      setTimeout(() => {
        navigate('/');
      }, 2000);
   
  }

  return (
    <Layout>
      {/* Header Section */}
      <div className="header-section mb-4">
        <Row className="align-items-center">
          <Col md="1">
            <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
              <DropdownToggle caret color="link">
                Dropdown
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem>Action 1</DropdownItem>
                <DropdownItem>Action 2</DropdownItem>
                <DropdownItem>Action 3</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </Col>
          <Col md="4">
            <div className="search-container">
              <Input type="search" placeholder="Type here ---" />
              <FaSearch className="search-icon" />
            </div>
          </Col>
          <Col
            md="7"
            className="text-right d-flex justify-content-end align-items-center"
          >
            <span className="icon-circle">
              <FaUser size={15} />
            </span>
            <span className="mr-4 usertext">Welcome , {employeeData?.Name}</span>
            <FaCog className="mr-4 cog-icon" size={26} />
            <span className="notification-icon">
              <span style={{ marginRight: 20 }}>
                <FaBell size={20} className="bell-icon" />
                <span className="notification-dot"></span>
              </span>
              <span>
                <FaSignOutAlt size={20} color="#444" onClick={handleLogout} style={{ cursor: 'pointer' }} />
              </span>
            </span>
          </Col>
        </Row>
      </div>
      {/*  */}
      {/* Existing Dashboard Content */}
      <Row>
        <Col md="12">
          <div className="page-header-title">
            <h5 className="m-b-10">Education Fees</h5>
          </div>
        </Col>
      </Row>
      <Row>
        <Col md="4">
          <Card>
            <CardBody>
              <CardTitle>No of Children</CardTitle>
              <img
                src={child}
                alt="child"
                style={{
                  width: "60px",
                  height: "auto",
                }}
                className="cardimage"
              />
              <h2>2</h2>
            </CardBody>
          </Card>
        </Col>
        <Col md="4">
          <Card>
            <CardBody>
              <CardTitle>Total Fee Reimbursed – Current Year</CardTitle>
              <img
                src={totamt}
                alt="totamt"
                style={{
                  width: "60px",
                  height: "auto",
                }}
                className="cardimage"
              />
              <h2 className="text-success">5000</h2>
            </CardBody>
          </Card>
        </Col>
        <Col md="4">
          <Card>
            <CardBody>
              <CardTitle>Pending Fees to Reimburse – Current Year</CardTitle>
              <img
                src={penamt}
                alt="penamt"
                style={{
                  width: "60px",
                  height: "auto",
                }}
                className="cardimage"
              />
              <h2 className="text-danger">2000</h2>
            </CardBody>
          </Card>
        </Col>
      </Row>

      <Card className="mt-4">
        <CardBody>
          <div className="cardheader">
            <CardTitle>Request Details</CardTitle>
            <Button
              color="primary"
              className="mb-3"
              onClick={() => navigate("/Eduform")}
            >
              Fee Reimbursement Request
            </Button>
          </div>
          <Table responsive>
            <thead>
              <tr>
                <th>SELECT</th>
                {headersToShow.map((header, index) => (
                  <th key={index}>{header.toUpperCase().replace("_", " ")}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {reqData ? (
                reqData.map((request, index) => (
                  <React.Fragment key={index}>
                    <tr>
                      <td style={{ textAlign: "center" }}>
                        <Input
                          type="radio"
                          name="requestSelect"
                          onChange={() => setSelectedRequest(request)}
                        />
                      </td>
                      {headersToShow.map((header, idx) => (
                        <td key={idx}>
                          {header === "Number of Child"
                            ? request.childCnt
                            : request[header]}
                        </td>
                      ))}
                      <td>
                        <Button
                          color="link"
                          style={{
                            textDecoration: "none",
                            fontSize: 15,
                            padding: 0,
                            marginBottom: 5,
                          }}
                          onClick={() => handleRowClick(index)}
                        >
                          {expandedRow === index ? (
                            <MdOutlineRemove size={20} />
                          ) : (
                            <MdAdd size={20} />
                          )}
                        </Button>
                      </td>
                    </tr>
                    {expandedRow === index && dummyResponse[index] && (
                      <ExpandedView
                        index={index}
                        handleDetailsClick={handleDetailsClick}
                        expandedDetails={expandedDetails}
                        stages={dummyResponse[index].stages}
                        statusTitle={dummyResponse[index].statusTitle}
                        detailsTitle={dummyResponse[index].detailsTitle}
                        detailsSubTitle={dummyResponse[index].detailsSubTitle}
                        detailsFooter={dummyResponse[index].detailsFooter}
                        detailsFooter2={dummyResponse[index].detailsFooter2}
                      />
                    )}
                  </React.Fragment>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={headersToShow.length + 2}
                    style={{ textAlign: "center" }}
                  >
                    No data available
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </Layout>
  );
};

export default Dashboard;
