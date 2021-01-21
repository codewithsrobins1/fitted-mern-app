import jwt from 'jsonwebtoken';

//Verify Users are authenticated before performing actions
const auth = async (req, res, next) => {
    try{
        const token = req.headers.authorization.split(" ")[1];

        //Custom Token Length is less than 500 -- Google OAuth is greater than 500
        const isCustomAuth = token.length < 500;

        let decodedData;

        //If custom token -- verify 
        if(token && isCustomAuth){
            //Get data from specific token -- username and id
            decodedData = jwt.verify(token, 'test');     //pass token and SECRET from controllers->users.js
            
            //Store users id in req.userId
            req.userId = decodedData.id;
        } else {
            decodedData = jwt.decode(token)
            req.userId = decodedData.sub;              //sub is googles id that differentiates from every google user
        }
        next();
    }
    catch (error){
        console.log(error);
    }
}

export default auth;