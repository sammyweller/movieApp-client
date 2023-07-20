import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { ProfileView } from "../profile-view/profile-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./main-view.scss";


export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");


  const onLogout = () => {
    setUser(null);
    setToken(null);
    localStorage.clear();
  };

  useEffect(() => {
    if (!token) {
      return;
    }

    const fetchMovies = async () => {
      try {
        const response = await fetch(
          "https://sw-myflix-app-baa5e3f40824.herokuapp.com/movies",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const data = await response.json();

        const moviesFromApi = data.map((movie) => ({
          id: movie._id,
          title: movie.title,
          imagePath: movie.imagePath,
          description: movie.description,
          genre: {
            name: movie.genre.name,
          },
          director: {
            name: movie.director.name,
          },
        }));

        setMovies(moviesFromApi);
        setIsLoading(false);
      } catch (error) {
        console.log("Error fetching movies:", error);
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, [token]);


  //https://sw-myflix-app-baa5e3f40824.herokuapp.com



  return (
    <BrowserRouter>
      <NavigationBar className="nav-bar" user={user} onLoggedOut={onLogout} />


      <Row className="justify-content-md-center">
        <Routes>
          <Route
            path="/signup"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={4}>
                    <SignupView />
                  </Col>
                )}
              </>

            }
          />
          <Route
            path="/login"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <LoginView
                      onLoggedIn={(user, token) => {
                        setUser(user);
                        setToken(token);
                      }}
                    />
                  </Col>
                )}
              </>

            }
          />
          <Route
            path="/movies/:movieId"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <Col md={7}>
                    <MovieView
                      movies={movies}
                      user={user}
                      setUser={setUser}
                      token={token}
                    />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/"
            element={
              <>
                <Row className="justify-content-md-center mb-3 search-bar">
                  <Col md={3} >
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Search for a movie..."
                      className="form-control "
                      style={{ 
                        color: "white",
                        maxWidth: "300px", 
                        fontFamily: "'Quicksand', sans-serif", 
                        backgroundColor: "rgba(0, 0, 0, 0)", 
                        border: "1px solid rgba(255, 255, 255, 0.2)", 
                        borderRadius: "20px",
                        marginBottom: "20px",
                    }}
                    />
                  </Col>
                </Row>

                {!user ? (
                  <Navigate to="/login" replace />
                ) : isLoading ? (
                  <Col>Loading...</Col>
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <>
                    {movies
                      .filter((movie) =>
                        movie.title.toLowerCase().includes(searchTerm.toLowerCase())
                      )
                      .map((movie) => (
                        <Col
                          className="mb-4 main-movie-list"
                          key={movie.id}
                          style={{ fontFamily: "'Quicksand', sans-serif" }}
                          md={3}
                        >
                          <MovieCard movie={movie} />
                        </Col>
                      ))}
                  </>
                )}
              </>
            }
          />

          <Route
            path="/profile"
            element={
              <>
                {!user ? (
                  <Navigate to="/signup" replace />
                ) : (
                  <Col>
                    <ProfileView
                      user={user}
                      token={token}
                      setUser={setUser}
                      movies={movies}
                      onLogout={onLogout}
                    />
                  </Col>
                )}
              </>
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};