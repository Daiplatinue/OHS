// Sample company data with static images
export interface Service {
  id: number
  name: string
  description: string
  price: number
  duration: string
  image: string
}

export interface Review {
  id: number
  customerName: string
  rating: number
  date: string
  comment: string
  customerImage: string
}

export interface TeamMember {
  id: number
  name: string
  position: string
  image: string
}

export interface CompanyDetails {
  id: number
  name: string
  description: string
  longDescription: string
  founded: string
  employees: number
  address: string
  phone: string
  email: string
  website: string
  logo: string
  coverPhoto: string
  rating: number
  reviews: number
  services: Service[]
  teamMembers: TeamMember[]
  customerReviews: Review[]
  certifications: string[]
  operatingHours: {
    days: string
    hours: string
  }[]
}

// Sample company data for PipeFix Pros
export const pipeFixProsData: CompanyDetails = {
  id: 1,
  name: "PipeFix Pros",
  description:
    "Expert plumbing solutions with 24/7 emergency service. Specializing in leak repairs, pipe installations, and drain cleaning.",
  longDescription:
    "PipeFix Pros is a leading provider of plumbing services in New York. With years of experience and a dedicated team of professionals, we strive to deliver exceptional service and customer satisfaction. Our company was founded with the mission to provide reliable, high-quality plumbing services at competitive prices. We handle everything from minor repairs to major installations, and our 24/7 emergency service ensures we're always there when you need us most.",
  founded: "2010",
  employees: 35,
  address: "123 Plumber Ave, New York, NY",
  phone: "+1 (212) 555-1234",
  email: "info@pipefixpros.com",
  website: "www.pipefixpros.com",
  logo: "https://cdn.pixabay.com/photo/2025/05/04/17/47/dog-9578735_1280.jpg",
  coverPhoto: "https://cdn.pixabay.com/photo/2025/04/29/13/22/cityscape-9567180_1280.jpg",
  rating: 4.8,
  reviews: 1250,
  services: [
    {
      id: 1,
      name: "Emergency Plumbing",
      description:
        "24/7 emergency plumbing service for urgent issues like burst pipes, major leaks, and sewer backups. Our rapid response team will be at your location within 60 minutes.",
      price: 2500,
      duration: "1-2 hours",
      image: "https://cdn.pixabay.com/photo/2015/07/11/14/53/plumbing-840835_1280.jpg",
    },
    {
      id: 2,
      name: "Pipe Installation",
      description:
        "Professional pipe installation services for new construction or repiping projects. We use high-quality materials and follow all local building codes for lasting results.",
      price: 3500,
      duration: "4-6 hours",
      image: "https://cdn.pixabay.com/photo/2015/10/13/15/23/pipe-986318_1280.jpg",
    },
    {
      id: 3,
      name: "Drain Cleaning",
      description:
        "Comprehensive drain cleaning service using advanced hydro-jetting technology to remove even the toughest clogs and buildup, restoring proper flow to your plumbing system.",
      price: 1800,
      duration: "1-3 hours",
      image: "https://cdn.pixabay.com/photo/2022/10/22/20/49/bathroom-sink-7540024_1280.jpg",
    },
    {
      id: 4,
      name: "Leak Detection & Repair",
      description:
        "State-of-the-art leak detection service using non-invasive methods to locate hidden leaks, followed by professional repair to prevent water damage and waste.",
      price: 2200,
      duration: "2-4 hours",
      image: "https://cdn.pixabay.com/photo/2017/07/19/20/00/allotment-2520218_960_720.jpg",
    },
    {
      id: 5,
      name: "Fixture Installation",
      description:
        "Expert installation of all plumbing fixtures including faucets, sinks, toilets, showers, and bathtubs. We ensure proper fitting and function for years of reliable use.",
      price: 1500,
      duration: "1-2 hours",
      image: "https://cdn.pixabay.com/photo/2016/02/23/08/30/screw-1217107_1280.jpg",
    },
  ],
  teamMembers: [
    {
      id: 1,
      name: "Michael Rodriguez",
      position: "Master Plumber & Founder",
      image: "https://cdn.pixabay.com/photo/2017/08/01/01/33/beanie-2562646_1280.jpg",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      position: "Operations Manager",
      image: "https://cdn.pixabay.com/photo/2018/02/21/08/40/woman-3169726_1280.jpg",
    },
    {
      id: 3,
      name: "David Chen",
      position: "Lead Technician",
      image: "https://cdn.pixabay.com/photo/2016/11/21/12/42/beard-1845166_1280.jpg",
    },
  ],
  customerReviews: [
    {
      id: 1,
      customerName: "Jennifer Martinez",
      rating: 5,
      date: "March 15, 2025",
      comment:
        "Excellent service! The team arrived quickly and fixed our burst pipe in no time. Very professional and clean work.",
      customerImage: "https://cdn.pixabay.com/photo/2017/02/16/23/10/smile-2072907_1280.jpg",
    },
    {
      id: 2,
      customerName: "Robert Wilson",
      rating: 4.5,
      date: "February 28, 2025",
      comment:
        "Very satisfied with the drain cleaning service. They were thorough and explained everything they were doing.",
      customerImage: "https://cdn.pixabay.com/photo/2018/04/27/03/50/portrait-3353699_1280.jpg",
    },
    {
      id: 3,
      customerName: "Lisa Thompson",
      rating: 5,
      date: "January 10, 2025",
      comment:
        "Had them install new fixtures in our bathroom. The work was impeccable and they cleaned up perfectly afterward.",
      customerImage: "https://cdn.pixabay.com/photo/2019/11/03/20/11/portrait-4599553_1280.jpg",
    },
  ],
  certifications: [
    "Licensed Master Plumber",
    "Certified by Plumbing-Heating-Cooling Contractors Association",
    "EPA Lead-Safe Certified",
    "Green Plumbing Certification",
  ],
  operatingHours: [
    { days: "Monday - Friday", hours: "7:00 AM - 8:00 PM" },
    { days: "Saturday", hours: "8:00 AM - 5:00 PM" },
    { days: "Sunday", hours: "Emergency Service Only" },
  ],
}

