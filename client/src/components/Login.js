import { useContext, useState } from "react";
import { Container, Row, Col, Stack, Image, Form, Button, Card, Alert } from "react-bootstrap"
import { useNavigate } from "react-router-dom";
import { API, setAuthToken } from "../config/api";
import { useMutation } from 'react-query';
import wayshub from "../image/wayshub.png"
import { UserContext } from "../context/userContext";
function Login() {
    let navigate = useNavigate()

    const [_, dispatch] = useContext(UserContext);

  const [message, setMessage] = useState(null);
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const { email, password } = form;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      // Insert data for login process, you can also make this without any configuration, because axios would automatically handling it.
      const response = await API.post('/login', form);

      console.log("login success : ", response);

      // Send data to useContext
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: response.data.data,
      });

      setAuthToken(localStorage.token);

      // Status check
      if (response.data.data.token) {
        navigate('/');
      } else if (!response.data.data.token) {
        alert('Login Failed')
      }

      const alert = (
        <Alert variant="success" className="py-1">
          Login success
        </Alert>
      );
      setMessage(alert);
    } catch (error) {
      const alert = (
        <Alert variant="danger" className="py-1">
          Login failed
        </Alert>
      );
      setMessage(alert);
      console.log("login failed : ", error);
    }
  });
    return(
        <>
        <div className="p-3" style={{marginTop:'14vh', height:'100vh'}}>
                <Row>
                    <Col className="d-flex flex-column justify-content-center">
                        <Stack direction="vertical" className="d-flex flex-column justify-content-center">
                            <Image className="w-75" src={wayshub} />
                            <Card.Text className="text-white fs-5 fw-light w-75" >Join now, share your creations with another people and enjoy other creations</Card.Text>
                            <Button  onClick={() => navigate("/Register")} variant="primary" type="submit" style={{backgroundColor:'#FF7A00', border: 'none', width:'30%'}} className="mt-5 py-2 fw-bold fs-5 text-white">
                                Sign Up
                            </Button>
                        </Stack>
                    </Col>
                    <Col className="d-flex flex-column justify-content-center">
                        <div className="rounded-4 p-5" style={{backgroundColor:'#161616', width:'50%'}} >
                        {message && message}
                            <Form onSubmit={(e) => handleSubmit.mutate(e)}>
                                <Form.Label className="fs-1 mb-5 fw-bold text-white">Sign In</Form.Label>

                                <Form.Group className="mb-4" controlId="formEmail">
                                    <Form.Control className="mb-3 py-2 fs-5" style={{borderColor:'#BCBCBC', borderWidth:'3px', backgroundColor:'#555555', color:'rgb(210,210,210,0.25)'}} type="email" placeholder="Email" value={email} name="email" onChange={handleChange} />
                                </Form.Group>

                                <Form.Group className="mb-5" controlId="formPassword">
                                    <Form.Control className="py-2 fs-5" style={{borderColor:'#BCBCBC', borderWidth:'3px', backgroundColor:'#555555', color:'rgb(210,210,210,0.25)'}} type="password" placeholder="Password" value={password} name="password" onChange={handleChange} />
                                </Form.Group>

                                <Button  variant="primary" type="submit" style={{backgroundColor:'#FF7A00', border: 'none'}} className="py-2 fw-bold fs-5 w-100 text-white">
                                Sign In
                                </Button>

                            </Form>
                        </div>
                    </Col>
                </Row>
            </div>
        </>
    )
}
export default Login