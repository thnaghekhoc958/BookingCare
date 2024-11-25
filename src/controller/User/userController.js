import newUserServices from "../../services/UserService/newUsersServicee"
const { ConnectDB, handleUserLogin } = require('../../config/connectDB');
let handleLogin = async(req,res) => {
    let email = req.body.email;
    let password = req.body.password;
    // console.log(req.body)
    console.log('your email: ' + email)
    console.log('your password: ' + password)
    // chinh thuc
    // if(!email || !password){
    //     return res.status(500).json({
    //         errcode: 1,
    //         errMessage: 'missing input a parameter!',
    //         test: 'test'
    //     })
    // }
    // let userdata = await newUserServices.handleUserLogin(email,password);

    // ?? SQL ỊNECTION
    await ConnectDB();
    let userdata = await handleUserLogin(email,password);
    // ?? SQL ỊNECTION
    
    return res.status(200).json({
        errcode : userdata.errcode,
        errMessage : userdata.message,
        userdata
    })
}


module.exports = {
    handleLogin : handleLogin,
}