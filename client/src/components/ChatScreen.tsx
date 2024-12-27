import React, { useEffect, useState } from "react";
import { FiEdit2, FiSend, FiTrash } from "react-icons/fi";
import { MdOutlineClose } from "react-icons/md";
// @ts-ignore
import TimeAgo from "react-timeago";
import { Slide, toast, ToastContainer } from "react-toastify";
import { USER_INFO } from "../constans";
import { useChat } from "../hooks/useChat";
import { UserInfo } from "../types";
import { storage } from "../utils";

// notification about connection/disconnection user
const notify = (message: string) =>
  toast.info(message, {
    position: "top-left",
    autoClose: 1000,
    hideProgressBar: true,
    transition: Slide
  });

const ChatScreen = () => {
  const userInfo = storage.get<UserInfo>(USER_INFO) as UserInfo;
  const { userId, userName } = userInfo;

  // get messages, log and chat actions
  const { messages, log, chatActions } = useChat();

  const [text, setText] = useState("");
  // editing message state indicator
  const [editingState, setEditingState] = useState(false);
  // editing message id
  const [editingMessageId, setEditingMessageId] = useState(0);

  const changeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();

    const trimmed = text.trim();
    if (!trimmed) return;

    const message = {
      userId,
      userName,
      text
    };

    // if component is in editing state
    if (editingState) {
      // update message
      chatActions.update({ id: editingMessageId, text });
      setEditingState(false);
    // else
    } else {
      // send message
      chatActions.send(message);
    }

    setText("");
  };

  const removeMessage = (id: number) => {
    chatActions.remove({ id });
  };

  // effect for displaying notifications when log changes
  useEffect(() => {
    if (!log) return;

    notify(log);
  }, [log]);

  return (
    <>
      <h1 className="title">Let's Chat</h1>
      <div className="flex-1 flex flex-col">
        {messages &&
          messages.length > 0 &&
          messages.map((message) => {
            // determine message ownership
            const isMsgBelongsToUser = message.userId === userInfo.userId;

            return (
              <div
                key={message.id}
                // background color depends on 2 factors:
                // 1) user ownership;
                // 2) editing state
                className={[
                  "my-2 p-2 rounded-md text-white w-1/2",
                  isMsgBelongsToUser
                    ? "self-end bg-green-500"
                    : "self-start bg-blue-500",
                  editingState ? "bg-gray-300" : ""
                ].join(" ")}
              >
                <div className="flex justify-between text-sm mb-1">
                  <p>
                    By <span>{message.userName}</span>
                  </p>
                  <TimeAgo date={message.createdAt} />
                </div>
                <p>{message.text}</p>
                {/* user can edit and delete only his messages */}
                {isMsgBelongsToUser && (
                  <div className="flex justify-end gap-2">
                    <button
                      disabled={editingState}
                      className={`${
                        editingState ? "hidden" : "text-orange-500"
                      }`}
                      // edit message
                      onClick={() => {
                        setEditingState(true);
                        setEditingMessageId(message.id);
                        setText(message.text);
                      }}
                    >
                      <FiEdit2 />
                    </button>
                    <button
                      disabled={editingState}
                      className={`${
                        editingState ? "hidden" : "text-red-500"
                      }`}
                      // delete message
                      onClick={() => {
                        removeMessage(message.id);
                      }}
                    >
                      <FiTrash />
                    </button>
                  </div>
                )}
              </div>
            );
          })}
      </div>
      {/* send message */}
      <form onSubmit={sendMessage} className="flex items-stretch">
        <div className="flex-1 flex">
          <input
            type="text"
            id="message"
            name="message"
            value={text}
            onChange={changeText}
            required
            autoComplete="off"
            className="input flex-1"
          />
        </div>
        {editingState && (
          <button
            className="btn-error"
            type="button"
            // cancel editing
            onClick={() => {
              setEditingState(false);
              setText("");
            }}
          >
            <MdOutlineClose fontSize={18} />
          </button>
        )}
        <button className="btn-primary">
          <FiSend fontSize={18} />
        </button>
      </form>
      {/* notification container */}
      <ToastContainer />
    </>
  );
};
export default ChatScreen;