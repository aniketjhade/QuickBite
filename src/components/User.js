const User = ({ name, location }) => {
  return (
    <div className="user-card">
      <h1>Name: {name}</h1>
      <h2>Addresss: {location}</h2>
      <h3>contact: 78409940980 </h3>
    </div>
  );
};

export default User;
