import { useEffect, useState } from "react"
import {Box} from "@mui/material"
import SearchBar from "../components/SearchBar"
import {useRouter} from "next/router";
import { useSession } from "next-auth/react";
import axios from 'axios'

const classes = {
    root:{
        height: "100vh",
        display: "grid",
        justifyContent: "center",
        padding: "2rem"
    }
}

export default function Search (){

    const router = useRouter();

    const {data: session, status} = useSession();

    const [students, setStudents] = useState();

    useEffect(()=> {
        
        async function getAllStudents(){
            const {data} = await axios.get("/api/student");
            if(data){
                setStudents(data);
            }
        }

        if(status === "unauthenticated"){
            router.push("/");
        }else{
            getAllStudents();
        }   

    },[status])

    return(
        <Box sx={{...classes.root}} >
            <SearchBar placeholder={"Enter Student ID"} data={students} />
        </Box>
    )
}