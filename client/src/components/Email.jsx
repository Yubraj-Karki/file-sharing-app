const Email = () => {
  return (
    <form className="emailForm">
      <p>Or email the download link</p>
      <input type="text" placeholder="Your email" />
      <input type="text" placeholder="Reciever's email" />
      <button className="sendEmailBtn" type="submit">
        Send email
      </button>
    </form>
  );
};

export default Email;
