import {   Container,
    Form,
    Stack,
    Image,
    Card,
    Overlay,
    Popover,
    Dropdown, } from "react-bootstrap";
    import { CgProfile, CgFilm } from "react-icons/cg";
import { MdPayment, MdLogout } from "react-icons/md";

import { useQuery } from "react-query";
import { API } from "../config/api";
import iconadd from "../image/Vectoradd.png";
import UserIcon1 from "../image/UserIcon1.png";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/userContext";

function Navbars(){
  let navigate = useNavigate()
  const [state, dispatch] = useContext(UserContext);
  
    let { data: users } = useQuery("usersChache", async () => {
        const response = await API.get("/users");
        console.log("data :", response.data);
        return response.data.data;
      });

      const logout = () => {
        dispatch({
          type: "LOGOUT",
        });
        navigate("/Login");
      };
    

    return (
        <>
        <Container
        className="px-5"
        style={{
          position: "fixed",
          // position:"relative",
          backgroundColor: "black",
          height: "100px",
          marginLeft:"0"
          
        }}
      >
        <Stack direction="horizontal">
          <Form.Group
            className="d-flex flex-column justify-content-center w-75"
            controlId="formSearch"
            style={{ marginLeft: "100px",width:"200px", height:"100px" }}
          >
            <Form.Control
              className="py-1 fs-5 my-4"
              style={{
                borderColor: "#BCBCBC",
                borderWidth: "3px",
                backgroundColor: "#555555",
                color: "rgb(210,210,210,0.25)",
              }}
              type="search"
              placeholder="Search"
            />
          </Form.Group>

          <Stack
            direction="horizontal"
            className="btn me-3"
            onClick={() => navigate("/AddVideo")}
          >
            <div className="d-flex flex-column justify-content-center me-4">
              <Image src={iconadd} />
            </div>
            <Card.Text className="text-white">Add Video</Card.Text>
          </Stack>

          <Dropdown style={{marginLeft:"1030px", zIndex:"3" }}>
            <Dropdown.Toggle className="bg-dark">
              <img
                type="button"
                // data-bs-toggle="dropdownn"
                // onClick={() => setHandleDropdown(!handleDropdown)}
                src={UserIcon1}
                alt="gam"
              />
            </Dropdown.Toggle>
            <Dropdown.Menu className="bg-dark mt-2 ms-3">
              <div
                style={{
                  position: "absolute",
                  position :"fixed",
                  width: 0,
                  height: 0,
                  borderLeft: "10px solid transparent",
                  borderRight: "10px solid transparent",
                  borderBottom: "20px solid #212529",
                  // marginLeft: "130px",
                  marginTop: "-25px",
                }}
              ></div>
              
                <>
                  <Dropdown.Item className="bg-dark d-flex align-items-center">
                    <Link
                      // to={`/Mychanel/${users.id}`}
                      to="/Mychanel"
                      className="bg-dark text-white fw-semibold text-decoration-none"
                    >
                      <CgProfile
                        color="yellow"
                        style={{ fontSize: "20px" }}
                        className="me-2"
                      />
                      Mychanel
                    </Link>
                  </Dropdown.Item>
                 
                  <Dropdown.Item
                    className="bg-dark d-flex align-items-center gap-2 text-white fw-semibold"
                    onClick={logout}
                  >
                    <MdLogout color="yellow" style={{ fontSize: "20px" }} />
                    Logout
                  </Dropdown.Item>
                </>
            </Dropdown.Menu>
          </Dropdown>


          
            {/* </Overlay> */}
          {/* </div> */}
        </Stack>
      </Container>
        </>
    )
}
export default Navbars