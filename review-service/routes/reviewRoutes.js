const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', reviewController.getAllReviews);
router.get('/:id', reviewController.getReviewById);
router.get('/menu/:menuId', reviewController.getReviewsByMenuId);
router.get('/user/:userId', reviewController.getReviewsByUserId);
router.get('/stats/menu/:menuId', reviewController.getReviewStatsByMenuId);

router.post('/', authMiddleware, reviewController.createReview);
router.put('/:id', authMiddleware, reviewController.updateReview);
router.delete('/:id', authMiddleware, reviewController.deleteReview);

module.exports = router;