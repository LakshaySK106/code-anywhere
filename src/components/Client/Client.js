import React from 'react';
import Avatar from 'react-avatar';
import './Client.scss'

const Client = ({ username }) => {
   return (
      <div className="client">
         <Avatar name={username} size={45} round="8px" />
         <span className="userName">{username}</span>
      </div>
   );
};

export default Client;