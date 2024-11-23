import Carousel from "../../components/Home/Carousel";
import Categories from "../../components/Home/Categories";
import ContactInfo from "../../components/Home/ContactInfo";
import Faq from "../../components/Home/Faq";
import FeaturedProducts from "../../components/Home/FeaturedProducts";
import Testimonials from "../../components/Home/Testimonials";

const Home = () => {
    return (
        <div>
            <Carousel></Carousel>
            <FeaturedProducts></FeaturedProducts>
            <Testimonials></Testimonials>
            <Categories></Categories>
            <Faq></Faq>
            <ContactInfo></ContactInfo>
        </div>
    );
};

export default Home;