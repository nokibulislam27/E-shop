const Contact = () => {
    return (
        <div className="bg-gray-100 min-h-screen py-16">
            <div className="container mx-auto px-6">
                {/* Page Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-800">
                        Get in <span className="text-blue-500">Touch</span>
                    </h1>
                    <p className="text-lg text-gray-600 mt-4">
                        We&apos;d love to hear from you! Whether you have a question about our books, an inquiry about orders, or just want to say hi, feel free to reach out to us.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Contact Form */}
                    <div className="bg-white p-8 rounded-lg shadow-md">
                        <h2 className="text-2xl font-semibold text-gray-700 mb-6">
                            Send Us a Message
                        </h2>
                        <form>
                            <div className="form-control mb-4">
                                <label className="label">
                                    <span className="label-text font-semibold">Your Name</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter your name"
                                    className="input input-bordered w-full"
                                />
                            </div>
                            <div className="form-control mb-4">
                                <label className="label">
                                    <span className="label-text font-semibold">Your Email</span>
                                </label>
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="input input-bordered w-full"
                                />
                            </div>
                            <div className="form-control mb-4">
                                <label className="label">
                                    <span className="label-text font-semibold">Your Message</span>
                                </label>
                                <textarea
                                    placeholder="Enter your message"
                                    className="textarea textarea-bordered w-full"
                                    rows="5"
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                className="btn btn-primary w-full mt-4"
                            >
                                Send Message
                            </button>
                        </form>
                    </div>

                    {/* Contact Details */}
                    <div className="flex flex-col justify-center bg-white p-8 rounded-lg shadow-md">
                        <h2 className="text-2xl font-semibold text-gray-700 mb-6">
                            Contact Information
                        </h2>
                        <p className="text-gray-600">
                            Have any questions or need support? Get in touch with us, and we’ll get back to you as soon as possible!
                        </p>
                        <div className="mt-6">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="text-blue-500">
                                    <i className="fas fa-map-marker-alt text-2xl"></i>
                                </div>
                                <p>LitLounge, 456 Book Avenue, Reading City, CA 90001</p>
                            </div>
                            <div className="flex items-center gap-4 mb-4">
                                <div className="text-blue-500">
                                    <i className="fas fa-phone-alt text-2xl"></i>
                                </div>
                                <p>+1 (800) 123-BOOK</p>
                            </div>
                            <div className="flex items-center gap-4 mb-4">
                                <div className="text-blue-500">
                                    <i className="fas fa-envelope text-2xl"></i>
                                </div>
                                <p>support@litlounge.com</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="text-blue-500">
                                    <i className="fas fa-globe text-2xl"></i>
                                </div>
                                <p>www.litlounge.com</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
