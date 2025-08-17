import { motion } from "framer-motion";
import { fadeIn, textVariant } from "../utils/motion";

const testimonials = [
  {
    id: 1,
    name: "Robin Ayala Doe", 
    image: "https://randomuser.me/api/portraits/men/77.jpg",
    text: "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast.",
  },
  {
    id: 2,
    name: "John De marli",
    image: "https://randomuser.me/api/portraits/women/90.jpg", 
    text: "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove.",
  },
  {
    id: 3,
    name: "Rowhan Smith",
    image: "https://randomuser.me/api/portraits/men/90.jpg",
    text: "When she reached the first hills of the Mountains, she had a last view back on the of her hometown Bookmarksgrove, the headline.",
  },
  {
    id: 4,
    name: "Sarah Johnson",
    image: "https://randomuser.me/api/portraits/women/45.jpg",
    text: "The customer service has been exceptional. They went above and beyond to help me solve my problems and were always available when I needed them.",
  },
  {
    id: 5,
    name: "Michael Chen",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    text: "I've been using their services for over a year now and couldn't be happier. The platform is intuitive and the features are exactly what I needed for my business.",
  },
  {
    id: 6,
    name: "Emma Wilson",
    image: "https://randomuser.me/api/portraits/women/28.jpg",
    text: "What impressed me most was how quickly they responded to my requests. The team is professional, knowledgeable, and truly cares about their customers' success.",
  },
  {
    id: 7,
    name: "David Rodriguez",
    image: "https://randomuser.me/api/portraits/men/55.jpg",
    text: "The analytics dashboard has transformed how I track my business performance. Real-time insights and beautiful visualizations make decision-making so much easier.",
  },
  {
    id: 8,
    name: "Lisa Thompson",
    image: "https://randomuser.me/api/portraits/women/67.jpg",
    text: "As a small business owner, I was worried about the learning curve, but their onboarding process was incredibly smooth. The team guided me every step of the way.",
  },
  {
    id: 9,
    name: "James Anderson",
    image: "https://randomuser.me/api/portraits/men/23.jpg",
    text: "The pricing is fair and transparent. No hidden fees or surprises. I get exactly what I pay for, and the value far exceeds the cost.",
  },
  {
    id: 10,
    name: "Maria Garcia",
    image: "https://randomuser.me/api/portraits/women/89.jpg",
    text: "I love how customizable the platform is. I can tailor it to fit my specific business needs without feeling overwhelmed by unnecessary features.",
  },
  {
    id: 11,
    name: "Robert Kim",
    image: "https://randomuser.me/api/portraits/men/44.jpg",
    text: "The mobile app is fantastic! I can manage my business on the go, and it's just as powerful as the desktop version. Perfect for busy entrepreneurs.",
  },
  {
    id: 12,
    name: "Jennifer Lee",
    image: "https://randomuser.me/api/portraits/women/33.jpg",
    text: "Their security measures give me peace of mind. I know my business data is safe and protected with enterprise-grade security protocols.",
  },
  {
    id: 13,
    name: "Christopher Brown",
    image: "https://randomuser.me/api/portraits/men/78.jpg",
    text: "The integration capabilities are impressive. I can connect all my existing tools and workflows seamlessly, saving me hours of manual work.",
  },
  {
    id: 14,
    name: "Amanda Davis",
    image: "https://randomuser.me/api/portraits/women/56.jpg",
    text: "The reporting features are comprehensive and easy to understand. I can generate professional reports for stakeholders in minutes, not hours.",
  },
  {
    id: 15,
    name: "Daniel Wilson",
    image: "https://randomuser.me/api/portraits/men/91.jpg",
    text: "What sets them apart is their commitment to continuous improvement. They regularly add new features based on user feedback, making the platform better every month.",
  },
  {
    id: 16,
    name: "Sophie Martin",
    image: "https://randomuser.me/api/portraits/women/22.jpg",
    text: "The community and support forums are incredibly helpful. I've learned so many tips and tricks from other users, and the team is always active and responsive.",
  },
];

