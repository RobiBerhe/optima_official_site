export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  organization: string;
};

// Real client testimonials go here. Until there are any, the section shows
// the samples below in development only, so placeholder quotes never go live.
export const testimonials: Testimonial[] = [];

export const sampleTestimonials: Testimonial[] = [
  {
    quote: "Sample testimonial. Replace with a real quote from a client describing their experience working with Optima Technologies.",
    name: "Client Name",
    role: "Job Title",
    organization: "Organization",
  },
  {
    quote: "Sample testimonial. A second client quote goes here, ideally mentioning the project and the results it delivered.",
    name: "Client Name",
    role: "Job Title",
    organization: "Organization",
  },
  {
    quote: "Sample testimonial. A third client quote goes here. Two or three short sentences work best.",
    name: "Client Name",
    role: "Job Title",
    organization: "Organization",
  },
];
