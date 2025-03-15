




import React, { useEffect, useState } from 'react'
import {io} from 'socket.io-client'

const socket = io('http://localhost:5000')

function App() {

  const [ room , setroom ] = useState('');
  const [ welcomemsg , setwelcomemsg ] = useState('');
  const [ message , setmessage ] = useState("");

  const [ chat , setchat ] = useState([]);
  const [ socketid , setsocketid ] = useState("")

  useEffect(()=>{

    socket.connect();
    socket.on('connect',()=>{
      console.log(socket.id);
      setsocketid(socket.id);
    })

    // welcomne msg


    socket.on('welcome',(msg)=>{
      setwelcomemsg(msg);

    })
    // servermessage

    socket.on('servermessage',({msg,id})=>{
      console.log(msg ," df",id);
      setchat((prev)=> [...prev,{msg,id}]);
    })




    return ()=>{
      socket.disconnect();
      socket.off('servermessage')
    }


  },[])

  // 
  const handelSubmit = (event)=>{
    event.preventDefault();
    console.log(room);
    socket.emit('join-room',room);


  }
  const sendMessage= (event)=>{
    event.preventDefault();

    if(message.trim()==='')
    {
      alert('Enter your msg ');
      return ;
    }

    socket.emit('message',{msg:message,id:socketid});
    setmessage(' ');


  }







  return (
    <div className='w-full min-h-screen'>

      <section className='flex justify-center items-center  border h-screen'>
    
        <form onSubmit={handelSubmit} className=''>

          <input type='text' placeholder='Enter your room name ' className='py-3 border px-10 rounded' value={room} onChange={(e)=> setroom(e.target.value)}/>
          <button type='submit' className='px-8 py-2.5 bg-green-500 text-white font-semibold'>Submit</button>

        </form>


      </section>
      {
        welcomemsg && (<div>
          <h1>You join this room {welcomemsg}</h1>

          {/* send message  */}

          <section>


            <form onSubmit={sendMessage}>

              <input type='text' placeholder='Enter your message' value={message} onChange={(e)=> setmessage(e.target.value)}/>

              <button type='submit' className='px-8 py-2 border'>Send</button>
            </form>
          </section>

          <section>
           
           {
            chat.map(({msg,id},key)=>(

              <div key={key} className='border p-5'>

              

                {
                  id===socket.id  ?    <p className='bg-red-500 flex justify-end'>{msg}  {id}  </p> :

                  <p className='text-green-400 flex justify-start'>{msg} {id}</p>
                }

              </div>

            ))
           }


          </section>

        </div>
        )
      }
    


    </div>
  )
}

export default App