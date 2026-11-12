export const contact = {
  whatsapp: '918433953004',
  whatsappDisplay: '+91 84339 53004',
  email: 'rebirthfitnesschool@gmail.com',
  location: 'Mumbai, India · Consultations online worldwide',
  socials: [
    { label: 'Instagram (Tamil)', handle: '@dr.isaccabbas', href: 'https://www.instagram.com/dr.isaccabbas' },
    { label: 'Instagram (English)', handle: '@dr.isaccabbas_english', href: 'https://www.instagram.com/dr.isaccabbas_english' },
    { label: 'YouTube (Tamil)', handle: '@rebirthfitness-tamil', href: 'https://youtube.com/@rebirthfitness-tamil' },
  ],
};

export const whatsappLink = (text = 'Visited your website, wanted to book a consultation') =>
  `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(text)}`;

export const navLinks = [
  ['Home', '/'],
  ['About', '/about'],
  ['Process', '/process'],
  ['Services', '/services'],
  ['Team', '/team'],
  ['Fees', '/fees'],
  ['Reviews', '/testimonials'],
  ['Blog', '/blog'],
  ['Contact', '/contact'],
];

export const stats = [
  ['5,000+', 'Patients worldwide'],
  ['8', 'Doctors on the panel'],
  ['2M+', 'Followers on Instagram & YouTube'],
  ['2019', 'Founded in Mumbai'],
];

export const trust = [
  'GOI Telemedicine Compliant',
  'Panel-Approved Protocols',
  'Personalized & Evidence-Based',
  'Secure Asynchronous Consultations',
];

export const focusAreas = [
  'Muscle Building',
  'Weight Loss',
  'Skin Rejuvenation',
  'Hair Health',
  'Functional Fitness',
  'Lifestyle Coaching',
];

/* ---------------- About ---------------- */

export const values = [
  {
    title: 'Science first',
    text: 'Every recommendation is grounded in peer-reviewed research, clinical guidelines and standard medical textbooks — not trends or quick fixes.',
  },
  {
    title: 'Personal, never generic',
    text: 'Your history, goals, lifestyle and current health shape your protocol. Two patients with the same goal rarely receive the same plan.',
  },
  {
    title: 'Whole-body thinking',
    text: 'Fitness, nutrition, skin, hair, heart and joints are connected. Our panel looks at the body as a complete system, not isolated symptoms.',
  },
  {
    title: 'Wellness for everyone',
    text: 'Subsidised fees for economically weaker sections and free consultations for specially abled people — because wellness is a right, not a privilege.',
  },
];

export const whyUs = [
  ['A full medical panel, not one opinion', 'General physicians, a dermatologist, a cardiologist, an orthopaedic surgeon and clinical nutrition experts review your case together.'],
  ['Doctors who also train', 'Several panel members bring hands-on experience in fitness and physical training, so advice is practical in the gym and the kitchen.'],
  ['Online, from anywhere', 'Asynchronous consultations mean you can submit your details at a convenient time and receive a protocol without travelling.'],
  ['Records that follow you', 'A unique role number keeps your history, protocols and follow-ups organised for every future conversation.'],
];

export const milestones = [
  ['2019', 'Founded in Mumbai', 'Rebirth Fitness School begins as a wellness center started by a panel of medical doctors and experts.'],
  ['Going global', 'Online wellness platform', 'The center evolves into an online platform offering asynchronous consultations to patients worldwide.'],
  ['5,000+', 'Lives transformed', 'Over 5,000 patients helped with fitness, strength, functional performance, hair and skin health, and overall well-being.'],
  ['Today', 'Dr. Isacc Abbas Pedia', 'A medical knowledge platform sharing evidence-based health information with a community of over 2 million followers.'],
];

/* ---------------- Process ---------------- */

