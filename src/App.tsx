import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Spin } from "antd";

import { Routes, Route, useNavigate } from "react-router-dom";
import About from "./About";

function App() {
  const [count, setCount] = useState(0);
  const [identity, setIdentity] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const localStorageKey = "jotgoUser";

  // ------------------------------
  // Load login state on refresh
  // ------------------------------
  useEffect(() => {
    const savedUser = localStorage.getItem(localStorageKey);
    const w = window as any;

    if (savedUser && w.__JOTGO__?.user) {
      const parsed = JSON.parse(savedUser);

      w.__JOTGO__.user.name = parsed.name;
      w.__JOTGO__.user.email = parsed.email;
      w.__JOTGO__.user.identity = parsed.identity;

      setIdentity(parsed.identity);
    }
  }, []);

  // ------------------------------
  // Handle Login
  // ------------------------------
  const handleLogin = (type: string) => {
    const randomId = Math.floor(Math.random() * 20) + 1;
    const w = window as any;

    if (!w.__JOTGO__ || !w.__JOTGO__.user) return;

    const userData = {
      name: `username-identity-for-submit-any-api-or-feedback${randomId}`,
      email: `user-identity-for-submit-any-api-or-feedback${randomId}@test.com`,
      identity: type,
    };

    // Update global object
    w.__JOTGO__.user.name = userData.name;
    w.__JOTGO__.user.email = userData.email;
    w.__JOTGO__.user.identity = type;

    console.log("JOTGO User Info Updated:", w.__JOTGO__.user);

    // Save to localStorage
    localStorage.setItem(localStorageKey, JSON.stringify(userData));

    setIdentity(type);
    setIsLoading(true);

    // Wait 2.5 seconds → Refresh
    setTimeout(() => {
      window.location.reload();
    }, 2500);
  };

  // ------------------------------
  // Handle Logout
  // ------------------------------
  const handleLogout = () => {
    const w = window as any;

    if (w.__JOTGO__?.user) {
      w.__JOTGO__.user.name = "";
      w.__JOTGO__.user.email = "";
      w.__JOTGO__.user.identity = "";
    }

    localStorage.removeItem(localStorageKey);

    setIdentity(null);

    // Start loading
    setIsLoading(true);

    // Wait 2.5 seconds → Refresh page
    setTimeout(() => {
      window.location.reload();
    }, 2500);
  };


  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <button onClick={() => navigate("/about")}>
                Go to About Page
              </button>

              <div>
                <a href="https://vite.dev" target="_blank">
                  <img src={viteLogo} className="logo" alt="Vite logo" />
                </a>
                <a href="https://react.dev" target="_blank">
                  <img src={reactLogo} className="logo react" alt="React logo" />
                </a>
              </div>

              <h1>Vite + React</h1>

              <div className="card">
                <button onClick={() => setCount((count) => count + 1)}>
                  count is {count}
                </button>
                <p>
                  Edit <code>src/App.tsx</code> and save to test HMR
                </p>
              </div>

              <p className="read-the-docs">
                Click on the Vite and React logos to learn more
              </p>

              {/* --------------------- */}
              {/* LOADING UI */}
              {/* --------------------- */}
             {isLoading && (
              <div
                style={{
                  marginTop: "30px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  color: "#fff",
                }}
              >
                <Spin size="large" />
                <p style={{ marginTop: "10px" }}>
                  {identity === null ? "Logging out..." : "Logging in..."}
                </p>
              </div>
            )}


              {/* --------------------- */}
              {/* LOGIN AREA */}
              {/* --------------------- */}
              {!isLoading && identity === null ? (
                <>
                  <button
                    style={{
                      background: "green",
                      color: "white",
                      padding: "10px 16px",
                      marginRight: "10px",
                      borderRadius: "6px"
                    }}
                    onClick={() => handleLogin("internal")}
                  >
                    Login as Internal
                  </button>

                  <button
                    style={{
                      background: "blue",
                      color: "white",
                      padding: "10px 16px",
                      borderRadius: "6px"
                    }}
                    onClick={() => handleLogin("external")}
                  >
                    Login as External
                  </button>
                </>
              ) : null}

              {/* --------------------- */}
              {/* USER INFO (if logged in) */}
              {/* --------------------- */}
              {!isLoading && identity !== null && (
                <>
                  <p style={{ marginTop: "20px", fontSize: "18px" }}>
                    You’re logged in as <strong>{identity}</strong> user.
                  </p>

                  <div
                    style={{
                      marginTop: "10px",
                      padding: "12px",
                      border: "1px solid #ccc",
                      borderRadius: "8px",
                      width: "320px",
                      background: "#f9f9f9",
                      color: "#000"
                    }}
                  >
                    <h3 style={{ margin: "0 0 8px 0" }}>
                      User Info{" "}
                      <span
                        style={{
                          color: identity === "internal" ? "green" : "blue",
                          marginLeft: "6px",
                        }}
                      >
                        ({identity.toUpperCase()})
                      </span>
                    </h3>

                    <p style={{ margin: 0 }}>
                      <strong>Name:</strong>{" "}
                      {(window as any).__JOTGO__?.user?.name || "-"}
                    </p>

                    <p style={{ margin: 0 }}>
                      <strong>Email:</strong>{" "}
                      {(window as any).__JOTGO__?.user?.email || "-"}
                    </p>

                    <p
                      style={{
                        margin: 0,
                        color:
                          identity === "internal"
                            ? "green"
                            : identity === "external"
                            ? "blue"
                            : "#000",
                      }}
                    >
                      <strong>Identity:</strong>{" "}
                      {(window as any).__JOTGO__?.user?.identity || "-"}
                    </p>
                  </div>

                  <button
                    style={{
                      background: "red",
                      color: "white",
                      padding: "10px 16px",
                      marginTop: "10px",
                      borderRadius: "6px"
                    }}
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </>
              )}
            </>
          }
        />

        <Route path="/about" element={<About />} />
      </Routes>
    </>
  );
}

export default App;