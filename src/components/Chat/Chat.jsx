// Name - Usha Sai Chintha, UTA ID - 1002155333
// Name - Shiney Chinthamalla, UTA ID - 1002170536
// Name - Sai Charan Challa, UTA ID - 1002147720
// Name - Venkata Satya Kiranmai Challagulla, UTA ID - 1002195499
// Name - Dinesh Reddy Bommana, UTA ID - 1002163421

"use client";

const ChatWindow = () => {
  const messages = [
    {
      sender: "Florencio Dorrance",
      text: "omg, this is amazing",
      fromMe: false,
    },
    { sender: "Florencio Dorrance", text: "perfect! 🟢", fromMe: false },
    {
      sender: "Florencio Dorrance",
      text: "Wow, this is really epic",
      fromMe: false,
    },
    { sender: "Me", text: "How are you?", fromMe: true },
    { sender: "Me", text: "Haha oh man", fromMe: true },
  ];

  return (
    <div className=" h-2/5 flex flex-col flex-grow p-4 bg-white ">
      {messages.map((message, index) => (
        <div
          key={index}
          className={`flex ${
            message.fromMe ? "justify-end" : "justify-start"
          } mb-2`}
        >
          <div
            className={`p-3 rounded-lg max-w-xs ${
              message.fromMe
                ? "bg-black text-white"
                : "bg-gray-200 text-gray-900"
            }`}
          >
            {message.text}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatWindow;