export const steps = [
  {
    title: 'Submit Your Profile',
    text: 'Patients submit pre-counselling assessment forms, previous prescriptions, and images (if needed).',
    you: ['Fill in the pre-counselling assessment form honestly and completely', 'Share previous prescriptions, reports and relevant images', 'Tell us your primary goal and any limitations'],
    us: ['Confirm we have everything needed', 'Assign your case to the panel'],
  },
  {
    title: 'Panel Review',
    text: 'Our entire multidisciplinary medical panel reviews every case and prepares a personalized protocol.',
    you: ['Nothing to do — just stay reachable in case we need clarification'],
    us: ['Each specialist reviews your case from their area of expertise', 'Workout, nutrition and lifestyle recommendations are drafted', 'The protocol is refined until the whole panel agrees'],
  },
  {
    title: 'Scheduled Session',
    text: 'Only after approval by all panel members is the protocol explained during a scheduled video, audio, or messaging session.',
    you: ['Join from a quiet place with a stable internet connection', 'Keep a notebook ready and ask questions freely'],
    us: ['Walk you through your protocol step by step', 'Explain the reasoning behind every recommendation'],
  },
  {
    title: 'Ongoing Support',
    text: 'Patients are assigned a unique role number to maintain records and future communications.',
    you: ['Use your role number whenever you contact us', 'Follow the protocol consistently'],
    us: ['Maintain your records securely', 'Keep your history available for every follow-up'],
  },
  {
    title: 'Secured Communication',
    text: 'Secure text messaging allows patients to send updates or queries, including images, which are reviewed and addressed within a set period.',
    you: ['Send progress updates, questions or images through secure messaging'],
    us: ['Review your updates and respond within the set period', 'Adjust your protocol when needed'],
  },
];

export const prepareList = [
  'Previous prescriptions and current medications',
  'Recent blood tests or medical reports (if available)',
  'Current height, weight and any measurements you track',
  'Clear photos where relevant (e.g. hair, skin, posture)',
  'Your typical daily routine — meals, sleep, work and activity',
  'Any injuries, surgeries or ongoing medical conditions',
];

export const modes = [
  ['Video', 'A face-to-face walkthrough of your protocol — ideal for exercise demonstrations and detailed discussions.'],
  ['Audio', 'A phone-style consultation when video is not practical or bandwidth is limited.'],
  ['Messaging', 'Written explanation of your protocol that you can revisit anytime, with images where helpful.'],
];

export const standards = [
  { title: 'Stable Internet', text: 'Consultations must be conducted from a quiet environment with stable internet.' },
  { title: 'Avoid Background Noise / No Travelling', text: 'Minimal disturbances during sessions are required. Do not travel during consultation.' },
  { title: 'Comply with above Conditions', text: 'Failure to meet these conditions may result in session cancellation, refund of charges, and restrictions for future appointments.' },
  { title: 'Discipline', text: 'Patients must follow all instructions provided in the personalized protocol to maximize outcomes.' },
];

export const processFaqs = [
  ['What is an asynchronous consultation?', 'Instead of a single live appointment, you submit your health details, forms and images in advance. The full medical panel reviews them, prepares your protocol, and then explains it to you in a scheduled session. This follows Government of India Telemedicine Guidelines.'],
  ['Why does the whole panel review my case?', 'Fitness, nutrition, skin, hair, heart and joint health influence each other. Having every specialist review your case means your protocol is safe and complete — not just focused on one symptom.'],
  ['What is a role number?', 'A unique identifier assigned to every patient. Quoting it in future messages lets us instantly access your records and previous protocols.'],
  ['Can I use this for an emergency?', 'No. Consultations are advisory and lifestyle-focused. Emergencies or acute conditions must be addressed immediately at a medical facility.'],
];

/* ---------------- Services ---------------- */

