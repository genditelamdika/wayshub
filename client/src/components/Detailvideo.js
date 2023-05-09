import Menbar from "./Menbar"
import Navbars from "../components/Navbars";
import Sidevideo from "../components/Sidevideo";
import Button from "react-bootstrap/Button";
import view1 from "../image/view1.png";
import waktu from "../image/waktu.png";
import UserIcon1 from "../image/UserIcon1.png";
// import Menbar from "../components/Menbar";
import { useMutation, useQuery } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import { API } from "../config/api";
import { useParams } from "react-router-dom";
import { Card, Form, Image, Stack } from "react-bootstrap";
import { useContext, useState } from "react";
import { UserContext } from "../context/userContext";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

function Detailvideo() {
  let navigate = useNavigate()
  const MySwal = withReactContent(Swal);
  const [state] = useContext(UserContext) 
    const { id } = useParams();
    let { data: videos } = useQuery("videosChache", async () => {
        const response = await API.get("/videos");
        console.log("data :", response.data);
        return response.data.data;
      });
     
      let { data: getAllcomments } = useQuery("getAllcommentsChache", async () => {
        const response = await API.get("/comments");
        console.log("data :", response.data);
        return response.data.data;
      });
      // console.log("comenttttt:", comments)
      let allComents = []
      getAllcomments?.filter(com => {
        if (com?.video_id == id) {
          allComents.push(com)
        }
      })


    let { data: video } = useQuery("videoDetailCache", async () => {
        const response = await API.get(`/video/${id}`);
        return response.data.data;
      });
      console.log("videoapa", video);
    
    //   console.log(id);
    const [form, setForm] = useState({
      comment: '',
      video_id: Number(id),
  
    });

    const handleChange = (e) => {
          setForm({
              ...form,
              [e.target.name]: e.target.value
          })
    }

    const { comment } = form

      const handleSubmit = useMutation(async (e) => {
        try {
          e.preventDefault()
      
          // Configuration
          const config = {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`,
              'Content-type': 'multipart/form-data'
            },
          }
                 // Store data with FormData as object
            const formData = new FormData();
            formData.set("comment", form.comment);
            formData.set("video_id", Number(id));
      
             // Insert product data
            const response = await API.post("/comment", formData, config);
            console.log("add video success : ", response);
            MySwal.fire({
              title: <strong>comentar yang bener</strong>,
              html: <i>You clicked the button!</i>,
              icon: 'success'
            })
            // navigate('Detailvideo')
            
          } catch (error) {
            console.log("add video failed : ", error);
            console.log(form);
      
            MySwal.fire({
              title: <strong>Sadge</strong>,
              icon: 'error'
            })
          }
        });
    
    return (
        <div className="position-relative">
        <>
          <div >
            <Navbars />
            <Menbar />
          </div>
        </>
        <div>

        
        <div className=" d-flex position-absolute mw-100  " style={{top:"130px", left:"280px"}}>
        <div>
              <video
            src={video?.video}
            controls
            style={{ width: "695px", height: "395px" }}
          />
                      <Card.Text className="fs-5 fw-bold text-white mt-3 mb-3">
            {video?.title}
          </Card.Text>
          <div className="d-flex gap-5" style={{paddingBottom:"50px"}}>
                                        <div className="d-flex gap-2" style={{color: "white"}}>
                                            <div>
                                                <img width={15} src={view1} alt="" />
                                            </div>
                                            <span>{video?.viewcount}</span>
                                        </div>
                                        <div className="d-flex gap-2" style={{color: "white"}}>
                                            <div>
                                                <img width={15} src={waktu} alt="" />
                                            </div>
                                            <span>{video?.formatTime}</span>
                                        </div>
                                    </div>
          <Stack direction="horizontal" className="mb-1">
        <Image
            src={video?.user.fhoto}
            className="me-4"
            style={{ height: "95px", width: "80px" }}
          />
         <Stack direction="vertical">
            <Card.Text className="text-white fs-3 mb-0">
              {video?.user.chanelname}
            </Card.Text>
            <Card.Text style={{ color: "#F0F0F0" }}>120K Subscriber</Card.Text>
          </Stack>
        
          <Button
            // onClick={() => navigate(`/Editchanel/${profile.id}`)}
            className="py-2"
            style={{ backgroundColor: "#FF7A00", border: "none", width: "15%" }}
          >
            Subscriber
          </Button>
          
        </Stack>
        <p style={{paddingTop:"20px", color:"white", fontSize:"13px"}}>

        {video?.description}
        </p>
          <hr style={{ borderTop: "3px solid #C2C2C2" }} />
          <Stack direction="horizontal">
            <div className="d-flex flex-column justify-content-center">
              <Image
                src={video?.user.fhoto}
                style={{ width: "35px", height: "35px" }}
                className="w-75"
              />
            </div>
            <div className="d-flex gap-5">

            <Form method="post" className="secondary" onSubmit={(e) => handleSubmit.mutate(e)} >
              <div className="d-flex gap-2">

            <Form.Control
              className="py-1 fs-5"
              style={{
                borderColor: "#BCBCBC",
                borderWidth: "3px",
                backgroundColor: "#555555",
                color: "rgb(210,210,210,0.25)",
              }}
              type="text"
              placeholder="Comment"
              onChange={handleChange}
              name="comment"
              value={comment}
              />
              </div>
                      <div className="d-flex gap-2">
            <Button
              type="submit"
              style={{
                width: "800px",
                height: "40px",
                background: "orange",
                border: "1px solid black",
                fontWeight: "bold",
                marginTop: "20px"
              }}
              >
              Comment
            </Button>
          </div>
          <div>
        {allComents?.map((data) => (
          <div style={{color:"white", marginLeft:"0px", paddingTop:"20px"}}>
           <Image
          //  style={{marginLeft:"200px"}}
           
           src={data?.user.fhoto}
           style={{width:"30px"}}
           />
           
            {data?.comment}
            
            

          </div>

))}
        </div>
            </Form>
</div>
        
            {/* {
              allComents?.map(comment => (
                <div>
                  {comment?.user.fhoto}

                </div>
              
              
              ))
            }
            {getAllcomments?.comment} */}
          </Stack>

          </div>
          
          <div className="d-flex flex-wrap">
          <Sidevideo/>

          </div>
        </div>
        
        
        
        <>
        </>
        </div>

        </div>
    )
}
export default Detailvideo