import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';
import Slide1 from '../../assets/slide1.jpg';
import Slide2 from '../../assets/slide2.jpg';
import Slide3 from '../../assets/slide3.jpg';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <Swiper
      modules={[Pagination, Navigation, Autoplay]}
      spaceBetween={50}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      loop={true}
      autoplay={{
        delay: 10000,
      }}
    >
      <SwiperSlide>
        <div className="relative w-full h-[300px] md:h-[600px]">
          <img className="w-full h-full object-cover object-top" src={Slide1} alt="Slide 1" />
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center flex-col">
          <p className="text-white text-center flex-col  text-3xl md:text-4xl font-bold  p-4 rounded">
            New Outerwear<br/> Collection
            </p>
            <Link to='/shop' className='p-3 border-white border-2 bg-transparent rounded-full text-white hover:bg-yellow-600 hover:border-yellow-600 transition-all'>Shop Now</Link>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="relative w-full h-[300px] md:h-[600px]">
          <img className="w-full h-full object-cover object-top" src={Slide2} alt="Slide 2" />
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center flex-col">
            <p className="text-white text-center  text-3xl md:text-4xl font-bold  p-4 rounded">
            New Outerwear<br/> Collection
            </p>
            <Link to='/shop' className='p-3 border-white border-2 bg-transparent rounded-full text-white  hover:bg-yellow-600 hover:border-yellow-600 transition-all'>Shop Now</Link>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="relative w-full h-[300px] md:h-[600px]">
          <img className="w-full h-full object-cover object-top" src={Slide3} alt="Slide 3" />
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center flex-col">
          <p className="text-white text-center  text-3xl md:text-4xl font-bold  p-4 rounded">
            New Outerwear<br/> Collection
            </p>
            <Link to='/shop' className='p-3 border-white border-2 bg-transparent rounded-full text-white hover:bg-yellow-600 hover:border-yellow-600 transition-all'>Shop Now</Link>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  );
}
