const Review = require('../models/reviewModel');
const axios = require('axios');

module.exports = {
  getAllReviews: async (req, res) => {
    Review.getAll(async (err, reviews) => {
      if (err) return res.status(500).json({ error: err });

      try {
        const reviewsWithDetails = await Promise.all(
          reviews.map(async (review) => {
            const token = req.headers.authorization;
            
            let user;
            try {
              const userRes = await axios.get(`http://localhost:3001/users/${review.user_id}`, {
                headers: { Authorization: token }
              });
              user = userRes.data;
              delete user.password;
            } catch (error) {
                console.error(`Failed to fetch user ${review.user_id}:`, error.message);
                user = { id: review.user_id, name: 'Unknown User' };
            }

            let menu;
            try {
              const menuRes = await axios.get(`http://localhost:3002/menus/${review.menu_id}`, {
                headers: { Authorization: token }
              });
              menu = menuRes.data;
            } catch (error) {
              menu = { id: review.menu_id, name: 'Unknown Menu' };
            }

            return {
              ...review,
              user,
              menu
            };
          })
        );

        res.json(reviewsWithDetails);
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch review details', detail: error.message });
      }
    });
  },

  getReviewById: async (req, res) => {
    const id = req.params.id;
    Review.getById(id, async (err, results) => {
      if (err) return res.status(500).json({ error: err });
      if (results.length === 0) return res.status(404).json({ message: 'Review not found' });

      const review = results[0];
      const token = req.headers.authorization;

      try {
        const userRes = await axios.get(`http://localhost:3001/users/${review.user_id}`, {
          headers: { Authorization: token }
        });
        const user = userRes.data;
        delete user.password;

        const menuRes = await axios.get(`http://localhost:3002/menus/${review.menu_id}`, {
          headers: { Authorization: token }
        });
        const menu = menuRes.data;

        const orderRes = await axios.get(`http://localhost:3003/orders/${review.order_id}`, {
          headers: { Authorization: token }
        });
        const order = orderRes.data;

        res.json({
          ...review,
          user,
          menu,
          order
        });
      } catch (error) {
        res.json(review);
      }
    });
  },

  createReview: async (req, res) => {
    const { orderId, rating, comment } = req.body;
    const userId = req.user.id;
  
    if (!orderId || !rating) {
      return res.status(400).json({ error: 'Order ID and rating are required' });
    }
  
    try {
      const token = req.headers.authorization;
  
      const orderRes = await axios.get(`http://localhost:3003/orders/${orderId}`, {
        headers: { Authorization: token }
      });
  
      const order = orderRes.data;
      if (order.user_id !== userId) {
        return res.status(403).json({ error: 'You can only review orders that you placed' });
      }
  
      if (!order.menu || !order.menu.id) {
        const menuRes = await axios.get(`http://localhost:3002/menus/${order.menu_id}`, {
          headers: { Authorization: token }
        });
        order.menu = menuRes.data;
      }
  
      const menuId = order.menu.id;
  
      const reviewData = {
        user_id: userId,
        menu_id: menuId,
        order_id: orderId,
        rating,
        comment: comment || '',
        created_at: new Date()
      };
  
      Review.create(reviewData, (err, result) => {
        if (err) return res.status(500).json({ error: err });
        
        res.status(201).json({
          message: 'Review created successfully',
          review: {
            id: result.insertId,
            ...reviewData
          }
        });
      });
    } catch (error) {
      res.status(500).json({ error: 'Failed to create review', detail: error.message });
    }
  },  

  updateReview: async (req, res) => {
    const id = req.params.id;
    const { rating, comment } = req.body;
    const userId = req.user.id;
  
    try {
      const reviewRes = await new Promise((resolve, reject) => {
        Review.getById(id, (err, results) => {
          if (err) reject(err);
          resolve(results);
        });
      });
  
      if (!reviewRes || reviewRes.length === 0) {
        return res.status(404).json({ message: 'Review not found' });
      }
  
      const review = reviewRes[0];
  
      if (review.user_id !== userId) {
        return res.status(403).json({ error: 'You can only update your own reviews' });
      }
  
      const orderRes = await axios.get(`http://localhost:3003/orders/${review.order_id}`, {
        headers: { Authorization: req.headers.authorization }
      });
  
      const order = orderRes.data;
      if (order.user_id !== userId) {
        return res.status(403).json({ error: 'You can only update reviews for orders you placed' });
      }
  
      if (!order.menu || !order.menu.id) {
        const menuRes = await axios.get(`http://localhost:3002/menus/${order.menu_id}`, {
          headers: { Authorization: req.headers.authorization }
        });
        order.menu = menuRes.data;
      }
  
      const updatedData = {
        rating: rating || review.rating,
        comment: comment !== undefined ? comment : review.comment,
        updated_at: new Date()
      };
  
      await Review.update(id, updatedData);
  
      res.json({ message: 'Review updated successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to update review', detail: error.message });
    }
  },  

  deleteReview: (req, res) => {
    const id = req.params.id;
    const userId = req.user.id;

    Review.getById(id, (err, results) => {
      if (err) return res.status(500).json({ error: err });
      if (results.length === 0) return res.status(404).json({ message: 'Review not found' });

      const review = results[0];
      if (review.user_id !== userId) {
        return res.status(403).json({ error: 'You can only delete your own reviews' });
      }

      Review.delete(id, (err) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: 'Review deleted successfully' });
      });
    });
  },

  getReviewsByUserId: async (req, res) => {
    const userId = req.params.userId;
    
    Review.getByUserId(userId, async (err, reviews) => {
      if (err) return res.status(500).json({ error: err });

      try {
        const token = req.headers.authorization;
        
        const userRes = await axios.get(`http://localhost:3001/users/${userId}`, {
          headers: { Authorization: token }
        });
        const user = userRes.data;
        delete user.password;

        const reviewsWithDetails = await Promise.all(
          reviews.map(async (review) => {
            let menu;
            try {
              const menuRes = await axios.get(`http://localhost:3002/menus/${review.menu_id}`, {
                headers: { Authorization: token }
              });
              menu = menuRes.data;
            } catch (error) {
              menu = { id: review.menu_id, name: 'Unknown Menu' };
            }

            return {
              ...review,
              menu
            };
          })
        );

        res.json({
          user,
          reviews: reviewsWithDetails
        });
      } catch (error) {
        res.json({ userId, reviews });
      }
    });
  },

  getReviewsByMenuId: async (req, res) => {
    const menuId = req.params.menuId;
    
    Review.getByMenuId(menuId, async (err, reviews) => {
      if (err) return res.status(500).json({ error: err });

      try {
        const token = req.headers.authorization;
        
        const menuRes = await axios.get(`http://localhost:3002/menus/${menuId}`, {
          headers: { Authorization: token }
        });
        const menu = menuRes.data;

        Review.getAverageRatingByMenuId(menuId, (err, avgResult) => {
          if (err) return res.status(500).json({ error: err });

          const averageRating = avgResult[0].averageRating || 0;

          Promise.all(
            reviews.map(async (review) => {
              let user;
              try {
                const userRes = await axios.get(`http://localhost:3001/users/${review.user_id}`, {
                  headers: { Authorization: token }
                });
                user = userRes.data;
                delete user.password;
              } catch (error) {
                user = { id: review.user_id, name: 'Unknown User' };
              }

              return {
                ...review,
                user
              };
            })
          ).then(reviewsWithUsers => {
            res.json({
              menu,
              averageRating,
              reviewCount: reviews.length,
              reviews: reviewsWithUsers
            });
          }).catch(error => {
            res.status(500).json({ error: 'Failed to fetch user details', detail: error.message });
          });
        });
      } catch (error) {
        res.json({ menuId, reviews });
      }
    });
  },

  getReviewStatsByMenuId: (req, res) => {
    const menuId = req.params.menuId;
    
    Review.getAverageRatingByMenuId(menuId, (err, avgResult) => {
      if (err) return res.status(500).json({ error: err });

      Review.countByMenuId(menuId, (err, countResult) => {
        if (err) return res.status(500).json({ error: err });

        res.json({
          menuId,
          averageRating: avgResult[0].averageRating || 0,
          reviewCount: countResult[0].count || 0
        });
      });
    });
  }
};