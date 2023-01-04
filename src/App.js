import "./App.css";
import "./pages/Home/HomePage";
import HomePage from "./pages/Home/HomePage";
import AllPage from "./pages/AllCampaigns/AllPage";
import CampDetails from "./pages/CampaignDetails/CampDetails";
import CreateCampaign from "./pages/CreateCamp/CreateCampaign";
import Profile from "./pages/Profile/Profile";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/all" element={<AllPage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/create-campaign" element={<CreateCampaign />} />
          <Route path="/campaign-details/:id" element={<CampDetails />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