// Sample company data for LeakBusters
export const leakBustersData: CompanyDetails = {
  id: 2,
  name: "LeakBusters",
  description:
    "Premium plumbing services with guaranteed satisfaction. Our certified technicians handle everything from minor repairs to major installations.",
  longDescription:
    "LeakBusters is a premium plumbing service provider in Los Angeles with over 15 years of industry experience. We pride ourselves on our attention to detail, prompt service, and customer-first approach. Our team of certified plumbers is equipped with the latest tools and technology to handle any plumbing challenge efficiently and effectively. We stand behind our work with a 100% satisfaction guarantee and transparent pricing.",
  founded: "2008",
  employees: 42,
  address: "456 Waterworks Blvd, Los Angeles, CA",
  phone: "+1 (310) 555-7890",
  email: "service@leakbusters.com",
  website: "www.leakbusters.com",
  logo: "https://cdn.pixabay.com/photo/2016/12/13/21/20/plumber-1905111_1280.jpg",
  coverPhoto: "https://cdn.pixabay.com/photo/2016/11/18/17/20/living-room-1835923_1280.jpg",
  rating: 4.9,
  reviews: 2100,
  services: [
    {
      id: 1,
      name: "Premium Leak Detection",
      description:
        "Advanced leak detection using thermal imaging and acoustic technology to pinpoint hidden leaks with minimal disruption to your property.",
      price: 2800,
      duration: "2-3 hours",
      image: "https://cdn.pixabay.com/photo/2015/01/21/14/14/apple-606761_1280.jpg",
    },
    {
      id: 2,
      name: "Whole Home Repiping",
      description:
        "Complete repiping services using PEX, copper, or other high-quality materials to replace outdated or damaged plumbing systems throughout your home.",
      price: 8500,
      duration: "2-3 days",
      image: "https://cdn.pixabay.com/photo/2017/07/08/23/48/copper-2485908_1280.jpg",
    },
    {
      id: 3,
      name: "Luxury Fixture Installation",
      description:
        "Expert installation of high-end plumbing fixtures from premium brands. We ensure perfect fitting and function for your designer bathroom or kitchen.",
      price: 3200,
      duration: "3-5 hours",
      image: "https://cdn.pixabay.com/photo/2016/10/13/09/08/bathroom-1737272_1280.jpg",
    },
    {
      id: 4,
      name: "Sewer Line Services",
      description:
        "Comprehensive sewer line inspection, cleaning, repair, and replacement services using trenchless technology to minimize disruption to your property.",
      price: 4500,
      duration: "4-8 hours",
      image: "https://cdn.pixabay.com/photo/2019/09/29/22/06/manhole-4514309_1280.jpg",
    },
    {
      id: 5,
      name: "Water Heater Installation",
      description:
        "Professional installation of traditional, tankless, and hybrid water heaters. We help you select the right system for your needs and ensure optimal performance.",
      price: 3800,
      duration: "4-6 hours",
      image: "https://cdn.pixabay.com/photo/2016/07/23/03/56/water-heater-1536259_1280.jpg",
    },
  ],
  teamMembers: [
    {
      id: 1,
      name: "James Wilson",
      position: "CEO & Master Plumber",
      image: "https://cdn.pixabay.com/photo/2017/11/02/14/26/model-2911330_1280.jpg",
    },
    {
      id: 2,
      name: "Emily Garcia",
      position: "Customer Relations Manager",
      image: "https://cdn.pixabay.com/photo/2017/02/04/12/25/man-2037255_1280.jpg",
    },
    {
      id: 3,
      name: "Thomas Lee",
      position: "Senior Technician",
      image: "https://cdn.pixabay.com/photo/2016/11/29/09/38/adult-1868750_1280.jpg",
    },
  ],
  customerReviews: [
    {
      id: 1,
      customerName: "Amanda Parker",
      rating: 5,
      date: "April 10, 2025",
      comment:
        "LeakBusters saved us from a major disaster! They detected and fixed a hidden leak that could have caused serious damage. Worth every penny!",
      customerImage: "https://cdn.pixabay.com/photo/2018/01/15/07/51/woman-3083383_1280.jpg",
    },
    {
      id: 2,
      customerName: "Daniel Scott",
      rating: 5,
      date: "March 22, 2025",
      comment:
        "Had my entire house repiped by LeakBusters. The team was incredibly professional, clean, and efficient. Couldn't be happier with the results.",
      customerImage: "https://cdn.pixabay.com/photo/2016/11/18/19/07/happy-1836445_1280.jpg",
    },
    {
      id: 3,
      customerName: "Sophia Kim",
      rating: 4.5,
      date: "February 15, 2025",
      comment:
        "Excellent service installing our new luxury bathroom fixtures. They were careful with our expensive items and the installation is perfect.",
      customerImage: "https://cdn.pixabay.com/photo/2017/04/01/21/06/portrait-2194457_1280.jpg",
    },
  ],
  certifications: [
    "Master Plumber License",
    "Diamond Certified Business",
    "Green Plumbing Professional",
    "Water Sense Partner",
  ],
  operatingHours: [
    { days: "Monday - Friday", hours: "6:00 AM - 9:00 PM" },
    { days: "Saturday", hours: "7:00 AM - 7:00 PM" },
    { days: "Sunday", hours: "9:00 AM - 5:00 PM" },
  ],
}

