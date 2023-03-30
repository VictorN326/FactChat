import React, {useState} from 'react'
import {StreamChat} from 'stream-chat';
import {Chat} from 'stream-chat-react';
import Cookies from 'universal-cookie';
import {ChannelListContainer,ChannelContainer, Auth} from './components'; 
import 'stream-chat-react/dist/css/index.css';
import './App.css';
const apiKey = '8t5cden3sc57';
const client = StreamChat.getInstance(apiKey);
const cookies = new Cookies();
const authToken = cookies.get("token");
if(authToken) {
  client.connectUser({
    id: cookies.get('userID'),
    name: cookies.get('username'),
    fullName: cookies.get('fullName'),
    image: cookies.get('AvatarURL'),
    // token: cookies.get('token');
    hashedPassword: cookies.get('hashedPassword'),
    phoneNumber: cookies.get('phoneNumber'),
  }, authToken)
}
const App = () => {
  const [createType, setCreateType] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  if(!authToken) return <Auth />
  return (
    <div className="app__wrapper">
        <Chat client={client} theme='team light'>
            <ChannelListContainer 
              isCreating={isCreating}
              setIsCreating={setIsCreating}
              setIsEditing={setIsEditing}
              setCreateType={setCreateType}
            />
            <ChannelContainer 
              isCreating={isCreating}
              isEditing={isEditing}
              setIsCreating={setIsCreating}
              setIsEditing={setIsEditing}
              setCreateType={setCreateType}
              createType={createType}
            />
        </Chat>
    </div>
  )
}

export default App