import React, { useState } from "react";
import { FiUser } from "react-icons/fi";
import { USER_INFO } from "../constans.ts";
import { UserInfo } from "../types.ts";
import { getId, storage } from "../utils.ts";

const WelcomeScreen = () => {
  const [userName, setUserName] = useState("");

  const changeUserName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
  };

  const setUserInfo = (e: React.FormEvent) => {
    e.preventDefault();

    const trimmed = userName.trim();
    if (!trimmed) return;

    // generate user id
    const userId = getId();
    // save user info to local storage
    storage.set<UserInfo>(USER_INFO, { userName: trimmed, userId });

    // reload location
    location.reload();
  };

  return (
    <section>
      <h1 className="title">Welcome, friend!</h1>
      <form onSubmit={setUserInfo} className="flex flex-col items-center gap-4">
        <div className="flex flex-col gap-2">
          <label
            htmlFor="username"
            className="text-lg flex items-center justify-center"
          >
            <span className="mr-1">
              <FiUser />
            </span>
            <span>What is your name?</span>
          </label>
          <input
            type="text"
            id="username"
            name="userName"
            value={userName}
            onChange={changeUserName}
            required
            autoComplete="off"
            className="input"
          />
        </div>
        <button className="btn-success">Start chat</button>
      </form>
    </section>
  );
};

export default WelcomeScreen;