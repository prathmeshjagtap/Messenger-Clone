import React ,{useState,useEffect} from 'react';
 import {  FormControl, InputLabel , Input } from '@material-ui/core';
import Message from './Message'
import './App.css';
import db from './firebase';
import firebase from 'firebase'
import Flipmove from 'react-flip-move'
import SendIcon from '@material-ui/icons/Send';
import { IconButton } from '@material-ui/core';

function App() {

  const [input,setInput] = useState('')
  const [messages,setMessages] = useState([])
  const [username,setUsername] = useState('')


  useEffect( () => {
      // runs when the app component loads
      db.collection('messages')
      .orderBy('timestamp','desc')
      .onSnapshot(snapshot =>{
        setMessages(snapshot.docs.map(doc => ({ id :doc.id,message:doc.data()})))
      })

  },[])

  useEffect(()=>{
   setUsername(prompt('Please Enter your name'))
  },[])

  const sendMessage =  (e) => {
    e.preventDefault()
    db.collection('messages').add({
      message : input,
      username : username,
      timestamp : firebase.firestore.FieldValue.serverTimestamp()
    })
    // setMessages([...messages,{username:username,message :input}])
    setInput('')
  }
  
  return (
    <div className="App">
      <h1> Facebook_Messenger_Clone </h1>
      <img alt="logo Messenger"  src="https://facebookbrand.com/wp-content/uploads/2018/09/Header-e1538151782912.png?w=100&h=100" style={{marginTop:'3px'}} />
      <h2>Welcome {username}</h2>
      <form className='app_form'>
      <FormControl className='app_formControl' >
          <InputLabel >Enter message</InputLabel>
          <Input className='app_Input' placeholder='Enter a message' value={input}  onChange ={ e => setInput(e.target.value)} />
           {/* button */}
           <IconButton className="app__iconButton" disabled={!input.replace(/\s/g, '').length} variant="contained" color="primary" type="submit" onClick={sendMessage}><SendIcon/></IconButton>
           {/* <IconButton className="app__iconButton" 
           disabled={!input} variant='contained'
           color='primary' type='submit' onClick={sendMessage}><SendIcon/></IconButton> */}
           {/* <Button disabled={!input} variant='contained'
            color='primary' type='submit' onClick={sendMessage}>Send Messages</Button> */}
      </FormControl>
           {/* input */}
      </form>
     
      {/* showing messages */}
      <Flipmove>
      {
        messages.map(({ id,message }) => (
          <Message key={id} username={username} message ={message} />
        ))
      }
      </Flipmove>
      

    </div>
  );
}

export default App;