export const services = [
  {
    slug: 'workout',
    title: 'Customized Workout Plans',
    short: 'Tailored resistance training, cardio protocols, and functional movement programs designed for your specific goals — whether muscle building, fat loss, or improving performance.',
    icon: 'M6 10h2v4H6zM16 10h2v4h-2zM4 8h2v8H4zM18 8h2v8h-2zM8 11h8v2H8z',
    overview: 'Your training plan is built around your goal, experience level, available equipment and any medical considerations. Programs progress in structured phases so you keep improving safely, whether you train at home or in a gym.',
    forWho: ['Beginners who want a safe, structured start', 'Gym-goers who have hit a plateau', 'Anyone building muscle, losing fat or improving performance', 'People returning to training after a break or injury'],
    includes: ['Resistance training with clear sets, reps and progression', 'Cardio protocols matched to your goal', 'Functional movement and mobility work', 'Technique guidance and exercise substitutions', 'Plan adjustments based on your progress updates'],
    experts: ['Dr. Isacc Abbas', 'Dr. Monish Prashant', 'Dr. Yogesh Shakthivel'],
  },
  {
    slug: 'nutrition',
    title: 'Personalized Nutrition',
    short: 'Evidence-based dietary protocols with supplement guidance, macronutrient targets, and lifestyle-integrated meal strategies — crafted by our nutrition and medical team.',
    icon: 'M12 3c-1 2-4 3-4 7a4 4 0 0 0 8 0c0-4-3-5-4-7zM11 15h2v6h-2z',
    overview: 'Nutrition that fits your life — your food preferences, culture, schedule and budget. We set clear targets and practical meal strategies so healthy eating becomes sustainable rather than a short-term diet.',
    forWho: ['Anyone pursuing fat loss or muscle gain', 'People with metabolic concerns such as weight-related health issues', 'Vegetarians and those with specific dietary preferences', 'Anyone confused by conflicting nutrition advice'],
    includes: ['Calorie and macronutrient targets', 'Meal strategies built around foods you enjoy', 'Evidence-based supplement guidance', 'Therapeutic diet considerations where relevant', 'Adjustments as your body and goals change'],
    experts: ['Dr. Elumalai Sakthivel', 'Dr. Yogesh Shakthivel', 'Dr. Isacc Abbas'],
  },
  {
    slug: 'hair-skin',
    title: 'Hair & Skin Health',
    short: 'Science-backed interventions for hair restoration, skin rejuvenation, and long-term dermatological wellness — guided by our dermatology specialist Dr. Satyajeet Kangle.',
    icon: 'M12 2l2.4 5.6L20 10l-5.6 2.4L12 18l-2.4-5.6L4 10l5.6-2.4zM19 16l1 2 2 1-2 1-1 2-1-2-2-1 2-1z',
    overview: 'Hair and skin often reflect what is happening inside the body. We combine dermatological expertise with nutrition and lifestyle changes to address root causes, not just surface symptoms.',
    forWho: ['People experiencing hair thinning or hair fall', 'Those wanting healthier, rejuvenated skin', 'Gym-goers concerned about hair or skin changes', 'Anyone seeking long-term dermatological wellness'],
    includes: ['Assessment from photos and history', 'Evidence-based hair restoration guidance', 'Skin rejuvenation and care routines', 'Nutrition and lifestyle support for hair and skin', 'Specialist input from a dermatologist and hair transplant surgeon'],
    experts: ['Dr. Satyajeet Kangle', 'Dr. Isacc Abbas'],
  },
  {
    slug: 'weight-loss',
    title: 'Weight Loss & Obesity',
    short: 'Sustainable, medically supervised weight management — addressing root causes through diet, movement, hormonal balance, and behavioral change rather than crash approaches.',
    icon: 'M12 3a9 9 0 1 0 9 9h-2a7 7 0 1 1-7-7zM11 7h2v5.4l3.5 2-1 1.7L11 13.6z',
    overview: 'Lasting weight loss comes from understanding why weight was gained in the first place. Our medically supervised approach combines nutrition, movement and habit change, with the panel watching for any health factors along the way.',
    forWho: ['People who have tried diets that did not last', 'Those living with obesity or weight-related health concerns', 'Anyone wanting medically supervised fat loss', 'People who want to keep the weight off for good'],
    includes: ['Medical review of health history', 'A realistic calorie and nutrition plan', 'A progressive activity and training plan', 'Behavioural and lifestyle coaching', 'Regular reviews through secure messaging'],
    experts: ['Dr. Isacc Abbas', 'Dr. Elumalai Sakthivel', 'Dr. Tamil Selvan'],
  },
  {
    slug: 'cardiac-ortho',
    title: 'Cardiac & Ortho Wellness',
    short: 'Cardiovascular health optimization and musculoskeletal rehabilitation programs, overseen by our cardiologist Dr. Kawsar Ahmad Tamal and orthopaedic surgeon Dr. Balamurugan.',
    icon: 'M12 21s-8-5.2-8-11a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 10c0 5.8-8 11-8 11z',
    overview: 'Heart and joint health determine how well — and how long — you can stay active. Specialist oversight makes sure your training and lifestyle plan supports your heart and protects your joints.',
    forWho: ['People wanting to improve cardiovascular fitness safely', 'Those managing joint pain or stiffness', 'Anyone returning to activity after a musculoskeletal issue', 'Older adults who want to stay strong and mobile'],
    includes: ['Cardiovascular health optimisation guidance', 'Musculoskeletal rehabilitation programs', 'Safe exercise selection around joint limitations', 'Lifestyle measures supporting heart health', 'Oversight by a cardiologist and an orthopaedic surgeon'],
    experts: ['Dr. Kawsar Ahmad Tamal', 'Dr. Balamurugan'],
  },
  {
    slug: 'lifestyle',
    title: 'Lifestyle & Longevity',
    short: 'Integrated lifestyle medicine protocols addressing sleep, stress, metabolic health, and functional ageing — because true wellness is a lifelong journey, not a destination.',
    icon: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zm0 2a7 7 0 0 1 0 14zM12 5v14',
    overview: 'Small daily habits compound into long-term health. We help you build routines around sleep, stress, movement and nutrition that keep you energetic and functional for decades.',
    forWho: ['Busy professionals with stress and poor sleep', 'Anyone wanting to age well and stay independent', 'People wanting better energy and metabolic health', 'Those who want a sustainable, balanced lifestyle'],
    includes: ['Sleep and recovery guidance', 'Stress management strategies', 'Metabolic health support', 'Functional ageing and mobility work', 'Habit-building plans that fit your routine'],
    experts: ['Dr. Isacc Abbas', 'Dr. Tamil Selvan', 'Dr. Yogesh Shakthivel'],
  },
];

