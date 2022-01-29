import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import Comments from '../Comments/comments';
import "./singleMeme.css";
import config from '../../config'
import { Input } from 'reactstrap';

const SingleMeme = (props) =>  {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [meme, setMeme] = useState({});
  console.log(path)

  useEffect(() => {
    axios.get(config.backend+`memes/${path}`, {
      headers: {
        "Authorization": 'Bearer ' + localStorage.getItem('accesstoken')
      }
    })
    .then(res => {
      setMeme(res.data.data);
    })
    .catch(err => {
      if(err.response) alert(err.response.data);
      else if(err.message) alert(err.message);
    })
  }, [path]);

  console.log(meme)

  return (
    <div className="container">
      <div className="row">
        <div className="col-5">
          <div className="row mt-5">
            <div className="col-auto mr-auto"><h3>Details</h3> <hr/></div>
            <div className="col-auto ml-auto mr-3">
            </div>
          </div>

          <div className="row mb-5">
            <div className="col-2 mt-1"><h5>Author:</h5></div>
            <div className="col-10"><Input type="text" disabled value={meme.author}/></div>
          </div>
          
          <div className="row">
            {meme.url && (
            <img src={meme.url} alt="" className="singlePostImg" />
          )}
          </div>
        </div>

        <div className="col-6">
          <Comments memeId={meme._id} user={props.user}/>
        </div>
      </div>
    </div>
  );
}

export default SingleMeme;