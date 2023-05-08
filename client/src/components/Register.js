import { useState } from "react";
import {
    Container,
    Row,
    Col,
    Stack,
    Image,
    Form,
    Button,
    Card,
    Alert,
  } from "react-bootstrap";
import { useMutation } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import { API } from "../config/api";
import wayshub from "../image/wayshub.png"
function Register() {
  let navigate= useNavigate();

  const [message, setMessage] = useState(null);
// const [show, setShow] = useState(false);
const [form, setForm] = useState({
  chanelname: '',
  email: '',
  password: '',
  description: '',

});

  const {chanelname, email, password, description} = form;
  
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };


const handleSubmit = useMutation(async (e) => {
  try {
    e.preventDefault();

    const response = await API.post('/register', form);

    console.log("register success : ", response)

    const alert = (
      <Alert variant="success" className="py-1">
        Register success!
      </Alert>
    );
    setMessage(alert);
    setForm({
      chanelname: '',
      email: '',
      password: '',
      description: '',

    });
  } catch (error) {
    const alert = (
      <Alert variant="danger" className="py-1">
        Failed to register!
      </Alert>
    );
    setMessage(alert);
    console.log("register failed : ", error);
  }
});

// const handleLogin = () => {
//   navigate("/Login" );
// };
    return (
        <>
        <div className="p-3 mt-4" style={{ height: "100vh",  position:"absolute", zIndex:"50" }}>
        <Row>
        {message && message}
          <Col className="d-flex flex-column justify-content-center">
            <Stack
              direction="vertical"
              className="d-flex flex-column justify-content-center"
            >
              <Image className="w-75" src={wayshub} />
              <Card.Text className="text-white fs-5 fw-light w-75">
                Join now, share your creations with another people and enjoy
                other creations
              </Card.Text>
              <Button
                onClick={() => navigate("/login")}
                variant="primary"
                type="submit"
                style={{
                  backgroundColor: "#FF7A00",
                  border: "none",
                  width: "30%",
                }}
                className="mt-5 py-2 fw-bold fs-5 text-white"
              >
                Sign In
              </Button>
            </Stack>
          </Col>
          <Col>
            <div
              className="rounded-4 p-5"
              style={{ backgroundColor: "#161616", width: "70%" }}
            >
              <Form onSubmit={(e) => handleSubmit.mutate(e)}>
                <Form.Label className="fs-1 mb-5 fw-bold text-white">
                  Sign Up
                </Form.Label>

                <Form.Group controlId="formEmail">
                  <Form.Control
                    className="mb-4 py-2 fs-5"
                    style={{
                      borderColor: "#BCBCBC",
                      borderWidth: "3px",
                      backgroundColor: "#555555",
                      color: "rgb(210,210,210,0.25)",
                    }}
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={email}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-4" controlId="formPassword">
                  <Form.Control
                    className="py-2 fs-5"
                    style={{
                      borderColor: "#BCBCBC",
                      borderWidth: "3px",
                      backgroundColor: "#555555",
                      color: "rgb(210,210,210,0.25)",
                    }}
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={password}
                    onChange={handleChange}
                    // onChange={(e) => {
                    //   setPassword(e.target.value);
                    // }}
                  />
                </Form.Group>

                <Form.Group className="mb-4" controlId="formChannelName">
                  <Form.Control
                    className="py-2 fs-5"
                    style={{
                      borderColor: "#BCBCBC",
                      borderWidth: "3px",
                      backgroundColor: "#555555",
                      color: "rgb(210,210,210,0.25)",
                    }}
                    type="text"
                    placeholder="Channel Name"
                    name="chanelname"
                    value={chanelname}
                    onChange={handleChange}
                    // onChange={(e) => {
                    //   setChannelName(e.target.value);
                    // }}
                  />
                </Form.Group>

                <Form.Group className="mb-5" controlId="formChannelDescription">
                  <Form.Control
                    className="py-2 fs-5"
                    style={{
                      borderColor: "#BCBCBC",
                      borderWidth: "3px",
                      backgroundColor: "#555555",
                      color: "rgb(210,210,210,0.25)",
                      resize: "none",
                    }}
                    as="textarea"
                    rows={3}
                    placeholder="Channel Description"
                    value={description}
                    name="description"
                    onChange={handleChange}
                    // onChange={(e) => {
                    //   setDescription(e.target.value);
                    // }}
                  />
                </Form.Group>

                <Button
                  variant="primary"
                  type="submit"
                  style={{ backgroundColor: "#FF7A00", border: "none" }}
                  className="py-2 fw-bold fs-5 w-100 text-white"
                  // onClick={handleLogin}
                  
                >
                  Sign Up
                </Button>
                <div className="d-flex justify-content-center mt-3">
                  <p>Already have an account? Klik </p>
                  <Link
                    to="/Login"
                    // onClick={props.onClick}
                    className=" ms-1 text-decoration-none text-black fw-bold"
                  >
                    Here
                  </Link>
                </div>
              </Form>
            </div>
          </Col>
        </Row>
      </div>
        </>
    )
}
export default Register