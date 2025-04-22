const axios = require('axios');
const Order = require('../models/orderModel');

module.exports = {
  getAllOrders: (req, res) => {
    Order.getAll((err, results) => {
      if (err) return res.status(500).json({ error: err });
      res.json(results);
    });
  },

  createOrder: async (req, res) => {
    const userId = req.user.id;

    const { menuId, quantity } = req.body;

    try {
      const token = req.headers.authorization;
      
      const userRes = await axios.get(`http://localhost:3001/users/${userId}`, {
        headers: {
          Authorization: token
        }
      });
      
      const user = userRes.data;
      const safeUserData = { ...user };
      delete safeUserData.password;

      const menuRes = await axios.get(`http://localhost:3002/menus/${menuId}`, {
        headers: {
          Authorization: token
        }
      });
      
      const menu = menuRes.data;

      const totalPrice = menu.price * quantity;

      const orderData = {
        user_id: userId,
        menu_id: menuId,
        quantity,
        total_price: totalPrice,
      };

      Order.create(orderData, (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.status(201).json({
          message: 'Order created successfully',
          order: {
            id: result.insertId,
            ...orderData,
            user: safeUserData,
            menu,
          },
        });
      });
    } catch (error) {
      res.status(500).json({ error: 'Gagal memproses order', detail: error.message });
    }
  },

  getOrderById: (req, res) => {
    const id = req.params.id;
    Order.getById(id, (err, results) => {
      if (err) return res.status(500).json({ error: err });
      if (results.length === 0) return res.status(404).json({ message: 'Order not found' });
      res.json(results[0]);
    });
  },

  updateOrder: async (req, res) => {
    const id = req.params.id;
    const userId = req.user.id;
    const { menuId, quantity } = req.body;
  
    try {
      const token = req.headers.authorization;
  
      const userRes = await axios.get(`http://localhost:3001/users/${userId}`, {
        headers: { Authorization: token }
      });
      const user = userRes.data;
      const safeUserData = { ...user };
      delete safeUserData.password;
  
      const menuRes = await axios.get(`http://localhost:3002/menus/${menuId}`, {
        headers: { Authorization: token }
      });
      const menu = menuRes.data;
  
      const totalPrice = menu.price * quantity;
  
      const updatedData = {
        user_id: userId,
        menu_id: menuId,
        quantity,
        total_price: totalPrice
      };
  
      Order.update(id, updatedData, (err, result) => {
        if (err) return res.status(500).json({ error: err });
  
        res.json({
          message: 'Order updated successfully',
          order: {
            id,
            ...updatedData,
            user: safeUserData,
            menu
          }
        });
      });
    } catch (error) {
      res.status(500).json({ error: 'Gagal memperbarui order', detail: error.message });
    }
  },  

  deleteOrder: (req, res) => {
    const id = req.params.id;
    Order.delete(id, (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ message: 'Order deleted', id });
    });
  },
  
  getOrdersByUserId: (req, res) => {
    const userId = req.params.userId;
    Order.getByUserId(userId, (err, results) => {
      if (err) return res.status(500).json({ error: err });
      res.json(results);
    });
  },
  
  getOrderCountByMenuId: (req, res) => {
    const menuId = req.params.menuId;
    Order.countByMenuId(menuId, (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ count: result[0].count });
    });
  }
};