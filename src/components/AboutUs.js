import React from 'react';
import jona from "./pictures/jona.png";
import court from "./pictures/court.png";
import andrew from "./pictures/andrew.png";
import cam from "./pictures/cam.png";
import hannah from "./pictures/hannah.png";

function AboutUs() {
  const colors = {
    background: '#F5F5F5', // Light grey 
    navy: 'navy', 
    black: 'black', 
    white: 'white',
  };

  const fonts = {
    heading: 'Georgia, serif', // Georgia font for headings
    text: 'Georgia, serif', // Georgia font for text
  };

  const styles = {
    container: {
      backgroundColor: colors.background,
      color: colors.black,
      fontFamily: fonts.text,
      paddingTop: '50px',
      paddingLeft: '20px',
      paddingRight: '20px',
      paddingBottom: '20px',
      lineHeight: '1.6', // Added line height for better readability
    },
    heading: {
      color: colors.black,
      fontFamily: fonts.heading,
      fontSize: '2rem', // Increased font size for headings
    },
    subHeading: {
      borderBottom: `2px solid ${colors.navy}`,
      color: colors.navy,
      paddingBottom: '10px',
      fontFamily: fonts.heading,
      fontSize: '1.5rem', // Adjusted font size for subheadings
    },
    teamContainer: {
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'wrap',
      gap: '20px', // Adds space between team member cards
      marginTop: '20px',
    },
    teamMember: {
      width: '200px',
      backgroundColor: colors.white,
      borderRadius: '10px', // Rounded corners for cards
      textAlign: 'center',
      overflow: 'hidden',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Soft shadow for depth
      padding: '10px',
    },
    teamImage: {
      width: '100%',
      height: '200px',
      objectFit: 'cover',
      borderRadius: '10px', // Match the card's border radius
    },
    teamName: {
      marginTop: '10px',
      fontWeight: 'bold',
      fontFamily: fonts.heading, // Apply Georgia font to names
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>About Us</h2>
      <p>
        Welcome to SoundByte: A visionary initiative by a dedicated team of students from the University of Florida. Recognizing the challenges EDM enthusiasts face in navigating event information, our mission is to transform the EdmTrain website into a dynamic, map-based platform. This innovative approach aims to streamline the discovery process, making it easier for users to find events that resonate with their location and preferences.
      </p>
      <p>
        Our vision extends beyond mere functionality; we aim to create an experience. By leveraging real-time data from the EdmTrain API and integrating advanced geolocation features, we're building a platform that not only looks great but feels personal to every user. It's about connecting fans with events in a way that's engaging, efficient, and, above all, fun.
      </p>
      <h3 style={styles.subHeading}>Meet the Developers</h3>
      <div style={styles.teamContainer}>
        <div style={styles.teamMember}>
          <img src={jona} alt="Jonathan Zhang" style={styles.teamImage} />
          <p style={styles.teamName}>Jonathan Zhang<br/>Scrum Master</p>
        </div>
        <div style={styles.teamMember}>
          <img src={court} alt="Courtney Giang" style={styles.teamImage} />
          <p style={styles.teamName}>Courtney Giang<br/>Project Manager</p>
        </div>
        <div style={styles.teamMember}>
          <img src={andrew} alt="Andrew Ruales" style={styles.teamImage} />
          <p style={styles.teamName}>Andrew Ruales<br/>Backend Developer</p>
        </div>
        <div style={styles.teamMember}>
          <img src={cam} alt="Cameron Ketchem" style={styles.teamImage} />
          <p style={styles.teamName}>Cameron Ketchem<br/>Backend Developer</p>
        </div>
        <div style={styles.teamMember}>
          <img src={hannah} alt="Hannah Hardy" style={styles.teamImage} />
          <p style={styles.teamName}>Hannah Hardy <br/>Frontend Developer</p>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
