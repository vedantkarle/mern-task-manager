import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';
import Home from "./screens/Home";
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar'

const App =()=> {
  return (
   <>
    <Navbar/>
    <Sidebar/>
   </>
  );
}

export default App;
