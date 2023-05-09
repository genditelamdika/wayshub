import { Card, Col, Image, Row, Stack } from "react-bootstrap";
import { useQuery } from "react-query";
import {Link, useNavigate } from "react-router-dom";
import { API } from "../config/api";
import view1 from "../image/view1.png";
import waktu from "../image/waktu.png";

function Sidevideo() {
    let navigate = useNavigate();

    let { data: videos } = useQuery("videosChache", async () => {
        const response = await API.get("/videos");
        console.log("data :", response.data);
        return response.data.data;
      });
      console.log("videos;",videos)

               // Function untuk meng-update view counter
               const handleViewCounter = async (videoId) => {
                try {
                    await API.patch(`/UpdateViews/${videoId}`);
                } catch (err) {
                    console.log(err);
                }
            };
      
    return (
        <>
      <Stack direction="Vertical" gap={4} className="ps-3 pe-5 mb-3" style={{textDecoration:"none"}}>
        {videos?.slice(0, 5).map((item) => (
          <Link onClick={() => handleViewCounter(item?.id)} to={`/Sidedetailvideo/${item.id}`}
            direction="vertical"
            // onClick={() => {
            //   navigate("/Detailvideo/" + item.id);
          
          >
            <Image src={item.thumbnail} className="mb-2" style={{height:"100px", width:"250px"}} />
            <Card.Text className="text-white mb-3 text-decoration-none " style={{ fontSize: "15px" , textDecoration:"none"}}>
              {item.title}
            </Card.Text>
            <Card.Text className="fs-6 mb-2 text-decoration-none " style={{ color: "#555555" }}>
              {item.user.chanelname}
            </Card.Text>
            <Row>
              <Col md={4}>
                <Stack direction="horizontal">
                  <div className="d-flex flex-column justify-content-center me-2">
                    <Image src={view1} />
                  </div>
                  <Card.Text className="fs-6" style={{ color: "#555555" }}>
                    {item.viewcount}
                  </Card.Text>
                </Stack>
              </Col>
              <Col>
                <Stack direction="horizontal">
                  <div className="d-flex flex-column justify-content-center me-2">
                    <Image src={waktu} />
                  </div>
                  <Card.Text className="fs-6" style={{ color: "#555555" }}>
                    {item.formatTime}
                  </Card.Text>
                </Stack>
              </Col>
            </Row>
          </Link>
        ))}
      </Stack>
    </>
    )
}
export default Sidevideo