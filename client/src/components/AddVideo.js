import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router";
import Row from "react-bootstrap/Row";
import { InputGroup } from "react-bootstrap";
import { BsPlus } from "react-icons/bs";
import Button from "react-bootstrap/Button";
import { IoMdAttach } from "react-icons/io";
import Navbars from "../components/Navbars";
import Menbar from "../components/Menbar";
import { API } from "../config/api";

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useMutation } from "react-query";
import { UserContext } from "../context/userContext";
function AddVideo() {

  
  const navigate = useNavigate();
  const location = useLocation(); 
  const id = location.pathname.split('/')[2];
  const MySwal = withReactContent(Swal);
  const [state] = useContext(UserContext) 
  const [film, setFilm] = useState([]);
  const [form, setForm] = useState({
    title: '',
    thumbnail: '',
    description: '',
    video: '',
    user_id: '',

  });



 // Handle change data on form
 const handleChange = (e) => {
    if (e.target.name === 'thumbnail'){
        setForm({
            ...form,
            [e.target.name]: e.target.files[0]
            
        })
    }else if (e.target.name === 'video'){
        setForm({
            ...form,
            [e.target.name]: e.target.files[0]
        })
    } else {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }
}
//  const handleChange = (e) => {
//   setForm({
//     ...form,
//     [e.target.name]:
//       e.target.type === 'file' ? e.target.files : e.target.value,
//   })

//   // Create image url for preview
//   if (e.target.type === 'file') {
//     let url = URL.createObjectURL(e.target.files[0])
//   }
// }

const handleSubmit = useMutation(async (e) => {
  try {
    e.preventDefault()

    // Configuration
    const config = {
      headers: {
        'Content-type': 'multipart/form-data',
      },
    }
           // Store data with FormData as object
      const formData = new FormData();
      formData.set("title", form.title);
      formData.set("image", form.thumbnail);
      formData.set("description", form.description);
      formData.set("video", form.video);
      formData.set("user_id", state.user.id);

       // Insert product data
      const response = await API.post("/video", formData, config);
      console.log("add video success : ", response);
      MySwal.fire({
        title: <strong>Add Film Success</strong>,
        html: <i>You clicked the button!</i>,
        icon: 'success'
      })
      navigate('/')
      
    } catch (error) {
      console.log("add video failed : ", error);
      console.log(form);

      MySwal.fire({
        title: <strong>Sadge</strong>,
        icon: 'error'
      })
    }
  });

//   useEffect(() => {
//     getFilms()
//   }, [])
const fileInputRefAttach = useRef(null)
 
const handleClickAttach = () => {
  fileInputRefAttach.current.click()
}

    return(
        <div className="position-relative">
        <>
          <div >
            <Navbars />
            <Menbar />
          </div>
        </>
        <div
        className=" position-absolute mw-100  " style={{top:"130px", left:"280px"}}>
        <h5 className="fw-bold Text-white mb-5 ">Add Film</h5>
        <Form method="post" className="secondary" onSubmit={(e) => handleSubmit.mutate(e)} >
          <Row className="mb-4">
            <Col md={12} lg={8} xl={9}>
              <Form.Control
                type="text"
                placeholder="title"
                style={{
                  background: "rgba(210, 210, 210, 0.25)",
                  height: "50px",
                  color: "white",
                  width: "600px"
                }}
                name="title"
                id="title"
                onChange={handleChange}
                // value={form?.title}
              />
            </Col>

            <Col md={12} lg={4} xl={3}>
              <label
                htmlFor="thumbnailFilm"
                style={{
                  background: "rgba(210, 210, 210, 0.25)",
                  padding: "8px 40px 8px 40px",
                  color: "#6C757D",
                  borderRadius: "6px",
                  border: "1px solid white",
                  fontSize: "8px",
                  fontWeight: "lighter",
                }}>
                Attach Thumbnail
                <IoMdAttach
                  style={{
                    color: "orange",
                    fontSize: "30px",
                    marginLeft: "8px",
                  }}
                />
              </label>
              <input
                type="file"
                name="thumbnail"
                onChange={handleChange} 
                // ref={fileInputRefAttach}
                // onClick={handleClickAttach} 
                id="thumbnailFilm"
                hidden
              />
            </Col>
          </Row>




          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Description"
            style={{
              background: "rgba(210, 210, 210, 0.25)",
              marginBottom: "30px",
              resize: "none",
              height: "177px",
              color: "white",
            }}
            id="description"
            name="description"
            onChange={handleChange}
            // value={form?.description}
          />

<Col md={12} lg={4} xl={3}>
              <label
                htmlFor="video"
                style={{
                  background: "rgba(210, 210, 210, 0.25)",
                  padding: "8px 40px 8px 40px",
                  color: "#6C757D",
                  borderRadius: "6px",
                  border: "1px solid white",
                  fontSize: "15px",
                  fontWeight: "lighter",
                }}>
                upload File
                <IoMdAttach
                  style={{
                    
                    color: "orange",
                    fontSize: "30px",
                    marginLeft: "8px",
                  }}
                />
              </label>
              <input
                type="file"
                name="video"
                onChange={handleChange} 
                // ref={fileInputRefAttach}
                // onClick={handleClickAttach} 
                id="video"
                hidden
              />
            </Col>

          {/* episode */}

          <div className="d-grid gap-2 d-md-flex justify-content-md-end">
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
              Add
            </Button>
          </div>
        </Form>
      </div>
        </div>
    )
}
export default AddVideo