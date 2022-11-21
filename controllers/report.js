const { validationResult } = require('express-validator/check');
const fs = require('fs')
const path = require('path')


const Report = require('../model/report');
const User = require('../model/user');

exports.getReports = async(req, res, next) => {
    // const currentPage = req.query.page || 1;
    // const perPage = 2;
    
    try {
        const totalItems = await Report.find().countDocuments();
        const recieved = await Report.find().countDocuments({status:'recieved'})
        const pending = await Report.find().countDocuments({status:'pending'})
        const reports = await Report.find()
            .populate('creator')
            .sort({ createdAt: -1 })
            // .skip((currentPage - 1) * perPage)
            // .limit(perPage);

        res.status(200).json({
            message: 'Fetched reports successfully.',
            reports: reports,
            totalItems: totalItems, recieved, pending
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.createPost = async(req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Validation failed, entered data is incorrect.');
        error.statusCode = 422;
        throw error;
    }


    const reportTitle = req.body.reportTitle;
    const reportBody = req.body.reportBody;
    const status =  req.body.status
        let creator;
    const report = new Report({
        reportTitle, reportBody, status,
        creator: req.userId
    });
   report
        .save()
        .then(result => {
            return User.findById(req.userId);
        })
        .then(user => {
            creator = user;
            user.reports.push(report);
            return user.save();
        })
        .then(result => {
            res.status(201).json({
                message: 'Post created successfully!',
                report: report,
                creator: { _id: creator._id, fullname: creator.fullname }
            });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.getReport = (req, res, next) => {
    const reportId = req.params.reportId;
    Report.findById(reportId)
        .then(report => {
            if (!report) {
                const error = new Error('Could not find report.');
                error.statusCode = 404;
                throw error;
            }
            res.status(200).json({ message: 'report fetched.', report: report });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
}







exports.updatePost = async(req, res, next) => {
    const postId = req.params.postId;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Validation failed, entered data is incorrect.');
        error.statusCode = 422;
        throw error;
    }
    const title = req.body.title;
    const content = req.body.content;

    try {
        const post = await Post.findById(postId).populate('creator');
        if (!post) {
            const error = new Error('Could not find post.');
            error.statusCode = 404;
            throw error;
        }
        if (post.creator._id.toString() !== req.userId) {
            const error = new Error('Not authorized!');
            error.statusCode = 403;
            throw error;
        }

        post.title = title;
        post.imageUrl = imageUrl;
        post.content = content;
        const result = await post.save();

        res.status(200).json({ message: 'Post updated!', post: result });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};




// exports.deletePost = (req, res, next) => {
//     const postId = req.params.postId
//     Post.findById(postId)
//         .then((post) => {
//             if (!post) {
//                 const error = new Error('Could not find post.')
//                 error.statusCode = 404
//                 throw error
//             }
//             // Check logged in user
//             clearImage(post.imageUrl)
//             return Post.findByIdAndRemove(postId)
//         })
//         .then((result) => {
//             console.log(result)
//             io.getIO().emit('posts', {
//                 action: 'delete',
//                 post: postId
//             })
//             res.status(200).json({ message: 'Deleted post.' })
//         })
//         .catch((err) => {
//             if (!err.statusCode) {
//                 err.statusCode = 500
//             }
//             next(err)
//         })
// }           next(err)
//         })
// }