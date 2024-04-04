import React from 'react';
import jona from "./jona.png";
import court from "./court.png";
import andrew from "./andrew.png";
import cam from "./cam.png";
import hannah from "./hannah.png";
import './AboutUs.css';

function AboutUs() {
  const teamMembers = [
    { name: 'Jonathan Zhang', role: 'Scrum Master', image: jona, linkedin: 'https://www.linkedin.com/in/jonathanzhang53/' },
    { name: 'Courtney Giang', role: 'Project Manager', image: court, linkedin: 'https://www.linkedin.com/in/courtney-giang' },
    { name: 'Andrew Ruales', role: 'Backend Developer', image: andrew, linkedin: 'https://www.linkedin.com/in/andrewruales/' },
    { name: 'Cameron Ketchem', role: 'Backend Developer', image: cam, linkedin: 'https://www.linkedin.com/in/cameron-ketchem-007b4623b/' },
    { name: 'Hannah Hardy', role: 'Frontend Developer', image: hannah, linkedin: 'https://www.linkedin.com/in/hannah-hardy-uf/' },
  ];

  return (
    <div className="aboutus-container" data-testid="aboutus-container"> 
      <h2 className="aboutus-heading">About Us</h2> 
      <p>
        Welcome to SoundByte: A visionary initiative by a dedicated team of students from the University of Florida. Recognizing the challenges EDM enthusiasts face in navigating event information, we have transformed the EdmTrain website into a dynamic, map-based platform. This innovative approach aims to streamline the discovery process, making it easier for users to find events that resonate with their location and preferences.
      </p>
      <p>
        Our vision extends beyond mere functionality; we aim to create an experience. By leveraging real-time data from the EdmTrain API and integrating advanced geolocation features, we&apos;re building a platform that not only looks great but feels personal to every user. It&apos;s about connecting fans with events in a way that&apos;s engaging and efficient.
      </p>
      <h3 className="aboutus-subheading">Meet the Developers</h3> 
      <div className="team-container"> 
        {teamMembers.map((member) => (
          <div className="team-member" key={member.name} data-testid="team-member"> 
            <div className="flip-card">
              <div className="flip-card-inner">
                <div className="flip-card-front">
                  <img src={member.image} alt={member.name} className="team-image" /> 
                  <p className="team-name"><a href={member.linkedin} target="_blank" rel="noopener noreferrer">{member.name}</a><br/>{member.role}</p>
                </div>
                <div className="flip-card-back">
                  {/* Additional content for back side of the card */}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AboutUs;
