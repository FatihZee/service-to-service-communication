const db = require('../config/db');

const User = {
  getAll: (callback) => {
    db.query('SELECT * FROM users', callback);
  },

  getById: (id, callback) => {
    db.query('SELECT * FROM users WHERE id = ?', [id], callback);
  },

  getByEmail: (email, callback) => {
    db.query('SELECT * FROM users WHERE email = ?', [email], callback);
  },

  create: (data, callback) => {
    db.query('INSERT INTO users SET ?', data, callback);
  },

  update: (id, data, callback) => {
    db.query('UPDATE users SET ? WHERE id = ?', [data, id], callback);
  },

  delete: (id, callback) => {
    db.query('DELETE FROM users WHERE id = ?', [id], callback);
  },
};

module.exports = User;
