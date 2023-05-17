import React, { useContext, useEffect, useState } from "react";
import Users from "./Users";
import Chats from "./Chats";

import "../../src/index.css";
import { Context } from "../context/AppContext";

import { useNavigate } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const { selectedUser, currentUser, setLoading, isLoggedIn, setSelectedUser } =
    useContext(Context);
  const [messageText, setMessageText] = useState();
  const [selectedImage, setSelectedImage] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  });

  const sendMessage = async () => {
    if (currentUser !== "" && selectedUser !== "") {
      setLoading(true);
      var date = new Date();
      var chat = {
        ChatId: 0,
        SenderId: currentUser.UserId,
        ReceiverId: selectedUser.UserId,
        Message: messageText,
        HasImage: selectedImage !== "" ? true : false,
        HasPDF: false,
        AttachFileUrl: selectedImage !== "" ? selectedImage : "none",
        TimeStamp: date.toLocaleDateString(),
      };
      await axios.post("https://localhost:7185/api/Chats", chat).then(
        (res) => {
          setLoading(false);
          setMessageText("");
          setSelectedImage("");
        },
        (err) => {
          setLoading(false);
          console.log(err);
        }
      );
    }
  };

  return (
    <div className="position-relative">
      <div className="bg-success" style={{ height: "150px" }}></div>
      <div className="position-absolute top-0 mt-4 w-100">
        <center>
          <div className="screenHeight  shadow">
            <div className="w-100 d-flex">
              <div style={{ height: "910px", width: "30%" }}>
                <Users />
              </div>
              <div style={{ height: "910px", width: "70%" }}>
                <div
                  className="bg-light d-flex justify-content-between align-items-center py- px-3"
                  style={{ height: "60px" }}
                >
                  <div className="d-flex justify-content-between align-items-center">
                    <img
                      className="rounded"
                      width="40"
                      height="40"
                      src={
                        selectedUser["DpUrl"] !== "none"
                          ? selectedUser["DpUrl"]
                          : "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
                      }
                      alt="user-male-circle"
                    />

                    <div className="mx-3 fw-bold">
                      <label>{selectedUser["Name"]}</label>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                    <img
                      className="me-3"
                      width="24"
                      height="24"
                      src="https://img.icons8.com/fluency-systems-filled/48/search.png"
                      alt="search"
                    />
                    <img
                      width="24"
                      height="24"
                      src="https://img.icons8.com/external-neu-royyan-wijaya/64/external-more-neu-development-neu-royyan-wijaya.png"
                      alt="external-more-neu-development-neu-royyan-wijaya"
                    />
                  </div>
                </div>
                <Chats />
                <div
                  className="bg-light d-flex align-items-center justify-content-between py-2 px-3"
                  style={{ height: "60px" }}
                >
                  <div className="d-flex justify-content-between align-items-center">
                    {selectedImage !== "" ? (
                      <div
                        className="position-relative me-3"
                        style={{ width: "80" }}
                      >
                        <img
                          className="me-3"
                          width="40"
                          height="40"
                          src={selectedImage}
                          alt="search"
                        />
                        <img
                          className="position-absolute top-0 end-0"
                          width="20"
                          height="20"
                          src="https://img.icons8.com/material-outlined/24/cancel--v1.png"
                          alt="delete-sign"
                          onClick={() => {
                            setSelectedImage("");
                          }}
                        />
                      </div>
                    ) : (
                      ""
                    )}

                    <img
                      onClick={() => {
                        document.getElementById("selectImageFile").click();
                      }}
                      className="me-3"
                      width="24"
                      height="24"
                      src="https://img.icons8.com/external-kmg-design-outline-color-kmg-design/32/external-attachment-back-to-school-kmg-design-outline-color-kmg-design.png"
                      alt="external-more-neu-development-neu-royyan-wijaya"
                    />

                    <input
                      type="file"
                      className="form-control"
                      id="selectImageFile"
                      placeholder="email@example.com"
                      style={{ display: "none" }}
                      onChange={(e) => {
                        if (e.target.files != null) {
                          var reader = new FileReader();
                          reader.readAsDataURL(e.target.files[0]);
                          reader.onload = function (data) {
                            setSelectedImage(reader.result);
                          };
                          reader.onerror = function (err) {
                            console.log(err);
                          };
                        }
                      }}
                    />
                  </div>
                  <input
                    className="form-control mx-3"
                    type="text"
                    placeholder="Type message..."
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                  />
                  <img
                    width="30"
                    height="30"
                    src="https://img.icons8.com/fluency/48/sent.png"
                    alt="sent"
                    onClick={() => {
                      sendMessage();
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </center>
      </div>
    </div>
  );
};

export default Home;
