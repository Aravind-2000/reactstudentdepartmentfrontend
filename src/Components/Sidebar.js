import React, { useState } from "react";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { Sidebardata } from "./Sidebardata";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import "../Sidebar.css";
import "./MainPage.css";

const Sidebar = () => {
    const [sidebar, setsidebar] = useState(false);

    const showSideBar = () => setsidebar(!sidebar);

    return (
        <>
            {/* <div className="navbar">

           <Link to="#" className="menu-bars">
               <FaIcons.FaBars onClick={showSideBar}/>
           </Link>


        </div> */}

            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static" className="background" >
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                        >
                            <MenuIcon style={{color:"blueviolet"}} onClick = {showSideBar} />
                        </IconButton>
                        <Typography variant="h6" style={{color:"blueviolet", fontFamily:"Poppins"}} component="div" sx={{ flexGrow: 1 }}>
                            Management System
                        </Typography>
                    </Toolbar>
                </AppBar>{" "}
            </Box>

            <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
                <ul className="nav-menu-items" onClick={showSideBar}>
                    <br/> <br/>
                    {Sidebardata.map((item, index) => {
                        return (
                            <li key={index} className={item.cName}>
                                <Link to={item.path}>
                                    <span> <h6 style={{fontFamily:"Poppins"}}>{item.title}</h6> </span>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </>
    );
};

export default Sidebar;