const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="py-16 px-4 max-w-7xl mx-auto">
      <motion.div 
        variants={fadeIn('up', 0.3)}
        className="text-center mb-12"
      >
        <motion.h2 
          variants={textVariant(0.2)}
          className="text-3xl md:text-4xl font-bold mb-4 transition-colors duration-300 text-heading-color"
        >
          What our happy client say
        </motion.h2>
        <motion.p 
          variants={fadeIn('up', 0.4)}
          className="text-text-color transition-colors duration-300"
        >
          Things that make it the best place to start trading
        </motion.p>
      </motion.div>

      <motion.div 
        variants={fadeIn('up', 0.5)}
        className="relative"
      >

        <Swiper
          modules={[Navigation]}
          spaceBetween={30}
          navigation={{
            nextEl: '.swiper-button-next-custom',
            prevEl: '.swiper-button-prev-custom',
          }}
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          className="testimonials-swiper md:mb-12"
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={testimonial.id} className='h-full md:py-12 py-4'>
              <motion.div 
                variants={fadeIn('up', 0.3 * (index + 1))}
                className="text-center p-4 rounded-lg shadow-md h-full flex flex-col card-bg card-border"
              >

        <div className="overflow-hidden w-full">
          <div className="flex animate-scroll">
            {/* Original slides */}
            {testimonials.map((testimonial, index) => (
              <div key={`original-${testimonial.id}`} className="slide">

                <motion.div 
                  variants={fadeIn('up', 0.3 * (index + 1))}
                  className="text-center bg-white p-4 rounded-lg shadow-md flex flex-col"
                >
                  <motion.div 
                    variants={fadeIn('down', 0.4 * (index + 1))}
                    className="w-24 h-24 mx-auto mb-4"
                  >
                    <motion.img
                      variants={fadeIn('up', 0.5 * (index + 1))}
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-full h-full object-cover rounded-full"
                    />
                  </motion.div>
                  <motion.div 
                    variants={fadeIn('up', 0.4 * (index + 1))}
                    className="flex justify-center mb-2"
                  >
                    {[...Array(5)].map((_, starIndex) => (
                      <motion.span 
                        key={starIndex} 
                        variants={fadeIn('up', 0.1 * starIndex)}
                        className="text-blue-600"
                      >
                        ★
                      </motion.span>
                    ))}
                  </motion.div>
                  <motion.h3 
                    variants={textVariant(0.3)}
                    className="font-semibold text-xl mb-3"
                  >
                    {testimonial.name}
                  </motion.h3>
                  <motion.p 
                    variants={fadeIn('up', 0.6 * (index + 1))}
                    className="text-gray-600"
                  >
                    {testimonial.text}
                  </motion.p>
                </motion.div>
              </div>
            ))}
            
            {/* Duplicate slides for infinite effect */}
            {testimonials.map((testimonial, index) => (
              <div key={`duplicate-${testimonial.id}`} className="slide">
                <motion.div 
                  variants={fadeIn('up', 0.3 * (index + 1))}
                  className="text-center bg-white p-4 rounded-lg shadow-md flex flex-col"
                >

                  {[...Array(5)].map((_, starIndex) => (
                    <motion.span 
                      key={starIndex} 
                      variants={fadeIn('up', 0.1 * starIndex)}
                      className="text-accent-color"
                    >
                      ★
                    </motion.span>
                  ))}
                </motion.div>
                <motion.h3 
                  variants={textVariant(0.3)}
                  className="font-semibold text-xl mb-3 transition-colors duration-300 text-heading-color"
                >
                  {testimonial.name}
                </motion.h3>
                <motion.p 
                  variants={fadeIn('up', 0.6 * (index + 1))}
                  className="text-text-color transition-colors duration-300"
                >
                  {testimonial.text}
                </motion.p>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation Buttons */}
        <motion.div 
          variants={fadeIn('up', 0.7)}
          className="flex justify-center gap-4 mt-8"
        >
          <motion.button 
            variants={fadeIn('right', 0.8)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="swiper-button-prev-custom w-12 h-12 rounded-full border border-border-color flex items-center justify-center hover:bg-accent-color hover:text-white cursor-pointer transition-colors card-border"
          >
            <BsChevronLeft className="w-6 h-6" />
          </motion.button>
          <motion.button 
            variants={fadeIn('left', 0.8)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="swiper-button-next-custom w-12 h-12 rounded-full border border-border-color flex items-center justify-center hover:bg-accent-color hover:text-white cursor-pointer transition-colors card-border"
          >
            <BsChevronRight className="w-6 h-6" />
          </motion.button>
        </motion.div>
                  <motion.div 
                    variants={fadeIn('down', 0.4 * (index + 1))}
                    className="w-24 h-24 mx-auto mb-4"
                  >
                    <motion.img
                      variants={fadeIn('up', 0.5 * (index + 1))}
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-full h-full object-cover rounded-full"
                    />
                  </motion.div>
                  <motion.div 
                    variants={fadeIn('up', 0.4 * (index + 1))}
                    className="flex justify-center mb-2"
                  >
                    {[...Array(5)].map((_, starIndex) => (
                      <motion.span 
                        key={starIndex} 
                        variants={fadeIn('up', 0.1 * starIndex)}
                        className="text-blue-600"
                      >
                        ★
                      </motion.span>
                    ))}
                  </motion.div>
                  <motion.h3 
                    variants={textVariant(0.3)}
                    className="font-semibold text-xl mb-3"
                  >
                    {testimonial.name}
                  </motion.h3>
                  <motion.p 
                    variants={fadeIn('up', 0.6 * (index + 1))}
                    className="text-gray-600"
                  >
                    {testimonial.text}
                  </motion.p>
                </motion.div>
              </div>
            ))}
          </div>
        </div>

      </motion.div>
    </section>
  );
};

export default TestimonialsSection;
