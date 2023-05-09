import { BrowserRouter as Router, Routes, Route, useNavigate, BrowserRouter } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import Navbars from "./components/Navbars";
import Login from "./components/Login";
import { API, setAuthToken } from './config/api';
import Register from "./components/Register";
import Detailvideo from "./components/Detailvideo";
import Sidedetailvideo from "./components/Sidedetailvideo";
import Mychanel from "./components/Mychanel";
import Subscrebtion from "./components/Subscrebtion";
import Editchanel from "./components/Editchanel";
import Menbar from "./components/Menbar";
import Home from "./components/Home";
// import Mychanel from "./components/Mychanel";
import AddVideo from "./components/AddVideo";
import { UserContext } from "./context/userContext";
import { useContext, useEffect, useState } from "react";
import Creatorpage from "./components/Creatorpage";





function App() {
  let navigate = useNavigate();
  const [state, dispatch] = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Redirect Auth but just when isLoading is false
    if (!isLoading) {
      if (state.isLogin === true) {
        // window.location('/Film')
        navigate('/Register');
      }
    }
  }, [isLoading]);

  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
      checkUser();
    } else {
      setIsLoading(false)
    }
  }, []);

  const checkUser = async () => {
    try {
      const response = await API.get('/check-auth');
      console.log("check user success : ", response)
      // Get user data
      let payload = response.data.data;
      // Get token from local storage
      payload.token = localStorage.token;
      // Send data to useContext
      dispatch({
        type: 'USER_SUCCESS',
        payload,
      });
      setIsLoading(false)
    } catch (error) {
      console.log("check user failed : ", error);
      dispatch({
        type: 'AUTH_ERROR',
      });
      setIsLoading(false)
    }
  };

  
  return (

        <>
      <Container>
        {/* <Navbars />
      <Menbar /> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="AddVideo" element={<AddVideo />} />
          {/* <Route path="Mychane" element={<Mychanel />} /> */}
          <Route path="/Detailvideo/:id" element={<Detailvideo />} />
          <Route path="/Sidedetailvideo/:id" element={<Sidedetailvideo />} />
          <Route path="Mychanel" element={<Mychanel />} />
          <Route path="Subscrebtion" element={<Subscrebtion />} />
          <Route path="/Editchanel/:id" element={<Editchanel />} />
          <Route path="/Creatorpage/:id" element={<Creatorpage />} />

        </Routes>
      </Container>


      <Routes>
        <Route path="Login" element={<Login />} />
        <Route path="Register" element={<Register />} />
      </Routes>


        </>

  )
}

export default App;

