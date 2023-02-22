const express = require('express');
const { Story, User } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { validateQueryParams } = require('../../utils/validation')
const { Op } = require('sequelize');
const router = express.Router();

// Get all stories
router.get('/', async (req, res) => {
    let { page, size } = req.query
    const errors = validateQueryParams(req.query);
    if (errors.length === 0) {
        if (!page) page = 1;
        if (!size) size = 10;
        page = parseInt(page);
        size = parseInt(size);

        const pagination = {}
        if (page >= 1 && size >= 1) {
            pagination.limit = size;
            pagination.offset = size * (page - 1)
        }

        const stories = await Story.findAll({
            ...pagination
        })

        let storyList = [];
        stories.forEach(story => {
            storyList.push(story.toJSON())
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

module.exports = router;
