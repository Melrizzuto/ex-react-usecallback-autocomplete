import { useCallback, useEffect, useState } from "react";

// fn di debounce
const debounce = (callback, delay) => {
  let timeout;
  return (value) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      callback(value);
    }, delay);
  };
};

function App() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  // fn per recuperare i prodotti
  const fetchProduct = async (query) => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }
    try {
      const res = await fetch(`https://boolean-spec-frontend.vercel.app/freetestapi/products?search=${query}`)
      const data = await res.json()
      setSuggestions(data)
      console.log("API")

    } catch (error) {
      console.error("Errore nel recuperare i dati", error);
    };
  };

  // useCallback con debounce
  const debounceFetchProduct = useCallback(
    debounce(fetchProduct, 500),
    []
  );

  useEffect(() => {
    debounceFetchProduct(query);
  }, [query, debounceFetchProduct]);

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
