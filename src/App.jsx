import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (query.trim().length < 3) {
      setSuggestions([]);
      return;
    }

    axios
      .get(`https://boolean-spec-frontend.vercel.app/freetestapi/products?search=${query}`)
      .then(res => setSuggestions(res.data))
      .catch((error) => {
        console.error("Errore nel recuperare i dati", error);
        setSuggestions([]);
      });
  }, [query]);

  return (
    <div className="search-container">
      <div>
        <h1>Autocomplete</h1>
      </div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Cerca il prodotto"
        className="search-input"
      />

      {suggestions.length > 0 && (
        <ul className="suggestions-list">
          {suggestions.map((item) => (
            <li key={item.id} className="suggestion-item">
              {item.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
