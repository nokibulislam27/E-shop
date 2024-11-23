import { FaSearch } from "react-icons/fa";

const SearchBar = ({ handleSearch }) => {
    return (
        <form onSubmit={handleSearch} className="flex gap-2 items-center w-full">
            <input
                type="text"
                name="search"
                placeholder="Search products..."
                className="input input-bordered w-full max-w-md"
            />
            <button className="btn btn-primary flex items-center gap-2">
                <FaSearch />
                Search
            </button>
        </form>
    );
};

export default SearchBar;
