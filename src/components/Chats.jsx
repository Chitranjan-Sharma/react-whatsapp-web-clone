import React, { useContext, useEffect, useState } from "react";
import { Context } from "../context/AppContext";
import { fetchUserChats } from "../api/Api";
import axios from "axios";
import { BASE_URL } from "../api/constant";

const Chats = () => {
  const { selectedUser, chats, loading, setLoading, setChats, currentUser } =
    useContext(Context);

  useEffect(() => {
    var scrollDiv = document.getElementById("scrollDiv");
    scrollDiv.scrollTop = scrollDiv.offsetHeight;

    if (selectedUser !== "" && currentUser !== "") {
      getChatsWithUser();
    }
  }, [selectedUser, loading]);

  const deleteMessage = async (chatId) => {
    await axios.delete(`${BASE_URL}Chats/${chatId}`).then(
      (res) => {
        getChatsWithUser();
      },
      (err) => {
        alert(err);
      }
    );
  };

  const getChatsWithUser = async () => {
    await axios.get("https://localhost:7185/api/Chats").then(({ data }) => {
      if (data !== null) {
        let chatList = [];
        data?.forEach((chat) => {
          if (
            chat["SenderId"] === currentUser["UserId"] &&
            chat["ReceiverId"] === selectedUser["UserId"]
          ) {
            chatList.push(chat);
          } else if (
            chat["SenderId"] === selectedUser["UserId"] &&
            chat["ReceiverId"] === currentUser["UserId"]
          ) {
            chatList.push(chat);
          }
        });
        setChats(chatList);
        setLoading(false);
        chatList = [];
      } else {
      }
    });
  };

  return (
    <div className="spyHeight py-3" id="scrollDiv">
      {!loading ? (
        chats.map((item, i) => {
          return currentUser["UserId"] === item["SenderId"] ? (
            <div className="w-100 d-flex justify-content-end align-items-center px-4">
              <img
                className="m-2 dropdown-toggle"
                width="16"
                height="16"
                src="https://img.icons8.com/small/16/down-squared.png"
                alt="more"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              />
              <ul class="dropdown-menu">
                <li>
                  <button
                    class="dropdown-item btn btn-light text-black"
                    onClick={() => {
                      deleteMessage(item["ChatId"]);
                    }}
                  >
                    Delete
                  </button>
                </li>
              </ul>
              <div
                className="px-3 py-2 text-center mt-2 bg-white text-black shadow d-flex flex-column"
                style={{
                  maxWidth: "400px",

                  borderRadius: "20px 20px 5px 20px",
                }}
              >
                {item["HasImage"] ? (
                  <img
                    className="object-fit-contain rounded mt-2"
                    src={item["AttachFileUrl"]}
                    alt=""
                    height="250px"
                    width="250px"
                  />
                ) : (
                  ""
                )}
                <label className="fw-bold text-start">{item["Message"]}</label>
                <small>{item["TimeStamp"]}</small>
              </div>
            </div>
          ) : (
            <div className="w-100 d-flex justify-content-start align-items-center px-4">
              <div
                className="py-2 px-3 text-center mt-2 bg-success text-white shadow d-flex flex-column position-relative"
                style={{
                  maxWidth: "400px",

                  borderRadius: "5px 20px 20px 20px",
                }}
              >
                {item["HasImage"] ? (
                  <img
                    className="object-fit-contain rounded mt-2"
                    src={item["AttachFileUrl"]}
                    alt=""
                    height="250px"
                    width="250px"
                  />
                ) : (
                  ""
                )}{" "}
                <label className="fw-bold text-end">{item["Message"]}</label>
                <small>{item["TimeStamp"]}</small>
              </div>
              <img
                className="m-2 dropdown-toggle"
                width="16"
                height="16"
                src="https://img.icons8.com/small/16/down-squared.png"
                alt="more"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              />
              <ul class="dropdown-menu">
                <li>
                  <button
                    class="dropdown-item btn btn-light text-black"
                    onClick={() => {
                      deleteMessage(item["ChatId"]);
                    }}
                  >
                    Delete
                  </button>
                </li>
              </ul>
            </div>
          );
        })
      ) : (
        <div className="w-100 d-flex justify-content-center align-items-center text-center px-4">
          <p style={{ height: "40px", width: "200px" }}>Refreshing...</p>
        </div>
      )}
    </div>
  );
};

export default Chats;
