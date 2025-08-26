import React, { useState, useEffect, useRef } from "react";
import Layout from "../components/Layout";
import "./Podium.css"; //
import {
  Trophy,
  Crown,
  Medal,
  Award,
  Calendar,
  Users,
  Target,
  Flame,
  Star,
  TrendingUp,
  ChevronLeft,
  ChevronRight,
  History as HistoryIcon,
  Sparkles,
  Zap,
  Shield,
} from "lucide-react";

const History = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  // -----------------------
  // State Variables
  // -----------------------
  const [selectedYear, setSelectedYear] = useState(2024);
  const [activeCategory, setActiveCategory] = useState("overall");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [histroy, setHistroy] = useState([]); // E-Week history data

  const heroRef = useRef(null);

  // -----------------------
  // Fetch E-Week history data
  // -----------------------
  const AllHistroy = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/EweekHistroy/getEweekHistroy`);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      setHistroy(data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  useEffect(() => {
    AllHistroy();
  }, []);

  // -----------------------
  // Mouse & Scroll Effects
  // -----------------------
  useEffect(() => {
    const handleMouseMove = (e) => setMousePosition({ x: e.clientX, y: e.clientY });
    const handleScroll = () => setScrollY(window.scrollY);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // -----------------------
  // Derived Data
  // -----------------------
  const years = histroy.map((h) => new Date(h.Startdate).getFullYear());
  const currentYearData = histroy.find(
    (h) => new Date(h.Startdate).getFullYear() === selectedYear
  );

  const categories = [
    { id: "overall", label: "Overall Championship", icon: <Crown className="w-5 h-5" /> },
    { id: "technical", label: "Technical Excellence", icon: <Zap className="w-5 h-5" /> },
    { id: "engineering", label: "Engineering Mastery", icon: <Shield className="w-5 h-5" /> },
    { id: "innovation", label: "Innovation Leadership", icon: <Sparkles className="w-5 h-5" /> },
  ];

  // -----------------------
  // Helper: Batch Color
  // -----------------------
 const getBatchColor = (batch) => {
  const colors = {
    E24: "from-purple-500-to-pink-500",
    E23: "from-blue-500-to-cyan-500",
    E22: "from-green-500-to-teal-500",
    E21: "from-yellow-500-to-orange-500",
    E20: "from-red-500-to-pink-500",
    E19: "from-indigo-500-to-purple-500",
    E18: "from-cyan-500-to-blue-500",
    E17: "from-emerald-500-to-green-500",
    E16: "from-orange-500-to-red-500",
  };
  return colors[batch] || "from-gray-500-to-gray-600";
};


  // -----------------------
  // Podium Component for Overall Champions
  // -----------------------
const Podium = ({ data }) => {
  const champions = [
   
    {
      team: data?.firstRunnerUp,
      points: data?.firstRunnerUpTotalPoints,
      icon: <Medal className="w-6 h-6" />,
      label: "2",
      batch: "E23",
    },
     {
      team: data?.winners,
      points: data?.winnerTotalPoints,
      icon: <Crown className="w-6 h-6" />,
      label: "1",
      batch: "E24",
    },
    {
      team: data?.secondRunnerUp,
      points: data?.secondRunnerUpTotalPoints,
      icon: <Award className="w-6 h-6" />,
      label: "3",
      batch: "E22",
    },
  ];

    return (
    <div className="podium-container">
      {champions.map((champion, index) => (
        
        <div
          key={index}
          className={`podium-card ${index === 1 ? "winner" : ""}`}
        >  
          <span className="podium-label">{champion.label}</span>
          <div
            className={`podium-icon ${getBatchColor(champion.batch)}`}
          >
            {champion.icon}
          </div>
          <h2 className={`podium-team ${index === 1 ? "winner-team" : ""}`}>
            {champion.team}
          </h2>
          <p className="podium-points">{champion.points} pts</p>
          
        </div>
      ))}
    </div>
  );
};


  return (
    <Layout>
      <div className="history-page animate-slide-up">
        {/* ----------------------- */}
        {/* Hero Section */}
        {/* ----------------------- */}
        <section className="history-hero" ref={heroRef}>
          <div className="hero-background-events" style={{ zIndex: 0, position: 'absolute', inset: 0 }} />

          <div className="history-hero-bg">
            {/* Floating Shapes */}
            <div className="floating-shapes">
              {[...Array(5)].map((_, i) => <div key={i} className={`shape shape-${i + 1}`}></div>)}
            </div>

            {/* Particle Effect */}
            <div className="particles">
              {[...Array(20)].map((_, i) => <div key={i} className={`particle particle-${i}`}></div>)}
            </div>
          </div>

          <div className="container">
            <div className="history-hero-content">
              <div
                className="history-hero-icon"
                style={{ transform: `translateY(${scrollY * 0.1}px) rotateX(${mousePosition.x * 0.01}deg)` }}
              >
                <HistoryIcon className="w-16 h-16" />
                <div className="logo-glow"></div>
              </div>
              <h1 className="history-hero-title hero-title-events">E-Week History</h1>
              <p className="history-hero-subtitle hero-subtitle-events">
                Explore the legacy, champions, and milestones of E-Week through the years
              </p>
            </div>
          </div>
        </section>

        {/* ----------------------- */}
        {/* Year Navigation */}
        {/* ----------------------- */}
        <section className="history-hero" ref={heroRef}>
          <div className="hero-background-events" style={{ zIndex: 0, position: 'absolute', inset: 0 }} />
          <div className="container">
            <div className="year-selector">

              {/* Previous Year */}
              <button
                onClick={() => {
                  const currentIndex = years.indexOf(selectedYear);
                  if (currentIndex < years.length - 1) setSelectedYear(years[currentIndex + 1]);
                }}
                className="nav-arrow"
                disabled={years.indexOf(selectedYear) === years.length - 1}
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Year Buttons */}
              <div className="years-grid">
                {years.map((year) => (
                  <button
                    key={year}
                    onClick={() => setSelectedYear(year)}
                    className={`year-btn ${selectedYear === year ? "active" : ""}`}
                  >
                    <span className="year-number">{year}</span>
                    <span className="year-theme">
                      {histroy.find((h) => new Date(h.Startdate).getFullYear() === year)?.description}
                    </span>
                  </button>
                ))}
              </div>

              {/* Next Year */}
              <button
                onClick={() => {
                  const currentIndex = years.indexOf(selectedYear);
                  if (currentIndex > 0) setSelectedYear(years[currentIndex - 1]);
                }}
                className="nav-arrow"
                disabled={years.indexOf(selectedYear) === 0}
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        </section>

        {/* ----------------------- */}
        {/* Year Overview */}
        {/* ----------------------- */}
        <section className="year-overview">
          <div className="container">
            <div className="overview-header">
              <h2 className="overview-title">E-Week {selectedYear}</h2>
              <p className="overview-theme">"{currentYearData?.description}"</p>
            </div>

            <div className="overview-stats">
              <div className="overview-stat">
                <Users className="w-6 h-6" />
                <span className="stat-number">{currentYearData?.totalParticipants?.toLocaleString()}</span>
                <span className="stat-label">Participants</span>
              </div>

              <div className="overview-stat">
                <Calendar className="w-6 h-6" />
                <span className="stat-number">{currentYearData?.totalEvents}</span>
                <span className="stat-label">Events</span>
              </div>

              <div className="overview-stat">
                <Crown className="w-6 h-6" />
                <span className="stat-number">{currentYearData?.winners}</span>
                <span className="stat-label">Champion</span>
              </div>

              <div className="overview-stat">
                <Target className="w-6 h-6" />
                <span className="stat-number">{currentYearData?.totalPoints}</span>
                <span className="stat-label">Points</span>
              </div>
            </div>
          </div>
        </section>

        {/* ----------------------- */}
        {/* Category Navigation */}
        {/* ----------------------- */}
        <section className="category-navigation">
          <div className="container">
            <div className="category-tabs">
              {/* Default tab for overall champions */}
              <button
                onClick={() => setActiveCategory("overallChampions")}
                className={`category-tab ${activeCategory === "overallChampions" ? "active" : ""}`}
              >
                <span>Overall Champions</span>
              </button>

              {/* Other dynamic categories */}
              {currentYearData?.category?.[0] &&
                Object.entries(currentYearData.category[0])
                  .filter(([key]) => key !== "_id")
                  .map(([key], index) => (
                    <button
                      key={index}
                      onClick={() => setActiveCategory(key)}
                      className={`category-tab ${activeCategory === key ? "active" : ""}`}
                    >
                      <span>
                        {key === "gameschampion"
                          ? "Games Champion"
                          : key === "AthleticChampion"
                          ? "Athletic Champion"
                          : key === "skillstormChampion"
                          ? "Skillstorm Champion"
                          : key}
                      </span>
                    </button>
                  ))}
            </div>
          </div>
        </section>

        {/* ----------------------- */}
        {/* Champions Display */}
        {/* ----------------------- */}
        <section className="champions-display">
          <div className="container">
            {activeCategory ? (
              <div className="category-champions">
                <div className="category-results">
                  <div className="results-podium">
                    {activeCategory === "overallChampions" ? (
                      <Podium data={currentYearData} />
                    ) : (
                      (currentYearData?.category?.[0]?.[activeCategory] || []).map((team, index) => {
                        const icons = [
                          <Crown className="w-6 h-6" />,
                          <Medal className="w-6 h-6" />,
                          <Award className="w-6 h-6" />,
                          <Award className="w-6 h-6" />, // for 4th
                        ];

                        return (
                          <div key={index} className="result-card">
                            <div className="result-position">{index + 1}</div>
                            <div
                              className={`result-batch bg-gradient-to-br ${getBatchColor(
                                team?.trim?.() || ""
                              )}`}
                            >
                              {icons[index]}
                              <span>{team?.trim?.() || "N/A"}</span>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div>No category selected</div>
            )}
          </div>
        </section>

        {/* ----------------------- */}
        {/* Memorable Moments */}
        {/* ----------------------- */}
        <section className="memorable-events">
          <div className="container">
            <h3 className="memorable-title">Memorable Moments</h3>
            <div className="memorable-grid">
              {currentYearData?.memmorableMoments?.map((moment, index) => (
                <div key={index} className="memorable-card">
                  <div className="memorable-header">
                    <Star className="w-6 h-6" />
                    <h4>{moment}</h4>
                  </div>
                </div>
              ))}

              {currentYearData?.events?.map((event) => (
                <div key={event._id} className="memorable-card">
                  <div className="memorable-header">
                    <Star className="w-6 h-6" />
                    <h4>{event.title}</h4>
                  </div>
                  <div className="memorable-winner">
                    <Trophy className="w-4 h-4" />
                    <span>Winner: {event.winners}</span>
                  </div>
                  <p className="memorable-description">
                    {event.location} — {new Date(event.date).toLocaleDateString()} at {event.time}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default History;
