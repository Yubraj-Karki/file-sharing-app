import { useState } from "react";
import axios from "axios";

// eslint-disable-next-line react/prop-types
const Email = ({ fileDownloadLink }) => {
  const [sender, setSender] = useState("");
  const [password, setPassword] = useState("");
  const [receiver, setReceiver] = useState("");

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    const data = {
      sender,
      password,
      receiver,
      fileDownloadLink,
    };

    console.log("data from the frontend: ", data);

    try {
      const response = await axios.post(
        "http://localhost:3001/send-email",
        data
      );

      console.log("response: ", response);
    } catch (error) {
      console.error(error);
    }

    // setSender("");
    // setPassword("");
    // setReceiver("");
  };
  return (
    <form className="emailForm">
      <p>Or email the download link</p>
      <input
        onChange={(e) => setSender(e.target.value)}
        type="email"
        placeholder="Your email"
        value={sender}
      />
      <input
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        placeholder="Your password"
        value={password}
      />
      <input
        onChange={(e) => setReceiver(e.target.value)}
        type="email"
        placeholder="Receiver's email"
        value={receiver}
      />
      <button
        onClick={handleEmailSubmit}
        className="sendEmailBtn"
        type="submit"
      >
        Send email
      </button>
    </form>
  );
};

export default Email;
