const express = require('express');
const router = new express.Router();
const User = require('../models/user');
const News = require('../models/news');
const auth = require('../middleware/auth');

//new user to reigster on app
router.post("/register", async (req, res) => {
    const user = await User(req.body)
    try {
        await user.save();
        const token = await user.generateAuthToken();
        res.status(201).send({ user, token });
    } catch (error) {
        res.status(400).send(error)
    }
});

//existing user can login on app
router.post("/login", async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.Email, req.body.Password);
        const token = await user.generateAuthToken();
        res.send({ user, token });
    } catch (error) {
        res.status(400).send(error);
    }
});

//only logged in user can see profile details by clicking on view profile button
//thats why i used auth in line no 32 for authentication
router.get("/viewProfile", auth, async (req, res) => {
    res.send(req.user)
});

//only logged in user can update profile details by clicking edit profile button
//that why i used auth in line no 38 for authentication
router.patch("/updateProfile", auth, async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedupdates = ['Username', 'Email', 'Password', 'PhoneNumber', 'DOB', 'MaritalStatus', 'Language', 'TimeOfBirth', 'Profilepic'];
    const isValidOperation = updates.every((update) => {
        return allowedupdates.includes(update);
    })
    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates' });
    }
    try {
        updates.forEach((update) => {
            req.user[update] = req.body[update];
        });
        await req.user.save();
        res.send(req.user);
    } catch (error) {
        res.status(400).send(error);
    }
});

//adding news to the app
router.post("/addNews", async (req, res) => {
    const news = await News(req.body);
    try {
        await news.save();
        res.status(201).send({ news });
    } catch (error) {
        res.status(400).send(error);
    }
});

//display all news to dashboard
router.get("/getAllNews", async (req, res) => {
    try {
        const news = await News.find();
        res.status(200).send({ news });
    } catch (error) {
        res.status(400).send(error)
    }
});

//sort news articles by upload datetime or get latest news first
router.get("/getLatestNews", async (req, res) => {
    try {
        const news = await News.find().sort({ updatedAt: 'desc' });
        res.status(200).send({ news });
    } catch (error) {
        res.status(400).send(error);
    }
});

//filter news articles by category or authorname
router.get("/getFilterNews/:value", async (req, res) => {
    try {
        const news = await News.find({ $or: [{ 'Category': `${req.params.value}` }, { 'AuthorName': `${req.params.value}` }] })
        res.status(200).send({ news });
    } catch (error) {
        res.status(400).send(error);
    }
});

//search news articles by any keyword
router.get("/searchNews/:value", async (req, res) => {
    try {
        const news = await News.find({
            $or: [
                { 'Headline': { $regex: `${req.params.value}` } },
                { 'AuthorName': { $regex: `${req.params.value}` } },
                { 'Category': { $regex: `${req.params.value}` } }
            ]
        });

        res.status(200).send({ news });
    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = router