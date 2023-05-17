import axios from "axios";
import { BASE_URL } from "./constant";

export const fetchUsers = async () => {
  try {
    var { data } = await axios.get(`${BASE_URL}Users`);

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchUserById = async (id) => {
  try {
    var { data } = await axios.get(`${BASE_URL}Users/${id}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const putUserData = async (user) => {
  try {
    var { data } = await axios.put(`${BASE_URL}Users/${user["UserId"]}`, user);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchUserChats = async () => {
  try {
    var { data } = await axios.get(`${BASE_URL}Chats`);

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const postChat = (chat) => {
  try {
    var { data } = axios.post(`${BASE_URL}Chats`, chat);

    return data;
  } catch (error) {
    console.log(error);
  }
};
