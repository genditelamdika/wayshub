import {   Container,
    Form,
    Stack,
    Image,
    Card,
    Overlay,
    Popover, } from "react-bootstrap";

function Navbars(){
    return (
        <>
        <Container
        className="px-5"
        style={{
          position: "fixed",
          backgroundColor: "black",
          height: "100px",
          marginLeft:"18%"
          
        }}
      >
        <Stack direction="horizontal">
          <Form.Group
            className="d-flex flex-column justify-content-center w-100"
            controlId="formSearch"
            style={{ marginLeft: "10%",width:"50px", height:"100px" }}
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
            // onClick={() => navigate("/addvideo")}
          >
            <div className="d-flex flex-column justify-content-center me-3">
              {/* <Image src={AddVideoIcon} /> */}
            </div>
            <Card.Text className="text-white">Add Video</Card.Text>
          </Stack>


              <Popover
                id="popover-contained"
                style={{ backgroundColor: "#141414" }}
              >
                <Popover.Body className="px-4">
                  <Stack
                    direction="horizontal"
                    gap={3}
                    className="mb-4 btn p-0"
                    // onClick={() => navigate("/mychannel")}
                  >
                    <div className="d-flex flex-column justify-content-end">
                      {/* <Image src={MyChannelLogo} /> */}
                    </div>
                    <Card.Text className="text-white">My Channel</Card.Text>
                  </Stack>

                  <Stack
                    direction="horizontal"
                    gap={3}
                    className="btn p-0"
                    // onClick={() => {
                    //   userLogout();
                    //   navigate("/login");
                    // }}
                  >
                    <div className="d-flex flex-column justify-content-center">
                      {/* <Image src={LogoutIcon} /> */}
                    </div>
                    <Card.Text className="text-white">Logout</Card.Text>
                  </Stack>
                </Popover.Body>
              </Popover>
            {/* </Overlay> */}
          {/* </div> */}
        </Stack>
      </Container>
        </>
    )
}
export default Navbars