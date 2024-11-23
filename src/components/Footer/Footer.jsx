import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-gradient-to-r from-blue-700 via-purple-700 to-indigo-700 text-white py-12 px-6">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
                {/* About Us Section */}
                <div>
                    <h3 className="text-xl font-bold mb-4">About LitLounge</h3>
                    <p className="text-sm leading-relaxed">
                        LitLounge is your go-to online bookstore, offering a wide variety of books from different genres. Whether you're a fan of fiction, self-help, or academic books, we have something for everyone. Enjoy easy browsing and secure shopping from the comfort of your home.
                    </p>
                </div>

                {/* Quick Links Section */}
                <div>
                    <h3 className="text-xl font-bold mb-4">Quick Links</h3>
                    <ul className="space-y-2">
                        <li>
                            <a href="/" className="hover:text-yellow-300 transition-colors">
                                Home
                            </a>
                        </li>
                        <li>
                            <a href="/shop" className="hover:text-yellow-300 transition-colors">
                                Shop
                            </a>
                        </li>
                        <li>
                            <a href="/about" className="hover:text-yellow-300 transition-colors">
                                About Us
                            </a>
                        </li>
                        <li>
                            <a href="/contact" className="hover:text-yellow-300 transition-colors">
                                Contact Us
                            </a>
                        </li>
                    </ul>
                </div>

                {/* Top Categories Section */}
                <div>
                    <h3 className="text-xl font-bold mb-4">Top Categories</h3>
                    <ul className="space-y-2">
                        <li>
                            <a href="/category/fiction" className="hover:text-yellow-300 transition-colors">
                                Fiction
                            </a>
                        </li>
                        <li>
                            <a href="/category/non-fiction" className="hover:text-yellow-300 transition-colors">
                                Non-fiction
                            </a>
                        </li>
                        <li>
                            <a href="/category/science" className="hover:text-yellow-300 transition-colors">
                                Science
                            </a>
                        </li>
                        <li>
                            <a href="/category/history" className="hover:text-yellow-300 transition-colors">
                                History
                            </a>
                        </li>
                    </ul>
                </div>

                {/* Stay Connected Section */}
                <div>
                    <h3 className="text-xl font-bold mb-4">Stay Connected</h3>
                    <div className="flex space-x-4">
                        <a
                            href="#"
                            className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-yellow-300 transition-colors"
                            title="Facebook"
                        >
                            <FaFacebookF size={20} className="text-blue-700" />
                        </a>
                        <a
                            href="#"
                            className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-yellow-300 transition-colors"
                            title="Twitter"
                        >
                            <FaTwitter size={20} className="text-blue-700" />
                        </a>
                        <a
                            href="#"
                            className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-yellow-300 transition-colors"
                            title="Instagram"
                        >
                            <FaInstagram size={20} className="text-pink-700" />
                        </a>
                    </div>
                </div>
            </div>

            {/* Footer Bottom */}
            <div className="text-center text-sm mt-8 ">
                <p>&copy; {new Date().getFullYear()} LitLounge. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
