import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import studentImage from "./assets/student-image.png";
import Signup from "./Signup";
import Login from "./Login";
import BuyCourses from "./BuyCourses";
import axios from "axios";
function App() {
  const [showContact, setShowContact] = useState(false);
  const [name, setName] = useState('');
const [email, setEmail] = useState('');
const [message, setMessage] = useState('');
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post('http://localhost:5000/send-email', {
      name,
      email,
      message
    });

    alert(response.data.message);

    // Clear form and close modal
    setName('');
    setEmail('');
    setMessage('');
    setShowContact(false);

  } catch (error) {
    console.error('Error sending message:', error);
    alert('Failed to send message');
  }
};


  return (
    <Router>
      <div>
        <nav className="navbar">
          <div className="logo">Upgradia</div>
          <div className="button-group">
            <Link to="/signup">
              <button className="sign-up"><span>Sign Up</span></button>
            </Link>
            <Link to="/login">
              <button className="sign-up"><span>Log In</span></button>
            </Link>
            <Link to="/buy-now">
              <button className="buy-now"><span>Buy Now</span></button>
            </Link>
          </div>
        </nav>

        <Routes>
          <Route
            path="/"
            element={
              <>
                <section className="hero-section">
                  <div className="hero-text">
                    <h1>Welcome to <span className="highlight">Upgradia</span></h1>
                    <p>Smart Learning, Smarter Future.</p>
                    <button className="get-started" onClick={() => setShowContact(true)}>
                      <span>Get Started</span>
                    </button>
                  </div>
                  <div className="hero-image">
                    <img src={studentImage} alt="Student Learning" className="transition-effect" />
                  </div>
                </section>

                <section className="courses-section">
                  <div className="nameplate">Our Courses</div>
                  <h2 className="section-title">Explore Our Courses</h2>
                  <div className="courses-grid">
                    <a href="https://www.geeksforgeeks.org/web-development/" target="_blank" rel="noopener noreferrer" className="course-card clickable-card">
                      <h3>Web Development</h3>
                      <p>Build stunning websites using HTML, CSS, JavaScript, and React.</p>
                    </a>
                    <a href="https://www.geeksforgeeks.org/data-science/" target="_blank" rel="noopener noreferrer" className="course-card clickable-card">
                      <h3>Data Science</h3>
                      <p>Analyze and visualize data using Python, Pandas, and Machine Learning.</p>
                    </a>
                    <a href="https://www.geeksforgeeks.org/user-experience-or-ux-design/" target="_blank" rel="noopener noreferrer" className="course-card clickable-card">
                      <h3>UI/UX Design</h3>
                      <p>Learn user interface design, wireframing, and user experience strategy.</p>
                    </a>
                    <a href="https://www.geeksforgeeks.org/cloud-computing/" target="_blank" rel="noopener noreferrer" className="course-card clickable-card">
                      <h3>Cloud Computing</h3>
                      <p>Explore AWS, Azure, and modern cloud architecture and deployment.</p>
                    </a>
                  </div>
                </section>

                <section className="instructors-section">
                  <h2 className="section-title">Upcoming Batches</h2>
                  <div className="instructors-grid">
                    <div className="instructor-card">
                      <h3>Web Dev - May Batch</h3>
                      <p>Starting: May 10, 2025</p>
                    </div>
                    <div className="instructor-card">
                      <h3>Data Science - June Batch</h3>
                      <p>Starting: June 1, 2025</p>
                    </div>
                    <div className="instructor-card">
                      <h3>UI/UX - July Batch</h3>
                      <p>Starting: July 15, 2025</p>
                    </div>
                  </div>
                </section>

                {showContact && (
                  <div className="modal-overlay" onClick={() => setShowContact(false)}>
                    <div className="modal" onClick={(e) => e.stopPropagation()}>
                      <h2>Contact Us</h2><br></br>
                      <p>Have questions or want to know more? Drop us a message!</p><br></br>
                      <form className="contact-form" onSubmit={handleSubmit}>
                        <input type="text" placeholder="Your Name"  onChange={(e) => setName(e.target.value)} required />
                        <input type="email" placeholder="Your Email" onChange={(e) => setName(e.target.value)} required  />
                        <textarea placeholder="Your Message" rows="4"  onChange={(e) => setName(e.target.value)} required></textarea>
                        <button type="submit">Send Message</button>
                      </form>
                      <button className="close-btn" onClick={() => setShowContact(false)}>Close</button>
                    </div>
                  </div>
                )}
              </>
            }
          />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/buy-now" element={<BuyCourses />} />

        </Routes>

        <footer className="footer">
          <p>&copy; 2025 Upgradia. All Rights Reserved.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