// Sample company data for HandyHelpers
export const handyHelpersData: CompanyDetails = {
  id: 5,
  name: "HandyHelpers",
  description:
    "Reliable handyman services with attention to detail. We take pride in our craftsmanship and customer satisfaction.",
  longDescription:
    "HandyHelpers has been serving the Seattle area for over a decade, providing top-quality handyman services for homes and businesses. Our team consists of skilled professionals with expertise in various trades, allowing us to handle a wide range of projects from simple repairs to complex installations. We're committed to punctuality, quality workmanship, and transparent pricing, making us the trusted choice for all your handyman needs.",
  founded: "2012",
  employees: 28,
  address: "789 Craftsman Way, Seattle, WA",
  phone: "+1 (206) 555-4321",
  email: "help@handyhelpers.com",
  website: "www.handyhelpers.com",
  logo: "https://cdn.pixabay.com/photo/2017/01/31/17/55/tools-2025953_1280.png",
  coverPhoto: "https://cdn.pixabay.com/photo/2016/11/18/17/46/house-1836070_1280.jpg",
  rating: 4.7,
  reviews: 1500,
  services: [
    {
      id: 1,
      name: "Furniture Assembly",
      description:
        "Professional assembly of all types of furniture including beds, cabinets, desks, and entertainment centers. We ensure everything is properly built and secured.",
      price: 1200,
      duration: "1-3 hours",
      image: "https://cdn.pixabay.com/photo/2017/08/07/12/30/tools-2603431_1280.jpg",
    },
    {
      id: 2,
      name: "Drywall Repair",
      description:
        "Expert drywall repair for holes, cracks, water damage, and other issues. We match textures and prepare surfaces for seamless painting.",
      price: 1500,
      duration: "2-4 hours",
      image: "https://cdn.pixabay.com/photo/2017/11/29/13/28/a-plasterer-2986298_1280.jpg",
    },
    {
      id: 3,
      name: "Door & Window Installation",
      description:
        "Professional installation and repair of interior and exterior doors and windows. We ensure proper fit, function, and weatherproofing.",
      price: 2200,
      duration: "3-5 hours",
      image: "https://cdn.pixabay.com/photo/2016/11/18/17/20/window-1835923_1280.jpg",
    },
    {
      id: 4,
      name: "Deck & Fence Repair",
      description:
        "Comprehensive repair and maintenance services for wooden decks and fences. We replace damaged boards, reinforce structures, and apply protective finishes.",
      price: 2800,
      duration: "4-8 hours",
      image: "https://cdn.pixabay.com/photo/2016/11/18/17/57/house-1836070_1280.jpg",
    },
    {
      id: 5,
      name: "TV Mounting",
      description:
        "Secure mounting of TVs on various wall types with proper anchoring and cable management. We ensure your TV is level and safely installed.",
      price: 950,
      duration: "1-2 hours",
      image: "https://cdn.pixabay.com/photo/2015/09/09/21/33/monitor-933392_1280.jpg",
    },
  ],
  teamMembers: [
    {
      id: 1,
      name: "Robert Anderson",
      position: "Founder & Lead Craftsman",
      image: "https://cdn.pixabay.com/photo/2019/11/10/11/13/portrait-4615580_1280.jpg",
    },
    {
      id: 2,
      name: "Maria Hernandez",
      position: "Project Coordinator",
      image: "https://cdn.pixabay.com/photo/2018/01/21/14/16/woman-3096664_1280.jpg",
    },
    {
      id: 3,
      name: "Kevin Taylor",
      position: "Senior Handyman",
      image: "https://cdn.pixabay.com/photo/2016/11/29/01/34/man-1866574_1280.jpg",
    },
  ],
  customerReviews: [
    {
      id: 1,
      customerName: "Brian Miller",
      rating: 5,
      date: "May 5, 2025",
      comment:
        "HandyHelpers assembled all the furniture for our new office. They were efficient, professional, and left everything spotless. Highly recommend!",
      customerImage: "https://cdn.pixabay.com/photo/2017/08/12/18/31/male-2634974_1280.jpg",
    },
    {
      id: 2,
      customerName: "Rachel Green",
      rating: 4,
      date: "April 18, 2025",
      comment:
        "Great job repairing the drywall damage in our living room. You can't even tell where the holes were. Very reasonable pricing too.",
      customerImage: "https://cdn.pixabay.com/photo/2018/01/15/07/52/woman-3083390_1280.jpg",
    },
    {
      id: 3,
      customerName: "Mark Johnson",
      rating: 5,
      date: "March 30, 2025",
      comment:
        "Had them mount three TVs in our home. They were punctual, professional, and did an excellent job with cable management. Will use again!",
      customerImage: "https://cdn.pixabay.com/photo/2016/11/21/12/42/beard-1845166_1280.jpg",
    },
  ],
  certifications: [
    "Licensed General Contractor",
    "Certified Handyman Professional",
    "Insured and Bonded",
    "Better Business Bureau A+ Rating",
  ],
  operatingHours: [
    { days: "Monday - Friday", hours: "8:00 AM - 6:00 PM" },
    { days: "Saturday", hours: "9:00 AM - 4:00 PM" },
    { days: "Sunday", hours: "Closed" },
  ],
}

