import "./App.css";
import { ThemeContext, themes } from "./contexts/ThemeContext";
import { BsCloudSunFill, BsFillCloudMoonFill } from "react-icons/bs";
import React from "react";

function App() {
  const [darkMode, setDarkMode] = React.useState(true);

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="text-warning">Dark/Light mode</h1>

        <ThemeContext.Consumer>
          {({ changeTheme }) => (
            <button
              color="link"
              onClick={() => {
                setDarkMode(!darkMode);
                changeTheme(darkMode ? themes.light : themes.dark);
              }}
            >
              <i className={darkMode}></i>
              <span className="d-lg-none d-md-block">
                {darkMode ? <BsCloudSunFill /> : <BsFillCloudMoonFill />}
              </span>
            </button>
          )}
        </ThemeContext.Consumer>
      </header>
    </div>
  );
}

export default App;
