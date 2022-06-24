import "./App.css";
import React, { useState } from "react";

function App() {
  const [dayCount, setDayCount] = useState(0);

  return (
    <div className="App">
      <header className="App-header">
        <h2>Hello World From Clement</h2>
        <p>
          Hi React, It christmas Eve soon, how Many Days from now ! {dayCount}
        </p>
        <button onClick={() => setDayCount(dayCount + 1)}>
          Day to Christmas
        </button>
        <button onClick={() => setDayCount(dayCount - 1)}>
          Decrement Days
        </button>
      </header>
    </div>
  );
}

export default App;
