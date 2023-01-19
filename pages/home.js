import { useState, useEffect } from "react";
import { Grid, Box, Button, Typography } from "@mui/material"
import {useSession, signOut} from 'next-auth/react'
import { useRouter } from "next/router";
import Header from '../components/Header'
import AddIcon from '@mui/icons-material/Add';

const classes = {
    root:{
        padding: "1rem",
        height: "100vh"
    },
    addBtn:{
        position: "relative",
        bottom: "10"
    }
}

export default function Home(){

    const router = useRouter();

    const {data: session, status} = useSession();

    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState()

    useEffect(() => {
        if(status === "unauthenticated") router.replace("/");

        if(status === "authenticated"){
            setLoading(false);
            setUser(session.user);
        }
    },[status])

    return (
        <Grid container sx={{...classes.root}} >
            {
                loading ? <h1>Loading.....</h1> :  
                <Grid item sm={12}>
                    <Header user={user} />
                    <Button onClick={(e) => router.push("/addstudent") } variant="standard" type="button" size="small" sx={{...classes.addBtn}}>
                         <AddIcon />
                    </Button>
                </Grid>
            }
        </Grid>
    )
}

