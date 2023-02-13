import "./global.css";
import { SearchBar } from "./components/SearchBar";

function App() {
  return (
    <div
      style={{
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        padding: "3rem",
      }}
    >
      <SearchBar />
    </div>
  );
}

export default App;
