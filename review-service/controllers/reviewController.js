const Review = require('../models/reviewModel');
const axios = require('axios');
const { analyzeSentiment } = require('../helpers/sentimentAnalyzer');
const db = require('../config/db');

const saveAIRecommendationToDb = (reviewId, recommendation) => {
  return new Promise((resolve, reject) => {
    const recommendationData = {
      review_id: reviewId,
      recommendation: recommendation,
      created_at: new Date()
    };

    db.query(
      'INSERT INTO ai_recommendations SET ?',
      recommendationData,
      (err, result) => {
        if (err) {
          console.error('Error menyimpan rekomendasi AI:', err);
          reject(err);
        } else {
          resolve(result);
        }
      }
    );
  });
};

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
      return res.status(400).json({ error: 'Order ID dan rating wajib diisi' });
    }
  
    try {
      const token = req.headers.authorization;
      const orderRes = await axios.get(`http://localhost:3003/orders/${orderId}`, {
        headers: { Authorization: token }
      });
      const order = orderRes.data;
  
      if (order.user_id !== userId) {
        return res.status(403).json({ error: 'Anda hanya dapat memberikan review untuk pesanan Anda sendiri' });
      }
  
      if (!order.menu || !order.menu.id) {
        const menuRes = await axios.get(`http://localhost:3002/menus/${order.menu_id}`, {
          headers: { Authorization: token }
        });
        order.menu = menuRes.data;
      }
  
      const menuId = order.menu.id;
      const menuName = order.menu.name; 
      const originalComment = comment || '';
  
      let sentimentLabel = 'neutral';
      if (originalComment) {
        sentimentLabel = await analyzeSentiment(originalComment);
      }
  
      const reviewData = {
        user_id: userId,
        menu_id: menuId,
        order_id: orderId,
        rating,
        comment: originalComment,
        sentiment: sentimentLabel,
        created_at: new Date()
      };
  
      const createReviewPromise = () => {
        return new Promise((resolve, reject) => {
          db.query('INSERT INTO reviews SET ?', reviewData, (err, result) => {
            if (err) reject(err);
            else resolve({ id: result.insertId, ...reviewData });
          });
        });
      };
  
      const newReview = await createReviewPromise();
      
      let aiRecommendation = null;
  
      if (sentimentLabel === 'negative') {
        try {
          const aiPrompt = `Buat tanggapan singkat (1 paragraf) untuk review negatif berikut tentang menu ${menuName}: "${originalComment}". Sertakan saran perbaikan yang jelas dan padat.`;
          
          const aiResponse = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            signal: AbortSignal.timeout(30000),
            method: "POST",
            headers: {
              "Authorization": "Bearer " + process.env.OPENROUTER_API_KEY,
              "HTTP-Referer": "http://localhost",
              "X-Title": "Restaurant Review System",
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              "model": "microsoft/mai-ds-r1:free",
              "messages": [
                {
                  "role": "user",
                  "content": aiPrompt
                }
              ]
            })
          });
  
          const aiData = await aiResponse.json();
          if (aiData && aiData.choices && aiData.choices.length > 0) {
            aiRecommendation = aiData.choices[0].message.content;
          } else {
            console.error("AI tidak memberikan rekomendasi yang valid:", aiData);
            aiRecommendation = "Kami tidak dapat memberikan rekomendasi saat ini.";
          }          
  
          await saveAIRecommendationToDb(newReview.id, aiRecommendation);
        } catch (aiError) {
          console.error("Error saat meminta rekomendasi AI:", aiError);
          aiRecommendation = {
            recommendation: "Maaf atas pengalaman yang kurang menyenangkan. Kami akan mengevaluasi kualitas menu ini dan meningkatkan pelayanan kami."
          };
        }
      }
  
      res.status(201).json({
        message: 'Review berhasil dibuat',
        review: newReview,
        aiRecommendation
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Gagal membuat review', detail: error.message });
    }
  },
  
  getAIRecommendation: async (req, res) => {
    const { reviewId } = req.params;
  
    try {
      db.query(
        'SELECT * FROM ai_recommendations WHERE review_id = ?',
        [reviewId],
        (err, results) => {
          if (err) return res.status(500).json({ error: err });
          if (results.length === 0) {
            return res.status(404).json({ error: 'Rekomendasi AI tidak ditemukan' });
          }
          res.json(results[0]);
        }
      );
    } catch (error) {
      res.status(500).json({ error: 'Gagal mengambil rekomendasi AI', detail: error.message });
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
  
      let sentimentLabel = review.sentiment;
      
      if (comment !== undefined) {
        sentimentLabel = await analyzeSentiment(comment);
        
        console.log("Komentar asli:", comment);
        console.log("Sentimen:", sentimentLabel);
      }
  
      const updatedData = {
        rating: rating !== undefined ? rating : review.rating,
        comment: comment !== undefined ? comment : review.comment,
        sentiment: sentimentLabel,
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
            } catch {
              menu = { id: review.menu_id, name: 'Unknown Menu' };
            }
            return { ...review, menu };
          })
        );

        res.json({ user, reviews: reviewsWithDetails });
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
              } catch {
                user = { id: review.user_id, name: 'Unknown User' };
              }
              return { ...review, user };
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
  
  getReviewsByOrderId: async (req, res) => {
    const orderId = req.params.orderId;
  
    Review.getByOrderId(orderId, async (err, reviews) => {
      if (err) return res.status(500).json({ error: err });
  
      try {
        const token = req.headers.authorization;
  
        const orderRes = await axios.get(`http://localhost:3003/orders/${orderId}`, {
          headers: { Authorization: token }
        });
        const order = orderRes.data;
  
        let menu = {};
        try {
          const menuRes = await axios.get(`http://localhost:3002/menus/${order.menu_id}`, {
            headers: { Authorization: token }
          });
          menu = menuRes.data;
        } catch {
          menu = { id: order.menu_id, name: 'Unknown Menu' };
        }
  
        const reviewsWithUsers = await Promise.all(
          reviews.map(async (review) => {
            let user;
            try {
              const userRes = await axios.get(`http://localhost:3001/users/${review.user_id}`, {
                headers: { Authorization: token }
              });
              user = userRes.data;
              delete user.password;
            } catch {
              user = { id: review.user_id, name: 'Unknown User' };
            }
  
            return { ...review, user };
          })
        );
  
        res.json({
          order: {
            id: order.id,
            menu,
            quantity: order.quantity,
            total_price: order.total_price
          },
          reviewCount: reviews.length,
          reviews: reviewsWithUsers
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch order or review details', detail: error.message });
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
  },
  
  getReviewsByMenuIdAndSentiment: async (req, res) => {
    const menuId = req.params.menuId;
    const sentiment = req.params.sentiment;
    
    Review.getByMenuIdAndSentiment(menuId, sentiment, async (err, reviews) => {
      if (err) return res.status(500).json({ error: err });
      
      try {
        const token = req.headers.authorization;
        const reviewsWithDetails = await Promise.all(
          reviews.map(async (review) => {
            let user;
            try {
              const userRes = await axios.get(`http://localhost:3001/users/${review.user_id}`, {
                headers: { Authorization: token }
              });
              user = userRes.data;
              delete user.password;
            } catch {
              user = { id: review.user_id, name: 'Unknown User' };
            }
            return { ...review, user };
          })
        );
        
        res.json({
          menuId,
          sentiment,
          reviewCount: reviews.length,
          reviews: reviewsWithDetails
        });
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch details', detail: error.message });
      }
    });
  },
  
  getSentimentStatsByMenuId: (req, res) => {
    const menuId = req.params.menuId;
    
    Review.getSentimentCountByMenuId(menuId, (err, sentimentCounts) => {
      if (err) return res.status(500).json({ error: err });
      
      const stats = {
        positive: 0,
        negative: 0,
        neutral: 0,
        total: 0
      };
      
      sentimentCounts.forEach(item => {
        stats[item.sentiment] = item.count;
        stats.total += item.count;
      });
      
      if (stats.total > 0) {
        stats.positivePercentage = Math.round((stats.positive / stats.total) * 100);
        stats.negativePercentage = Math.round((stats.negative / stats.total) * 100);
        stats.neutralPercentage = Math.round((stats.neutral / stats.total) * 100);
      }
      
      res.json({
        menuId,
        sentimentStats: stats
      });
    });
  }
};