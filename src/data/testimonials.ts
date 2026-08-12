export type Testimonial = {
  quote: string;
  name: string;
  detail: string;
  rating: number;
  source: string;
  featured?: boolean;
};

/**
 * Verbatim patient reviews as published on the clinic's Google profile.
 * Never edit a patient's words, and never add a review that wasn't written.
 */
export const testimonials: Testimonial[] = [
  {
    quote:
      "Dr Taylor and the lady that runs the show, Rose, are amazing! This is my 5th chiropractor and I'm so happy to have found my last. To find a place where the doctor and the scheduler are both amazing, is so incredibly hard to find. I trust doctor T with my babies, too. He's phenomenal!",
    name: "Lea Zarazua",
    detail: "Local Guide · 27 reviews",
    rating: 5,
    source: "Google",
    featured: true,
  },
  {
    quote:
      "Dr. Taylor is an excellent chiropractor! He is very thorough and patient. He is among the very best. I should know because I've been seeing chiropractors for many years.",
    name: "Dawson B",
    detail: "Local Guide · 14 reviews",
    rating: 5,
    source: "Google",
  },
  {
    quote:
      "This place is awesome! Very laid back atmosphere, with a nice staff. The doctors are very knowledgeable and really listen to your needs. And, the fact that they have massage therapists working right along with them is a MAJOR plus!",
    name: "Stacy Clark",
    detail: "7 reviews",
    rating: 5,
    source: "Google",
  },
  {
    quote:
      "Everyone at AHCHC is so caring and wanting to help you get to back to your best self. I love coming in for my monthly adjustments because I always feel so much better after!",
    name: "Bianca Garcia",
    detail: "8 reviews",
    rating: 5,
    source: "Google",
  },
  {
    quote: "Lorena is amazing! Very tuned into her clients' needs. Highly recommend!",
    name: "Faye Bracey",
    detail: "1 review",
    rating: 5,
    source: "Google",
  },
];

export const featuredTestimonials = testimonials.filter((t) => t.featured);
