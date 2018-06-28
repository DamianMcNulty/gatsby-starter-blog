import React from 'react';
import 'typeface-merriweather';
// Import typefaces
import 'typeface-montserrat';
import { rhythm } from '../utils/typography';
import profilePic from './cypress-logo.png';



class Bio extends React.Component {
  render() {
    return (
      <div
        style={{
          display: 'flex',
          marginBottom: rhythm(2.5),
        }}
      >
        <img
          src={profilePic}
          alt={`Cypress logo`}
          style={{
            marginRight: rhythm(1 / 2),
            marginBottom: 0,
            width: rhythm(2),
            height: rhythm(2),
          }}
        />
        <p>
          Deploy Gatsby to Netlify and test with Cypress.io before deployment (using Netlify itself) and after deployment (using CircleCI)
        </p>
      </div>
    )
  }
}

export default Bio
