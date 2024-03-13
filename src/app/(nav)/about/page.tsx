import React from 'react';

const about = async () => {
  const response = await fetch(`http://localhost:4000/companyInfo`);
  const data = await response.json();

  return (
    <div>
      <h1>CompanyInfo</h1>
      <div>
        <p>{data.name}</p>
        <p>{data.desctiption}</p>
      </div>
    </div>
  );
};

export default about;
