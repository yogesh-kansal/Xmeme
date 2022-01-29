const Comment = ({comment}) => {
  return (
    <div className="message col-12">
      <div className="messageTop">
        <div className="row">
          <div className="col-7 mr-auto"><h6 className="messageSender">{comment.author}</h6></div>
          <div className="col-5 ml-auto"><span className="postDate">
            {comment.createdAt?new Date(comment.createdAt).toDateString():new Date().toDateString()}
          </span></div>

        </div>
        
        <p className="messageText mt">{comment.comment}</p>
      </div>
    </div>
  );
}

export default Comment;