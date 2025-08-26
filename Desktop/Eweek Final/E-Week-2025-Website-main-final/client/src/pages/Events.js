import React, { useState ,useEffect} from "react";
import Layout from "../components/Layout";
import EventRegistrationModal from "../components/EventRegistrationModal";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Play,
  Trophy,
  Target,
  Zap,
  Code,
  Cpu,
  Lightbulb,
  Award,
  Activity,
  Timer,
  Flame,
  CheckCircle,
  ArrowRight,
  Search,
  Filter,
  SortAsc,
  SortDesc,
  X,
} from "lucide-react";

const Events = () => {
  const [selectedDay, setSelectedDay] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [sortBy, setSortBy] = useState("time");
  const [sortOrder, setSortOrder] = useState("asc");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [registrationModal, setRegistrationModal] = useState({
    isOpen: false,
    event: null,
  });
 const BASE_URL = process.env.REACT_APP_BASE_URL;


  const [upcoming,setUpcoming]=useState([]);
  const [live,setLive]=useState([]);
  const [finished,setFinished]=useState([]);
  const [events, setEvents] = useState([]);
  const MyweekDays = [ "Sunday","Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const weekDays = [ "Saturday", "Sunday","Monday", "Tuesday", "Wednesday", "Thursday", "Friday",];
  const MondayEvents = events.filter(event => event.day === "Monday");
  const TuesdayEvents = events.filter(event => event.day === "Tuesday");
  const WednesdayEvents = events.filter(event => event.day === "Wednesday");
  const ThursdayEvents = events.filter(event => event.day === "Thursday");
  const FridayEvents = events.filter(event => event.day === "Friday");
  const SaturdayEvents = events.filter(event => event.day === "Saturday");
  const SundayEvents = events.filter(event => event.day === "Sunday");
   
  const MyWeekSchedule = [SaturdayEvents,SundayEvents,MondayEvents, TuesdayEvents, WednesdayEvents, ThursdayEvents, FridayEvents];

  console.log("MyWeekSchedule:", MyWeekSchedule); // log the schedule
function getProgressColor(progress) {
  if (progress < 30) return "#3b82f6"; // blue-500
  if (progress < 70) return "#22c55e"; // green-500
  return "#f97316"; // orange-500
}

useEffect(() => {
  const fetchEvents = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/createEvents/getEvents`);
      const data = await res.json();

      // Add `day` field to each event
      const eventsWithDay = data.map(event => {
        const eventDate = new Date(event.date);
        const dayName = MyweekDays[eventDate.getDay()];
        return { ...event, day: dayName };
      });

      setEvents(eventsWithDay); // store in state
      console.log("Events fetched:", eventsWithDay); // log updated data
    } catch (err) {
      console.error("Error fetching events:", err);
    }
  };
  
  fetchEvents();
  console.log("Events state updated:", events); // log state after fetching
}, []);


const [presentTime, setPresentTime] = useState(getCurrentTime());

  // Helper: Get current time in HH:mm
  function getCurrentTime() {
    return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false });
  }

  // Update present time every minute
  useEffect(() => {
    const interval = setInterval(() => {
      setPresentTime(getCurrentTime());
    }, 60000); // 1 minute

    return () => clearInterval(interval);
  }, []);

  // Helper: convert HH:mm → minutes
  function toMinutes(timeStr) {
  if (!timeStr || typeof timeStr !== "string") return null; // guard
  const [hours, minutes] = timeStr.split(":").map(Number);
  return hours * 60 + minutes;
}

function getEventProgress(startTime, endTime) {
  const start = toMinutes(startTime);
  const end = toMinutes(endTime);
  const current = toMinutes(presentTime);

  // If any time is missing, just return 0%
  if (start === null || end === null || current === null) {
    return "0%";
  }

  const progress = ((current - start) / (end - start)) * 100;
  return Math.max(0, Math.min(100, progress)).toFixed(1) + "%";
}


const fetchUpcomingEvents = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/createEvents/UpcomingEvents`);
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

useEffect(() => {
  fetchUpcomingEvents();
  fetchLiveEvents();
  fetchFinishedEvents();
 
}, []);
   
function getTimeRemaining(startTime, endTime) {
  // Convert "HH:mm" to minutes
  const toMinutes = (timeStr) => {
    if (!timeStr) return 0;
    const [hours, minutes] = timeStr.split(":").map(Number);
    return hours * 60 + minutes;
  };

  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  const end = toMinutes(endTime);

  let remaining = end - currentMinutes; // minutes remaining
  if (remaining < 0) remaining = 0; // event finished

  const hours = Math.floor(remaining / 60);
  const minutes = remaining % 60;

  return `${hours}h ${minutes}m`;
}


  // Registration handlers
  const openRegistration = (event) => {
    setRegistrationModal({ isOpen: true, event });
  };

  const closeRegistration = () => {
    setRegistrationModal({ isOpen: false, event: null });
  };

  const handleRegistrationSubmit = (registrationData) => {
    console.log("Registration submitted:", registrationData);
    // Here you would typically send to backend API
    // For now, just show success message
    alert("Registration submitted successfully!");
  };

 

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "text-green-400 bg-green-400/20";
      case "ongoing":
        return "text-yellow-400 bg-yellow-400/20";
      case "scheduled":
        return "text-blue-400 bg-blue-400/20";
      default:
        return "text-gray-400 bg-gray-400/20";
    }
  };

  const getTypeColor = (type) => {
    const colors = {
      Competition: "from-red-500 to-pink-600",
      Workshop: "from-blue-500 to-cyan-600",
      Conference: "from-purple-500 to-blue-600",
      Ceremony: "from-yellow-500 to-orange-600",
      Marathon: "from-green-500 to-teal-600",
      Talk: "from-indigo-500 to-purple-600",
      Presentation: "from-orange-500 to-red-600",
      Showcase: "from-pink-500 to-purple-600",
      Social: "from-cyan-500 to-blue-600",
    };
    return colors[type] || "from-gray-500 to-gray-600";
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "border-red-400 bg-red-400/10 text-red-400";
      case "medium":
        return "border-yellow-400 bg-yellow-400/10 text-yellow-400";
      default:
        return "border-blue-400 bg-blue-400/10 text-blue-400";
    }
  };


