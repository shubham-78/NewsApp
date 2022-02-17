const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const User = require('../models/user')
const News = require('../models/news')

const userOneId = new mongoose.Types.ObjectId()
const userOne = {
    _id: userOneId,
    Username: 'testshubham123',
    Email: 'testshubham@gmail.com',
    Password: 'sd123456',
    PhoneNumber: 1234567892,
    Gender: 'Male',
    Language: 'English',
    MaritalStatus: 'Single',
    DOB: '2000-08-25',
    TimeOfBirth: '08:12',
    tokens: [{
        token: jwt.sign({ _id: userOneId }, 'newsapp')
    }]
}

const newsOne = {
    _id: new mongoose.Types.ObjectId(),
    ThumbnailImage: '/images/thumb5.jpg',
    Headline: 'Indian Stock Market is booming',
    Category: 'Finance',
    AuthorName: 'Harsh'
}

const newsTwo = {
    _id: new mongoose.Types.ObjectId(),
    ThumbnailImage: '/images/thumb4.jpg',
    Headline: 'Health industry will grow',
    Category: 'Health',
    AuthorName: 'Vaibhav'
}

const newsThree = {
    _id: new mongoose.Types.ObjectId(),
    ThumbnailImage: '/images/thumb1.jpg',
    Headline: '5G Interent will change revolution',
    Category: 'Tech',
    AuthorName: 'Shubham'
}

const setupDatabase = async () => {
    await User.deleteMany()
    await News.deleteMany()
    await new User(userOne).save()
    await new News(newsOne).save()
    await new News(newsTwo).save()
    await new News(newsThree).save()
}

module.exports = {
    userOneId,
    userOne,
    newsOne,
    newsTwo,
    newsThree,
    setupDatabase
}