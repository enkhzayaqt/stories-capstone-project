const express = require('express');

const { Story, User, Comment } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
// const { validateNewReview } = require('../../utils/validation');

const router = express.Router();

// Edit a Comment
router.put('/:commentId', requireAuth, async (req, res) => {
    const editComment = await Comment.findByPk(req.params.commentId)

    if (editComment) {
        //Authorization
        if (req.user.id !== editComment.userId) {
            res.status(403)
            res.json({
                message: "Forbidden",
                statusCode: 403
            })
        }
        // const errors = validateNewReview(req.body);
        // if (errors.length === 0) {
            const { comment } = req.body;
            editComment.comment = comment;
            editComment.save();
            res.status(200);
            res.json(editComment)
        // } else {
        //     res.status(400);
        //     const errResponse = {};
        //     errors.forEach(er => {
        //         errResponse[er[0]] = er[1];
        //     });
        //     res.json({
        //         message: 'Validation Error',
        //         errors: errResponse
        //     })
        // }
    }
    res.status(404)
    res.json({
        message: "Comment couldn't be found",
        statusCode: 404
    })
});

// Delete a Comment
router.delete('/:commentId', requireAuth, async (req, res) => {
    const comment = await Comment.findByPk(req.params.commentId);

    if (comment) {
         //Authorization
         if (req.user.id !== review.userId) {
            res.status(403)
            res.json({
                message: "Forbidden",
                statusCode: 403
            })
         }

        await comment.destroy();
        res.status(200)
        res.json({
            message: `Successfully deleted`,
            statusCode: 200
        });
    } else {
        res.status(404);
        res.json({
            message: "Comment couldn't be found",
            statusCode: 404
        })
    }
})

module.exports = router;