/* ---------------- Team ---------------- */

export const team = [
  {
    name: 'Dr. Isacc Abbas',
    creds: 'MBBS, FMC',
    role: 'Founder',
    photo: '/images/isacc.webp',
    bio: 'A medical doctor, fitness trainer, wellness expert, and medical cosmetology professional with over 14 years of experience in the fitness and wellness field. He provides structured exercise guidance, evidence-based nutrition, sustainable lifestyle practices, and holistic wellness approaches.',
    focus: ['Fitness & body transformation', 'Evidence-based nutrition', 'Medical cosmetology', 'Holistic wellness'],
  },
  {
    name: 'Dr. Yogesh Shakthivel',
    creds: 'MBBS, FMC, PGDC, A.M. (IMSA)',
    role: 'Pursuing MD in Sports Medicine',
    photo: '/images/yogesh.webp',
    bio: 'A medical professional focused on evidence-based healthcare, clinical nutrition, fitness, and comprehensive wellness.',
    focus: ['Sports medicine', 'Clinical nutrition', 'Fitness'],
  },
  {
    name: 'Dr. Kawsar Ahmad Tamal',
    creds: 'MBBS, MD (Cardiology)',
    role: 'Cardiologist',
    photo: '/images/kawsar.png',
    bio: 'A specialist in cardiovascular medicine, overseeing cardiac health optimization within our programs.',
    focus: ['Cardiovascular health', 'Heart-safe exercise', 'Cardiac wellness'],
  },
  {
    name: 'Dr. Satyajeet Kangle',
    creds: 'MBBS, MD (Dermatology)',
    role: 'Dermatologist & Hair Transplant Surgeon',
    photo: '/images/satyajeet.png',
    bio: 'A specialist in dermatology with over 20 years of clinical experience in skin, hair, and nail disorders. He is also a hair transplant surgeon.',
    focus: ['Skin disorders', 'Hair restoration', 'Nail disorders'],
  },
  {
    name: 'Dr. Balamurugan',
    creds: 'MBBS, D.Ortho, MS (Orthopaedics)',
    role: 'Orthopaedic Surgeon',
    photo: '/images/balamurugan.jpg',
    bio: 'A specialist in orthopaedic surgery with over 21 years of clinical experience.',
    focus: ['Orthopaedics', 'Musculoskeletal rehabilitation', 'Joint health'],
  },
  {
    name: 'Dr. Elumalai Sakthivel',
    creds: 'MBBS, DCN',
    role: 'Clinical Nutrition',
    photo: '/images/elumalai.webp',
    bio: 'Focused on clinical nutrition, therapeutic diet and metabolic health, with additional experience in fitness and physical wellness.',
    focus: ['Clinical nutrition', 'Therapeutic diets', 'Metabolic health'],
  },
  {
    name: 'Dr. Monish Prashant',
    creds: 'MBBS',
    role: 'Fitness & Physical Training',
    photo: '/images/monish.jpg',
    bio: 'Brings additional experience in fitness and physical training, focusing on strength, endurance, and functional health.',
    focus: ['Strength', 'Endurance', 'Functional health'],
  },
  {
    name: 'Dr. Tamil Selvan',
    creds: 'MBBS',
    role: 'General Healthcare',
    photo: '/images/tamil.jpg',
    bio: 'Skilled in evidence-based medical practice and general healthcare management.',
    focus: ['Evidence-based medicine', 'General healthcare management'],
  },
];

/* ---------------- Fees ---------------- */

