import "./App.css";
import FileUpload from "./components/FileUpload";
const App = () => {
  return (
    <div className="wrapper">
      <div className="container">
        <div className="upload">
          <FileUpload />
        </div>
        <div className="files">{/* <h1>Files</h1> */}</div>
      </div>
    </div>
  );
};

export default App;
