function SearchForm() {
  return (
    <section className="search-section">
      <form className="search-form">

        <input
          type="text"
          placeholder="Pickup Location"
        />

        <input
          type="datetime-local"
        />

        <input
          type="datetime-local"
        />

        <input
          type="text"
          placeholder="Car Name"
        />

        <button type="submit">
          Search
        </button>

      </form>
    </section>
  );
}

export default SearchForm;