export const fees = [
  {
    name: 'Standard',
    price: '₹300',
    unit: 'per consultation',
    text: 'Full panel-reviewed, personalized wellness protocol with video, audio, or message consultation.',
  },
  {
    name: 'EWS Category',
    price: '₹100',
    unit: 'Economically Weaker Section',
    text: 'The same world-class care at a subsidized rate for those facing financial constraints. No compromise on quality.',
    featured: true,
  },
  {
    name: 'Specially Abled People',
    price: 'FREE',
    unit: 'Zero Cost · Always',
    text: 'Dr. Isacc Abbas initiated free consultations for all specially abled people — because wellness is a right, not a privilege.',
  },
];

export const feeIncludes = [
  'Review of your case by the entire multidisciplinary panel',
  'A personalized protocol covering workout, nutrition and lifestyle',
  'A scheduled video, audio or messaging session to explain it',
  'A unique role number for your records and future communication',
  'Secure messaging for updates and queries',
];

export const feeFaqs = [
  ['Is the care different between categories?', 'No. Every category receives the same panel-reviewed, personalized protocol. Only the fee changes.'],
  ['How do I choose my category?', 'Select it in the booking form — Standard, Economically Weaker Section, or Person with Disability. Our team will guide you through the next steps.'],
  ['When might a fee be refunded?', 'If a session has to be cancelled because consultation conditions (stable internet, a quiet environment, not travelling) are not met, it may result in session cancellation and a refund of charges, along with restrictions for future appointments.'],
  ['Is this a replacement for hospital care?', 'No. Consultations are advisory and lifestyle-focused, and not a substitute for emergency medical care.'],
];

/* ---------------- Contact ---------------- */

export const formOptions = {
  source: ['Instagram', 'YouTube', 'Friends and Family', 'Website'],
  goal: ['Muscle Building', 'Weight Loss / Obesity', 'Hair & Skin Health', 'Cardiac Wellness', 'Orthopaedic / Mobility', 'Nutrition & Lifestyle', 'General Wellness'],
  category: ['Standard (₹300)', 'Economically Weaker Section (₹100)', 'Person with Disability (Free)'],
};

export const nextSteps = [
  ['Send your enquiry', 'Use the form, WhatsApp or email.'],
  ['We reach out', 'Our team guides you through the next steps and shares the assessment form.'],
  ['Get your date', 'You are assigned a date for your consultation.'],
];

/* ---------------- Hero carousel ---------------- */

export const heroSlides = [
  {
    src: '/images/hero-collage.webp',
    alt: 'Dr. Isacc Abbas in a doctor\'s coat and as a fitness athlete',
    tag: 'Founder',
    title: 'Doctor by profession. Athlete by passion.',
    text: 'Dr. Isacc Abbas — 14+ years in fitness & wellness.',
    position: 'center top',
  },
  {
    src: '/images/slide-team.webp',
    alt: 'Rebirth Fitness School doctors giving a thumbs up',
    tag: 'The panel',
    title: 'Every case. Every expert.',
    text: 'A multidisciplinary medical panel reviews your protocol.',
    fit: 'contain',
  },
  {
    src: '/images/slide-hair.webp',
    alt: 'Hair restoration result — before and after',
    tag: 'Real transformation',
    title: 'Hair restoration',
    text: 'Science-backed, dermatologist-guided protocols.',
    beforeAfter: true,
  },
  {
    src: '/images/slide-doctors.webp',
    alt: 'Two Rebirth doctors in a clinic giving a thumbs up',
    tag: 'Panel-approved',
    title: 'Protocols you can trust',
    text: 'Explained only after approval by all panel members.',
    position: 'center 20%',
  },
  {
    src: '/images/slide-skin.webp',
    alt: 'Acne skin treatment result — before and after',
    tag: 'Real transformation',
    title: 'Skin rejuvenation',
    text: 'Clearer, healthier skin from the inside out.',
    beforeAfter: true,
  },
];

/* ---------------- Testimonials ---------------- */

export const videoTestimonials = [1, 2, 3, 4].map((n) => ({
  id: n,
  src: `/videos/review-${n}.mp4`,
  poster: `/videos/review-${n}.jpg`,
  title: `Patient review ${String(n).padStart(2, '0')}`,
}));

export const transformations = [
  {
    src: '/images/slide-hair.webp',
    alt: 'Hair restoration — before and after',
    title: 'Hair restoration',
    text: 'Visible regrowth in thinning areas with a dermatologist-guided protocol.',
  },
  {
    src: '/images/slide-skin.webp',
    alt: 'Acne skin treatment — before and after',
    title: 'Skin rejuvenation',
    text: 'Calmer, clearer skin through treatment, nutrition and lifestyle changes.',
  },
];
