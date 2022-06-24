import React, { useState } from "react";
import data from "./data";
import Staff from "./staff";

function App() {
  const [workers, setWorkers] = useState(data);

  return (
    <main>
      <section className="container">
        <Staff workers={workers} />
      </section>
    </main>
  );
}

export default App;
