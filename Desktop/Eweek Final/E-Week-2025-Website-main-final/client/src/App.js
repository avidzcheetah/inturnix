import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

// Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Events from "./pages/Events";
import Leaderboard from "./pages/Leaderboard";
import SkillStorm from "./pages/SkillStorm";
import Downloads from "./pages/Downloads";
import AdminHistory from "./pages/AdminHistroy";
import History from "./pages/History";
import AdminDashboard from "./pages/AdminDashBoard";
import NotFound from "./pages/NotFound";
import ManageEvents from "./pages/ManageEvents";
import EventForm from "./pages/EventForm";
import EditableEventForm from "./pages/EditableEventForm";
import SetResult from "./pages/SetResult";
import AdminLeaderBoard from "./pages/AdminLeaderBoard";
import EditPointsForm from "./pages/editpoints";
import AdminSkillStorm from "./pages/AdminSkillStorm";
import AddHistory from "./pages/addHistroy";
import EditHistory from "./pages/editHistroy";
import AdminLogin from "./pages/AdminLogin"
import VideoPlayer from "./pages/VideoPlayer"

// Context
import { AppProvider } from "./context/AppContext";

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/events" element={<Events />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/skillstorm" element={<SkillStorm />} />
            <Route path="/downloads" element={<Downloads />} />
            <Route path="/VideoPlayer" element={<VideoPlayer />} />
            <Route path="/admin/history" element={<AdminHistory />} />
            <Route path="/history" element={<History />} />
            <Route path="/admin/*" element={<AdminDashboard />} />
            <Route path="/admin/ManageEvents" element={<ManageEvents />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/admin/EventForm" element={<EventForm />} />
            <Route path="/admin/EditableEventForm" element={<EditableEventForm />} />
            <Route path="/admin/SetResult" element={<SetResult />} />'
            <Route path="/admin/skillstorm" element={<AdminSkillStorm />} />'
            <Route path="/admin/leaderboard" element={<AdminLeaderBoard/>} />
            <Route path="/admin/addHistroy" element={<AddHistory/>} />
            <Route path="/login" element={<AdminLogin/>} />
            <Route path="/admin/editHistroy/:id" element={<EditHistory />} />

            <Route path="/admin/edit-points/:team/:points" element={<EditPointsForm />} />
          </Routes>
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;
