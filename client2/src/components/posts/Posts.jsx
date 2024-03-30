import { useEffect, useState } from 'react';
import { makeReq } from "../../axios";
import Post from "../post/Post";
import "./posts.scss";

const Posts = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await makeReq.get("/watchlist");
        console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // Check if data is an array before calling map
  if (!Array.isArray(data)) {
    return <div>Data is not in the expected format.</div>;
  }
  console.log(data)

  return (
    <div>
      {data.map((item, index) => (
        <Post key={index} post={item} />
      ))}
    </div>
  );
};

export default Posts;
