import { useEffect, useState } from "react";
import { useRouter } from "next/router"
import axios from 'axios'
import { Box, Button, Typography as h3 } from "@mui/material";



const classes = {
  root:{
    margin: "1rem"
  }
}


export default function studentId(){

    const router = useRouter();
    const studentId = router.query.studentId

    const [student, setStudent] = useState()

    async function getStudentDetail(){
      const {data} = await axios.get(`/api/student/${studentId}`)
      
      setStudent(data[0]);
    }

    useEffect(() => {
        getStudentDetail();
    },[studentId])

    let id=student?.regNo;

    return(
      <>
        {
          student ? <Box sx={{...classes.root}}>
            <h3 variant="h5">
              {student.name}
            </h3>
            <h5>
              {student.dept}
            </h5>
            <h5>
              {student.regNo}
            </h5>
            {
              student.companies && student.companies ? <>
                <h5>Total Companies: { student.companies.length }</h5>
                <h5>Companies :</h5>
                {
                  student.companies.map((c) => (
                    <div>
                      <p>{c.cName} - {c.mode}</p>
                    </div>
                  ))
                }
              </> : <>No Company Data</>
            }
            
            <Button onClick={(e) => router.push("/student/modify/"+`${student.regNo}`) } variant="standard" type="button" size="small" sx={{...classes.addBtn}}>
            Modify
            </Button>

          </Box> : <Box>
            <h1>Loading.....</h1>
          </Box>
        }

      </>

      
    )

}