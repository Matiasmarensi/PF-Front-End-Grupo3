import { useState } from "react";

export const SearchBar = () => {
  const [input, setInput] = useState("");

  const onInputChange = ({ target }) => {
    setInput(target.value);
  };

  const onSubmitSearch = (e) => {
    e.preventDefault();
    console.log(input);
  };

  return (
    <form onSubmit={onSubmitSearch} className="search-input-container">
      <input
        type="text"
        placeholder="Busca comidas, bebidas o postres..."
        className="mi-input fs-5 fw-bold"
        value={input}
        onChange={onInputChange}
      />
      <button
        type="submit"
        className="fa-solid fa-magnifying-glass border-end-0 border-top-0 border-bottom-0 border-dark search-icon fs-3"></button>
      
    </form>
  );
};