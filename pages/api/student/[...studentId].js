import Student from "../../../models/studentModel";

export default async function StudentIdividual(req,res){

    const {studentId} = req.query

    if(req.method === "GET"){

        const student = await Student.find({
            regNo : studentId
        })

        if(student){
            res.json(student)
        }

    }
    else if(req.method === "PUT"){
        
        const student = await Student.find({
            regNo : studentId
        })

        if(student){
            const updateStudent = asyncHandler(async (req, res) => {
                const { name, regNo, dept, companies } =
                    req.body;
            
                const studentFound = await student.find(req.params.regNo);
            
                if (studentFound) {
                        (studentFound.name = name),
                        (studentFound.regNo = regNo),
                        (studentFound.dept = dept),
                        (studentFound.companies = companies);
            
                    const updatedStudent = await studentFound.save();
            
                    res.status(204).json({ message: "Student details Updated Successfully" });
            
            
                } else {
                    res.status(404);
                    throw new Error('Student not found');
                }
            })
        }

    }
}