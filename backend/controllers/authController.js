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
};

module.exports = authController;