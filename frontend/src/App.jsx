import { useEffect, useRef, useState } from "react";
import { socket } from "./utils/socket";

function App() {
  const inputRef = useRef(null);
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const handleGlobalKeyDown = (e) => {
      if (e.key === "Enter" && document.activeElement !== inputRef.current) {
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleGlobalKeyDown);
    return () => window.removeEventListener("keydown", handleGlobalKeyDown);
  }, []);

  const getTime = () => {
    const d = new Date();
    let h = d.getHours(),
      m = d.getMinutes();
    const ampm = h >= 12 ? "PM" : "AM";
    h = h % 12 || 12;
    return `${h}:${m.toString().padStart(2, "0")} ${ampm}`;
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (!text.trim()) return;
    setMessages((prev) => [
      ...prev,
      { id: Date.now(), text, type: "sent", time: getTime() },
    ]);
    socket.emit("chat message", text);
    setText("");
    inputRef.current?.focus();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") inputRef.current?.blur();
    if (e.key === "Enter") handleSubmit();
  };

  useEffect(() => {
    socket.on("chat message", (msg) => {
      setMessages((prev) => [
        ...prev,
        { id: Date.now(), text:msg, type: "received", time: getTime() },
      ]);
    });

    return () => {
      socket.off("chat message");
    };
  }, []);

  return (
    <div className="h-screen w-full flex items-center justify-center bg-gray-300">
   
      <div
        className="
        w-full h-screen flex flex-col
        md:h-[85vh] md:max-w-md md:rounded-3xl md:overflow-hidden md:border md:border-gray-300 md:shadow-2xl
        lg:max-w-lg lg:h-[90vh]
      "
      >
        {/* header */}
        <div className="bg-[#075E54] px-4 py-3 flex items-center gap-3 flex-shrink-0">
          <button className="text-white text-xl md:hidden">&#8592;</button>
          <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-[#25D366] flex items-center justify-center text-white font-medium text-sm flex-shrink-0">
            D
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white text-sm font-medium truncate">Dhiraj</p>
            <p className="text-[#B2DFDB] text-xs">online</p>
          </div>
          <div className="flex gap-5 text-white text-lg flex-shrink-0">
            <button className="hover:opacity-70 transition-opacity">
              &#9743;
            </button>
            <button className="hover:opacity-70 transition-opacity">
              &#8942;
            </button>
          </div>
        </div>

        {/* messages */}
        <div
          className="flex-1 overflow-y-auto flex flex-col gap-2 px-3 py-3 md:px-4"
          style={{ background: "#ECE5DD" }}
        >
          <div className="text-center mb-1">
            <span className="bg-[#D1F2EB] text-gray-500 text-xs px-3 py-1 rounded-lg">
              Today
            </span>
          </div>

          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`
                max-w-[80%] sm:max-w-[75%] lg:max-w-[65%]
                px-3 pt-2 pb-5 rounded-lg text-sm relative break-words
                ${
                  msg.type === "sent"
                    ? "self-end bg-[#DCF8C6] rounded-tr-none"
                    : "self-start bg-white rounded-tl-none"
                }
              `}
            >
              {msg.text}
              <span className="absolute bottom-1 right-2 text-[10px] text-gray-400 flex items-center gap-1 whitespace-nowrap">
                {msg.time}
                {msg.type === "sent" && (
                  <span className="text-[#4FC3F7]">✓✓</span>
                )}
              </span>
            </div>
          ))}

          <div ref={messagesEndRef} />
        </div>

        {/* input bar */}
        <div
          className="px-3 py-2 flex items-center gap-2 flex-shrink-0"
          style={{ background: "#F0F0F0" }}
        >
          <div className="flex-1 bg-white rounded-full flex items-center px-4 py-2 gap-2 border border-gray-200 min-w-0">
            <input
              ref={inputRef}
              type="text"
              placeholder="Message"
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 outline-none text-sm bg-transparent text-gray-800 placeholder-gray-400 min-w-0"
            />
          </div>
          <button
            onClick={handleSubmit}
            className="w-11 h-11 rounded-full bg-[#075E54] flex items-center justify-center flex-shrink-0 hover:bg-[#128C7E] active:scale-95 transition-all"
            aria-label="Send message"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="white"
              className="w-5 h-5"
            >
              <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
