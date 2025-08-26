import React, { useState } from "react";
import Layout from "../components/Layout";
import EventRegistrationModal from "../components/EventRegistrationModal";
import { useEffect } from "react";
import {
  Code,
  Palette,
  Box,
  Gamepad2,
  Users,
  Trophy,
  Clock,
  Star,
  Target,
  Zap,
  Play,
  Monitor,
  Smartphone,
  Joystick,
  Award,
  ChevronDown,
  UserCheck,
  Shield,
  Car,
  Crosshair,
  ArrowRight,
  Calendar,

} from "lucide-react";



const SkillStorm = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const [registrationModal, setRegistrationModal] = useState({
    isOpen: false,
    event: null,
  });
  const [expandedSection, setExpandedSection] = useState("pc-games");

  // Registration modal handler
  const openRegistration = (competition) => {
    setRegistrationModal({ isOpen: true, event: competition });
  };

  const closeRegistration = () => {
    setRegistrationModal({ isOpen: false, event: null });
  };

  const handleRegistrationSubmit = (registrationData) => {
    console.log("SkillStorm Registration submitted:", registrationData);
    // Here you would typically send to backend API
    alert("Registration submitted successfully!");
  };


const  [upcoming, setUpcoming] = useState([]);
    const [live, setLive] = useState([]);
    const [finished, setFinished] = useState([]);
    const  [AllEvents,setAllEvents]=useState([]);

  const fetchUpcomingEvents = async () => {
      try {
        const response = await fetch(`${BASE_URL}/createEvents/UpcomingEvents`);
        if (!response.ok) {
          throw new Error("Failed to fetch upcoming events");
        }
        const data = await response.json();
        setUpcoming(data);
      } catch (error) {
        console.error("Error fetching upcoming events:", error);
      }
    };
  
    const fetchLiveEvents = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/createEvents/LiveEvents`);
        if (!response.ok) {
          throw new Error("Failed to fetch upcoming events");
        }
        const data = await response.json();
        setLive(data);
      } catch (error) {
        console.error("Error fetching upcoming events:", error);
      }
    };
  
     const fetchFinishedEvents = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/createEvents/FinishedEvents`);
        if (!response.ok) {
          throw new Error("Failed to fetch upcoming events");
        }
        const data = await response.json();
        setFinished(data);
      } catch (error) {
        console.error("Error fetching upcoming events:", error);
      }
    };
  
    const fetchAllEvents = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/createEvents//getEvents`);
        if (!response.ok) {
          throw new Error("Failed to fetch upcoming events");
        }
        const data = await response.json();
        setAllEvents(data);
      } catch (error) {
        console.error("Error fetching upcoming events:", error);
      }
    };

  useEffect(() => {
    fetchUpcomingEvents();
    fetchLiveEvents();
    fetchFinishedEvents();
    fetchAllEvents();
  
   
  }, []);

 const SkillStormAll = AllEvents.filter((event) => {
  const title = event.category.toLowerCase();
  return (
    title.includes("core competition") ||
    title.includes("pc games") ||
    title.includes("mobile games")
  );
});

 const coreCompetions = AllEvents.filter((event) => {
  const title = event.category.toLowerCase();
  return (
    title.includes("core competition") 
   
  );
});

 const PCGames = AllEvents.filter((event) => {
  const title = event.category.toLowerCase();
  return (
    title.includes("pc games") 
   
  );
});

 const MobileGames = AllEvents.filter((event) => {
  const title = event.category.toLowerCase();
  return (
    title.includes("mobile games") 
   
  );
});









  // Main competitions data
  

  const funGames = [
    {
      id: "monopoly",
      name: "Monopoly",
      platform: "PC",
      type: "Strategy Board Game",
      registration: "No registration required",
      icon: Joystick,
      gradient: "from-green-500 to-blue-500",
    },
    {
      id: "omi",
      name: "Omi",
      platform: "Mobile",
      type: "Casual Game",
      registration: "No registration required",
      icon: Smartphone,
      gradient: "from-purple-500 to-pink-500",
    },
  ];

  return (
    <Layout>
      <div className="skillstorm-page">
        {/* Hero Section */}
        <section className="skillstorm-hero">
          <div className="hero-background-skillstorm"></div>
          <div className="container">
            <div className="hero-content-skillstorm">
              {/* SkillStorm Logo */}
              <div className="skillstorm-logo-container">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets%2Fc5794fad86854d05a0a2b5f05a97b44d%2Faae1c430463649c0addd533bd2f58c0c?format=webp&width=800"
                  alt="SkillStorm Logo"
                  className="skillstorm-logo"
                />
                <div className="logo-glow-skillstorm"></div>
              </div>

              <h1 className="hero-title-skillstorm">
                SkillStorm 2025
                <Zap className="title-icon-skillstorm" size={48} />
              </h1>

              <p className="hero-subtitle-skillstorm">
                The Ultimate Multi-Disciplinary Competition Experience
                <br />
                <span className="highlight-text-skillstorm">
                  Code • Design • Engineer • Game
                </span>
              </p>

              <div className="hero-stats-skillstorm">
                <div className="stat-item-skillstorm">
                  <Code className="stat-icon-skillstorm" size={24} />
                  <span className="stat-number-skillstorm">{SkillStormAll.filter((e)=>e.category.toLowerCase()==="core competition").length}</span>
                  <span className="stat-label-skillstorm">
                    Core Competitions
                  </span>
                </div>
                <div className="stat-item-skillstorm">
                  <Gamepad2 className="stat-icon-skillstorm" size={24} />
                  <span className="stat-number-skillstorm">{SkillStormAll.length}</span>
                  <span className="stat-label-skillstorm">Esports Games</span>
                </div>
                <div className="stat-item-skillstorm">
                  <Trophy className="stat-icon-skillstorm" size={24} />
                  <span className="stat-number-skillstorm">
                 {SkillStormAll.reduce((total, event) => total + (event.pointsConfiguration[0]), 0)}
                 </span>

                  <span className="stat-label-skillstorm">Total Points</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Competitions */}
        <section className="main-competitions-section">
          <div className="container">
            <div className="section-header-skillstorm">
              <h2 className="section-title-skillstorm">
                Core Competitions
                <Target className="title-icon" size={32} />
              </h2>
              <p className="section-subtitle-skillstorm">
                Master your skills across coding, design, and engineering
              </p>
            </div>

            <div className="main-competitions-grid">
              {coreCompetions.map((comp, _id) => {
               
                return (
                  <div
                    key={comp._id}
                    className="main-comp-card"
                    style={{ animationDelay: `${3 * 200}ms` }}
                  >
                    <div
                      className={`comp-gradient bg-gradient-to-br yellow-500`}
                    >
                      

                      <h3 className="comp-title">{comp.title}</h3>
                     
                      <p className="comp-description">{comp.description}</p>

                      <div className="comp-details">
                        <div className="detail-row-comp">
                          <Users className="w-4 h-4 text-blue-400" />
                          <span>{comp.maxTeamsPerBatch} teams per batch</span>
                        </div>
                        <div className="detail-row-comp">
                          <UserCheck className="w-4 h-4 text-green-400" />
                          <span>{comp.MaxNoOfParticipantsPerTeam} players per team</span>
                        </div>

                             <div className="flex items-center gap-4">
                        <Calendar className="w-4 h-4 text-purple-400" />
                           <span>
                       {new Date(comp.date).toLocaleDateString("en-US", {
                            day: "numeric",
                           month: "short",
                            year: "numeric",
                         })}
                       </span>
                          </div>

  
                        <div className="detail-row-comp">
                          <Clock className="w-4 h-4 text-purple-400" />
                          <span>{comp.time}</span>
                        </div>
                      </div>

                      <div className="comp-prizes">
                        <h5 className="prizes-title">Points Configuration</h5>
                        <div className="prizes-list">
                          {comp.pointsConfiguration.map((prize, idx) => (
                            <div key={idx} className="prize-item">
                              <Award className="w-3 h-3 text-yellow-400" />
                              <span>{prize}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                     
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Esports Section */}
        <section className="esports-section">
          <div className="container">
            <div className="section-header-skillstorm">
              <h2 className="section-title-skillstorm">
                Clutch Zone - Esports Arena
                <Gamepad2 className="title-icon" size={32} />
              </h2>
              <p className="section-subtitle-skillstorm">
                Battle for supremacy across PC games, mobile games, and fun
                challenges
              </p>
            </div>

            {/* Gaming Categories */}
            <div className="gaming-categories">
              {/* PC Games */}
              <div className="category-section">
                <div
                  className="category-header"
                  onClick={() =>
                    setExpandedSection(
                      expandedSection === "pc-games" ? "" : "pc-games",
                    )
                  }
                >
                  <div className="category-info">
                    <Monitor className="category-icon" size={28} />
                    <h3 className="category-title">PC Games</h3>
                    <span className="games-count">{PCGames.length} Games</span>
                  </div>
                  <ChevronDown
                    className={`expand-icon ${expandedSection === "pc-games" ? "expanded" : ""}`}
                    size={24}
                  />
                </div>

                {expandedSection === "pc-games" && (
                  <div className="games-grid">
                    {PCGames.map((game,_id) => {
                      
                      return (
                        <div
                          key={game._id}
                          className="game-card"
                          style={{ animationDelay: `${3 * 100}ms` }}
                        >
                          <div
                            className={`game-gradient bg-gradient-to-br yellow-500`}
                          >
                            <div className="game-header">
                              <div className="game-icon">
                               <Gamepad2 className="w-6 h-6 text-blue-500" />
                              </div>
                              <div className="game-platform">PC</div>
                            </div>

                            <h4 className="game-title">{game.title}</h4>
                           

                            <div className="game-specs">
                              <div className="spec-item">
                                <Users className="w-4 h-4" />
                                <span>{game.MaxNoOfParticipantsPerTeam} per team</span>
                              
                              
                            </div>
                                <div className="spec-item">
                                <Calendar className="w-4 h-4" />
                                <span> {new Date(game.date).toLocaleDateString("en-US", {
                            day: "numeric",
                           month: "short",
                            year: "numeric",
                         })}</span>
                              </div>
                              
                            <div className="spec-item">
                                <Clock className="w-4 h-4" />
                                <span>{game.time}</span>
                                </div>
                          </div>
                          
                           
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Mobile Games */}
              <div className="category-section">
                <div
                  className="category-header"
                  onClick={() =>
                    setExpandedSection(
                      expandedSection === "mobile-games" ? "" : "mobile-games",
                    )
                  }
                >
                  <div className="category-info">
                    <Smartphone className="category-icon" size={28} />
                    <h3 className="category-title">Mobile Games</h3>
                    <span className="games-count">
                      {MobileGames.length} Games
                    </span>
                  </div>
                  <ChevronDown
                    className={`expand-icon ${expandedSection === "mobile-games" ? "expanded" : ""}`}
                    size={24}
                  />
                </div>

                {expandedSection === "mobile-games" && (
                  <div className="games-grid">
                    {MobileGames.map((game, _id) => {
                      
                      return (
                        <div
                          key={game._id}
                          className="game-card"
                          style={{ animationDelay: `${3 * 100}ms` }}
                        >
                          <div
                            className={`game-gradient bg-gradient-to-br ${game.gradient}`}
                          >
                            <div className="game-header">
                              <div className="game-icon">
                                <Joystick className="w-6 h-6 text-purple-500" />
                              </div>
                              <div className="game-platform">Mobile</div>
                            </div>

                            <h4 className="game-title">{game.title}</h4>
                            

                            <div className="game-specs">
                              <div className="spec-item">
                                <Users className="w-4 h-4" />
                                <span>{game.MaxNoOfParticipantsPerTeam}</span>
                              </div>
                              <div className="spec-item">
                                <Calendar className="w-4 h-4" />
                                <span> {new Date(game.date).toLocaleDateString("en-US", {
                            day: "numeric",
                           month: "short",
                            year: "numeric",
                         })}</span>
                         </div>
                              <div className="spec-item">
                                <Clock className="w-4 h-4" />
                                <span>{game.time}</span>
                                </div>
                            </div>
                            
                            
                           

                           
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              

    
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default SkillStorm;
