import { Link } from "react-router-dom";
import Card from "../components/Card";
import axios from "axios";
import { useEffect, useState } from "react";
import Modal from "../components/Modal";

const Dashboard = () => {
  const [posts, setPosts] = useState(null);
  const [mode, setMode] = useState(null);

  const fetchData = async () => {
    const response = await axios.get("http://localhost:8000/posts");
    const dataObject = response.data.data;
    const arrayOfData = Object.keys(dataObject).map((key) => [
      key,
      dataObject[key],
    ]);
    setPosts(arrayOfData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log(posts);

  return (
    <>
      <div
        className="app"
        style={mode && { height: "76vh", overflow: "hidden" }}>
        <div className="dashboard">
          <div className="dashboard-info-container">
            <div>
              <h1>Adventure anywhere</h1>
              <p>Keepl calm & Travel</p>
            </div>
            <button onClick={() => setMode("create")}>
              Add your adventure
            </button>
          </div>
          <div className="posts-container">
            {posts?.map((post) => (
              <Link to={`/post/${post[0]}`} id="link" key={post[0]}>
                <Card post={post[1]} />
              </Link>
            ))}
            <div className="add-your-own">
              <button onClick={() => setMode("create")}>
                Add your adventure
              </button>
            </div>
          </div>
        </div>
        {mode && <Modal mode={mode} setMode={setMode} fetchData={fetchData} />}
      </div>
    </>
  );
};

export default Dashboard;
