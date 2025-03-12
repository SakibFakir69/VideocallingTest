import { useEffect, useState } from "react";
import { io } from "socket.io-client";
// import to client socket.io

const socket = io("http://localhost:5000/");
// here use socket io (server link)

function App() {

  const [ text , settext ] = useState("");




  console.log(socket);

  useEffect(() => {
    socket.connect();
    //  when effect run socket connect

    // show welcome message 
    socket.on("welcome",(msg)=>{
      console.log("welcome msg",msg);

    })



    return () => {
      socket.disconnect();
      // remove connect
    };

  },[]);


  // sendMessage
  
  const sendMessage = (event)=>{
    event.preventDefault();
    // here fetch text 
    // chat
    socket.emit('chat',text);






  }




  return (
    <div>
      <h1>Video calling app </h1>

      <section>
        {/* make a send message option  */}
        <form onSubmit={sendMessage}>
          <input type="text" value={text} onChange={(e)=> settext(e.target.value)} placeholder="Enter your text" />

          <button type="submit">Send</button>
        </form>


      </section>
    </div>
  );
}

export default App;
