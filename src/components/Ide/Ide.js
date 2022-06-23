import React, { useState, useRef, useEffect } from 'react';
import Client from '../Client/Client';
import Editor from '../Editor/Editor';
import './Ide.scss';
import toast from 'react-hot-toast';
import { initSocket } from '../socket';
import ACTIONS from '../Actions';
import logo from '../logo/logoLL.png';
import {
  useLocation,
  useNavigate,
  Navigate,
  useParams,
} from 'react-router-dom';

const Ide = () => {
  const location = useLocation();
  const socketRef = useRef(null);
  const codeRef = useRef(null);
  const reactNavigator = useNavigate();
  const { meetingId } = useParams();

  const [clients, setClients] = useState([])

  useEffect(() => {
    const init = async () => {
      socketRef.current = await initSocket();
      socketRef.current.on('connect_error', (err) => handleErrors(err));
      socketRef.current.on('connect_failed', (err) => handleErrors(err));

      function handleErrors(e) {
        toast.error('Socket connection failed, try again later.');
        reactNavigator('/');
      }

      socketRef.current.emit(ACTIONS.JOIN, {
        meetingId,
        username: location.state?.username,
      });

      socketRef.current.on(
        ACTIONS.JOINED,
        ({ clients, username, socketId }) => {
          if (username !== location.state?.username) {
            toast.success(`${username} joined the room.`);
          }
          setClients(clients);
          socketRef.current.emit(ACTIONS.SYNC_CODE, {
            code: codeRef.current,
            socketId,
          });
        }
      );

      socketRef.current.on(
        ACTIONS.DISCONNECTED,
        ({ socketId, username }) => {
          toast.success(`${username} left the room.`);
          setClients((prev) => {
            return prev.filter(
              (client) => client.socketId !== socketId
            );
          });
        }
      );
    };
    init();
    return () => {
      socketRef.current.disconnect();
      socketRef.current.off(ACTIONS.JOINED);
      socketRef.current.off(ACTIONS.DISCONNECTED);
    };
  }, []);

  async function copymeetingId() {
    try {
      await navigator.clipboard.writeText(meetingId);
      toast.success('Room ID has been copied to your clipboard');
    } catch (err) {
      toast.error("Couldn't copy the Room ID");
    }
  }

  function leaveRoom() {
    reactNavigator('/');
  }
  
  if (!location.state) {
    return <Navigate to="/" />;
  }

  return (

    <div className="mainWrap">
      <div className="aside">
        <div className="asideInner">
          <div className="logo">
            <img
              className="logoImage"
              src={logo}
              alt="logo"
            />
          </div>
          <p className='people'>Connected people</p>
          <div className="clientsList">
            {clients.map((client) => (
              <Client
                key={client.socketId}
                username={client.username}
              />
            ))}
          </div>
        </div>
        <button className="btn copyBtn" onClick={copymeetingId}>
          COPY MEETING ID
        </button>
        <button className="leaveBtn" onClick={leaveRoom}>
          LEAVE
        </button>
      </div>
      <div className="editorWrap">
        <Editor 
        socketRef={socketRef}
          meetingId={meetingId}
          onCodeChange={(code) => {
            codeRef.current = code;
          }}
        />
      </div>
    </div>

  )
}

export default Ide

