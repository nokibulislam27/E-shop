const Sorting = ({ setSort }) => {
    return (
        <select
            onChange={(e) => setSort(e.target.value)}
            className="select select-bordered max-w-xs"
        >
            <option value="">Sort by</option>
            <option value="asc">Price: Low to High</option>
            <option value="dsc">Price: High to Low</option>
        </select>
    );
};

export default Sorting;
