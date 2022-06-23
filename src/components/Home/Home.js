import React, { useState } from 'react';
import { v4 as uuidV4 } from 'uuid';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import logo from '../../components/logo/logoL.png';
import logoH from '../../components/logo/logoH.png';
import './Home.scss'

const Home = () => {
  const navigate = useNavigate();

  const [meetingId, setMeetingId] = useState('');
  const [username, setUsername] = useState('');
  const createNewRoom = (e) => {
    e.preventDefault();
    const id = uuidV4();
    setMeetingId(id);
    toast.success('A new room has been created!');
  };  

  const joinRoom = () => {
    if (!meetingId && !username) {
      toast.error('Room ID and Username is required');
      return;
    }
    if (!meetingId) {
      toast.error('Room ID is required');
      return;
    }
    if (!username) {
      toast.error('Username is required');
      return;
    }
    if(meetingId && username){
      toast.success('You have joined the room');
      navigate(`/ide/${meetingId}`, {
        state: {
          username,
        },
      });
    }
  };

  const handleInputEnter = (e) => {
    if (e.code === 'Enter') {
      joinRoom();
    }
  };
  return (
    <>
      <div className="hom">
        <img className='homImage' src={logoH} alt="CodeAnywhere" />
      <span className='textHome'>| Secure Code Editor for everyone</span>
      </div>
    <div className="homePageWrapper">
      <div className="formWrapper">
        <img
          className="homePageLogo"
          src={logo}
          alt="CodeAnywhere"
        />
        <p className="ok">Connect / Collaborate / Code from anywhere with CodeAnywhere</p>
        <div className="inputGroup">
          <input
            type="text"
            className="inputBox"
            placeholder="Meeting ID"
            onChange={(e) => setMeetingId(e.target.value)}
            value={meetingId}
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
            Don't have ID?&nbsp;
            <a
              onClick={createNewRoom}
              href="#"
              className="createNewBtn"
            >
             Let's start a new meeting
            </a>
          </span>
        </div>
      </div>
      <footer>
        <p className='okk'>
          <a href="https://github.com/LakshaySK106" target='_blank'>Learn more</a>
          &nbsp;about CodeAnyWhere
        </p>
      </footer>
    </div>
  </>
  );
};

export default Home;

