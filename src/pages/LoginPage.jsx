import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Card, Col, Container, Form, FormGroup, Input, Label, Row } from "reactstrap";
import logo from "../Assets/images/mannai_logo.png";
import mannaiBuilding from "../Assets/images/mannai_building_2.jpg";
import backgroundImg from "../Assets/images/background_login.jpg";
import { useNavigate } from "react-router-dom";
import './Login.scss';

const LoginPage = function () {
  <style>
        {`
          .custom-style {
            background-color: #050554 !important;
            color: white !important;
          }
        `}
      </style>
  const navigate = useNavigate();

  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        backgroundImage: `url(${backgroundImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Card
        className="shadow-lg w-100"
        style={{ maxWidth: "1000px", borderRadius: "15px", overflow: "hidden" }}
      >
        <Row className="g-0 h-100">
          <Col md={6} className="p-5 d-flex flex-column justify-content-between">
            <div className="d-flex justify-content-start mb-4">
              <img
                src={logo}
                alt="Logo"
                style={{
                  width: "170px",
                  height: "auto",
                }}
              />
            </div>

            <Form className="flex-grow-1 d-flex flex-column justify-content-center">
              <h3 className="fw-normal mb-4 text-center">Login Form</h3>

              <FormGroup className="mb-4">
                <Label for="formControlLgEmail">Username</Label>
                <Input
                  type="email"
                  id="formControlLgEmail"
                  className="form-control-lg border-0 border-bottom"
                  style={{ borderRadius: 0, boxShadow: "none", padding: 0 }}
                />
              </FormGroup>

              <FormGroup className="mb-4">
                <Label for="formControlLgPassword">Password</Label>
                <Input
                  type="password"
                  id="formControlLgPassword"
                  className="form-control-lg border-0 border-bottom"
                  style={{ borderRadius: 0, boxShadow: "none", padding: 0 ,fontSize:14}}
                />
              </FormGroup>

              <Button
                onClick={() => navigate("/Dashboard")}
                className="mb-4 px-5 w-100 custom-style "
                style={{ backgroundColor: "#050554!important" , color: "white!important" }}
              >
                Login
              </Button>

              <p className="text-center mt-3">
                Forgot Password?{" "}
                <a
                  href="/"
                  className="text-dark"
                  style={{ fontWeight: "bold", textDecoration: "none" }}
                >
                  Click Here
                </a>
              </p>
            </Form>
          </Col>

          <Col md={6} className="d-none d-md-block p-0">
            <img
              src={mannaiBuilding}
              alt="Login"
              className="img-fluid h-100 w-100"
              style={{
                objectFit: "cover",
              }}
            />
          </Col>
        </Row>
      </Card>
    </Container>
  );
};

export default LoginPage;
