import { Message, Prisma } from "@prisma/client";
import { useCallback, useEffect, useMemo, useState } from "react";
import { io, Socket } from "Socket.IO-client";
import { SERVER_URI, USER_INFO } from "../constans.ts";
import { MessageUpdatePayload, UserInfo } from "../types.ts";
import { storage } from "../utils.ts";

// socket instance
let socket: Socket;

export const useChat = () => {
  const userInfo = storage.get<UserInfo>(USER_INFO) as UserInfo;

  // this is important: one user - one socket
  if (!socket) {
    socket = io(SERVER_URI, {
      // remember server handshake signature?
      query: {
        userName: userInfo.userName
      }
    });
  }

  const [messages, setMessages] = useState<Message[]>();
  const [log, setLog] = useState<string>();

  useEffect(() => {
    // connection/disconnection user
    socket.on("log", (log: string) => {
      setLog(log);
    });

    // get messages
    socket.on("messages", (messages: Message[]) => {
      setMessages(messages);
    });

    socket.emit("messages:get");
  }, []);

  // send message
  const send = useCallback((payload: Prisma.MessageCreateInput) => {
    socket.emit("message:post", payload);
  }, []);

  // update message
  const update = useCallback((payload: MessageUpdatePayload) => {
    socket.emit("message:put", payload);
  }, []);

  // remove message
  const remove = useCallback((payload: Prisma.MessageWhereUniqueInput) => {
    socket.emit("message:delete", payload);
  }, []);

  // clear messages - for debugging during development
  // can be called in browser console, for example
  // @ts-ignore
  window.clearMessages = useCallback(() => {
    socket.emit("messages:clear");
    location.reload();
  }, []);

  // chat actions
  const chatActions = useMemo(
    () => ({
      send,
      update,
      remove
    }),
    []
  );

  return { messages, log, chatActions };
};