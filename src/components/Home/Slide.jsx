import { Link } from 'react-router-dom'

const Slide = ({ image, text, description, linkText }) => {
    return (
        <div
            className="w-full bg-center bg-cover h-[38rem] rounded-lg shadow-2xl"
            style={{
                backgroundImage: `url(${image})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
            }}
        >
            <div className="flex items-center justify-center w-full h-full bg-gradient-to-t from-black/60 via-transparent to-transparent">
                <div className="text-center max-w-4xl mx-auto px-6 py-4">
                    <h1 className="text-4xl font-extrabold text-gray-800 lg:text-5xl mb-6 drop-shadow-xl animate__animated animate__fadeIn animate__delay-1s">
                        {text}
                    </h1>
                    <p className="text-lg text-black opacity-90 mb-6 leading-relaxed max-w-lg mx-auto animate__animated animate__fadeIn animate__delay-2s">
                        {description}
                    </p>
                    <Link
                        to="/courses"
                        className="inline-block px-8 py-3 text-lg font-semibold text-white bg-gradient-to-r from-[#ff7e5f] via-[#feb47b] to-[#ff6a00] rounded-full shadow-lg transition-all duration-300 ease-in-out hover:bg-[#ff6a00] hover:shadow-2xl animate__animated animate__fadeIn animate__delay-3s"
                    >
                        {linkText}
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Slide;
