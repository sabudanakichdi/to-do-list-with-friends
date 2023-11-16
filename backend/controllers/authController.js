const authService = require('../services/authService');

const authController = {
  register: async (req, res) => {
    try {
      const { email, password } = req.body;
      console.log(req.body);
      const user = await authService.register(req.body);
      res.json(user);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  login: async (req, res) => {
    try {
      // const { email, password } = req.body;
      const token = await authService.login(req.body.email, req.body.password);
      if (token) {
        res.json({ token });
      } else {
        res.status(401).json({ message: 'Authentication failed' });
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  users: async (req, res) => {
    try {
      const users = await authService.users();
      res.json(users);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  usersByGroup: async (req, res) => {
    try {
      const users = await authService.usersByGroup(req.params.name);
      res.json(users);
      }catch(error){
        res.status(400).json({ message: error.message });
      }
  },

  resetPwd: async (req,res) => {
    try {    
      const token = await authService.resetPwd(req.body.email, req.body.password);
      if (token) {
        res.json({ token });
      } else {
        res.status(401).json({ message: 'Authentication failed' });
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  forgotPwd: async (req,res) => {
    try {
      // const { email, password } = req.body;

      const token = await authService.forgotPwd(req.body.email, req.body.password);
      if (token) {
        res.json({ token });
      } else {
        res.status(401).json({ message: 'Authentication failed' });
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  isAuth: async (req,res) => {
    try {
      // const { email, password } = req.body;

      const ret = await authService.isAuth(req.body.token, req.body.email);
      console.log(ret);
      if (ret!==null) {
        console.log(ret);
        res.json(ret);
      } else {
        res.status(401).json({ message: 'Authentication failed' });
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  inviteByMail: async (req,res) => {
    try {
      const users =await authService.invitebymail(res.body.email)
    }catch(error){
      res.status(400).json({ message: error.message });
    }  
  }
};

module.exports = authController;