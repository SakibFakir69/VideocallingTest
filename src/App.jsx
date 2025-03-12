import { useEffect, useState } from 'react'
import {io} from 'socket.io-client'
// import to client socket.io


const socket = io('http://localhost:5000/');
// here use socket io (server link)


function App() {
  console.log(socket);


  useEffect(()=>{
   socket.connect();




    return ()=>{

      socket.disconnect();


    }





  })







  return (
    <div>
      <h1>Video calling app </h1>

      <section>

      </section>

      

    </div>
  )
}

export default App
