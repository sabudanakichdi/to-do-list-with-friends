const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models/user/User');
const { use } = require('../routes/auth/authRoutes');
var nodemailer = require('nodemailer');

const JWT_SECRET = 'JWT_SECRET'; // Replace with a strong, secret key

class authService {
  static async register(body) {
    // Check if the user with the same email already exists
     console.log(body);
     User.findOne({email : body.email}).then((u) => {
      if(!u)
      return ('User with this email already exists.');
    })

    const hashedPassword = await bcrypt.hash(body.password, 10);

    const newuser = new User ({email: body.email, first_name:body.first_name, last_name:body.last_name,password:hashedPassword,username:body.username,contact:body.contact });    
    newuser.save();
    
    return {"status": "success", "user":newuser};
  }

  static async login(iemail, password) {
    // Find the user by email
    // console.log(password);
    // console.log(iemail);
    const user = await User.findOne({ email: iemail });
    if (!user) throw "Invalid Username or Password";

    const isPasswordValid = await bcrypt.compare(password, user.password);
    // console.log(isPasswordValid);
    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }

    const token= jwt.sign({ userId: user.id, email: user.email }, "JWT_SECRET", { expiresIn: '1h'});

    return {"token":token, "user": { username: user.username, email: user.email, first_name:user.first_name, last_name:user.last_name}};  
  }

  static async isAuth(token, email) {
    const decodedToken = jwt.verify(token, JWT_SECRET);    

    if(email!==decodedToken.email)
      return null;
    else        
      return {"token":token, "userid": decodedToken.userId, "email": decodedToken.email};  
  }

  static async resetPwd(iemail, password) {
    const user = await User.findOne({ email: iemail });
    if (!user) throw "Invalid Username or Password";
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password=hashedPassword;
    user.save()
    return {"Message":"Password updated", "user": { username: user.username, email: user.email, first_name:user.first_name, last_name:user.last_name}};  
  }


  static async forgotPwd(iemail, uname) {    
    const user = await User.findOne({ email: iemail , username: uname});
    if (!user) throw "Invalid Username or email";    
    var res=this.sendmail(user.email, "reset Password", "reset link");
    return {"message": res.status };  
  }


  static async invitebymail(email)
  {
  //  console.log(email);
   sendmail(email,"Welcome to WeDoList","You have been invited to join WeDo List " + "http://localhost:3000/register");
  }

  
  static async sendmail(email, sub='Welcome to WeDoList', msg='You have been invited by ')
  {
    try{
      var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
            user: 'wedolist411@gmail.com',
            pass: 'uzsr jzje cjcr pocv '
          }
        });
        console.log("nodemailer created");
      var mailOptions = {
        from: 'wedolist411@gmail.com',
        to: email,
        subject: sub,
        text: msg
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {          
          console.log('Email sent: ' + info.response);
          return info.response;
        }
      });
      console.log("sent");
    }catch(error){
      // console.log(error);
    }
  }
};

module.exports = authService;