const request = require('supertest')
const app = require('../app')
const News = require('../models/news')
const { setupDatabase } = require('./sample')

beforeEach(setupDatabase)

test('Should post a new news', async () => {
    const response = await request(app).post('/addNews').send({
        ThumbnailImage: '/images/thumb4.jpg',
        Headline: 'Health industry will grow',
        Category: 'Health',
        AuthorName: 'Vaibhav'
    }).expect(201)

    const news = await News.findById(response.body.news._id)
    expect(news).not.toBeNull()
})

test("should get all news", async () => {
    const response = await request(app).get('/getAllNews')
        .send()
        .expect(200)
})

test("should get latest news", async () => {
    const response = await request(app).get('/getLatestNews')
        .send()
        .expect(200)
})