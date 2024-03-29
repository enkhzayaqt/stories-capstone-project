const express = require('express');
const { Story, User, Comment, Clap } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { validateQueryParams } = require('../../utils/validation')
const { Op } = require('sequelize');
const { singleMulterUpload, singlePublicFileUpload } = require('../../awsS3');
const router = express.Router();

// Get all stories
router.get('/', async (req, res) => {
    let { page, size } = req.query
    const errors = validateQueryParams(req.query);
    if (errors.length === 0) {
        if (!page) page = 1;
        if (!size) size = 100;
        page = parseInt(page);
        size = parseInt(size);

        const pagination = {}
        if (page >= 1 && size >= 1) {
            pagination.limit = size;
            pagination.offset = size * (page - 1)
        }

        const stories = await Story.findAll({
            include: [
                {
                    model: Comment
                },
                {
                    model: User
                },
                {
                    model: Clap
                }
            ],
            ...pagination
        })

        let storyList = [];
        stories.forEach(story => {
            // storyList.push(story.toJSON())
            const newStory = story.toJSON();
            const user = User.findByPk(newStory.userId)
            newStory.user = user;
            storyList.push(newStory)

        });


        return res.json({
            Stories: storyList,
            page,
            size
        })
    } else {
        res.status(400);
        const errResponse = {};
        errors.forEach(er => {
            errResponse[er[0]] = er[1];
        });
        res.json({
            message: 'Validation Error',
            errors: errResponse
        })
    }
});

// Get details of a Story by id:
router.get('/:storyId', async (req, res) => {
    const story = await Story.findOne({
        where: {
            id: req.params.storyId
        },
        include: [
            { model: User },
            { model: Clap },

        ]
    })

    if (!story) {
        res.status(404)
        res.json({
            message: "Story couldn't be found",
            statusCode: 404
        })
    }

    const editStory = story.toJSON();
    editStory.user = {
        id: story.User.id,
        name: story.User.name
    }
    if (editStory.image.length < 1) {
        editStory.image = 'no images yet'
    }
    delete editStory.User
    return res.json(editStory)
})

// Get all Comments by a Story's id
router.get('/:storyId/comments', requireAuth, async (req, res) => {
    const story = await Story.findByPk(req.params.storyId);
    if (!story) {
        res.status(404)
        res.json({
            message: "Story couldn't be found",
            statusCode: 404
        })
    }
    const comment = await Comment.findAll({
        where: {
            storyId: req.params.storyId
        },
        include: [
            {
                model: User,
                attributes: ['id', 'name']
            }
        ]
    });
    return res.json({
        comment
    })
})


// Create a Story
router.post('/', singleMulterUpload("image"), requireAuth, async (req, res) => {

    const { title, body } = req.body;
    let image = "https://contenthub-static.grammarly.com/blog/wp-content/uploads/2020/10/Write-a-Story.jpg";

    if (req.file) {
        image = await singlePublicFileUpload(req.file);
    }

    const story = await Story.create({
        userId: req.user.id,
        title,
        body,
        image,
    })
    story.save();
    res.status(201);
    res.json(story)
})

// Create a Comment for a Stpry based on the Story's id
router.post('/:storyId/comments', requireAuth, async (req, res) => {
    const story = await Story.findByPk(req.params.storyId);
    if (!story) {
        res.status(404)
        res.json({
            message: "story couldn't be found",
            statusCode: 404
        })
    }
    const comment = await Comment.findOne({
        where: {
            storyId: req.params.storyId,
            userId: req.user.id
        }
    })
    if (comment) {
        res.status(403)
        res.json({
            message: "User already has a review for this story",
            statusCode: 403
        })
    } else {
        // const errors = validateNewReview(req.body);
        // if (errors.length === 0) {

        const { comment } = req.body;
        const storyComment = await Comment.create({
            storyId: req.params.storyId,
            userId: req.user.id,
            comment
        })
        storyComment.save();
        res.status(201);
        res.json(storyComment)
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



})


// Edit a Story
router.put('/:storyId', singleMulterUpload("image"), requireAuth, async (req, res) => {
    const story = await Story.findByPk(req.params.storyId);

    if (story) {
        //Authorization
        if (req.user.id !== story.userId) {
            res.status(403)
            res.json({
                message: "Forbidden",
                statusCode: 403
            })
        }

        const { title, body } = req.body;
        // let image = "https://contenthub-static.grammarly.com/blog/wp-content/uploads/2020/10/Write-a-Story.jpg";
        let image = story.image;
        if (req.file) {
            image = await singlePublicFileUpload(req.file);
        }

        story.title = title;
        story.body = body;
        story.image = image;
        story.save();
        res.status(201);
        res.json(story)
    }

    res.status(404)
    res.json({
        message: "Story couldn't be found",
        statusCode: 404
    })
});

// Delete a Story
router.delete('/:storyId', requireAuth, async (req, res) => {
    const story = await Story.findByPk(req.params.storyId);
    if (story) {
        //Authorization
        if (req.user.id !== story.userId) {
            res.status(403)
            res.json({
                message: "Forbidden",
                statusCode: 403
            })
        }
        await story.destroy();
        res.status(200)
        res.json({
            message: `Successfully deleted`,
            statusCode: 200
        });
    } else {
        res.status(404);
        res.json({
            message: "story couldn't be found",
            statusCode: 404
        })
    }
})

// Increment claps
router.post('/:storyId/clap', async (req, res) => {
    const userClap = await Clap.findOne({
        where: {
            storyId: req.params.storyId,
            userId: req.user.id
        },
    });
    if (userClap) {
        if (userClap.count < 50) {
            userClap.count = userClap.count + 1;
            userClap.save();
            res.status(201);
            res.json({ storyId: userClap.storyId, updated: true })
        } else {
            res.status(201);
            res.json({ storyId: userClap.storyId, updated: false })
        }
    } else {
        const newClap = await Clap.create({
            storyId: req.params.storyId,
            userId: req.user.id,
            count: 1
        })
        newClap.save();
        res.status(201);
        res.json({ storyId: userClap.storyId, updated: true })
    }
})


module.exports = router;
