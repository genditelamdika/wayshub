import { Button, Card, Col, Container, Image, Row, Stack } from "react-bootstrap";
import Navbars from "../components/Navbars";
import Menbar from "../components/Menbar";
import { Link, useParams } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import { API } from "../config/api";

import view1 from "../image/view1.png";
import waktu from "../image/waktu.png";
// import { useState } from "react";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/userContext";


function Creatorpage(props) {
    // Untuk mengambil id user yang login
    const [state] = useContext(UserContext);

    const { id } = useParams();
    let { data: user, refetch:channelRefetch } = useQuery("userCache", async () => {
        const response = await API.get(`/user/${id}`);
        return response.data.data;
      });

        // Mengambil data subscription user yang login
  const { data: channelLogin, refetch: loginRefetch } = useQuery("channelLoginCache", async () => {
    const response = await API.get(`/user/${state?.user.id}`);
    return response.data.data.subscription;
  });
  let channel = [];

  channelLogin?.filter((subs) => {
    if (subs.other_id == id) {
      channel.push(subs);
    }
    console.log(subs)
  });
  console.log("id sub : ", id)
  const [channelId] = channel;

    // Post handle untuk mengirim data ke database
    const handleSubs = useMutation(async (e) => {
      console.log("oid dalam try",id)
      try {
        e.preventDefault();
        const response = await API.post(`/subscribe/` + id);
        const plusSub = await API.patch(`/plusSubs/` + id);
        if (response) {
          channelRefetch();
          loginRefetch();
          props.refetch();
          alert("")
        }
      } catch (err) {
        alert("FAILED");
        console.log(err.data);
      }
    });
  
    const handleUnsub = useMutation(async (e) => {
      try {
        e.preventDefault();
  
        const response = await API.delete(`/subscribe`);
        const plusSub = await API.patch(`/minusSubs/${id}`);
        if (response.status == 200 && plusSub.status == 200) {
          channelRefetch();
          loginRefetch();
          props.refetch();
        }
      } catch (err) {
        alert("FAILED");
        console.log(err);
      }
    });

    //   console.log("kontol gian", user);
    let { data: uservid, refetch } = useQuery("uservidCache", async () => {
        const response = await API.get(`/user/${id}/video`);
        return response.data.data;
      });

         // Function untuk meng-update view counter
         const handleViewCounter = async (videoId) => {
          try {
              await API.patch(`/UpdateViews/${videoId}`);
          } catch (err) {
              console.log(err);
          }
      };

    return(
        <>
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
        src={user?.thumbnail}
        style={{ height: "18vh", width: "1050px", marginTop: "20%", top:"130px"  }}
        />
        <Container className="px-5 mt-4">
        <Stack direction="horizontal" className="mb-1">
        <Image
            src={user?.fhoto}
            className="me-4"
            style={{ height: "95px", width: "80px" }}
          />
         <Stack direction="vertical">
            <Card.Text className="text-white fs-3 mb-0">
              {user?.chanelname}
            </Card.Text>
            <Card.Text style={{ color: "#F0F0F0" }}>{user?.subscriber}Subscriber</Card.Text>
          </Stack>
          <div>
              <Link>
                {channelId?.other_id ? (
                  <Button
                    className="btn-bg"
                    onClick={(e) => handleUnsub.mutate(e)}
                  >
                    unsubscribe
                  </Button>
                ) : (
                  <Button className="bg-light border-0 text-dark" onClick={(e) => handleSubs.mutate(e)}>Subscribe</Button>
                )}
              </Link>
            </div>
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
        <hr style={{ borderTop: "3px solid #C2C2C2", marginTop: "0", display:"flex"}} />
        {/* {tab === "description" ? ( */}
          <Row lg={4}>
            <Card.Text className="text-white m-0">{user?.description}</Card.Text>
          </Row>
          <div className=" " >
            {/* {profileData.description} */}
            <Row xs={3} md={3} className="g-4" style={{marginTop:"100px"}}>
          {uservid?.map((item) => (
                          <Link onClick={() => handleViewCounter(item?.id)}
                          className="text-decoration-none "
                          to={`/Detailvideo/${item.id}`}
                        >
            {/* <Col key={idx}> */}
              <Card style={{background:"black"}}>
                <Card.Img variant="dark" src={item.thumbnail}/>
                <Card.Body>
                  <Card.Title style={{color:"white"}}>{item.title}</Card.Title>
                  <div className="d-flex gap-5">
                                        <div className="d-flex gap-2">
                                            <div>
                                                <img width={15} src={view1} alt="" />
                                            </div>
                                            <span style={{fontSize:"13px",  color: '#555555'}}>{item.viewcount}</span>
                                        </div>
                                        <div className="d-flex gap-2">
                                            <div>
                                                <img width={15} src={waktu} alt="" />
                                            </div>
                                            <span style={{fontSize:"13px",  color: '#555555'}}>{item.formatTime}</span>
                                        </div>
                                    </div>
                </Card.Body>
              </Card>
            {/* </Col> */}
          </Link>
          ))}
        </Row>
            </div>


        </Container>
                  
        </div>
        </>
        </div>
        </>
    )
}
export default Creatorpage