// Sample company data for SparkleClean
export const sparkleCleanData: CompanyDetails = {
  id: 6,
  name: "SparkleClean",
  description:
    "Premium home cleaning services using eco-friendly products. Deep cleaning, regular maintenance, and special event preparation.",
  longDescription:
    "SparkleClean is Boston's premier home cleaning service, dedicated to creating healthier, cleaner living spaces for our clients. We use only eco-friendly, non-toxic cleaning products that are safe for your family, pets, and the environment. Our professionally trained cleaning teams follow detailed checklists to ensure consistent, thorough cleaning every time. From regular maintenance to deep cleaning and special event preparation, we deliver spotless results with exceptional attention to detail.",
  founded: "2015",
  employees: 45,
  address: "123 Pristine Street, Boston, MA",
  phone: "+1 (617) 555-8765",
  email: "clean@sparkleclean.com",
  website: "www.sparkleclean.com",
  logo: "https://cdn.pixabay.com/photo/2013/07/13/10/07/man-156584_1280.png",
  coverPhoto: "https://cdn.pixabay.com/photo/2017/08/01/09/34/white-2563976_1280.jpg",
  rating: 4.9,
  reviews: 4200,
  services: [
    {
      id: 1,
      name: "Standard Home Cleaning",
      description:
        "Comprehensive cleaning of all living areas including dusting, vacuuming, mopping, bathroom sanitizing, and kitchen cleaning. Perfect for regular maintenance.",
      price: 2500,
      duration: "2-3 hours",
      image: "https://cdn.pixabay.com/photo/2020/04/14/09/53/cleaning-5041632_1280.jpg",
    },
    {
      id: 2,
      name: "Deep Cleaning",
      description:
        "Intensive cleaning service that reaches areas often missed in regular cleaning. Includes baseboards, ceiling fans, inside cabinets, appliance interiors, and more.",
      price: 4500,
      duration: "4-6 hours",
      image: "https://cdn.pixabay.com/photo/2018/07/15/23/18/bathroom-3540800_1280.jpg",
    },
    {
      id: 3,
      name: "Move-In/Move-Out Cleaning",
      description:
        "Specialized cleaning service for vacant properties. We ensure every surface is thoroughly cleaned, sanitized, and ready for new occupants.",
      price: 5500,
      duration: "5-8 hours",
      image: "https://cdn.pixabay.com/photo/2016/11/18/17/20/living-room-1835923_1280.jpg",
    },
    {
      id: 4,
      name: "Post-Construction Cleaning",
      description:
        "Specialized cleaning to remove construction dust, debris, and residues. We make your newly renovated space spotless and ready to enjoy.",
      price: 6000,
      duration: "6-10 hours",
      image: "https://cdn.pixabay.com/photo/2016/11/18/17/46/house-1836070_1280.jpg",
    },
    {
      id: 5,
      name: "Special Event Cleaning",
      description:
        "Pre and post-event cleaning services for parties, holidays, and special occasions. We prepare your home for guests and handle the cleanup afterward.",
      price: 3500,
      duration: "3-5 hours",
      image: "https://cdn.pixabay.com/photo/2017/08/07/19/07/living-room-2607477_1280.jpg",
    },
  ],
  teamMembers: [
    {
      id: 1,
      name: "Elizabeth Carter",
      position: "Founder & CEO",
      image: "https://cdn.pixabay.com/photo/2017/08/01/08/29/woman-2563491_1280.jpg",
    },
    {
      id: 2,
      name: "Carlos Mendez",
      position: "Operations Director",
      image: "https://cdn.pixabay.com/photo/2015/07/20/12/57/ambassador-852766_1280.jpg",
    },
    {
      id: 3,
      name: "Jasmine Williams",
      position: "Training Manager",
      image: "https://cdn.pixabay.com/photo/2017/08/01/08/29/woman-2563491_1280.jpg",
    },
  ],
  customerReviews: [
    {
      id: 1,
      customerName: "Katherine Reynolds",
      rating: 5,
      date: "June 12, 2025",
      comment:
        "SparkleClean has been cleaning my home weekly for over a year now. They are consistently thorough, professional, and trustworthy. My home has never looked better!",
      customerImage: "https://cdn.pixabay.com/photo/2016/11/29/13/14/attractive-1869761_1280.jpg",
    },
    {
      id: 2,
      customerName: "Thomas Wright",
      rating: 5,
      date: "May 27, 2025",
      comment:
        "We hired SparkleClean for a deep cleaning before hosting a family reunion. They exceeded our expectations in every way. Our guests couldn't stop commenting on how clean everything was!",
      customerImage: "https://cdn.pixabay.com/photo/2016/11/21/12/42/beard-1845166_1280.jpg",
    },
    {
      id: 3,
      customerName: "Michelle Davis",
      rating: 4.5,
      date: "April 15, 2025",
      comment:
        "Their move-out cleaning service saved us our security deposit! The property manager was amazed at how clean the apartment was. Worth every penny.",
      customerImage: "https://cdn.pixabay.com/photo/2018/01/15/07/51/woman-3083381_1280.jpg",
    },
  ],
  certifications: [
    "Green Cleaning Certified",
    "ISSA (International Sanitary Supply Association) Member",
    "Better Business Bureau A+ Rating",
    "Fully Insured and Bonded",
  ],
  operatingHours: [
    { days: "Monday - Friday", hours: "7:00 AM - 7:00 PM" },
    { days: "Saturday", hours: "8:00 AM - 5:00 PM" },
    { days: "Sunday", hours: "By Appointment Only" },
  ],
}

