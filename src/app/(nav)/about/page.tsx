import React from 'react';

const About = async () => {
  const response = await fetch(`http://localhost:4000/companyInfo`);
  const companyInfo = await response.json();

  return <div>{JSON.stringify(companyInfo)}</div>;
};

export default About;
