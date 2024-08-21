import React ,{ useState } from 'react';
import { Container, Row, Col, Table, Button } from 'reactstrap';
import { Card, CardBody, CardTitle,  Dropdown, Input, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { FaFileAlt } from 'react-icons/fa';
import { FaUser, FaCog, FaBell, FaSearch, FaPlus, FaSignOutAlt } from 'react-icons/fa';
import './Style.scss';
import { FaPaperclip } from 'react-icons/fa'; 
import Layout from '../components/Layout';
import { useNavigate } from "react-router-dom";
const Hrviewdetail = () => {
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
    <Card className="view-container mt-3">
    <h5>View Details</h5>

      {/* View Details Section */}
      <div className="view-details-section mb-4">
       
        <Table responsive bordered className='viewtable'>
          <thead>
            <tr>
              <th>No</th>
              <th>Child Name</th>
              <th>DOB</th>
              <th>Description</th>
              <th>Fees(QAR)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>ChildName1</td>
              <td>01/07/2009</td>
              <td>DummyText</td>
              <td>4000</td>
            </tr>
            <tr>
              <td>2</td>
              <td>ChildName2</td>
              <td>11/10/2012</td>
              <td>DummyText</td>
              <td>2000</td>
            </tr>
          </tbody>
        </Table>
      </div>

      {/* Attachments Section */}
      <div className="attachments-section mb-4">
        <h6  style={{fontWeight:600}}>Attachments</h6>
        <Row>
          <Col md={2}>
            <Button color="link" className="p-0">
            <FaPaperclip className="mr-1" /> ViewAttachment1     
            </Button>
          </Col>
          <Col md={2}>
            <Button color="link" className="p-0">
              <FaPaperclip className="mr-1" /> ViewAttachment2
            </Button>
          </Col>
          <Col md={2}>
            <Button color="link" className="p-0">
              <FaPaperclip className="mr-1" /> ViewAttachment3
            </Button>
          </Col>

        </Row>
      </div>

     

      {/* Action Buttons */}
      <div className="text-right" style={{textAlign:'right'}}>
        <Button color="primary" className="mr-2">Save For Later</Button>
        <Button color="primary">Submit</Button>
        <Button color="secondary" className="mr-2">Cancel</Button>  
        <Button color="primary" className=" formbuttons mr-2"  onClick={() => navigate("/Dashboard")}>Back</Button> 
      </div>
    </Card>
    </Layout>
  );
};

export default Hrviewdetail;