// Sample company data for BugBusters
export const bugBustersData: CompanyDetails = {
  id: 9,
  name: "BugBusters",
  description:
    "Comprehensive pest control solutions for residential and commercial properties. We eliminate all types of pests with safe, effective methods.",
  longDescription:
    "BugBusters is Denver's leading pest control company, providing comprehensive solutions for homes and businesses since 2005. We specialize in the identification, elimination, and prevention of all types of pests including insects, rodents, and wildlife. Our approach combines the latest pest control technologies with environmentally responsible methods to ensure effective results while minimizing impact on your family, pets, and the environment. We stand behind our work with a satisfaction guarantee and offer ongoing maintenance plans to keep your property pest-free year-round.",
  founded: "2005",
  employees: 32,
  address: "456 Exterminator Lane, Denver, CO",
  phone: "+1 (303) 555-9876",
  email: "info@bugbusters.com",
  website: "www.bugbusters.com",
  logo: "https://cdn.pixabay.com/photo/2014/04/03/00/38/ladybug-308519_1280.png",
  coverPhoto: "https://cdn.pixabay.com/photo/2018/04/05/14/09/sunflowers-3292932_1280.jpg",
  rating: 4.8,
  reviews: 2700,
  services: [
    {
      id: 1,
      name: "General Pest Control",
      description:
        "Comprehensive treatment for common household pests including ants, spiders, roaches, and silverfish. Includes interior and exterior treatment with a 90-day guarantee.",
      price: 3500,
      duration: "1-2 hours",
      image: "https://cdn.pixabay.com/photo/2014/04/03/00/38/ladybug-308519_1280.png",
    },
    {
      id: 2,
      name: "Rodent Control",
      description:
        "Complete rodent elimination and exclusion service. We remove existing mice and rats, seal entry points, and set up preventative measures to keep them out.",
      price: 4500,
      duration: "2-4 hours",
      image: "https://cdn.pixabay.com/photo/2014/11/22/00/51/mouse-541709_1280.jpg",
    },
    {
      id: 3,
      name: "Bed Bug Treatment",
      description:
        "Specialized bed bug elimination using heat treatment and targeted applications. Includes follow-up inspection and treatment if necessary.",
      price: 6500,
      duration: "4-6 hours",
      image: "https://cdn.pixabay.com/photo/2017/08/01/09/04/bed-2563336_1280.jpg",
    },
    {
      id: 4,
      name: "Termite Protection",
      description:
        "Comprehensive termite inspection, treatment, and prevention program. Includes installation of monitoring stations and annual inspections.",
      price: 7500,
      duration: "3-5 hours",
      image: "https://cdn.pixabay.com/photo/2014/05/21/16/00/termite-349778_1280.jpg",
    },
    {
      id: 5,
      name: "Wildlife Removal",
      description:
        "Humane removal of wildlife such as raccoons, squirrels, and birds from your property. Includes exclusion work to prevent future intrusions.",
      price: 5500,
      duration: "2-8 hours",
      image: "https://cdn.pixabay.com/photo/2016/11/23/14/37/raccoon-1853050_1280.jpg",
    },
  ],
  teamMembers: [
    {
      id: 1,
      name: "Richard Peterson",
      position: "Founder & Chief Entomologist",
      image: "https://cdn.pixabay.com/photo/2016/11/21/12/42/beard-1845166_1280.jpg",
    },
    {
      id: 2,
      name: "Linda Martinez",
      position: "Operations Manager",
      image: "https://cdn.pixabay.com/photo/2017/02/16/23/10/smile-2072907_1280.jpg",
    },
    {
      id: 3,
      name: "Jason Brooks",
      position: "Lead Technician",
      image: "https://cdn.pixabay.com/photo/2018/04/27/03/50/portrait-3353699_1280.jpg",
    },
  ],
  customerReviews: [
    {
      id: 1,
      customerName: "Gregory Thompson",
      rating: 5,
      date: "July 8, 2025",
      comment:
        "BugBusters eliminated our ant problem completely! The technician was knowledgeable, thorough, and took time to explain what he was doing. Haven't seen a single ant since!",
      customerImage: "https://cdn.pixabay.com/photo/2016/11/21/12/42/beard-1845166_1280.jpg",
    },
    {
      id: 2,
      customerName: "Patricia Nelson",
      rating: 5,
      date: "June 22, 2025",
      comment:
        "We had a terrible mouse problem in our restaurant. BugBusters not only eliminated the issue but helped us implement preventative measures. Their service saved our business!",
      customerImage: "https://cdn.pixabay.com/photo/2018/01/15/07/51/woman-3083383_1280.jpg",
    },
    {
      id: 3,
      customerName: "Samuel Jackson",
      rating: 4.5,
      date: "May 15, 2025",
      comment:
        "The termite protection program has given us peace of mind. The annual inspections are thorough and the team is always professional and punctual.",
      customerImage: "https://cdn.pixabay.com/photo/2017/08/01/01/33/beanie-2562646_1280.jpg",
    },
  ],
  certifications: [
    "Licensed Pest Control Operators",
    "National Pest Management Association Members",
    "GreenPro Certified",
    "QualityPro Certified",
  ],
  operatingHours: [
    { days: "Monday - Friday", hours: "7:00 AM - 6:00 PM" },
    { days: "Saturday", hours: "8:00 AM - 2:00 PM" },
    { days: "Sunday", hours: "Emergency Services Only" },
  ],
}

