const mongoose = require('mongoose');

const NewsSchema = new mongoose.Schema({
    ThumbnailImage: {
        type: String,
        required: true,
        default: "/images/thumb1.jpg"
    },
    Headline: {
        type: String,
        required: true,
        trim: true
    },
    Category: {
        type: String,
        required: true,
        trim: true
    },
    AuthorName: {
        type: String,
        required: true,
        trim: true
    }
}, {
    timestamps: true
})

const News = mongoose.model('News', NewsSchema);

module.exports = News;