import React,{useState,useEffect, useRef} from 'react'
import "./Comments.css"
import axios from 'axios'
import userLogo from "./user.png"
import Reply from './Reply'
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Config from "./../../config.json";

toast.configure()

function Comment({userId, userAuth, userName, userEmail, FId, uName, uComment, uImageName, uImageSrc, uTime}) {
    const [Allreplies, setAllReplies] = useState([]);    
    const[loading, setLoading] = useState(true);
    const[replyClick,setReplyClick] = useState(false);
    const [reply, setReply] = useState("");

    useEffect(() => {
        loadReplies();
        if (loading) {
            loadReplies();
        }
    }, [Allreplies])

    const loadReplies = async () =>{
        
        try{
           const res =  await axios.get(Config.REPLIES + FId)
           .then((response) => {
               return response.data;
           });
           setAllReplies(res);
           setLoading(false);
        }catch(err){
            console.log(err);
        }

    }

    const replyClickEvent =()=> {
        setReplyClick(true);
    }
    
    const postReply =(e)=> {
        e.preventDefault();
        setReply("");
        setReplyClick(false);
            fetch(Config.POST_REPLY, {
                method: 'POST',
                headers: {"Content-Type": 'application/json;charset=UTF-8'},
                body : JSON.stringify({
                    FId: FId,
                    UId: userId,
                    UEmail:userEmail,
                    RReply: reply
                })
            }).then(()=> {
                toast.success('Your reply has been posted',{
                    position: toast.POSITION.TOP_RIGHT,
                    hideProgressBar: true,
                    autoClose: 2000,
    
                });
                
                //window.location.reload();
            })
    }
    const removeComment =(e)=> {
        e.preventDefault();
        if(window.confirm("Are you sure you want to delete this comment?")) {
            fetch(Config.REMOVE_COMMENT + FId, {
                method: 'DELETE',
                headers: {"Content-Type": 'application/json;charset=UTF-8'},
                credentials: 'include',
            }).then(()=> {
                //window.location.reload();
                toast.success('Comment has been removed',{
                    position: toast.POSITION.TOP_RIGHT,
                    hideProgressBar: true,
                    autoClose: 2000,
    
                });
            })
        }
    }

    return (

        
        <div>
            <div className="singleComment">
               
                <div className="user">
                    <img class="userIcon" src={userLogo} alt='userImage'/>
                    <h1 className="userName">{uName}</h1>
                </div>
                <div className='commentMedia'>
                    <div className='commentDiv'><p className="comment">{uComment}</p></div>
                    <div className='commentImgDiv'>{uImageName && <img src = {uImageSrc} id="commentWmedia"/>}</div>
                </div>
                <div className="commentDetails">
                    <p className="commentTime CDchild">{(new Date(uTime)).toLocaleDateString()}</p>
                    <button className="dot CDchild">·</button> 
                    {userId? <button className="commentReply CDchild" onClick={replyClickEvent}>Reply</button>:null}
                    {userAuth=='Admin'? <div className="dot-delete CDchild">
                        <button className="dot CDchild">·</button>
                        <button className="commentRemove CDchild" onClick={removeComment}>Delete</button>
                    </div>: null}
                 </div>
                
                <div className="replies">
                        {Allreplies.map(r=> (
                            <Reply replyId={r.replyId} userName={r.uName} reply={r.reply} time={r.time} userAuth={userAuth}/>
                        ))}
                    </div>

                    {replyClick? <div className="replyContainer">
                        <textarea id="replyInput" name="reply" type="text" placeholder="Write your reply"
                            onChange={e => setReply(e.target.value)}
                            value={reply}
                        />
                        <button onClick={postReply}>Reply</button>
                    </div> : null}
            </div>
        </div>
    )
}

export default Comment
