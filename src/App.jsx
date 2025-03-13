





import React, { useEffect, useState } from 'react'

import {io} from 'socket.io-client'

const socket = io('http://localhost:5000')

function App() {
  console.log("socket ", socket);


  // recive msg use a 
  const [ message , setmessage ] = useState('');

  // socket conection 

  useEffect(()=>{

    socket.connect();






    return ()=>{
      socket.disconnect();
    }

  })

  // send message fucntion

  const sendMessage = (event)=>{
    event.preventDefault();
    // send msg to server 
    /// client use emit to send data 

    socket.emit('send-message',message)


  }
  



  return (
    <div>
      <h2>Next call</h2>

      <section className='flex justify-center mt-10'>
       
       <form onClick={sendMessage}>
       <input value={message} onChange={(e)=> setmessage(e.target.value)} type="text" placeholder='Enter your message ...'  className='border py-1' />

        <button className='border px-8 py-1 bg-red-500 text-white rounded cursor-pointer'>Send</button>
       </form>
      </section>



    </div>
  )
}

export default App