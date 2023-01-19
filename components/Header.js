import { Box, Avatar, Typography, Button } from "@mui/material"
import LogoutIcon from '@mui/icons-material/Logout';
import { signOut } from "next-auth/react";


const classes = {
    userDetails:{
        display: "flex",
        alignItems: "center"
    },
    root:{
        display: "flex",
        alignItems: "center",
        width: '93vw'
    }
}

export default function Header({user}){
    return (
        <Box container sx={{...classes.root}}>
            <Box sx={{...classes.userDetails}}>
                <Avatar alt={`${user.name}`} sx={{marginRight: "10px"}}>{user.name.slice(0,1).toUpperCase()}</Avatar>
                <Typography variant="h6">{user.name}</Typography>
            </Box>
            <Box sx={{marginLeft: "auto"}}>
                <Button>
                    <LogoutIcon onClick={() => signOut()} fontSize="10" sx={{color: "#000"}} />
                </Button>
            </Box>
        </Box>
    )
}