import "./post.scss";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Link } from "react-router-dom";
import Comments from "../comments/Comments";
import { useState } from "react";

const Post = ({ post }) => {
  // const [commentOpen, setCommentOpen] = useState(false);

  //TEMPORARY
  // const liked = false;
  // return (
  //   <div className="post">
  //     <h2>Stock ID: {post.stock_id}</h2>
  //     <p>Current Price: {post.current_price}</p>
  //     <p>Last Traded Price: {post.last_traded_price}</p>
  //   </div>
  // );
  return (
    <div className="post">
      <div className="container">
        <div className="user">
          <div className="userInfo">
            {/* <img src={post.profilePic} alt="" /> */}
            <div className="details">
 
                <span className="name">STOCK ID : {post.stock_id}</span>
              {/* </Link> */}
              <span className="date">Updated 1 min ago</span>
            </div>
          </div>
          <MoreHorizIcon />
        </div>
        <div className="content">
          <p>CURRENT PRICE :      {post.current_price}</p>
          <p>LAST TRADED: PRICE: {post.last_traded_price}</p>

          {/* <img src={post.img} alt="" /> */}
        </div>
        {/* <div className="info">
          <div className="item">
            {liked ? <FavoriteOutlinedIcon /> : <FavoriteBorderOutlinedIcon />}
            12 Likes
          </div>
          <div className="item" onClick={() => setCommentOpen(!commentOpen)}>
            <TextsmsOutlinedIcon />
            12 Comments
          </div>
          <div className="item">
            <ShareOutlinedIcon />
            Share
          </div>
        </div> */}
        {/* {commentOpen && <Comments />} */}
      </div>
    </div>
  );
};

export default Post;
