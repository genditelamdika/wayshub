import React, { useState } from 'react';
import { useQuery } from "react-query";
import { API } from "../config/api";
import UserIcon1 from "../image/UserIcon1.png";

import {
    FaTh,
    FaBars,
    FaUserAlt,
    FaRegChartBar,
    FaCommentAlt,
    FaShoppingBag,
    FaThList

}from "react-icons/fa";
import '../App.css';
import WaysHubIcon from "../image/logoways.png";
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Card, Image, Stack } from 'react-bootstrap';


const Menbar = ({children}) => {
    let navigate = useNavigate()
    let { data: users } = useQuery("usersChache", async () => {
    const response = await API.get("/users");
    console.log("data :", response.data);
    return response.data.data;
  });  
  console.log("homedata:", users);

    const[isOpen ,setIsOpen] = useState(false);
    const toggle = () => setIsOpen (!isOpen);
    const menuItem=[
        {
            path:"/",
            name:"Home",
            icon:<FaTh/>
        },
        {
            path:"/about",
            name:"Subcription",
            icon:<FaUserAlt/>
        },
        
    ]
    return (
        <div className="container" >
           <div style={{width: isOpen ? "200px" : "50px", position:"fixed"}} className="sidebar">
               <div className="top_section">
                   <h1 style={{display: isOpen ? "block" : "none"}} className="logo">Logo</h1>
                   <div style={{marginLeft: isOpen ? "50px" : "0px"}} className="bars">
                       <FaBars onClick={toggle}/>
                   </div>
               </div>
               {
                   menuItem.map((item, index)=>(
                       <NavLink to={item.path} key={index} className="link" activeclassName="active">
                           <div className="icon">{item.icon}</div>
                           <div style={{display: isOpen ? "block" : "none"}} className="link_text">{item.name}</div>
                       </NavLink>
                   ))
               }
           <div>
                <Card.Text  style={{display: isOpen ? "block" : "none"}} className="text-white fs-4">Channel</Card.Text>
           {users?.slice(0, 4).map((data) => (
             <Link to={`/Creatorpage/${data.id}`}
             direction="horizontal"
             className="mb-3 btn ps-0"
            //  onClick={() => navigate("/Creatorpage/" + data.id)}
             >
              <div className="d-flex flex-column justify-content-center me-3">
                <Image
                  src={data.fhoto ? data.fhoto : UserIcon1}
                  style={{ height: "50px", width: "50px" }}
                  />
              </div>
              <Card.Text  style={{display: isOpen ? "block" : "none"}} className="text-white">{data.chanelname}</Card.Text>
            </Link>
          ))}
           </div>
          </div>
           <main>{children}</main>
        </div>
    );
};

export default Menbar;


// import { Container, Stack, Image, Card } from "react-bootstrap";
// import { useQuery } from "react-query";
// import { API } from "../config/api";
// import UserIcon1 from "../image/UserIcon1.png";
// import WaysHubIcon from "../image/WaysHubIcon.png";
// function Menbar() {

//   let { data: users } = useQuery("usersChache", async () => {
//     const response = await API.get("/users");
//     console.log("data :", response.data);
//     return response.data.data;
//   });  
//   console.log("homedata:", users);
  
//   return(
      
//         <>
//          <Container
//         className="p-5 m-0"
//         style={{
//           // marginRight:"100px",
//           marginLeft:"none",
//           height: "100vh",
//           width: "20%",
//           backgroundColor: "#161616",
//           // position: "fixed",
//         }}
//       >
//         <Stack direction="vertical">
//           <div className="ms-4 mb-5">
//             <Image src={WaysHubIcon} className="w-50 mb-4 ms-5" />
//           </div>
//           <Stack
//             direction="horizontal"
//             className="mb-4 btn ps-0"
//             // onClick={() => navigate("/")}
//           >
//             <div className="d-flex flex-column justify-content-center me-3">
//               {/* <Image src={HomeIcon} /> */}
//             </div>
//             <Card.Text className="text-white">Home</Card.Text>
//           </Stack>

//           <Stack
//             direction="horizontal"
//             className="mb-5 btn ps-0"
//             // onClick={() => navigate("/")}
//           >
//             <div className="d-flex flex-column justify-content-center me-3">
//               {/* <Image src={SubscriptionIcon} /> */}
//             </div>
//             <Card.Text className="text-white">Subscription</Card.Text>
//           </Stack>

//           <Card.Text className="text-white fs-4">Channel</Card.Text>

//           {users?.slice(0, 4).map((data) => (
//             <Stack
//               direction="horizontal"
//               className="mb-3 btn ps-0"
//               // onClick={() => navigate("/creator/" + data.id)}
//             >
//               <div className="d-flex flex-column justify-content-center me-3">
//                 <Image
//                   src={data.fhoto ? data.fhoto : UserIcon1}
//                   style={{ height: "50px", width: "50px" }}
//                 />
//               </div>
//               <Card.Text className="text-white">{data.chanelname}</Card.Text>
//             </Stack>
//           ))}
//         </Stack>
//       </Container>
//         </>
//     )
// }
// export default Menbar