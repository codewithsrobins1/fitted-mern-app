import { GETPOSTS, CREATE, UPDATE, DELETE, LIKE } from '../constants/actionTypes';

export default (posts = [], action) => {
    switch (action.type){
        case GETPOSTS:
            return action.payload;
        case CREATE:
            return [...posts, action.payload];
        case UPDATE:
        case LIKE:
            //Action.Payload is the updated post -- so return the updated post; if not updated return the post
            return posts.map((post) => post._id === action.payload._id ? action.payload : post);
        case DELETE:
            //Keep all post except the one that equals action.payload
            return posts.filter((post) => post._id !== action.payload);
        default:
            return posts;
    }
}