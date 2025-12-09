import { useNavigate } from "react-router-dom";

export default function About() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: 20 }}>
      <h1>About</h1>
      <p>This is the About page</p>

      <button onClick={() => navigate("/")}>Back to Home</button>
    </div>
  );
}
