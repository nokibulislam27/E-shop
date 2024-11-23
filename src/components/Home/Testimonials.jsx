import { FaStar } from "react-icons/fa";

const Testimonials = () => {
    const testimonials = [
        {
            "id": 1,
            "name": "John Doe",
            "message": "This bookstore has an amazing collection of books. The customer service is exceptional!",
            "rating": 5,
            "image": "https://randomuser.me/api/portraits/men/80.jpg"
        },
        {
            "id": 2,
            "name": "Jane Smith",
            "message": "I love the variety of books available! Fast shipping and excellent packaging.",
            "rating": 4,
            "image": "https://randomuser.me/api/portraits/women/78.jpg"
        },
        {
            "id": 2,
            "name": "Jane Smith",
            "message": "I love the variety of books available! Fast shipping and excellent packaging.",
            "rating": 4,
            "image": "https://randomuser.me/api/portraits/women/78.jpg"
        }
    ]

    return (
        <div>
            <div className="container px-6 py-16 mx-auto">
                <h2 className="text-4xl font-bold text-center mb-10 text-gray-700">What Our Customers Say</h2>
                <div className="flex flex-wrap justify-center gap-8">
                    {testimonials.map((testimonial) => (
                        <div key={testimonial.id} className="bg-white rounded-lg shadow-lg p-6 max-w-md text-center hover:shadow-xl transition-shadow duration-300">
                            <div className="flex justify-center mb-4">
                                <img src={testimonial.image} alt={testimonial.name} className="w-16 h-16 rounded-full object-cover" />
                            </div>
                            <p className="text-lg text-[#666] mb-4">{testimonial.message}</p>
                            <div className="flex justify-center gap-1 text-[#ff6a00]">
                                {[...Array(testimonial.rating)].map((_, index) => (
                                    <FaStar key={index} />
                                ))}
                            </div>
                            <p className="text-sm font-semibold text-[#333] mt-2">{testimonial.name}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Testimonials;