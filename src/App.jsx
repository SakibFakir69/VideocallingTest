import { useState } from 'react'
import {io} from 'socket.io-client'



const socket = io('http://localhost:5000/');



function App() {
  console.log(socket);

  


  return (
    <div>
      <h1>Video calling app </h1>

      <section>

      </section>

      

    </div>
  )
}

export default App
