"use client";
import React, { useRef } from 'react';
import Image from 'next/image';
import Section from '@/components/common/Section';
import { SectionHeader, StarRating, SliderArrows } from '@/components/ui';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

interface Review {
  id: number;
  name: string;
  role: string;
  image: string;
  rating: number;
  avgRating: string;
  reviewCount: string;
  text: string;
}

const reviewData: Review[] = [
  {
    id: 1,
    name: "Elena R.",
    role: "Logistics Manager",
    image: "/icons/pics/m1.jpg",
    rating: 5,
    avgRating: "4.9/5",
    reviewCount: "1,200+",
    text: "\u201cThe Travra team was incredibly responsive and professional. Pick-up and drop-off were smooth, and the digital check-in saved me so much time. Highly recommend their service.\u201d",
  },
  {
    id: 2,
    name: "James L.",
    role: "Project Coordinator",
    image: "/icons/pics/m1.jpg",
    rating: 5,
    avgRating: "4.8/5",
    reviewCount: "850+",
    text: "\u201cExceptional service and high-quality equipment. We rented several heavy-duty trucks for our construction project, and everything was in perfect condition. Will definitely use again.\u201d",
  },
  {
    id: 3,
    name: "Sarah M.",
    role: "Operations Director",
    image: "/icons/pics/m1.jpg",
    rating: 4,
    avgRating: "5.0/5",
    reviewCount: "2,100+",
    text: "\u201cThe variety of rental options is impressive. We found exactly what we needed for our event logistics. The customer support was helpful throughout the entire process.\u201d",
  },
];

const Reviews = () => {
  const swiperRef = useRef<any>(null);

  return (
    <Section className="bg-[#021928]">
      {/* Header with Navigation */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12 w-full">
        <SectionHeader badge="Reviews" title="Real Experiences, Real Freedom" size="lg" />
        <SliderArrows
          onPrev={() => swiperRef.current?.slidePrev()}
          onNext={() => swiperRef.current?.slideNext()}
        />
      </div>

      <div className="w-full overflow-hidden">
        <Swiper
          modules={[Navigation, Autoplay]}
          onBeforeInit={(swiper) => { swiperRef.current = swiper; }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          loop={true}
          spaceBetween={30}
          className="w-full"
        >
          {reviewData.map((review) => (
            <SwiperSlide key={review.id}>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

                {/* Rating Card */}
                <div
                  className="lg:col-span-4 rounded-[32px] p-6 md:p-12 xl:p-14 flex flex-col items-center justify-center text-center gap-4 md:gap-6 reviews-rating-card"
                >
                  <h3 className="text-white text-[56px] md:text-[96px] xl:text-[110px] 3xl:text-[128px] font-[700] leading-none">
                    {review.avgRating}
                  </h3>
                  <StarRating fullStars size={28} />
                  <p className="text-gray-400 text-[16px] md:text-[20px] xl:text-[22px] 3xl:text-[24px]">
                    Average rating from {review.reviewCount} reviews
                  </p>
                </div>

                {/* Testimonial Card */}
                <div className="lg:col-span-8 bg-[#F8F9FA] rounded-[32px] p-10 md:p-16 xl:p-20 flex flex-col justify-center">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
                    <div className="flex items-center gap-4">
                      <div className="relative w-14 h-14 md:w-16 md:h-16 rounded-full overflow-hidden shrink-0">
                        <Image src={review.image} alt={review.name} fill className="object-cover" />
                      </div>
                      <div>
                        <h4 className="text-[#010F18] text-[20px] md:text-[24px] font-[700] leading-tight">
                          {review.name}
                        </h4>
                        <p className="text-gray-500 text-[14px] md:text-[16px]">{review.role}</p>
                      </div>
                    </div>
                    <StarRating rating={review.rating} size={20} />
                  </div>

                  <div className="w-full h-px bg-gray-200 mb-10" />
                  <blockquote className="text-[#010F18] text-[18px] md:text-[24px] lg:text-[32px] xl:text-[36px] 3xl:text-[40px] font-[500] leading-[1.4] max-w-full">
                    {review.text}
                  </blockquote>
                </div>

              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </Section>
  );
};

export default Reviews;
