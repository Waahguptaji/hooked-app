import styled from "styled-components";

const Login = () => {
  const handleClick = () => {
    const clientId = "ee4bdd40020c4f56a73dd75a4be6ec04";
    const redirectUri = "https://hooked.vercel.app/";
    const apiUrl = "https://accounts.spotify.com/authorize";
    const scopes = [
      "user-read-email",
      "user-read-private",
      "user-modify-playback-state",
      "user-read-playback-state",
      "user-read-currently-playing",
      "user-read-recently-played",
      "user-read-playback-position",
      "user-top-read",
      "user-read-recently-played",
    ];
    window.location.href = `${apiUrl}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
      " "
    )}&response_type=token&show_dialog=true`;
  };

  return (
    <Container>
      <img src="/images/logo.png" alt="" />
      <button onClick={handleClick}>Login With Spotify</button>
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
  background-color: black;

  img {
    /* width: 100%; */
  }

  button {
    padding: 20px;
    border-radius: 99px;
    background-color: #1db954;
    font-weight: 800;
    color: white;
    text-decoration: none;
  }
`;

export default Login;
