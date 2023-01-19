import {Box, Typography, Grid, IconButton, Button} from "@mui/material"
import { useState } from "react";

import Router from "next/router"
import HomeIcon from '@mui/icons-material/Home';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import SearchIcon from '@mui/icons-material/Search';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import NotificationsIcon from '@mui/icons-material/Notifications';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
const classes = {
    root:{
        display: "flex",
        alignItems: "center",
        minHeight: "6vh",
        textAlign: "center",
        backgroundColor: "black",
        borderTop: "solid 0.2px #303030",
        position: "fixed",
        left: "0",
        bottom: "0",
        width: "100%"
    },
    icon:{
        color: "#fff"
    }
}

export default function Footer(){

    const buttons = [
        {
            id: "1",
            outlineIcon: <HomeIcon sx={{color: "#fff"}} />,
            filledIcon: <HomeOutlinedIcon sx={{color: "#fff"}} />,
            route: "/home"
        },
        {
            id: "2",
            outlineIcon: <SearchIcon sx={{color: "#fff"}} />,
            filledIcon: <SearchOutlinedIcon sx={{color: "#fff"}} />,
            route: "/search"
        },
        {
            id: "3",
            outlineIcon: <NotificationsIcon sx={{color: "#fff"}} />,
            filledIcon: <NotificationsNoneOutlinedIcon sx={{color: "#fff"}} />,
            route: "/notif"
        }
    ]

    const [activeButton, setActiveButton] = useState("1")

    return(
        <Box sx={{...classes.root}}>
            <Grid container>
                {
                    buttons.map((btn) => (
                        <Grid key={btn.id} item xs={4} sm={4}>
                            <Button 
                                onClick={()=> {
                                    setActiveButton(btn.id);
                                    Router.push(btn.route)
                                }}
                                sx={{color: "#fff"}}
                            >
                                {activeButton === btn.id ? btn.outlineIcon : btn.filledIcon}
                            </Button>
                        </Grid>
                    ))
                }
            </Grid>
        </Box>
       
    )
}