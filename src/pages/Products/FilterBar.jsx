import { FaFilter } from "react-icons/fa";
import { GrPowerReset } from "react-icons/gr";

const FilterBar = ({ setBrand, setCategory, handleReset, uniqueBrand, uniqueCategory }) => {
    return (
        <div className="space-y-6">
            <div className="flex items-center gap-2 text-primary">
                <FaFilter size={20} />
                <h2 className="text-xl font-semibold">Filters</h2>
            </div>
            <select
                onChange={(e) => setBrand(e.target.value)}
                className="select select-bordered w-full"
            >
                <option value="">All Brands</option>
                {uniqueBrand.map((brand) => (
                    <option key={brand} value={brand}>
                        {brand}
                    </option>
                ))}
            </select>
            <select
                onChange={(e) => setCategory(e.target.value)}
                className="select select-bordered w-full"
            >
                <option value="">All Categories</option>
                {uniqueCategory.map((category) => (
                    <option key={category} value={category}>
                        {category}
                    </option>
                ))}
            </select>
            <button
                className="btn btn-error btn-block flex items-center gap-2"
                onClick={handleReset}
            >
                <GrPowerReset />
                Reset
            </button>
        </div>
    );
};

export default FilterBar;
