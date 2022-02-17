const request = require('supertest')
const app = require('../app')
const User = require('../models/user')
const { userOneId, userOne, setupDatabase } = require('./sample')

beforeEach(setupDatabase)

test('Should signup a new user', async () => {
    const response = await request(app).post('/register').send({
        Username: 'testshubham1234',
        Email: 'testshubham4@gmail.com',
        Password: 'sd123456',
        PhoneNumber: 1234567893,
        Gender: 'Male',
        Language: 'English',
        MaritalStatus: 'Single',
        DOB: '2000-08-25',
        TimeOfBirth: '08:12',
    }).expect(201)

    const user = await User.findById(response.body.user._id)
    expect(user).not.toBeNull()
})

test('Should loin existing user', async () => {
    const response = await request(app).post('/login').send({
        Email: userOne.Email,
        Password: userOne.Password
    }).expect(200)

    const user = await User.findById(userOneId)
    expect(user).not.toBeNull()
})

test('Should not login nonexistent user', async () => {
    await request(app).post('/login').send({
        Email: userOne.Email,
        Password: 'pass12345#'
    }).expect(400)
})