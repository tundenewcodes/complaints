const express = require('express');
const { body } = require('express-validator/check');

const reportController = require('../controllers/report');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

// GET /feed/posts
router.get('/reports', isAuth, reportController.getReports);

// POST /report/post
router.post(
    '/report', isAuth,
    [
        body('reportTitle')
        .trim()
        .isLength({ min: 5 })
        .withMessage('Please enter at least 5 characters'),
        body('reportBody')
        .trim()
        .isLength({ min: 5 })
        .withMessage('Please enter at least 5 characters'),
    ],
    reportController.createPost
)

router.get('/report/:reportId',  reportController.getReport);

router.put(
    '/report/:postId',
     [
        body('title')
        .trim()
        .isLength({ min: 5 })
        .withMessage('Please enter at least 5 characters'),
        body('content')
        .trim()
        .isLength({ min: 5 })
        .withMessage('Please enter at least 5 characters'),
    ],
    reportController.updatePost
)

// router.delete('/report/:reportId', isAuth, reportController.deleteReport);

module.exports = router;