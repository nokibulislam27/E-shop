import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

const Faq = () => {
    // FAQ data array
    const faqData = [
        {
            question: "How to create an account?",
            answer: "To create an account, simply click on the 'Sign Up' button at the top right corner of our homepage. Fill in your personal details and follow the verification steps. Once completed, you’ll have access to all our features.",
        },
        {
            question: "How can I make payment using PayPal?",
            answer: "To make a payment using PayPal, go to the checkout page and select PayPal as your payment method. You will be redirected to PayPal's payment gateway to complete the transaction securely.",
        },
        {
            question: "Can I cancel my plan?",
            answer: "Yes, you can cancel your plan at any time by going to the 'My Account' section and selecting 'Cancel Plan'. You’ll receive a confirmation email upon successful cancellation.",
        },
        {
            question: "How can I reach support?",
            answer: "If you need help, you can contact our support team via email at support@litlaunge.com or by calling our customer service number at 123-456-7890. We're here to help!",
        }
    ];

    // State to manage opened FAQ
    const [openIndex, setOpenIndex] = useState(null);

    const toggleAnswer = (index) => {
        if (openIndex === index) {
            setOpenIndex(null); // Close the FAQ if it's already open
        } else {
            setOpenIndex(index); // Open the selected FAQ
        }
    };

    return (
        <section className="py-10 bg-gray-50 sm:py-16 lg:py-24">
            <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
                <div className="max-w-2xl mx-auto text-center">
                    <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">
                        Frequently Asked Questions
                    </h2>
                    <p className="max-w-xl mx-auto mt-4 text-base leading-relaxed text-gray-600">
                        Here are the answers to some common questions we get. If you need further assistance, feel free to reach out!
                    </p>
                </div>
                <div className="max-w-3xl mx-auto mt-8 space-y-4 md:mt-16">
                    {faqData.map((faq, index) => (
                        <div
                            key={index}
                            className="transition-all duration-200 bg-white border border-gray-200 shadow-lg cursor-pointer hover:bg-gray-50"
                        >
                            <button
                                type="button"
                                className="flex items-center justify-between w-full px-4 py-5 sm:p-6"
                                onClick={() => toggleAnswer(index)}
                            >
                                <span className="flex text-lg font-semibold text-black">
                                    {faq.icon}
                                    {faq.question}
                                </span>
                                <FaChevronDown
                                    className={`w-6 h-6 text-gray-400 transition-transform duration-200 ${openIndex === index ? "rotate-180" : ""}`}
                                />
                            </button>
                            {openIndex === index && (
                                <div className="px-4 pb-5 sm:px-6 sm:pb-6">
                                    <p>{faq.answer}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
                <p className="text-center text-gray-600 text-base mt-9">
                    Didn’t find the answer you are looking for?{" "}
                    <a
                        href="#"
                        title=""
                        className="font-medium text-blue-600 transition-all duration-200 hover:text-blue-700 focus:text-blue-700 hover:underline"
                    >
                        Contact our support
                    </a>
                </p>
            </div>
        </section>
    );
};

export default Faq;
