import React, { useState } from 'react';
import { Row, Col, Form, FormGroup, Label, Input, Button, Card } from 'reactstrap';
import { FaPlus, FaChevronDown, FaMinus } from 'react-icons/fa';
import Layout from '../components/Layout';
import { useNavigate } from "react-router-dom";
import './Style.scss';

const EducationReimbursementForm = () => {
  const navigate = useNavigate();
  const [childForms, setChildForms] = useState([{ id: 1, selectChild: '', dateOfBirth: '', description: '', amount: '' }]);

  const addChildForm = () => {
    if (childForms.length < 2) {
      setChildForms([...childForms, { id: childForms.length + 1, selectChild: '', dateOfBirth: '', description: '', amount: '' }]);
    }
  };

  const removeChildForm = (index) => {
    setChildForms(childForms.filter((_, i) => i !== index));
  };

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const updatedForms = [...childForms];
    updatedForms[index][name] = value;
    setChildForms(updatedForms);
  };

  return (
    <Layout>
      <div className="header-section mb-4">
        {/* Header Content */}
      </div>

      <div className="page-header-title">
        <h5 className="m-b-10">Child Education Reimbursement Form</h5>
      </div>

      <Card className="form-container mt-3">
        <h5 className="mb-4">Add Details</h5>
        {childForms.map((form, index) => (
          <div key={form.id}>
            <Form>
              <Row form>
                <Col md={6}>
                  <FormGroup>
                    <Label for={`selectChild${index}`}>Select Child</Label>
                    <div className="input-group">
                      <Input
                        type="select"
                        name="selectChild"
                        id={`selectChild${index}`}
                        value={form.selectChild}
                        onChange={(e) => handleInputChange(index, e)}
                      >
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
                    <Label for={`dateOfBirth${index}`}>Date Of Birth</Label>
                    <Input
                      type="date"
                      name="dateOfBirth"
                      id={`dateOfBirth${index}`}
                      value={form.dateOfBirth}
                      onChange={(e) => handleInputChange(index, e)}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row form>
                <Col md={6}>
                  <FormGroup>
                    <Label for={`description${index}`}>Description</Label>
                    <Input
                      type="text"
                      name="description"
                      id={`description${index}`}
                      placeholder="Enter description"
                      value={form.description}
                      onChange={(e) => handleInputChange(index, e)}
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for={`amount${index}`}>Amount</Label>
                    <Input
                      type="number"
                      name="amount"
                      id={`amount${index}`}
                      placeholder="Enter amount"
                      value={form.amount}
                      onChange={(e) => handleInputChange(index, e)}
                    />
                  </FormGroup>
                </Col>
              </Row>
            </Form>

            {/* Minus icon for removing second child */}
            {childForms.length === 2 && index === 1 && (
              <Row className="mb-3">
                <Col md={12} className="text-right" style={{textAlign:'right'}}>
                <span className="btnlabel">Remove Child</span>
                  <FaMinus size={24} color="red" onClick={() => removeChildForm(index)} style={{ cursor: 'pointer' }} />
                </Col>
              </Row>
            )}
          </div>
        ))}

        {/* Add Child Button */}
        <Row>
          <Col md={12} className="text-right" style={{textAlign:'right'}}>
            {childForms.length < 2 && (
              <>
                <span className="btnlabel">Add Child</span>
                <FaPlus size={24} color="Navy" onClick={addChildForm} style={{ cursor: 'pointer' }} />
              </>
            )}
          </Col>
        </Row>
      </Card>

      {/* Attachments Section */}
      <Card className="form-container mt-3">
        <h5 className="mb-4">Attachments</h5>
        {childForms.map((form, index) => (
          <Row key={form.id} form>
            <Col md={12}>
              <FormGroup>
                <Label for={`fileUpload${index}`} style={{ fontWeight: 600 }}>Attachment for Child {index + 1}</Label>
                <div className="input-group">
                  <Input type="file" name={`fileUpload${index}`} id={`fileUpload${index}`} />
                  <Button color="" className='uplbtn'>Upload</Button>
                </div>
                <small className="form-text text-muted">Attach QID/Visa/Passport</small>
              </FormGroup>
            </Col>
          </Row>
        ))}
      </Card>

      <Card className="form-container mt-4">
        <Row form className="mt-4">
          <Col md={12} className="text-right" style={{textAlign:'right'}}>
            <Button color="primary" className="formbuttons mr-2" onClick={() => navigate("/Eduview")}>Apply</Button>
            <Button color="secondary" className="formbuttons mr-2">Cancel</Button>
            <Button color="primary" className="formbuttons mr-2" onClick={() => navigate("/Dashboard")}>Back</Button>
          </Col>
        </Row>
      </Card>
    </Layout>
  );
};

export default EducationReimbursementForm;
