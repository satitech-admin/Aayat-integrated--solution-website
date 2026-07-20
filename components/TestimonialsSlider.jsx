"use client";

import { Quote, Star } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { testimonialPlaceholders } from "@/lib/siteData";

export function TestimonialsSlider() {
  return (
    <Swiper
      modules={[Pagination]}
      pagination={{ clickable: true }}
      spaceBetween={18}
      slidesPerView={1}
      breakpoints={{
        760: { slidesPerView: 2 },
      }}
      className="testimonial-slider"
    >
      {testimonialPlaceholders.map((item, index) => (
        <SwiperSlide key={index}>
          <article className="testimonial-card card">
            <Quote size={28} aria-hidden="true" />
            <p>{item.review}</p>
            <div className="rating" aria-label={`Rating ${item.rating}`}>
              {Array.from({ length: 5 }).map((_, star) => (
                <Star key={star} size={16} aria-hidden="true" />
              ))}
              <span>{item.rating}</span>
            </div>
            <footer>
              <strong>{item.client}</strong>
              <span>{item.position} - {item.company}</span>
              <small>{item.service}</small>
            </footer>
          </article>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
