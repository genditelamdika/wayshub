// import { Container, Row, Col, Stack, Image, Card,Link } from "react-bootstrap";
import Navbars from "../components/Navbars";
import Menbar from "../components/Menbar";
import {Col,Row,Card} from 'react-bootstrap'
// import { useQuery } from "react-query";
// import { API } from '../config/api';
// import {  useNavigate } from "react-router-dom";

import { Image } from "react-bootstrap";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { API } from "../config/api";
import view1 from "../image/view1.png";
import waktu from "../image/waktu.png";
// import "./css/Home.css";


function Home() {
  let { data: videos } = useQuery("videosChache", async () => {
    const response = await API.get("/videos");
    console.log("data :", response.data);
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

  console.log("videos;", videos);


  return (
    <div className="d-flex flex-column justify-content-between">
      <>
        <div >
          <Navbars />
          <Menbar style={{position:"fixed"}} />
        </div>
      </>
      <>
        <Row xs={3} md={4} className="g-4" style={{marginTop:"100px",marginLeft:"200px"}}>
          {videos?.map((item, idx) => (
                          <Link onClick={() => handleViewCounter(item?.id)}
                          className="text-decoration-none "
                          to={`/Detailvideo/${item.id}`}
                        >
            <Col key={idx}>
              <Card style={{background:"black"}}>
                <Card.Img variant="dark" src={item.thumbnail}/>
                <Card.Body>
                  <Card.Title style={{color:"white"}}>{item.title}</Card.Title>
                  <Card.Title   style={{
                    fontSize:"14px",
                    textDecoration: 'none',
                    cursor: 'pointer',
                    color: '#555555'
                    }}>{item.user.chanelname}</Card.Title>
                  {/* <Card.Text>
                  <p className="text-light pt-2"   style={{
                    textDecoration: 'none',
                    cursor: 'pointer',
                    color: '#555555'
                    }}>{item.viewcount}</p>
                       <span>{item?.formatTime}</span>

                  </Card.Text> */}
                  <div className="d-flex gap-5">
                                        <div className="d-flex gap-2">
                                            <div>
                                                <img width={13} src={view1} alt="" />
                                            </div>
                                            <span style={{fontSize:"13px",  color: '#555555'}}>{item?.viewcount}</span>
                                        </div>
                                        <div className="d-flex gap-2">
                                            <div>
                                                <img width={13}  src={waktu} alt="" />
                                            </div>
                                            <span style={{fontSize:"13px",  color: '#555555'}}>{item?.formatTime}</span>
                                        </div>
                                    </div>
                </Card.Body>
              </Card>
            </Col>
          </Link>
          ))}
        </Row>
        {/* <div className=" bg-danger  w-75  mt-5" style={{left:"325px", top:"50px"}}>
          <div className="flex-wrap  global d-flex bg-danger" >
            {videos?.map((data) => (
              <Link
                className="text-decoration-none "
                to={`/Detailvideo/${data.id}`}
              >
                <div
                  style={{ Align: "center"  }}
                  className=" m-2 "
                  height="50px"
                >
                  <Image src={data.thumbnail} className="hgambar " />
                  <h4 className="text-light pt-2">{data.description}</h4>
                  <p className="text-light pt-2">{data.user.chanelname}</p>
                  <p className="text-light pt-2">{data.viewcount}</p>
                </div>
              </Link>
            ))}
          </div>
        </div> */}

       
      </>
    </div>
  );
}
export default Home;
