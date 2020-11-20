import React, { useState } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import useStyles from './styles';
import FileBase from 'react-file-base64';
import { createPost } from '../../actions/posts';

const Form = () => {
    const [postData, setPostData] = useState({
        creator: '',
        title: '',
        comment: '',
        tags: '',
        selectedFile: ''
    });
    const classes = useStyles();
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createPost(postData));
    }

    const clear = () => {

    }

    return (
        <Paper className={classes.paper}>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant="h6">Create a Fit</Typography>
                <TextField name="creator" variant="outlined" label="Creator" fullWidth value={postData.creator}
                    onChange={(e) => setPostData({
                        ...postData,                //spread post data, otherwise creator only gets updated, other data can persist
                        creator: e.target.value
                    })}
                />
                <TextField name="title" variant="outlined" label="Title" fullWidth value={postData.title}
                    onChange={(e) => setPostData({
                        ...postData,                //spread post data, otherwise title only gets updated, other data can persist
                        title: e.target.value
                    })}
                />
                <TextField name="comment" variant="outlined" label="Comment" fullWidth value={postData.comment}
                    onChange={(e) => setPostData({
                        ...postData,                //spread post data, otherwise comment only gets updated, other data can persist
                        comment: e.target.value
                    })}
                />
                <TextField name="tags" variant="outlined" label="Tags" fullWidth value={postData.tags} 
                    onChange={(e) => setPostData({
                        ...postData,                //spread post data, otherwise tags only gets updated, other data can persist
                        tags: e.target.value
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
    )
}

export default Form;