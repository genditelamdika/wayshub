import { Container, Row, Col, Stack, Image, Card,Link } from "react-bootstrap";
import Navbars from "../components/Navbars";
import Menbar from "../components/Menbar";
import { useQuery } from "react-query";
import { API } from '../config/api';
import {  useNavigate } from "react-router-dom";


function Home() {
    let navigate = useNavigate();

    let { data: users } = useQuery("usersChache", async () => {
        const response = await API.get("/users");
        console.log("data :", response.data);
        return response.data.data;
      });

      console.log("data:", users);
    return(
        <>
        <div>
            <Navbars/>
            <Menbar></Menbar>
        </div>

        <Container className="py-0 px-5" style={{ marginTop: "0px" }}>
        {users?.slice(0, 10).map((data) => (
                   <Col
                   className="mb-4"
                   style={{textAlign:"center", marginTop:"0px"}}
                   onClick={() => {
                     navigate("/videodetail/" + data.id);
                   }}
                 >
                   <Stack direction="vertical">
                     <Image
                     style={{margin:"auto", width: "100px", Align:"center", marginTop:"100px"}}
                       src={data.thumbnail}
                       className="mb-2 h-4"
                       height="140px"
                       
                     />
                     <Card.Text
                       className="text-white mb-3"
                       style={{ fontSize: "15px" }}
                     >
                       {data.description}
                     </Card.Text>
                     <Card.Text className="fs-6 mb-2" style={{ color: "#555555" }}>
                       {data.chanelname}
                     </Card.Text>
                     <Row>
                       <Col md={4}>
                         <Stack direction="horizontal">
                           <div className="d-flex flex-column justify-content-center me-2">
                             {/* <Image src={ViewsIcon} /> */}
                           </div>
                           <Card.Text
                             className="fs-6"
                             style={{ color: "#555555" }}
                           >
                             {data.viewcount}
                           </Card.Text>
                         </Stack>
                       </Col>
                       <Col>
                         <Stack direction="horizontal">
                           <div className="d-flex flex-column justify-content-center me-2">
                             {/* <Image src={DateIcon} /> */}
                           </div>
                           <Card.Text
                             className="fs-6"
                             style={{ color: "#555555" }}
                           >
                             {/* {data.created_at.slice(0, 10)} */}
                           </Card.Text>
                         </Stack>
                       </Col>
                     </Row>
                   </Stack>
                 </Col>
                ))}
      </Container>
       
        </>
    )
}
export default Home 