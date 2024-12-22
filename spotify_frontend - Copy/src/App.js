
import "./output.css";
import {BrowserRouter , Routes, Route} from "react-router-dom";
import LoginComponent from "./routes/Login";

function App() {
  return (
    <div className="w-screen h-screen font-poppins">
     <BrowserRouter>
        <Routes>
          <Route path="/" element={<HelloComponent/>}/>
          <Route path="login" element={<LoginComponent />}/>
          
        </Routes>
     
     </BrowserRouter>
     </div>
  );
}
 const HelloComponent = () => {
  return <div>This hello from component</div>
 };

export default App;