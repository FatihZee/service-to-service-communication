const Menu = require('../models/menuModel');
const axios = require('axios');

module.exports = {
  getAllMenus: async (req, res) => {
    Menu.getAll(async (err, menus) => {
      if (err) return res.status(500).json({ error: err });

      const menusWithOrderCount = await Promise.all(
        menus.map(async (menu) => {
          try {
            const orderCountRes = await axios.get(`http://localhost:3003/orders/menu/${menu.id}`, {
              headers: {
                Authorization: req.headers.authorization
              }
            });
            return { ...menu, orderCount: orderCountRes.data.count };
          } catch (err) {
            return { ...menu, orderCount: 0 };
          }
        })
      );

      res.json(menusWithOrderCount);
    });
  },

  getMenuById: (req, res) => {
    const id = req.params.id;
    Menu.getById(id, (err, results) => {
      if (err) return res.status(500).json({ error: err });
      if (results.length === 0) return res.status(404).json({ message: 'Menu not found' });
      res.json(results[0]);
    });
  },

  createMenu: async (req, res) => {
    const { name, description, price } = req.body;
    const userId = req.user.id;

    try {
      const userRes = await axios.get(`http://localhost:3001/users/${userId}`, {
        headers: {
          Authorization: req.headers.authorization
        }
      });
      const user = userRes.data;

      const menu = {
        name,
        description,
        price,
        user_id: userId,
      };

      Menu.create(menu, (err, result) => {
        if (err) return res.status(500).json({ error: err });

        res.status(201).json({
          message: 'Menu created successfully',
          menuId: result.insertId,
          createdBy: user
        });
      });
    } catch (error) {
      res.status(500).json({ error: 'Gagal membuat menu', detail: error.message });
    }
  },

  updateMenu: (req, res) => {
    const id = req.params.id;
    const { name, description, price } = req.body;
    const userId = req.user.id;

    Menu.getById(id, (err, results) => {
      if (err) return res.status(500).json({ error: err });
      if (results.length === 0) return res.status(404).json({ message: 'Menu not found' });

      const menu = results[0];
      if (menu.user_id !== userId) {
        return res.status(403).json({ error: 'You are not authorized to update this menu' });
      }

      Menu.update(id, { name, description, price }, (err) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: 'Menu updated successfully' });
      });
    });
  },

  deleteMenu: (req, res) => {
    const id = req.params.id;
    const userId = req.user.id;

    Menu.getById(id, (err, results) => {
      if (err) return res.status(500).json({ error: err });
      if (results.length === 0) return res.status(404).json({ message: 'Menu not found' });

      const menu = results[0];
      if (menu.user_id !== userId) {
        return res.status(403).json({ error: 'You are not authorized to delete this menu' });
      }

      Menu.delete(id, (err) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: 'Menu deleted successfully' });
      });
    });
  },
};
