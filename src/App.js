import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from './components/HomePage';
import MasterView from './components/MasterView';
import Uploader from './components/Uploader';
import Navbar from "./components/Navbar";
import PriceChart from "./components/PriceChart";
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Navbar />
       
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/sec-view" element={<MasterView />} />
          <Route path="/sec-upload" element={<Uploader />} />
        </Routes>
      </header>
    </div>
  );
}

export default App;
