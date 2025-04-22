const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const axios = require('axios');

module.exports = {
  getAllUsers: (req, res) => {
    User.getAll((err, results) => {
      if (err) return res.status(500).json({ error: err });
      res.json(results);
    });
  },

  getUserById: (req, res) => {
    const id = req.params.id;
    User.getById(id, (err, results) => {
      if (err) return res.status(500).json({ error: err });
      if (results.length === 0) return res.status(404).json({ message: 'User not found' });
      res.json(results[0]);
    });
  },

  registerUser: async (req, res) => {
    const { name, email, password, phone } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email, and password are required' });
    }

    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      User.create({ name, email, password: hashedPassword, phone }, (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.status(201).json({ id: result.insertId, name, email, phone });
      });
    } catch (err) {
      res.status(500).json({ error: 'Error hashing password' });
    }
  },

  updateUser: async (req, res) => {
    const id = req.params.id;
    const { name, email, phone, password } = req.body;

    const updatedData = { name, email, phone };

    if (password) {
      try {
        const hashedPassword = await bcrypt.hash(password, 10);
        updatedData.password = hashedPassword;
      } catch (err) {
        return res.status(500).json({ error: 'Error hashing password' });
      }
    }

    User.update(id, updatedData, (err) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ message: 'User updated successfully' });
    });
  },

  deleteUser: (req, res) => {
    const id = req.params.id;
    User.delete(id, (err) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ message: 'User deleted successfully' });
    });
  },

  loginUser: (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    User.getByEmail(email, async (err, results) => {
      if (err) return res.status(500).json({ error: err });
      if (results.length === 0) return res.status(401).json({ error: 'Invalid email or password' });

      const user = results[0];

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      const token = jwt.sign(
        { id: user.id, email: user.email, name: user.name },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );

      res.json({
        message: 'Login successful',
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone
        }
      });
    });
  },
  
  getUserWithOrdersAndReviews: async (req, res) => {
    const userId = req.params.id;
    const token = req.headers.authorization;
  
    try {
      const userRes = await axios.get(`http://localhost:3001/users/${userId}`, {
        headers: { Authorization: token }
      });
      const user = userRes.data;
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      const orderRes = await axios.get(`http://localhost:3003/orders/user/${userId}`, {
        headers: { Authorization: token }
      });
      const orders = orderRes.data;
  
      const ordersWithDetails = await Promise.all(orders.map(async (order) => {
        let menu;
        try {
          const menuRes = await axios.get(`http://localhost:3002/menus/${order.menu_id}`, {
            headers: { Authorization: token }
          });
          menu = menuRes.data;
        } catch (err) {
          console.error(`Gagal ambil menu ${order.menu_id}:`, err.message);
          menu = { id: order.menu_id, name: 'Unknown Menu' };
        }
  
        let reviews = [];
        let reviewCount = 0;
        try {
          const reviewsRes = await axios.get(`http://localhost:3004/reviews/order/${order.id}`, {
            headers: { Authorization: token }
          });
          reviews = reviewsRes.data.reviews || [];
          reviewCount = reviewsRes.data.reviewCount || reviews.length;
        } catch (err) {
          console.error(`Gagal ambil review untuk order ${order.id}:`, err.message);
        }
  
        return {
          order_id: order.id,
          menu_name: menu.name,
          quantity: order.quantity,
          total_price: order.total_price,
          review_count: reviewCount,
          reviews: reviews.map(r => ({
            review_id: r.id,
            rating: r.rating,
            comment: r.comment
          }))
        };
      }));
  
      res.json({
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone,
        },
        orders: ordersWithDetails
      });
  
    } catch (error) {
      console.error('Gagal ambil data user/orders:', error.message);
      res.status(500).json({
        error: 'Failed to retrieve user orders and reviews',
        detail: error.message
      });
    }
  }  
};
