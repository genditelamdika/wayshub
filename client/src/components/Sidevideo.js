import { Card, Col, Image, Row, Stack } from "react-bootstrap";
import { useQuery } from "react-query";
import {Link, useNavigate } from "react-router-dom";
import { API } from "../config/api";

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
      <Stack direction="Vertical" gap={4} className="ps-3 pe-5 mb-3">
        {videos?.slice(0, 5).map((item) => (
          <Link onClick={() => handleViewCounter(item?.id)} to={`/Sidedetailvideo/${item.id}`}
            direction="vertical"
            // onClick={() => {
            //   navigate("/Detailvideo/" + item.id);
          
          >
            <Image src={item.thumbnail} className="mb-2" style={{height:"100px", width:"250px"}} />
            <Card.Text className="text-white mb-3" style={{ fontSize: "15px" }}>
              {item.title}
            </Card.Text>
            <Card.Text className="fs-6 mb-2" style={{ color: "#555555" }}>
              {item.chanelname}
            </Card.Text>
            <Row>
              <Col md={4}>
                <Stack direction="horizontal">
                  <div className="d-flex flex-column justify-content-center me-2">
                    {/* <Image src={ViewsIcon} /> */}
                  </div>
                  <Card.Text className="fs-6" style={{ color: "#555555" }}>
                    {item.viewcount}
                  </Card.Text>
                </Stack>
              </Col>
              <Col>
                <Stack direction="horizontal">
                  <div className="d-flex flex-column justify-content-center me-2">
                    {/* <Image src={DateIcon} /> */}
                  </div>
                  <Card.Text className="fs-6" style={{ color: "#555555" }}>
                    {/* {item.created_at.slice(0, 10)} */}
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