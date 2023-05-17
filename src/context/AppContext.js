import React, { createContext, useEffect, useState } from "react";
import { fetchUserChats, fetchUsers } from "../api/Api";
import axios from "axios";
import { BASE_URL } from "../api/constant";

export const Context = createContext();

const AppContext = (props) => {
  const [currentUser, setCurrentUser] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
  const [loading, setLoading] = useState(false);
  const [chats, setChats] = useState([]);
  const [users, setUsers] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    fetchAllUsers();
  }, [currentUser, isLoggedIn]);

  const fetchAllUsers = async () => {
    await fetchUsers().then((data) => {
      setUsers(data);
    });
  };

  return (
    <Context.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        currentUser,
        setCurrentUser,
        selectedUser,
        setSelectedUser,
        loading,
        setLoading,
        chats,
        setChats,
        users,
        setUsers,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export default AppContext;
