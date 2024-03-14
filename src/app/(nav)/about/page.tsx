import React from 'react';

const About = async () => {
  const response = await fetch(`http://localhost:4000/companyInfo`);
  const companyInfo = await response.json();

  return (
    <div>
      <h1>CompanyInfo</h1>
      <div>
        <p>{companyInfo.name}</p>
        <p>{companyInfo.desctiption}</p>
      </div>
    </div>
  );
};

export default About;
