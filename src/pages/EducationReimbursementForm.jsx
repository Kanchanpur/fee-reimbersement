import React ,{ useState } from 'react';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { Card, CardBody, CardTitle,  Table,  Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { FaUser, FaCog, FaBell, FaSearch, FaPlus, FaSignOutAlt } from 'react-icons/fa';
import './Style.scss';
import { FaChevronDown } from 'react-icons/fa';
import Layout from '../components/Layout';
import { useNavigate } from "react-router-dom";
const EducationReimbursementForm = () => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggleDropdown = () => {
    setDropdownOpen(prevState => !prevState);
  };
  return (
    <Layout>
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
          <Col md="7" className="text-right d-flex justify-content-end align-items-center">
          <span className="icon-circle">
            <FaUser size={15} />
          </span>
            <span className="mr-4 usertext">Welcome Username</span>
            <FaCog className="mr-4 cog-icon" size={26} />
            <span className="notification-icon">
      <span style={{marginRight:20}}><FaBell size={20} className="bell-icon" />
      <span className="notification-dot"></span></span>
      <span><FaSignOutAlt size={20} color='#444' /></span>
    </span>
            
          </Col>
        </Row>
      </div>
      <div class="page-header-title"><h5 class="m-b-10">Child Education Reimbursement Form</h5></div>
    <Card className="form-container mt-3">
      <h5 className="mb-4">Add Details</h5>
      <Form>
        <Row form>
          <Col md={6}>
            <FormGroup>
              <Label for="selectChild">Select Child</Label>
              <div className="input-group">
                <Input type="select" name="selectChild" id="selectChild">
                  <option>Child 1</option>
                  <option>Child 2</option>
                </Input>
                <span className="input-group-text">
                  <FaChevronDown />
                </span>
              </div>
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="dateOfBirth">Date Of Birth</Label>
              <Input type="date" name="dateOfBirth" id="dateOfBirth" />
            </FormGroup>
          </Col>
        </Row>
        <Row form>
          <Col md={6}>
            <FormGroup>
              <Label for="description">Description</Label>
              <Input type="text" name="description" id="description" placeholder="Enter description" />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="amount">Amount</Label>
              <Input type="number" name="amount" id="amount" placeholder="Enter amount" />
            </FormGroup>
          </Col>
          <Col md={12} className="text-right" style={{textAlign:'right'}}>
          <span className='btnlabel'>Add Child</span> <FaPlus size={24} color="Navy" />
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <p>To help approvers understand the request, you can attach supporting documents, images, or links to this action.</p>
          </Col>
        </Row>
        <Row form>
          <Col md={12}>
            <FormGroup>
              <Label for="fileUpload" style={{fontWeight:600}}>Attachments</Label>
              <div className="input-group">
                <Input type="file" name="fileUpload" id="fileUpload" />
                <Button color="" className='uplbtn'>Upload</Button>
              </div>
              <small className="form-text text-muted">Attach QID/Visa/Passport</small>
            </FormGroup>
          </Col>
        </Row>
        <Row form className="mt-4">
          <Col md={12} className="text-right" style={{textAlign:'right'}}>
          
            <Button color="primary" className=" formbuttons mr-2"  onClick={() => navigate("/Eduview")}>Apply</Button>
            <Button color="secondary" className="formbuttons mr-2">Cancel</Button>
            <Button color="primary" className=" formbuttons mr-2"  onClick={() => navigate("/Dashboard")}>Back</Button>
          
          </Col>
        </Row>
      </Form>
    </Card>
    </Layout>
  );
};

export default EducationReimbursementForm;
