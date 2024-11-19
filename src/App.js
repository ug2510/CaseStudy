import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./components/HomePage";
import MasterView from "./components/MasterView";
import Uploader from "./components/Uploader";
import Navbar from "./components/Navbar";
import Analyze from "./components/Analyze";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Details from "./components/Details";
import Details_Bond from "./components/Details_Bond";
import PieChart from "./components/PieChart"
import BondSectorPieChart from "./components/BondSectorPieChart";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Navbar />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/sec-view" element={<MasterView />} />
            <Route path="/sec-upload" element={<Uploader />} />
            <Route path="/placeholder" element={<Analyze />} />
            <Route path="/details/:id" element={<Details />} />
            <Route path="/detailsbond/:id" element={<Details_Bond />} />
            <Route path="/bondsectorpiechart" element={<BondSectorPieChart />} />
          </Routes>
        </LocalizationProvider>
      </header>
    </div>
  );
}

export default App;
