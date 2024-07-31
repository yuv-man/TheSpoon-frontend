import React from 'react';

const Profile = (props) => {
  const user = localStorage.getItem("user");
  return (
    <div>
      <h1>Profile</h1>
      <p>{user.username}</p>
      <div>Ranking</div>
      <div></div>
    </div>
  );
};

export default Profile;
