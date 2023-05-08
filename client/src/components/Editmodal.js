import React, { useContext, useState } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';

import { API, setAuthToken } from '../config/api';
import { UserContext } from '../context/userContext';
function Editmodal() {
    let navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    return(
        <>
         <div>
      <Button className="" variant="danger" onClick={() => setShowModal(true)}>
        Login
      </Button>

      <Modal show={showModal} onHide={() => setShowModal(false)}> 
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body className="mx-5" >
        {/* {message && message} */}
          <Form >
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                // value={email}
                name="email"
                // onChange={handleChange} 
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                // value={password}
                name="password"
                // onChange={handleChange}
              />
            </Form.Group>
        <Modal.Footer>
      <Button type="submit"className="loginn" variant="danger" >
        Login
      </Button>
      </Modal.Footer>
          </Form>
        </Modal.Body>
      <Modal.Footer
          className="flex justify-content-center border-0"
          style={{ marginTop: "-25px" }}>
          <p style={{ fontSize: "12px" }} className="text-muted">
            Already have an account ? Klik{" "}
            <a
              onClick={showModal}
              style={{
                textDecoration: "none",
                color: "gray",
                cursor: "pointer",
              }}
              className="fw-semibold">
              Here
            </a>
          </p>
        </Modal.Footer>
      </Modal>
    </div>
        </>
    )
}
export default Editmodal