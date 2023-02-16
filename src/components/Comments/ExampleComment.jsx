
import React,{useState, useEffect} from 'react'

function ExampleComment() {
    const[comment,setComment] = useState("");
    const[files, setFile] = useState([]);

    const showPreview = e =>{
        //console.log(e.target.files)
        if(e.target.files){
            let imageFile = e.target.files;
            console.log(imageFile);
            setFile(imageFile);
        }

        else{
            
        }
    }

    //const uploadFiles = 

    return (
        <div>
            <div className="commentBoxContainer">
               <div className="header">
                    <h2>Let us know</h2>
                        <form className="comForm" autoComplete='off' >
                            <div className="commentBox">
                                <input className="comInput" name="comment" type="text" placeholder="Write your comment"
                                    onChange={e => setComment(e.target.value)}
                                    value={comment}
                                />
                                <div className="imageUploadDiv">
                                    <input type="file" accept='image/*' className='imageFile'  id="imageUploader" onChange={showPreview} multiple/>
                                </div>
                                
                                <button>Comment</button>
                            </div>
                        </form>
                </div>
            </div>
        </div>
    );
}

export default ExampleComment