const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models/user/User')


const JWT_SECRET = 'your-secret-key'; // Replace with a strong, secret key

const authService = {
  register: async (body) => {
    // Check if the user with the same email already exists
    // console.log(body);
    
    User.findOne({}, {email : body.email}).then((u) => {
      if(!u.$isEmpty())
      throw new Error('User with this email already exists.');
    })
    .catch((e) => {
      // taskResponses.sendError(res, messages.NOT_FOUND, e);
      console.log(e);
    });
    // console.log(existingUser.);    
    // console.log("herer");
    // if (existingUser) {
    //   throw new Error('User with this email already exists.');
    // }

    // Hash the user's password before storing it
    const hashedPassword = await bcrypt.hash(body.password, 10);
    // const newTask = new Task(req.body);

    // Simulate user registration
    const newuser = new User ({email: body.email, first_name:body.first_name, last_name:body.last_name,password:hashedPassword,username:body.username,contact:body.contact,groups:body.groups });    
    newuser.save();
    
    return newuser;
  },

  login: async (email, password) => {
    // Find the user by email
    console.log(password);
    console.log(email);
    const user = User.find({ 'email': email }, (err, user) => {
      if (err) {
        console.error('Error:', err);
      } else {
        if (user) {
          
          const isPasswordValid =  bcrypt.compare(password, user.password);

          if (!isPasswordValid) {
            throw new Error('Invalid password');
          }
      
          // Generate a JWT token
          const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, {
            expiresIn: '1h', // Token expiration time
          });
      
          return token;          
        } else {
          // User not found
          console.log('User not found');
        }
      }
    });
    // const user = User.find({u}, {u.email : email});
    // console.log(user);
    if (!user) {
      throw new Error('User not found');
    }
    // Compare the user's input password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: '1h', // Token expiration time
    });

    return token;
  },
  users: async () => {
    const users = await User.find({},'_id email first_name last_name username contact groups').exec();
    const transformedUsers = users.map((user) => ({
      _id: user._id,
      email: user.email,
      username: user.username,
      groups: user.groups,
    }));
    return transformedUsers;
  },
  usersByGroup: async (group) => {

    const users = await User.find({groups:group},'_id email first_name last_name username contact').exec();
    const transformedUsers = users.map((user) => ({
      _id: user._id,
      email: user.email,
      username: user.username,
      groups: user.groups,
    }));
    return transformedUsers;

  }
};

module.exports = authService;