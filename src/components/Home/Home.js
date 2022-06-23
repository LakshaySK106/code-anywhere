import React, { useState } from 'react';
import { v4 as uuidV4 } from 'uuid';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import './Home.scss'

const Home = () => {
  const navigate = useNavigate();

  const [roomId, setRoomId] = useState('');
  const [username, setUsername] = useState('');
  const createNewRoom = (e) => {
    e.preventDefault();
    const id = uuidV4();
    setRoomId(id);
    toast.success('A new room has been created!');
  };  

  const joinRoom = () => {
    if (!roomId && !username) {
      toast.error('Room ID and Username is required');
      return;
    }
    if (!roomId) {
      toast.error('Room ID is required');
      return;
    }
    if (!username) {
      toast.error('Username is required');
      return;
    }
    
    navigate(`/ide/${roomId}`, {
      state: {
        username,
      },
    });
  };

  const handleInputEnter = (e) => {
    if (e.code === 'Enter') {
      joinRoom();
    }
  };
  return (
    <div className="homePageWrapper">
      <div className="formWrapper">
        <img
          className="homePageLogo"
          src="/code-sync.png"
          alt="code-sync-logo"
        />
        <h4 className="mainLabel">Paste invitation ROOM ID</h4>
        <div className="inputGroup">
          <input
            type="text"
            className="inputBox"
            placeholder="Room ID"
            onChange={(e) => setRoomId(e.target.value)}
            value={roomId}
            onKeyUp={handleInputEnter}
          />
          <input
            type="text"
            className="inputBox"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            onKeyUp={handleInputEnter}
          />
          <button className="btn joinBtn" onClick={joinRoom}>
            JOIN
          </button>
          <span className="createInfo">
            If you don't have an invite then create &nbsp;
            <a
              onClick={createNewRoom}
              href=""
              className="createNewBtn"
            >
              new room
            </a>
          </span>
        </div>
      </div>
      <footer>
        <h4>
          Built with 💛 &nbsp; by &nbsp;
          <a href="https://github.com/codersgyan">Coder's Gyan</a>
        </h4>
      </footer>
    </div>
  );
};

export default Home;

