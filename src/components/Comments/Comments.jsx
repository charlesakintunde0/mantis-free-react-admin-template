import React, { useState, useEffect } from 'react'
import "./Comments.css"
import axios from 'axios'
import { toast } from 'react-toastify';
import Comment from './Comment';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom'
import Config from "./../../config.json"
import { Notification } from 'components/Notifications/Notification';

// constants
import ADMIN from '../../Constants/userRole'




toast.configure()
const initialImageValues = {
    imageName: '',
    imageSrc: '',
    imageFile: null
}
let images = [];
const Comments = () => {
    const [comment, setComment] = useState("");
    const [allComments, setAllComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const userDetails = JSON.parse(localStorage.getItem('user'));
    const [loading1, setLoading1] = useState(true);
    const [userFirstName, setUserFirstName] = useState(null);
    const [userId, setUserId] = useState(null);
    const [userEmail, setUserEmail] = useState(null);
    const [imgValues, setImgValues] = useState(initialImageValues);
    const [userStatus, setStatus] = useState(null);
    const [commentId, setCommentId] = useState(null);



    useEffect(() => {
        setUserFirstName(userDetails ? userDetails.uFirstName : null);
        setUserId(userDetails ? userDetails.uId : null);
        setUserEmail(userDetails ? userDetails.uEmail : null);
        setStatus(userDetails ? userDetails.status : null);


    }, [userDetails])

    const postComment = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('UId', userId);
        formData.append('UEmail', userEmail);
        formData.append('FComment', comment);
        formData.append('FImageName', imgValues.imageName);
        formData.append('FImageFile', imgValues.imageFile);

        exampleAPI().create(formData)
            .then(res => {
                setComment(""); // AFTER THE COMMENT IS POSTED THE COMMENT GET CLEARED FROM THE COMMENT BOX
                document.getElementById('imageUploader').value = null; //THE CHOSEN IMAGE FILE NAME GET CLEARED AFTER COMMENT HAS BEEN POSTED
                setCommentId(res.data.fId);
                console.log(commentId);
                setLoading(true);
                Notification('success', "Operation successful", "Comment added successfully")
            })
            .catch(err => console.log(err))
    }

    const exampleAPI = (url = Config.POST_COMMENT) => {
        return {
            create: newRecord => axios.post(url, newRecord),
            delete: id => axios.delete(url + id)
        }
    }


    useEffect(() => {
        loadComments();
        if (loading) {
            loadComments();
        }

    }, [loading, loading1, allComments])



    const loadComments = async () => { //Load all the comments into allComments state

        try {
            const res = await axios.get(Config.header + Config.FETCH_COMMENTS)
                .then((response) => {
                    return response.data;
                });
            setAllComments(res);
            setLoading(false);
        } catch (err) {
            console.log(err);
        }

    }


    const onSelected = e => {
        images = (e.target.files);
        console.log(images);
        //today(images[0],e);
    }

    const postPic = async (e) => {
        e.preventDefault();
        today(images, e);

    }

    const today = async (files, e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('UId', userId);
        formData.append('UEmail', userEmail);
        formData.append('FComment', comment);
        formData.append('FImageFile', files[0]);

        // exampleAPI().create(formData)
        axios.post(Config.POST_COMMENT, formData)
            .then(res => {
                setComment(""); // AFTER THE COMMENT IS POSTED THE COMMENT GET CLEARED FROM THE COMMENT BOX
                //document.getElementById('imageUploader').value = null; //THE CHOSEN IMAGE FILE NAME GET CLEARED AFTER COMMENT HAS BEEN POSTED
                //setCommentId(res.data.fId);
                console.log(res.data.fId);
                console.log(files.length);
                if (files.length > 1) {
                    console.log("image length 2");
                    for (let i = 1; i < files.length; i++) {
                        console.log(`sending ${i} image`);

                        today1(files[i], res.data.fId, e);
                    }
                }
                //console.log(commentId);
                setLoading(true);
                Notification('sucess', "Operation Successful", "Comment added successfully")
            })
            .catch(err => console.log(err.response))



    }
    const today1 = async (file, commentId, e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("FId", commentId);
        formData.append('UId', userId);
        formData.append('UEmail', userEmail);
        formData.append('FComment', comment);
        formData.append('FImageFile', file);

        axios.post(Config.UPDATE_COMMENT_IMAGES, formData)
            .then(res => {
                setComment(""); // AFTER THE COMMENT IS POSTED THE COMMENT GET CLEARED FROM THE COMMENT BOX
                document.getElementById('imageUploader').value = null; //THE CHOSEN IMAGE FILE NAME GET CLEARED AFTER COMMENT HAS BEEN POSTED
                setCommentId(res.data.fId);
                console.log("2nd image uploaded");
                console.log(commentId);
                setLoading(true);
            })
            .catch(err => console.log(err.response))

    }

    return (
        <div>
            <div className="commentBoxContainer">
                {userId ? <div className="header">
                    <h2>Let us know</h2>
                    <form className="comForm" autoComplete='off' onSubmit={postPic}>
                        <div className="commentBox">
                            <textarea className="comInput" name="comment" type="text" placeholder="Write your comment"
                                onChange={e => setComment(e.target.value)}
                                value={comment}
                            />
                            <div className="imageUploadDiv">
                                <input type="file" accept='image/*' className='imageFile' onChange={onSelected} id="imageUploader" multiple />
                            </div>

                            <button>Comment</button>
                        </div>
                    </form>
                </div> :
                    <div className='ableToComment'>
                        <h2>You have to be logged in to be able to comment</h2>
                        <Link to="/login">
                            <button> Login </button>
                        </Link>
                        <p>Don't have an account?
                            <Link to="/registration">
                                <a> Register</a>
                            </Link>
                        </p>
                    </div>
                }

                <div className="commentsArea">
                    {allComments.map(c => (
                        <Comment userId={userId} userAuth={userStatus} userName={userFirstName} userEmail={userEmail} FId={c.fId} uName={c.uName} uComment={c.comment} uImageName={c.imageName} uImageSrc={c.imageSrc} uTime={c.time} />
                    )
                    )}
                </div>
            </div>
        </div>
    )
}

export default Comments
