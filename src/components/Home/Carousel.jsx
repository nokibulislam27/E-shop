// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

// Import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules'
import Slide from './Slide'

import sliderImageOne from "../../assets/carousel1.jpg";
import sliderImageTwo from "../../assets/carousel2.jpg";
import sliderImageThree from "../../assets/carousel3.jpg";

export default function Carousel() {
    return (
        <div className='container px-6 py-10 mx-auto'>
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                loop={true}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className='mySwiper'
            >
                <SwiperSlide>
                    <Slide
                        image={sliderImageOne}
                        text='Discover Bestselling Novels at LitLaunge Bookstore'
                        description="Explore our collection of bestselling books, from thrilling mysteries to heartwarming romances. Dive into your next great read today!"
                        linkText="Shop Bestsellers"
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <Slide
                        image={sliderImageTwo}
                        text='Unlock Your Imagination with Fantasy & Sci-Fi Books'
                        description="Get lost in the world of fantasy and science fiction. From epic adventures to mind-bending plots, our curated selection of fantasy and sci-fi books awaits."
                        linkText="Explore Fantasy & Sci-Fi"
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <Slide
                        image={sliderImageThree}
                        text='Improve Your Skills with Non-Fiction & Self-Help Books'
                        description="Enhance your knowledge and personal growth with our wide selection of non-fiction books. Find inspiration, motivation, and valuable insights for a better life."
                        linkText="Shop Non-Fiction & Self-Help"
                    />
                </SwiperSlide>
            </Swiper>
        </div>
    )
}
