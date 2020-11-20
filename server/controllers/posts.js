import mongoose from 'mongoose';
import PostMessage from '../models/postMessage.js';


//GET ALL POSTS
export const getPosts = async (req, res) => {
    try{
        const postMessages = await PostMessage.find();
        res.status(200).json(postMessages);
    }
    catch(error){
        res.status(404).json({
            message: error.message
        });
    }
}

//CREATE A POST
export const createPost = async (req, res) => {
    const post = req.body;
    const newPost = new PostMessage(post);
    
    try {
        await newPost.save();
        res.status(201).json(newPost);
    }
    catch(err) {
        res.status(404).json({
            message: error.message
        })
    }
}

//UPDATE A POST
export const updatePost = async (req, res) => {
    //Params is the id coming form the url
    const { id: _id } = req.params;
    const post = req.body;

    //Valid ID?
    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id');

    //Get access to the updated post
    const updatedPost = await PostMessage.findByIdAndUpdate(_id, {...post, _id}, { new: true })

    res.json(updatedPost);
}

//DELETE POST
export const deletePost = async (req, res) => {
    const { id } = req.params;

    //Valid ID?
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id');

    await PostMessage.findByIdAndRemove(id);

    res.json({
        message: 'Post deleted successfully'
    });
}