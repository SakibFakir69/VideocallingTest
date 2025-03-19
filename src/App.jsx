import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000", { reconnection: true });

function App() {
  const [room, setroom] = useState("");
  const [welcomemsg, setwelcomemsg] = useState("");
  const [message, setmessage] = useState("");

  const [chat, setchat] = useState([]);
  const [socketid, setsocketid] = useState("");
  const [userid, setuserid] = useState("");

  // genrate uuid and typeeffect

  useEffect(() => {

    socket.connect();
    socket.on("connect", () => {
      console.log(socket.id);
      setsocketid(socket.id);
    });

    // id
    let userID = localStorage.getItem("userID");
    if (!userID) {
      userID = crypto.randomUUID();
      localStorage.setItem("userID", userID);
    }
    setuserid(userID);

    // noti

    socket.on("servernoti", (noti) => {
      console.log(noti);
    });

    // welcomne msg

    socket.on("welcome", (msg) => {
      setwelcomemsg(msg);
    });
    // servermessage

    socket.on("servermessage", ({ msg, id }) => {
      console.log(msg, " df", id);
      setchat((prev) => [...prev, { msg, id }]);
    });

    // type

    socket.on("typingStatus", (type) => {
      console.log(type, "type");

      if (type!==socket.id) {

        setstatus(true);
  
      }

    });

    return () => {
      socket.disconnect();
      // socket.off("servermessage");
      socket.off('typingStatus')
    };
  }, []);

  //
  const [status, setstatus] = useState(false);

  const handelSubmit = (event) => {
    event.preventDefault();
    console.log(room);
    socket.emit("join-room", room);
    setchat([]);

  };

  const [ clientStatus , setclientStatus] = useState(false);

  const sendMessage = (event) => {

    event.preventDefault();

    if (message.trim() === "") {
      alert("Enter your msg ");

      return;
    }


    setstatus(false);

    socket.emit("typetest",clientStatus);

    socket.emit("message", { msg: message, id: socketid });
    setmessage(" ");
  }; 


  

  // notification push
  const text = "pass client";

  const notiPush = () => {
    socket.emit("noti", { noti: text });
    alert("done");

  };

  // handel typing



  const hadelType = () => {


    socket.emit("typing", socket.id

    );
 

    // setTimeout(() => {
    //   setstatus(false);
    // }, 2000);

  };


  console.log(status, " status ");

  return (
    <div className="w-full min-h-screen">
      <div>
        <button
          onClickCapture={notiPush}
          className="btn bg-red-600 px-8 py-2 text-white"
        >
          Push Notification
        </button>
      </div>

      <section className="flex justify-center items-center  border h-screen">
        <form onSubmit={handelSubmit} className="">
          <input
            type="text"
            placeholder="Enter your room name "
            className="py-3 border px-10 rounded"
            value={room}
            onChange={(e) => setroom(e.target.value)}
          />
          <button
            type="submit"
            className="px-8 py-2.5 bg-green-500 text-white font-semibold"
          >
            Submit
          </button>
        </form>
      </section>
      {welcomemsg && (
        <div>
          <h1 className="text-center text-2xl font-semibold ">
            You join this room {welcomemsg}
          </h1>

          {/* send message  */}

          <section className=" overflow-auto md:overflow-y-scroll md:h-[560px] h-150px border m-10 overflow-y-scroll">
            {chat.map(({ msg, id }, key) => (
              <div
                key={key}
                className=" p-5 flex justify-center mx-auto items-center max-w-2xl"
              >
                <div className="w-full">
                  {id === socket.id ? (
                    <span className="text-red-500 flex justify-end  md:text-2xl md:font-semibold text-xl font-bold">
                      {msg}{" "}
                    </span>
                  ) : (
                    <span className="text-green-400 flex justify-start md:text-2xl md:font-semibold text-xl font-bold">
                      {msg}{" "}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </section>
          <div>
            {
              status ? <p>Typeing </p> : <p>no typeing</p>
            }
          </div>
          <section className="flex justify-center items-center mt-4 relative">
            <form onSubmit={sendMessage}>
              <input
                type="text"
                placeholder='enter msg'

                value={message}
                onKeyDown={hadelType}
                onChange={(e) => setmessage(e.target.value)}
                className="border px-12 py-2 mr-2 rounded bg-slate-400 text-white focus:font-semibold focus:tracking-wider focus:outline-blue-700 focus:shadow-[0_0_14_blue]"
              />

              <button
                type="submit"
                className="px-12 py-2 border bg-black shadow-2xl hover:shadow-[0_0_15px_white] text-white rounded "
              >
                Send
              </button>
            </form>
          </section>
        </div>
      )}
    </div>
  );
}

export default App;
