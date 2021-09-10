function SearchBar({ onSearch, value }) {
    return(
        <div className="input-group mb-3">
            <input type="text" className="form-control" value={value} onChange={(event) => onSearch(event.target.value)} placeholder="Find your plant" aria-label="Recipient's username" aria-describedby="button-addon2"/>
            <div className="input-group-append">
                <button className="btn btn-outline-secondary" type="button" id="button-addon2">Button</button>
            </div>
        </div>
    )
}

export default SearchBar;