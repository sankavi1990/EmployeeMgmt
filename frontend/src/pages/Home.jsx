function Home() {

  const username = localStorage.getItem("username");
  const role = localStorage.getItem("role");

  return (
    <div className="container mt-5">
      <h2>Welcome {username}</h2>
      <p>Role: {role}</p>
    </div>
  );
}

export default Home;