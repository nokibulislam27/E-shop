import aboutImage from '../../assets/about.jpg'
import teamImage from '../../assets/our-team.jpg'
import { Link } from 'react-router-dom';

const About = () => {
    return (
        <div className="bg-gray-50 text-gray-800">
            {/* Hero Section */}
            <section className="relative bg-blue-500 text-white py-20">
                <div className="container mx-auto px-6 text-center">
                    <h1 className="text-4xl md:text-6xl font-bold">
                        About <span className="text-yellow-300">LitLounge</span>
                    </h1>
                    <p className="mt-4 text-lg">
                        Your one-stop online bookstore, offering a wide range of books for every reader.
                    </p>
                </div>
            </section>

            {/* Mission Section */}
            <section className="container mx-auto px-6 py-16">
                <div className="flex flex-col md:flex-row items-center gap-8">
                    <div className="md:w-1/2">
                        <img
                            src={aboutImage}
                            alt="Our Mission"
                            className="rounded-lg shadow-lg w-full"
                        />
                    </div>
                    <div className="md:w-1/2">
                        <h2 className="text-3xl font-bold mb-4">
                            Our Mission
                        </h2>
                        <p className="text-lg text-gray-600">
                            At <span className="font-semibold text-gray-800">LitLounge</span>, our mission is to provide book lovers with an extensive collection of books, ranging from bestsellers to hidden gems, all at your fingertips. We aim to foster a love for reading by offering a seamless online shopping experience, along with personalized recommendations and fast delivery.
                        </p>
                        <p className="text-lg text-gray-600 mt-4">
                            Whether you're looking for a gripping mystery, a self-help guide, or a classic novel, we have something for everyone. Our goal is to help you discover new worlds, ideas, and adventures through the power of books.
                        </p>
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="bg-white py-16">
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl font-bold text-center mb-10">Meet Our Team</h2>
                    <div className="flex flex-col md:flex-row items-center gap-8">
                        <div className="md:w-1/2">
                            <p className="text-lg text-gray-600">
                                Our team at LitLounge consists of passionate book enthusiasts, curators, and tech experts who work together to bring you the best books and the most seamless shopping experience possible. We are committed to providing exceptional service and making every book lover’s journey a memorable one.
                            </p>
                        </div>
                        <div className="md:w-1/2">
                            <img
                                src={teamImage}
                                alt="Our Team"
                                className="rounded-lg shadow-lg w-full"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="relative bg-gradient-to-r from-blue-500 to-blue-700 text-white py-16">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-4xl font-bold mb-4">Ready to Explore Our Collection?</h2>
                    <p className="text-lg mb-8">
                        Whether you’re a casual reader or a book enthusiast, LitLounge has something special for you. Start exploring our collection today and embark on your next literary adventure.
                    </p>
                    <Link to='/contact-us'>
                        <button className="btn btn-warning text-xl">
                            Contact Us
                        </button>
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default About;
