import { MentorType, ServiceType, TestimonialType } from '@/types/type';

export const mentors: MentorType[] = [
  {
    id: 1,
    name: 'Nishant Soni',
    subject: 'Physics',
    institute: 'B.Tech NIT - Surat',
    image: '/images/hero/mentors4.webp'
  },
  {
    id: 2,
    name: 'Ambati Sravani',
    subject: 'Physics',
    institute: 'B.Tech NIT - Surat',
    image: '/images/hero/mentors3.webp'
  },
  {
    id: 3,
    name: 'Swapnil Sanadya',
    subject: 'Physics',
    institute: 'B.Tech NIT - Surat',
    image: '/images/hero/mentors2.webp'
  },
  {
    id: 4,
    name: 'Thangaraj S',
    subject: 'Physics',
    institute: 'B.Tech NIT - Surat',
    image: '/images/hero/mentors1.webp'
  },
  {
    id: 5,
    name: 'Manjunath A Y',
    subject: 'Chemistry',
    institute: 'B.Tech NIT - Suratkal',
    image: '/images/hero/mentors5.webp'
  }
];

export const testimonials: TestimonialType[] = [
  {
    id: 1,
    role: 'Parent of NEET Aspirant',
    image: '/images/hero/testimonial1.webp',
    name: 'Meena R',
    disc: 'I enrolled my daughter at Mindspace Academy for NEET coaching, and her transformation has been incredible. The focused mentorship and regular mock tests helped her build both speed and accuracy.'
  },
  {
    id: 2,
    role: 'Parent of JEE Aspirant',
    image: '/images/hero/testimonial2.webp',
    name: 'Arvind S',
    disc: 'Mindspace Academy’s structured approach and dedicated faculty gave my son the clarity he needed for JEE. The consistent performance tracking really helped him stay motivated'
  },
  {
    id: 3,
    role: 'NEET Aspirant',
    image: '/images/hero/testimonial3.webp',
    name: 'Sneha T',
    disc: 'Joining Mindspace Academy was the best decision for my NEET prep. The personalized attention and exam-focused strategy helped me overcome my weak areas with confidence.'
  },
  {
    id: 4,
    name: 'Vasu V',
    image: '/images/hero/testimonial4.webp',
    role: 'JEE Aspirant',
    disc: 'Mindspace’s teaching style made complex concepts so easy to grasp. The test series and regular feedback sessions pushed me to constantly improve and stay focused.'
  }
];

