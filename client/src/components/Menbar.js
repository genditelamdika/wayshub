// import React, { useState } from 'react';
// import {
//     FaTh,
//     FaBars,
//     FaUserAlt,
//     FaRegChartBar,
//     FaCommentAlt,
//     FaShoppingBag,
//     FaThList

// }from "react-icons/fa";
// import '../App.css';
// import WaysHubIcon from "../image/logoways.png";
// import { NavLink } from 'react-router-dom';
// import { Image } from 'react-bootstrap';


// const Menbar = ({children}) => {
//     const[isOpen ,setIsOpen] = useState(false);
//     const toggle = () => setIsOpen (!isOpen);
//     const menuItem=[
//         {
//             path:"/Login",
//             name:"Home",
//             icon:<FaTh/>
//         },
//         {
//             path:"/about",
//             name:"Subcription",
//             icon:<FaUserAlt/>
//         },
        
//     ]
//     return (
//         <div className="container">
//            <div style={{width: isOpen ? "200px" : "50px"}} className="sidebar">
//                <div className="top_section">
//                    <h1 style={{display: isOpen ? "block" : "none"}} className="logo">Logo</h1>
//                    <div style={{marginLeft: isOpen ? "50px" : "0px"}} className="bars">
//                        <FaBars onClick={toggle}/>
//                    </div>
//                </div>
//                {
//                    menuItem.map((item, index)=>(
//                        <NavLink to={item.path} key={index} className="link" activeclassName="active">
//                            <div className="icon">{item.icon}</div>
//                            <div style={{display: isOpen ? "block" : "none"}} className="link_text">{item.name}</div>
//                        </NavLink>
//                    ))
//                }
//            </div>
//            <main>{children}</main>
//         </div>
//     );
// };

// export default Menbar;


import { Container, Stack, Image, Card } from "react-bootstrap";
import UserIcon1 from "../image/UserIcon1.png";
import WaysHubIcon from "../image/WaysHubIcon.png";
function Menbar() {
    return(
        <>
         <Container
        className="p-5 m-0"
        style={{
          height: "100vh",
          width: "20%",
          backgroundColor: "#161616",
          position: "fixed",
        }}
      >
        <Stack direction="vertical">
          <div className="ms-4 mb-5">
            <Image src={WaysHubIcon} className="w-50 mb-4 ms-5" />
          </div>
          <Stack
            direction="horizontal"
            className="mb-4 btn ps-0"
            // onClick={() => navigate("/")}
          >
            <div className="d-flex flex-column justify-content-center me-3">
              {/* <Image src={HomeIcon} /> */}
            </div>
            <Card.Text className="text-white">Home</Card.Text>
          </Stack>

          <Stack
            direction="horizontal"
            className="mb-5 btn ps-0"
            // onClick={() => navigate("/")}
          >
            <div className="d-flex flex-column justify-content-center me-3">
              {/* <Image src={SubscriptionIcon} /> */}
            </div>
            <Card.Text className="text-white">Subscription</Card.Text>
          </Stack>

          <Card.Text className="text-white fs-4">Channel</Card.Text>

          {/* {data.map((item) => (
            <Stack
              direction="horizontal"
              className="mb-3 btn ps-0"
              onClick={() => navigate("/creator/" + item.id)}
            >
              <div className="d-flex flex-column justify-content-center me-3">
                <Image
                  src={item.photo ? item.photo : UserIcon1}
                  style={{ height: "50px", width: "50px" }}
                />
              </div>
              <Card.Text className="text-white">{item.channelName}</Card.Text>
            </Stack>
          ))} */}
        </Stack>
      </Container>
        </>
    )
}
export default Menbar