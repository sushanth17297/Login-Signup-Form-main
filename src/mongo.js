const mongoose=require("mongoose")

mongoose.connect("mongodb+srv://issuetracker:itPass1234@cluster0.flf523j.mongodb.net/?retryWrites=true&w=majority")
.then(()=>{
    console.log('mongoose');
})
.catch((e)=>{
    console.log('failed');
})

const logInSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:false
    }
})

const LogInCollection=new mongoose.model('LogInCollection',logInSchema)

module.exports=LogInCollection