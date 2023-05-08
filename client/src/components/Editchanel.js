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
function Editchanel() {

    let navigate = useNavigate();
    const { id } = useParams();
  
    const [state] = useContext(UserContext)

     // function untuk meng-handle perubahan dalam form
  const [form, setForm] = useState({
    chanelname: "",
    description: "",
    thumbnail: "",
    fhoto: ""
  })
  
  const handleChange = (e) => {
    if (e.target.name == "thumbnail") {
      setForm({
        ...form, 
        [e.target.name]: e.target.files[0]
      })
    } else if (e.target.name == "fhoto") {
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

    // function untuk meng-update channel
    const handleUpdate = useMutation(async (e) => {
        e.preventDefault()
        try {
    
          const formData = new FormData()
    
          formData.append("channelname", form.chanelname)
          formData.append("description", form.description)
          formData.append("image", form.thumbnail)
          formData.append("fhoto", form.fhoto)
    
          const response = await API.patch(`/user/${state?.user.id}`, formData)
          if (response.status == 200) {
            Swal.fire(
              'Change Saved',
              'Update Success',
              'success'
            )
          }
          navigate('/Mychanel')
        } catch (err) {
          alert("Update Failed")
          console.log(err)
        }
      })
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
        <Form  className="secondary"  onSubmit={(e) => handleUpdate.mutate(e)} >
          <Row className="mb-4">
            <Col md={12} lg={8} xl={9}>
              <Form.Control
                type="text"
                placeholder="chanelname"
                style={{
                  background: "rgba(210, 210, 210, 0.25)",
                  height: "50px",
                  color: "white",
                  width: "600px"
                }}
                name="chanelname"
                id="chanelname"
                onChange={handleChange}
                // value={form?.title}
              />
            </Col>

            <Col md={12} lg={4} xl={3}>
              <label
                htmlFor="thumbnail"
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
                id="thumbnail"
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
                htmlFor="fhoto"
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
                name="fhoto"
                onChange={handleChange} 
                // ref={fileInputRefAttach}
                // onClick={handleClickAttach} 
                id="fhoto"
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
export default Editchanel