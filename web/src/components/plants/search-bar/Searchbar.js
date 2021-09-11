function SearchBar({ onSearch, value }) {
  return (
    <div className="input-group mb-3">
      <input
        type="text"
        className="form-control"
        value={value}
        onChange={(event) => onSearch(event.target.value)}
        placeholder="Find your plant"
        aria-label="Find your plant"
        aria-describedby="button-addon2"
      />
    </div>
  );
}

export default SearchBar;
