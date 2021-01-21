import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import useStyles from './styles';
import FileBase from 'react-file-base64';
import { createPost, updatePost } from '../../actions/posts';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Form = ({ currentId, setCurrentId }) => {
    const [postData, setPostData] = useState({
        title: '',
        comment: '',
        tags: '',
        selectedFile: ''
    });
    const post = useSelector((state) => currentId ? state.posts.find((p) => p._id === currentId) : null );
    const classes = useStyles();
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));

    useEffect(() => {
        if(post) setPostData(post);
    }, [post])

    const clear = () => {
        setCurrentId(0);
        setPostData({
            title: '',
            comment: '',
            tags: '',
            selectedFile: ''
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        //If there is an id, updating. Otherwise create a post
        if(currentId === 0){
            dispatch(createPost({ ...postData, name: user?.result?.name }))
            toastTypeMsg('success', 'Your fit has been successfully created.');
            clear();
        }
        else{
            dispatch(updatePost(currentId, { ...postData, name: user?.result?.name }));
            toastTypeMsg('success', 'You have updated your fit.');
            clear();
        }
    }

    const toastTypeMsg = (type, msg) => {
        switch(type){
            case 'error':
              return toast.error(`${msg}`, {});
            case 'success':
              return toast.success(`${msg}`, {
                className: `${classes.successToast}`
              })
            default:
                break;
            }
    }

    if(!user?.result?.name){
        return(
            <Paper className={classes.paper}>
                <Typography variant="h6" align="center">
                    Please Sign In to post an outfit and like other outfits.
                </Typography>
            </Paper>
        )
    }

    return (
        <div>
            <Paper className={classes.paper}>
                <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                    <Typography variant="h6">{currentId ? 'Editing a Fit' : 'Create a Fit'}</Typography>
                        <TextField name="title" variant="outlined" label="Title" fullWidth value={postData.title}
                            onChange={(e) => setPostData({
                                ...postData,                //spread post data, otherwise creator only gets updated, other data can persist
                                title: e.target.value
                            })}
                        />
                        <TextField name="comment" variant="outlined" label="Comment" fullWidth value={postData.comment}
                            onChange={(e) => setPostData({
                                ...postData,                
                                comment: e.target.value
                            })}
                        />
                        <TextField name="tags" variant="outlined" label="Tags" fullWidth value={postData.tags} 
                            onChange={(e) => setPostData({
                                ...postData,                
                                tags: e.target.value.split(',')
                            })}
                        />
                    <div className={classes.fileInput}>
                        <FileBase type="file" multiple={false}
                            onDone={({base64}) => setPostData({
                                ...postData,
                                selectedFile: base64
                            })}    
                        />
                    </div>
                    <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>
                        Submit
                    </Button>
                    <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>
                        Clear
                    </Button>
                </form>
            </Paper>
            <ToastContainer
                position="bottom-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div>
    )
}

export default Form;