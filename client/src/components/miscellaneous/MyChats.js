import React from 'react';
import { useState } from 'react';
import { AuthData } from '../../services/AuthService';
import getCookies from '../../hooks/getCookies';
import axios from 'axios';
import { useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import ChatLoading from './ChatLoading';
import Stack from 'react-bootstrap/Stack';
import { getSender } from '../../services/ChatLogics';
import GroupChatModel from './GroupChatModel';

const MyChats = ({fetchAgain}) => {
  const {user, selectedChat, setSelectedChat, chats, setChats} = AuthData();
  const [loggedUser, setLoggedUser] = useState();

  const fetchChats = async () => {
    try{

      const config = {
        headers : {
          authorization : `Bearer ${getCookies("jwt")}`,
        },
      };

      const {data} = await axios.get("http://127.0.0.1:5001/api/v1/chats", config);
      setChats(data);
      console.log(chats);
    } catch(err){
          alert("Error loading chats!!");
          console.log("ERROR", err);
    }
  }

  useEffect(() => {
    setLoggedUser(user.user);
    fetchChats();
    setSelectedChat(false);

  }, [fetchAgain]);

  return (
    <div className = "bg-secondary">
         <Container className = "p-3 mb-2 bg-secondary text-white">
      <Row>
        <Col>My Chats</Col>
        <Col>
        <GroupChatModel>
        <Button variant="info"> + Create Group Chat</Button>
        </GroupChatModel>
        </Col>
      </Row>
      <Row>
        <Col>
           {chats.length > 0 ? (
              <Stack direction="vertical" gap={3}>
                {chats.map((chat) => (
                  <div className="p-2" onClick={() => setSelectedChat(chat)} key={chat._id}>  
                  {!chat.isGroupChat ? ( chat.users[1].name ): chat.chatName}                 
                  </div>
                ))}
            </Stack>


           ) : <ChatLoading />}
        </Col>
      </Row>
    </Container>
    </div>
  )
}

export default MyChats