import {Schema, model, models} from 'mongoose'

const studentSchema = new Schema({
    name:{
        type: String
    },
    regNo:{
        type: String
    },
    dept: {
        type: String
    },
    companies : [{
        cName:{
            type : String
        },
        mode:{
            type : String 
        }

    }]

});

const Student = models.Student || model('Student', studentSchema);

export default Student
