import React ,{useState,useRef} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Card, Col, Container, Form, FormGroup, Input, Label, Row } from "reactstrap";
import logo from "../Assets/images/mannai_logo.png";
import mannaiBuilding from "../Assets/images/mannai_building_2.jpg";
import backgroundImg from "../Assets/images/background_login.jpg";
import { useNavigate,useLocation } from "react-router-dom";
import './Login.scss';
import TopLoadingBar from 'react-top-loading-bar';

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

    //authentication api 

   // const navigate = useNavigate();
    const location = useLocation();

    const loadingBarRef = useRef(null); // Create a ref for the loading bar
  
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [otcsTicket, setOTCSTicket] = useState(null); // storing SAG ticket value
    const [eimsTicket, setEimsTicket] = useState(null); // storing EIMS demo ticket value
    const [error, setError] = useState(null);
  
    const handleLogin = async (e) => {
      e.preventDefault();
      loadingBarRef.current?.continuousStart(); // Start the loading bar
      const sagApiUrl = 'http://MANSAGWM01:7777/devgw/eims/v1/auth';
      const eimsApiUrl = 'http://eimsdemo.mannaicorp.com.qa/otcs/cs.exe/api/v1/auth';
  
      const headers = {};
  
      const formData = new FormData();
      formData.append('username', email);
      formData.append('password', password);
  
      try {
        const [sagResponse, eimsResponse] = await Promise.all([
          fetch(sagApiUrl, {
            method: 'POST',
            headers: headers,
            body: formData,
          }),
          fetch(eimsApiUrl, {
            method: 'POST',
            headers: headers,
            body: formData,
          }),
        ]);
  
        if (!sagResponse.ok) {
          throw new Error(`    Invalid username/password: ${sagResponse.statusText}`);
        }
        if (!eimsResponse.ok) {
          throw new Error(`Invalid username/password: ${eimsResponse.statusText}`);
        }
  
        const sagData = await sagResponse.json();
        const eimsData = await eimsResponse.json();
  
        if (sagData.ticket && eimsData.ticket) {
          const sagTicket = sagData.ticket;
          const eimsTicket = eimsData.ticket;
          setOTCSTicket(sagTicket);
          setEimsTicket(eimsTicket);
          sessionStorage.setItem('otcsTicket', sagTicket);
          sessionStorage.setItem('eimsTicket', eimsTicket);
  
          console.log('SAG Ticket:', sagTicket);
          console.log('EIMS Ticket:', eimsTicket);
  
          const redirectUrl = new URLSearchParams(location.search).get('redirect') || '/Dashboard';
          navigate(redirectUrl, { state: { eimsTicket: eimsTicket, otcsTicket: sagTicket } });
        } else {
          throw new Error('Authentication failed: No ticket in response');
        }
      } catch (error) {
        setError(error.message);
      }
      finally{
        loadingBarRef.current.complete(); // Complete the loading bar
      }
    };

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
    <TopLoadingBar ref={loadingBarRef} color="#f11946"  />
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

            <Form className="flex-grow-1 d-flex flex-column justify-content-center" onSubmit={handleLogin}>
              <h3 className="fw-normal mb-4 text-center">Login Form</h3>

              <FormGroup className="mb-4">
                <Label for="formControlLgEmail">Username</Label>
                <Input 
                  name="email"
                  type="text"
                  id="formControlLgEmail"
                  className="form-control-lg border-0 border-bottom"
                  value={email}
                  onChange={(e)=>setEmail(e.target.value)}
                  style={{ borderRadius: 0, boxShadow: "none", padding: 0 }}
                />
              </FormGroup>

              <FormGroup className="mb-4">
                <Label for="formControlLgPassword">Password</Label>
                <Input 
                  name="password"
                  type="password"
                  id="formControlLgPassword"
                  className="form-control-lg border-0 border-bottom"
                  value={password}
                  onChange={(e)=>setPassword(e.target.value)}
                  style={{ borderRadius: 0, boxShadow: "none", padding: 0 ,fontSize:14}}
                />
              </FormGroup>

              <Button
               type="submit"
               // onClick={() => navigate("/Dashboard")}
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
              {error && <div style={{ color: 'red', textAlign:'center' }}>{error}</div>}
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
