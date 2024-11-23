const Categories = () => {
    const categories = [
        {
            "id": 1,
            "name": "Fiction",
            "image": "https://placehold.co/600x400"
        },
        {
            "id": 2,
            "name": "Non-Fiction",
            "image": "https://placehold.co/600x400"
        },
        {
            "id": 3,
            "name": "Children's Books",
            "image": "https://placehold.co/600x400"
        },
        {
            "id": 3,
            "name": "Children's Books",
            "image": "https://placehold.co/600x400"
        }
    ]

    return (
        <div className="container px-6 py-16 mx-auto">
            <h2 className="text-4xl font-bold text-center mb-10 text-gray-700">Browse by Categories</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {categories.map((category) => (
                    <div key={category.id} className="relative group cursor-pointer">
                        <img src={category.image} alt={category.name} className="w-full h-64 object-cover rounded-lg" />
                        <div className="absolute inset-0 bg-black opacity-50 group-hover:opacity-60 transition-opacity duration-300"></div>
                        <div className="absolute inset-0 flex items-center justify-center text-white text-xl font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            {category.name}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Categories;