// Map of company data by ID for easy lookup
export const companyDataMap: Record<number, CompanyDetails> = {
  1: pipeFixProsData,
  2: leakBustersData,
  5: handyHelpersData,
  6: sparkleCleanData,
  9: bugBustersData,
}

// Function to get company data by ID
export const getCompanyDataById = (id: number): CompanyDetails | null => {
  return companyDataMap[id] || null
}

// Function to get mock company data based on seller info
export const getMockCompanyData = (seller: any, productName: string): CompanyDetails => {
  // Check if we have predefined data for this seller
  if (companyDataMap[seller.id]) {
    return companyDataMap[seller.id]
  }

  // Otherwise generate generic mock data
  return {
    id: seller.id,
    name: seller.name,
    description: seller.description,
    longDescription: `${seller.name} is a leading provider of ${productName} services in ${seller.location}. With years of experience and a dedicated team of professionals, we strive to deliver exceptional service and customer satisfaction. Our company was founded with the mission to provide reliable, high-quality services at competitive prices.`,
    founded: "2018",
    employees: 25,
    address: seller.location,
    phone: "+63 (932) 555-" + (1000 + seller.id),
    email: `info@${seller.name.toLowerCase().replace(/\s+/g, "")}.com`,
    website: `www.${seller.name.toLowerCase().replace(/\s+/g, "")}.com`,
    logo: "https://cdn.pixabay.com/photo/2017/01/31/23/42/animal-2028258_1280.png",
    coverPhoto: "https://cdn.pixabay.com/photo/2016/07/07/16/46/dice-1502706_1280.jpg",
    rating: seller.rating,
    reviews: seller.reviews,
    services: [
      {
        id: 1,
        name: "Standard Service",
        description:
          "Our basic service package with all essential features. Includes initial consultation, assessment, and standard implementation with follow-up support.",
        price: seller.startingRate,
        duration: "1-2 hours",
        image: "https://cdn.pixabay.com/photo/2015/07/11/14/53/plumbing-840835_1280.jpg",
      },
      {
        id: 2,
        name: "Premium Service",
        description:
          "Enhanced service with priority support and additional features. Includes everything in the Standard package plus premium features, priority scheduling, and extended support.",
        price: seller.startingRate * 1.5,
        duration: "2-3 hours",
        image: "https://cdn.pixabay.com/photo/2016/09/01/13/52/plumbing-1636422_1280.jpg",
      },
      {
        id: 3,
        name: "Deluxe Package",
        description:
          "Comprehensive service with all premium features and 24/7 support. Our most complete offering with unlimited revisions, dedicated account manager, and lifetime support.",
        price: seller.startingRate * 2,
        duration: "3-4 hours",
        image: "https://cdn.pixabay.com/photo/2017/06/20/14/55/plumber-2423265_1280.jpg",
      },
    ],
    teamMembers: [
      {
        id: 1,
        name: "John Doe",
        position: "CEO & Founder",
        image: "https://cdn.pixabay.com/photo/2017/08/01/01/33/beanie-2562646_1280.jpg",
      },
      {
        id: 2,
        name: "Jane Smith",
        position: "Operations Manager",
        image: "https://cdn.pixabay.com/photo/2018/02/21/08/40/woman-3169726_1280.jpg",
      },
      {
        id: 3,
        name: "Mike Johnson",
        position: "Lead Technician",
        image: "https://cdn.pixabay.com/photo/2016/11/29/09/38/adult-1868750_1280.jpg",
      },
    ],
    customerReviews: [
      {
        id: 1,
        customerName: "Alex Rivera",
        rating: 5,
        date: "March 15, 2025",
        comment: "Excellent service! The team was professional and completed the job quickly.",
        customerImage: "https://cdn.pixabay.com/photo/2017/02/16/23/10/smile-2072907_1280.jpg",
      },
      {
        id: 2,
        customerName: "Maria Santos",
        rating: 4.5,
        date: "February 28, 2025",
        comment: "Very satisfied with the quality of work. Would recommend to others.",
        customerImage: "https://cdn.pixabay.com/photo/2018/04/27/03/50/portrait-3353699_1280.jpg",
      },
      {
        id: 3,
        customerName: "David Chen",
        rating: 4,
        date: "January 10, 2025",
        comment: "Good service overall. Arrived on time and completed the work as promised.",
        customerImage: "https://cdn.pixabay.com/photo/2019/11/03/20/11/portrait-4599553_1280.jpg",
      },
    ],
    certifications: [
      "Professional Trade License",
      "Safety Compliance Certificate",
      "Quality Service Provider",
      "Customer Satisfaction Guarantee",
    ],
    operatingHours: [
      { days: "Monday - Friday", hours: "8:00 AM - 6:00 PM" },
      { days: "Saturday", hours: "9:00 AM - 4:00 PM" },
      { days: "Sunday", hours: "Closed" },
    ],
  }
}