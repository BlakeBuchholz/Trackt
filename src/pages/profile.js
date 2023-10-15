import React from 'react';

function ProfilePage({ steamId }) {
  return (
    <div>
      <h1>Profile Page</h1>
      <p>Steam ID: {steamId}</p>
    </div>
  );
}

export default ProfilePage;