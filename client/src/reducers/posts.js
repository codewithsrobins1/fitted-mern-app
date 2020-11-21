export default (posts = [], action) => {
    switch (action.type){
        case 'FETCH_ALL':
            return action.payload;
        case 'CREATE_POST':
            return [...posts, action.payload];
        case 'UPDATE_POST':
        case 'LIKE_POST':
            //Action.Payload is the updated post -- so return the updated post; if not updated return the post
            return posts.map((post) => post._id === action.payload._id ? action.payload : post);
        case 'DELETE_POST':
            //Keep all post except the one that equals action.payload
            return posts.filter((post) => post._id !== action.payload);
        default:
            return posts;
    }
}