// Filter and sort upcoming events
  const filteredUpcomingEvents = upcoming
    .filter((event) => {
      const matchesSearch =
        searchTerm === "" ||
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategory === "all" || event.category === selectedCategory;
      const matchesStatus =
        selectedStatus === "all" ||
        (selectedStatus === "scheduled" && event.date !== "Today");

      return matchesSearch && matchesCategory && matchesStatus;
    })
    .sort((a, b) => {
      let comparison = 0;

      switch (sortBy) {
        case "time":
          // Simple time comparison for demo - in real app would parse dates properly
          comparison = a.time.localeCompare(b.time);
          break;
        case "name":
          comparison = a.name.localeCompare(b.name);
          break;
        case "participants":
          const aParticipants = parseInt(a.participants.replace(/\D/g, ""));
          const bParticipants = parseInt(b.participants.replace(/\D/g, ""));
          comparison = bParticipants - aParticipants;
          break;
        case "category":
          comparison = a.category.localeCompare(b.category);
          break;
        default:
          comparison = 0;
      }

      return sortOrder === "asc" ? comparison : -comparison;
    });

  
  return (
    <Layout>
      <div className="events-page">
        {/* Hero Section */}
        <section className="events-hero">
          <div className="hero-background-events"></div>
          <div className="container">
            <div className="hero-content-events">
              <h1 className="hero-title-events">
                Event Central
                <Activity className="title-icon" size={48} />
              </h1>
              <p className="hero-subtitle-events">
                Your complete guide to E-Week 2025 events, schedules, and
                competitions
              </p>
              <div className="hero-stats-events">
                <div className="stat-card-events">
                  <Flame className="stat-icon text-red-400" size={24} />
                  <span className="stat-number">{live.length}</span>
                  <span className="stat-label">Live Events</span>
                </div>
                <div className="stat-card-events">
                  <Clock className="stat-icon text-blue-400" size={24} />
                  <span className="stat-number">{upcoming.length}</span>
                  <span className="stat-label">Upcoming</span>
                </div>
                <div className="stat-card-events">
                  <CheckCircle className="stat-icon text-green-400" size={24} />
                  <span className="stat-number">{finished.length}</span>
                  <span className="stat-label">Completed</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 01: 7-Day Schedule */}
        <section className="schedule-section">
          <div className="container">
            <div className="section-header-events">
              <h2 className="section-title-events">
                7-Day Event Schedule
                <Calendar className="title-icon" size={32} />
              </h2>
              <p className="section-subtitle-events">
                Complete timeline of all E-Week 2025 activities
              </p>
            </div>

            {/* Day Selector */}
               <div className="day-selector">
             {MyWeekSchedule.map((dayEvents, index) => (
                    <button
                     key={index}
                     onClick={() => setSelectedDay(index)}
                     className={`day-button ${selectedDay === index ? "active" : ""}`}
                   >
               {/* You can display a day name using index or a helper array */}
                <span className="day-name">{weekDays[index]}</span>

               {/* Safe access to first event's date */}
               <span className="day-date">
                    {dayEvents.length > 0
              ? new Date(dayEvents[0].date).toLocaleString("default", {
               month: "long",
               year: "numeric",
               })
              : "No date"}
               </span>

                 {/* Number of events for that day */}
                  <span className="day-count">{dayEvents.length} events</span>
                  </button>
                        ))}
                   </div>


            {/* Selected Day Events */}
            <div className="schedule-timeline">
              <h3 className="timeline-title">
                {weekDays[selectedDay]} Schedule
              </h3>
              <div className="timeline-events">
                {MyWeekSchedule[selectedDay].map((event, index) => (
                  <div
                    key={event._id}
                    className="timeline-event"
                    style={{ animationDelay: `${2 * 100}ms` }}
                  >
                    <div className="event-time">
                      <Clock className="w-4 h-4" />
                      <span>{event.time}</span>
                    </div>
                    <div className="event-connector"></div>
                    <div className="event-card-timeline">
                      <div className="event-header-timeline">
                        <h4 className="event-name-timeline">{event.title}</h4>
                        <span
                          className={`event-status ${getStatusColor(event.status)}`}
                        >
                          {event.status}
                        </span>
                      </div>
                      <div className="event-details-timeline">
                        <div className="detail-item-timeline">
                          <MapPin className="w-4 h-4 text-blue-400" />
                          <span>{event.location}</span>
                        </div>
                        <div className="detail-item-timeline">
                          <Users className="w-4 h-4 text-green-400" />
                          <span>
                           {event.MaxNoOfParticipantsPerTeam === 0 || event.MaxNoOfParticipantsPerTeam === null
                              ? "All are Welcomed"
                             : event.MaxNoOfParticipantsPerTeam + " participants"} 
                             </span>

                        </div>
                      </div>
                      <div
                        className={`event-type-badge bg-gradient-to-r from-${getTypeColor(event.category)}`}
                      >
                        {event.category}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: Ongoing Events */}
        <section className="ongoing-section">
          <div className="container">
            <div className="section-header-events">
              <h2 className="section-title-events">
                Live Events
                <Flame className="title-icon text-red-400" size={32} />
              </h2>
              <p className="section-subtitle-events">
                Events happening right now with real-time updates
              </p>
            </div>

            <div className="ongoing-grid">
              {live.map((event, _id) => {
               
                return (
                  <div
                    key={event.id}
                    className="ongoing-card"
                    style={{ animationDelay: `${2 * 150}ms` }}
                  >
                    <div
                      className={`ongoing-gradient bg-gradient-to-br yellow-500 to-orange-600`}
                    >
                      {/* Live Indicator */}
                      <div className="live-indicator">
                        <div className="live-dot"></div>
                        <span>LIVE</span>
                      </div>

                      {/* Event Icon */}
                      

                      {/* Event Info */}
                      <h3 className="ongoing-title">{event.title}</h3>
                      <div className="ongoing-meta">
                        <div className="meta-item-ongoing">
                          <Clock className="w-4 h-4" />
                          <span>
                            {event.time} - {event.expectedFinishTime}
                          </span>
                        </div>
                        <div className="meta-item-ongoing">
                          <MapPin className="w-4 h-4" />
                          <span>{event.location}</span>
                        </div>
                        <div className="meta-item-ongoing">
                          <Users className="w-4 h-4" />
                          <span>{event.MaxNoOfParticipantsPerTeam*event.maxTeamsPerBatch} participants</span>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="progress-container">
                        <div className="progress-header">
                          <span>Progress</span>
                          
                         <span>
                            {getEventProgress(event.time, event.expectedFinishTime)}
    
                             </span>

                        </div>
                        <div className="progress-bar-ongoing">
                              <div className="progress-bar-ongoing">
                                      <div
                                    className="progress-fill-ongoing"
                                  style={{
                              width: `${parseInt(getEventProgress(event.time, event.expectedFinishTime))}%`
                                 }}
                                  ></div>
                               </div>
                           </div>
                      </div>

                      {/* Time Remaining */}
                     <div className="time-remaining">
                     <Timer className="w-4 h-4 text-yellow-400" />
                         <span>
                          {getTimeRemaining(event.time, event.expectedFinishTime)}
                           </span>
                         </div>


                      {/* Action Button */}
                   
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Advanced Search and Filter System */}
        {
          <section className="events-search-section">
            <div className="container">
              <div className="events-search-header">
                <h2 className="search-section-title">
                  Find Your Events
                  <Search className="title-icon" size={32} />
                </h2>
                <p className="search-section-subtitle">
                  Advanced search and filtering to discover the perfect events
                  for you
                </p>
              </div>

              <div className="events-search-bar">
                <div className="search-container">
                  <div className="search-input-wrapper">
                    <Search className="search-icon" />
                    <input
                      type="text"
                      placeholder="Search events by name, category, location..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="search-input"
                    />
                    {searchTerm && (
                      <button
                        onClick={() => setSearchTerm("")}
                        className="clear-search"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  <button
                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                    className={`filter-toggle ${isFilterOpen ? "active" : ""}`}
                  >
                    <Filter className="w-5 h-5" />
                    <span>Filter</span>
                  </button>

                  <div className="sort-controls">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="sort-select"
                    >
                      <option value="time">Time</option>
                      <option value="name">Name</option>
                      <option value="participants">Participants</option>
                      <option value="category">Category</option>
                    </select>
                    <button
                      onClick={() =>
                        setSortOrder(sortOrder === "asc" ? "desc" : "asc")
                      }
                      className="sort-order"
                    >
                      {sortOrder === "asc" ? (
                        <SortAsc className="w-5 h-5" />
                      ) : (
                        <SortDesc className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Advanced Filters Panel */}
                {isFilterOpen && (
                  <div className="filters-panel">
                    <div className="filter-group">
                      <label className="filter-label">Category</label>
                      <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="filter-select"
                      >
                        <option value="all">All Categories</option>
                        <option value="Competition">Competition</option>
                        <option value="Workshop">Workshop</option>
                        <option value="Conference">Conference</option>
                        <option value="Ceremony">Ceremony</option>
                        <option value="Social">Social</option>
                      </select>
                    </div>

                   

                    <div className="filter-actions">
                      <button
                        onClick={() => {
                          setSearchTerm("");
                          setSelectedCategory("all");
                          setSelectedStatus("all");
                          setSortBy("time");
                          setSortOrder("asc");
                        }}
                        className="clear-filters"
                      >
                        Clear All
                      </button>
                      <span className="results-count">
                        {filteredUpcomingEvents.length} events found
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>
        }

        {/* Section 03: Upcoming Events */}
        <section className="upcoming-section">
          <div className="container">
            <div className="section-header-events">
              <h2 className="section-title-events">
                Upcoming Events
                <Clock className="title-icon" size={32} />
              </h2>
              <p className="section-subtitle-events">
                Register now for these exciting upcoming competitions and
                workshops
              </p>
            </div>

            <div className="upcoming-grid grid">
              {filteredUpcomingEvents.map((event, _id) => {
                
                return (
                  <div
                    key={event._id}
                    className="upcoming-card"
                    style={{ animationDelay: `${2 * 200}ms` }}
                  >
                    <div
                      className={`upcoming-gradient bg-gradient-to-br yellow-500 to-orange-600`}
                    >
                      {/* Priority Badge */}
                    

                   
                     

                      {/* Event Info */}
                      <h3 className="upcoming-title">{event.title}</h3>
                      <p className="upcoming-description">
                        {event.description}
                      </p>

                      {/* Event Details */}
                      <div className="upcoming-details">
                        <div className="detail-row">
                          <Calendar className="w-4 h-4 text-blue-400" />
                          <span>
                             {new Date(event.date).toLocaleDateString(undefined, {
                              year: "numeric",
                              month: "short",
                               day: "numeric"
                             })} 
                              </span>

                        </div>
                        <div className="detail-row">
                          <Clock className="w-4 h-4 text-green-400" />
                          <span>{event.time}</span>
                        </div>
                        <div className="detail-row">
                          <MapPin className="w-4 h-4 text-purple-400" />
                          <span>{event.location}</span>
                        </div>
                       
                        <div className="detail-row">
                          <Users className="w-4 h-4 text-orange-400" />
                         <span>
                          {parseInt(event.MaxNoOfParticipantsPerTeam) * parseInt(event.maxTeamsPerBatch)===0||parseInt(event.MaxNoOfParticipantsPerTeam) ===null
                            ? "All are Welcomed"
                            : parseInt(event.MaxNoOfParticipantsPerTeam) * parseInt(event.maxTeamsPerBatch) + " participants"}
                          </span>
                        </div>
                       
                      </div>

                     
                      
                      
                      {/* Prize Info */}
                      <div className="prize-info">  
                        <Award className="w-4 h-4 text-yellow-400" />
                        <span>{event.pointsConfiguration[0]===0||event.pointsConfiguration===null
                          ?"No points awarded":
                          event.pointsConfiguration[0]}</span>
                      </div>
                        
                      {/* Action Button */}
                     
                   
                    </div>
                  </div>
                      
                );
              })}
            </div>
          </div>
  
        </section>

        {/* Section 04: Past Events with Scorecards */}
        <section className="past-events-section">
          <div className="container">
            <div className="section-header-events">
              <h2 className="section-title-events">
                Past Events & Results
                <Trophy className="title-icon" size={32} />
              </h2>
              <p className="section-subtitle-events">
                Complete results and scorecards from completed competitions
              </p>
            </div>

            <div className="past-events-grid">
              {finished.map((event,_id) => (
                <div
                  key={event._id}
                  className="past-event-card"
                  style={{ animationDelay: `${2 * 250}ms` }}
                >
                  <div className="past-event-header">
                    <div className="past-event-info">
                      
                      <div className="past-event-details">
                        <h3 className="past-event-name">{event.title}</h3>
                        <div className="past-event-meta">
                         
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="scoreboard">
                    <h4 className="scoreboard-title">Final Results</h4>
                    <div className="scores-list">
                      
                        <div className="scoreboard">
                                   {[
                             { rank: 1, name: event.winners, points: event.pointsConfiguration[0] },
                             { rank: 2, name: event.firstRunnerUp, points: event.pointsConfiguration[1] },
                             { rank: 3, name: event.secondRunnerUp, points: event.pointsConfiguration[2] },
                             { rank: 4, name: event.thirdRunnerUp, points: event.pointsConfiguration[3] },
                           ].map(({ rank, name, points }) => (
                             <div key={rank} className="score-row">
                                 {/* Rank */}
                                  <div className="score-rank">
                                       <div
                                           className={`rank-number ${rank <= 1 ? "podium" : "regular"}`}
                                            >
                                          #{rank}
                                       </div>
                                      </div>

                             {/* Team Name */}
                                    <div className="score-team">
                                <span className="team-name">{name}</span>
                          </div>

                           {/* Points */}
                            <div className="score-points">
                         <span className="points-value">{points}</span>
                         <span className="points-label">pts</span>
                          </div>
                      </div>
                       ))}
                </div>                  
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Registration Modal */}
        <EventRegistrationModal
          event={registrationModal.event}
          isOpen={registrationModal.isOpen}
          onClose={closeRegistration}
          onSubmit={handleRegistrationSubmit}
        />
      </div>
    </Layout>
  );
};

export default Events;
