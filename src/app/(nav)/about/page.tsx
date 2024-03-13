import React from 'react';

const about = async () => {
  const response = await fetch(`http://localhost:4000/companyInfo`);
  const data = await response.json();
  console.log(data);

  return (
    <div>
      <h1>CompanyInfo</h1>
      <div>{data.name}</div>
      <div>{data.desctiption}</div>
    </div>
  );
};

export default about;
