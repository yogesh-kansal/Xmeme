import './comments.css';
import Comment from './comment';
import axios from 'axios';
import config from '../../config';
import {useEffect, useState } from 'react';
import { Button, Input } from 'reactstrap';


const Comments = ({memeId, user}) => {
    const [comments, setComments] = useState([]);
    const [New, setNew] = useState('');

    useEffect(() => {
        if(memeId) {
            axios.get(config.backend+`comments/${memeId}`, {
                headers: {
                "Authorization": 'Bearer ' + localStorage.getItem('accesstoken')
                }
            })
            .then(res => {
                setComments(res.data);
            })
            .catch(err => {
                if(err.response) alert(err.response.data);
                else if(err.message) alert(err.message);
            })
        }
    }, [memeId]);

    const addComment=() => {
        let comment={
            author: user.emailId,
            comment: New,
            memeId
        }
        axios.post(config.backend+`comments/new`, comment, {
            headers: {
              "Authorization": 'Bearer ' + localStorage.getItem('accesstoken')
            }
        })
        .then(res => {
            alert(res.data);
            setNew('');
            setComments([...comments, comment]);
        })
        .catch(err => {
            if(err.response) alert(err.response.data);
            else if(err.message) alert(err.message);
        })
    }


    return (
        <>
            <div className="row mt-5">
                <div className="col-auto"><h3>comments</h3><hr/></div>
            </div>

            <div className="row">
                <div className="col-9">
                    <Input 
                        type="text"
                        value={New}
                        onChange={e=> setNew(e.target.value)}/>
                    </div>
                <div className="col-3">
                    <Button type="btn" color="primary" onClick={()=>addComment()}>Add it</Button>
                </div>
            </div>

            <div className="row mt-3 commentBox p-2 ml-2">
                {comments?.map((c, id) => {
                    return (
                        <Comment key={id} comment={c}/>
                    )
                })}
            </div>



        </>
    );
}

export default Comments;