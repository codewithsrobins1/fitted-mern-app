import mongoose from 'mongoose';
const { Schema } = mongoose;

//Setup Post Schema
const postSchema = new Schema({
    title: String,
    comment: String,
    creator: String,
    tags: [String],
    selectedFile: String,
    likeCount: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
})

//Setup Posts Model using Schema
const PostMessage = mongoose.model('PostMessage', postSchema);

export default PostMessage;