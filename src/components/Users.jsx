import React, { useContext, useState } from "react";
import { Context } from "../context/AppContext";
import { fetchUserChats, putUserData } from "../api/Api";
import { useNavigate } from "react-router-dom";

const Users = () => {
  const {
    users,
    setSelectedUser,
    currentUser,
    setChats,
    setCurrentUser,
    setLoading,
    selectedUser,
    setIsLoggedIn,
  } = useContext(Context);
  const [pinned, setPinned] = useState(false);

  const [dpImage, setDpImage] = useState("");

  const [chatPosition, setChatPosition] = useState(0);

  const navigate = useNavigate();

  // const getChatsWithUser = async () => {
  //   setLoading(true);
  //   await fetchUserChats().then((res) => {
  //     res.forEach((chat) => {
  //       let chatList = [];

  //       if (
  //         chat["SenderId"] === currentUser["UserId"] &&
  //         chat["ReceiverId"] === selectedUser["UserId"]
  //       ) {
  //         chatList.push(chat);
  //       } else if (
  //         chat["SenderId"] === selectedUser["UserId"] &&
  //         chat["ReceiverId"] === currentUser["UserId"]
  //       ) {
  //         chatList.push(chat);
  //       }

  //       setChats(chatList);
  //       setLoading(false);
  //       chatList = [];
  //     });
  //   });
  // };

  return (
    <div
      style={{
        height: "910px",
        overflow: "auto",
        overflowX: "hidden",
        scrollBehavior: "smooth",
      }}
    >
      <div
        className="sticky-top px-3"
        style={{ height: "110px", backgroundColor: "whitesmoke" }}
      >
        <div className="d-flex justify-content-between align-items-center py-2">
          <img
            width="40"
            height="40"
            src={
              currentUser["DpUrl"] !== "none"
                ? currentUser["DpUrl"]
                : "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
            }
            alt="user-male-circle"
            class=" dropdown-toggle"
            data-bs-toggle="dropdown"
            data-bs-auto-close="outside"
            className="dropdown-toggle rounded-circle"
          />

          <div className="dropdown-menu p-3 ">
            <div className="position-relative mb-2">
              <img
                src={
                  dpImage !== ""
                    ? dpImage
                    : "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
                }
                alt=""
                width="250px"
                height="250px"
              />

              <img
                className="position-absolute bottom-0 end-0"
                width="30"
                height="30"
                src="https://img.icons8.com/cotton/64/gallery.png"
                alt="gallery"
                onClick={() => {
                  document.getElementById("selectDpImage").click();
                }}
              />
              <input
                id="selectDpImage"
                type="file"
                style={{ display: "none" }}
                onChange={(e) => {
                  if (e.target.files != null) {
                    var reader = new FileReader();
                    reader.readAsDataURL(e.target.files[0]);
                    reader.onload = function () {
                      setDpImage(reader.result);
                    };
                    reader.onerror = function (err) {
                      console.log(err);
                    };
                  }
                }}
              />
            </div>
            <center>
              <button
                className="btn btn-light"
                onClick={() => {
                  currentUser["DpUrl"] = dpImage;
                  putUserData(currentUser).then((res) => {
                    setDpImage("");
                  });
                }}
              >
                Upload
              </button>
            </center>
          </div>

          <div className="d-flex justify-content-between align-items-center py-2">
            <img
              className="me-4"
              width="24"
              height="24"
              src="https://img.icons8.com/material-rounded/24/conference-call.png"
              alt="conference-call"
            />
            <img
              className="me-4"
              width="24"
              height="24"
              src="https://img.icons8.com/material/24/loading.png"
              alt="loading"
            />
            <img
              className="me-4"
              width="24"
              height="24"
              src="https://img.icons8.com/material-rounded/48/comments--v1.png"
              alt="comments--v1"
            />
            <img
              className=" dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              width="24"
              height="24"
              src="https://img.icons8.com/external-neu-royyan-wijaya/64/external-more-neu-development-neu-royyan-wijaya.png"
              alt="external-more-neu-development-neu-royyan-wijaya"
            />

            <ul className="dropdown-menu">
              <li>
                <button
                  className="btn dropdown-item"
                  onClick={() => {
                    navigate("/login");
                    setSelectedUser("");
                    setCurrentUser("");
                    setIsLoggedIn(false);
                  }}
                >
                  Log-Out
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-center py-2">
          <input
            type="text"
            className="form-control me-3"
            placeholder="Search..."
          />
          <img
            width="24"
            height="24"
            src="https://img.icons8.com/material/24/filter--v1.png"
            alt="filter--v1"
          />
        </div>
      </div>

      {users.map((item, i) => {
        return (
          <div
            className="d-flex justify-content-between align-items-center px-3 py-2 bg-light"
            key={i}
          >
            <div
              className="d-flex justify-content-center align-items-center"
              type="button"
              onClick={() => {
                setChats([]);
                setSelectedUser(item);
                setLoading(true);
              }}
            >
              <img
                className="me-3 rounded"
                width="50"
                height="50"
                src={
                  item["DpUrl"] !== "none"
                    ? item["DpUrl"]
                    : "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
                }
                alt="Not Found"
              />
              <div className="d-flex justify-content-center align-items-center ">
                <p
                  className="fw-bold text-truncate text-start"
                  style={{ height: "40px" }}
                >
                  {item["Name"]} <br />{" "}
                  <pre className="text-truncate">{item["Email"]}</pre>
                </p>
              </div>
            </div>
            <div className="d-flex justify-content-center align-items-center">
              <div className="dropdown">
                {chatPosition === i && pinned ? (
                  <img
                    width="24"
                    height="24"
                    src="https://img.icons8.com/material-rounded/24/pin.png"
                    alt="pin"
                  />
                ) : (
                  ""
                )}

                <img
                  className=" dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  width="24"
                  height="24"
                  src="https://img.icons8.com/external-neu-royyan-wijaya/64/external-more-neu-development-neu-royyan-wijaya.png"
                  alt="external-more-neu-development-neu-royyan-wijaya"
                />

                <ul className="dropdown-menu">
                  <li>
                    <button className="btn dropdown-item">Mute</button>
                  </li>
                  <li>
                    <button className="btn dropdown-item">Mark as read</button>
                  </li>
                  <li>
                    <button className="btn dropdown-item">Delete</button>
                  </li>
                  <li>
                    <button
                      className="btn dropdown-item"
                      onClick={() => {
                        setChatPosition(i);
                        setPinned(!pinned);
                      }}
                    >
                      Pin chat
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Users;
