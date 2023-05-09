import { Button, Card, Container, Image, Row, Stack } from "react-bootstrap";
import Navbars from "../components/Navbars";
import Menbar from "../components/Menbar";
import Login from "../components/Login";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { API } from "../config/api";
import view1 from "../image/view1.png";
import waktu from "../image/waktu.png";
// import { useState } from "react";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/userContext";
import Editmodal from "./Editmodal";

function Mychanel() {
  const [login, setLogin] = useState(false);
  const [state] = useContext(UserContext)

  const [profile, setProfile] = useState({})

  const { id } = useParams();
  // fetching profile by id from state
  const getProfileData = async () => {
    try {
      const response = await API.get(`/user/${state.user.id}`)
      setProfile(response.data.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getProfileData()
  }, [])

  let navigate = useNavigate()

    //   handle login form
    const openLogin = () => {
      setLogin(true);
    };
    const closeLogin = () => {
      setLogin(false);
    };

    return(
        <div className="position-relative">
      <>
        <div >
          <Navbars />
          <Menbar />
        </div>
      </>
        <>
        <div  style={{top:"130px", marginLeft:"280px"}}>
              <Image
        src={profile.thumbnail}
        style={{ height: "200px", width: "1000px", marginTop: "20%", top:"130px"  }}
        />
        <Container className="px-5 mt-4">
        <Stack direction="horizontal" className="mb-1">
        <Image
            src={profile.fhoto}
            className="me-4"
            style={{ height: "95px", width: "80px" }}
          />
         <Stack direction="vertical">
            <Card.Text className="text-white fs-3 mb-0">
              {profile.chanelname}
            </Card.Text>
            <Card.Text style={{ color: "#F0F0F0" }}>{profile.subscriber} Subscriber</Card.Text>
          </Stack>
          {/* <Link to={`/Editchanel/${profile.id}`}>
                      <button  type="buton"  className="shadow  btn btn-success fw-bold  " style={{width:"70px"}} name={profile.id} value={profile.id}>
                        Update
                      </button>
                      </Link> */}
          <Button
            onClick={() => navigate(`/Editchanel/${profile.id}`)}
            className="py-2"
            style={{ backgroundColor: "#FF7A00", border: "none", width: "15%" }}
          >
            Edit Channel
          </Button>
        </Stack>
      
        <Stack direction="horizontal" gap={5}>
          <div
            // onClick={() => {
            //   setTab("video");
            // }}
          >
            <Card.Text className="text-white btn p-0 m-0">Video</Card.Text>
          </div>
          <div
            // onClick={() => {
            //   setTab("description");
            // }}
          >
            <Card.Text className="text-white btn p-0 m-0">
              Channel Description
            </Card.Text>
          </div>
        </Stack>

        </Container>
                  
        </div>
        </>
        </div>
    )
}
export default Mychanel