export const services: ServiceType = {
  jee: [
    {
      id: 1,
      tag: 'Qualified Admission',
      tagColor: 'bg-[#015D85]',
      bgColor: 'bg-[#C7E5F2]',
      borderColor: 'border-[#015D85]',
      list: [
        ' Indian Institute of Information Technology (IIITs)',
        ' Indian Institute of Information Technology (IIITs)'
      ],
      svg: '/images/hero/service1.svg'
    },
    {
      id: 2,
      tag: 'Exam Pattern',
      tagColor: 'bg-[#AB9500]',
      bgColor: 'bg-[#F5F0CE]',
      borderColor: 'border-[#AB9500]',
      list: [' 90 Multiple Choice Questions', '3 Hours Time Duration'],
      svg: '/images/hero/service2.svg'
    },
    {
      id: 3,
      tag: 'Syllabus',
      tagColor: 'bg-[#D76100]',
      bgColor: 'bg-[#FFDDC1]',
      borderColor: 'border-[#D76100]',
      list: [' Physics', 'Chemistry', 'Maths'],
      svg: '/images/hero/service3.svg'
    },
    {
      id: 4,
      tag: 'Question Pattern',
      tagColor: 'bg-[#A60202]',
      bgColor: 'bg-[#FFC1C1]',
      borderColor: 'border-[#A60202]',
      list: [
        ' Each section has 30 questions',
        '4 points for each correct answer',
        '1 point is deducted for each wrong answer'
      ],
      svg: '/images/hero/service4.svg'
    },
    {
      id: 5,
      tag: 'Qualified Admission',
      tagColor: 'bg-[#015D85]',
      bgColor: 'bg-[#C7E5F2]',
      borderColor: 'border-[#015D85]',
      list: [
        ' Indian Institute of Technology (IITs)',
        ' Indian School of Mines(ISM)'
      ],
      svg: '/images/hero/service1.svg'
    },

    {
      id: 6,
      tag: 'Exam Pattern',
      tagColor: 'bg-[#AB9500]',
      bgColor: 'bg-[#F5F0CE]',
      borderColor: 'border-[#AB9500]',
      list: [' 2 Separate exams'],
      svg: '/images/hero/service2.svg'
    },
    {
      id: 7,
      tag: 'Syllabus',
      tagColor: 'bg-[#D76100]',
      bgColor: 'bg-[#FFDDC1]',
      borderColor: 'border-[#D76100]',
      list: [' Physics', 'Chemistry', 'Maths'],
      svg: '/images/hero/service3.svg'
    },

    {
      id: 8,
      tag: 'Question Pattern',
      tagColor: 'bg-[#A60202]',
      bgColor: 'bg-[#FFC1C1]',
      borderColor: 'border-[#A60202]',
      list: ['3-hour duration', '3 sections'],
      svg: '/images/hero/service4.svg'
    }
  ],
  neet: [
    {
      id: 1,
      tag: 'Qualified Admission',
      tagColor: 'bg-[#015D85]',
      bgColor: 'bg-[#C7E5F2]',
      borderColor: 'border-[#015D85]',
      list: [
        ' Bachelor of Medicine and Bachelor of Surgery (MBBS) ',
        ' Bachelor of Dental Surgery (BDS)'
      ],
      svg: '/images/hero/service1.svg'
    },

    {
      id: 2,
      tag: 'Exam Pattern',
      tagColor: 'bg-[#AB9500]',
      bgColor: 'bg-[#F5F0CE]',
      borderColor: 'border-[#AB9500]',
      list: [
        ' 3 Hours Time Duration',
        '180 Multiple Choice Questions',
        '45 Questions from each subject'
      ],
      svg: '/images/hero/service2.svg'
    },
    {
      id: 3,
      tag: 'Question Pattern',
      tagColor: 'bg-[#D76100]',
      bgColor: 'bg-[#FFDDC1]',
      borderColor: 'border-[#D76100]',
      list: [
        ' Each section has 30 questions',
        '4 marks for each correct answer',
        '1 mark is deducted for each wrong answer'
      ],
      svg: '/images/hero/service3.svg'
    }
  ],
  tt: [
    {
      id: 1,
      bgColor: 'bg-[#C7E5F2]',
      borderColor: 'border-[#015D85]',
      list: ['Diploma in Early Childhood Education'],
      svg: '/images/hero/service5.svg'
    },

    {
      id: 2,
      bgColor: 'bg-[#F5F0CE]',
      borderColor: 'border-[#AB9500]',
      list: ['Advanced diploma in Early Childhood Education'],
      svg: '/images/hero/service6.svg'
    },

    {
      id: 3,
      bgColor: 'bg-[#FFDDC1]',
      borderColor: 'border-[#D76100]',
      list: ['Professional Development qualification'],
      svg: '/images/hero/service11.svg'
    },

    {
      id: 4,
      bgColor: 'bg-[#FFC1C1]',
      borderColor: 'border-[#A60202]',
      list: ['Tutors provide great academic support'],
      svg: '/images/hero/service10.svg'
    },
    {
      id: 5,
      bgColor: 'bg-[#FFC1C1]',
      borderColor: 'border-[#A60202]',
      list: ['Practical Training / Internship'],
      svg: '/images/hero/service7.svg'
    },
    {
      id: 6,
      bgColor: 'bg-[#FFDDC1]',
      borderColor: 'border-[#D76100]',
      list: ['Tutors are constantly in touch with trainees'],
      svg: '/images/hero/service8.svg'
    },
    {
      id: 7,
      bgColor: 'bg-[#F5F0CE]',
      borderColor: 'border-[#AB9500]',
      list: ['Academic team is highly accomplished'],
      svg: '/images/hero/service9.svg'
    }
  ]
};
