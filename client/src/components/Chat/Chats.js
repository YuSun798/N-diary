/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import React, { useRef, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { ChatEngine } from 'react-chat-engine';
import axios from 'axios';
import { auth } from './firebase';
import { useAuth } from '../../contexts/AuthContext';

const Chats = () => {
  const history = useHistory();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  const getFile = async (url) => {
    const response = await fetch(url);
    const data = await response.blob();

    return new File([data], 'userPhoto.jpg', { type: 'image/jpeg' });
  };

  useEffect(() => {
    if (!user) {
      history.push('/chats');
      return;
    }

    axios.get('https://api.chatengine.io/user/me/', {
      headers: {
        'project-id': 'cee50b1e-4e33-4eb2-b46d-4a0bbd8a2f98',
        'user-name': user.email,
        'user-secret': user.uid,
      },
    })
      .then(() => {
        setLoading(false);
      })
      .catch(() => {
        const formdata = new FormData();
        formdata.append('email', user.email);
        formdata.append('username', user.email);
        formdata.append('secret', user.uid);

        getFile(user.photoURL)
          .then((avatar) => {
            formdata.append('avatar', avatar, avatar.name);

            axios.post('https://api.chatengine.io/users/',
              formdata,
              { headers: { 'private-key': '1a63efcf-13c5-429b-9ce0-853062058c8a' } })
              .then(() => setLoading(false))
              .catch((error) => console.log(error));
          });
      });
  }, [user, history]);

  if (!user || loading) return 'Loading...';

  return (
    <div className="chats-page">
      <ChatEngine
        height="calc(100vh - 66px)"
        projectID="cee50b1e-4e33-4eb2-b46d-4a0bbd8a2f98"
        userName={user.email}
        userSecret={user.uid}
      />
    </div>
  );
};

export default Chats;
