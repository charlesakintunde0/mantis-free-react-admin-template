import React from 'react'
import userLogo from "./user.png"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// constants
import ADMIN from '../../Constants/userRole'

toast.configure()
function Reply({ replyId, userName, reply, time, userAuth }) {

    const removeReply = (e) => {

        e.preventDefault();
        fetch(`https://localhost:44361/api/comments/deleteReply/${replyId}`, {
            method: 'DELETE',
            headers: { "Content-Type": 'application/json;charset=UTF-8' },
            credentials: 'include',
        }).then(() => {
            toast.success('Reply has been removed', {
                position: toast.POSITION.TOP_RIGHT,
                hideProgressBar: true,
                autoClose: 2000,

            });
        })
    }

    return (
        <div>
            <div className="singleReply">
                <div className="user">
                    <img class="userIcon" src={userLogo} alt='userImage' />
                    <h1 className="userName">{userName}</h1>
                </div>
                <p className="comment reply">{reply}</p>
                <div className="commentDetails">
                    <p className="commentTime CDchild">{(new Date(time)).toLocaleDateString()}</p>
                    {userAuth == ADMIN ? <div className="dot-delete CDchild">
                        <button className="dot CDchild">·</button>
                        <button className="commentRemove CDchild" onClick={removeReply}>Delete</button>
                    </div> : null}
                </div>
            </div>
        </div>
    )
}

export default Reply
