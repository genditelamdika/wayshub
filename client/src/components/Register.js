import {
    Container,
    Row,
    Col,
    Stack,
    Image,
    Form,
    Button,
    Card,
  } from "react-bootstrap";
import { Link } from "react-router-dom";
import wayshub from "../image/wayshub.png"
function Register() {
    return (
        <>
        <Container className="p-3 mt-4" style={{ height: "100vh",  position:"absolute", zIndex:"50" }}>
        <Row>
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
                // onClick={() => navigate("/login")}
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
            <Container
              className="rounded-4 p-5"
              style={{ backgroundColor: "#161616", width: "80%" }}
            >
              <Form >
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
                    // onChange={(e) => {
                    //   setEmail(e.target.value);
                    // }}
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
            </Container>
          </Col>
        </Row>
      </Container>
        </>
    )
}
export default Register