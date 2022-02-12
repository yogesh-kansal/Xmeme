const Comment = ({comment}) => {
  return (
    <>
        <div className="row mt-1">
          <div className="col-7 mr-auto"><h6 className="messageSender">{comment.author}</h6></div>
          <div className="col-5 ml-auto"><span className="postDate">
            {comment.createdAt?new Date(comment.createdAt).toDateString():new Date().toDateString()}
          </span></div>
        </div>
        <div className="row">
          <div className="col-12 messageText mt">{comment.comment}</div>
        </div>
        
    </>
  );
}

export default Comment;