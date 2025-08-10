export interface InternshipOpening {
  id: string;
  title: string;
  titleHindi: string;
  responsibilities: string[];
  responsibilitiesHindi: string[];
  requirements: string[];
  requirementsHindi: string[];
  duration: string;
  durationHindi: string;
  location: string;
  locationHindi: string;
  type: "remote" | "hybrid" | "onsite";
  isActive: boolean;
  postedDate: string;
  applicationDeadline?: string;
}

export const internshipOpenings: InternshipOpening[] = [
  {
    id: "web-dev",
    title: "Web Development Intern",
    titleHindi: "वेब डेवलपमेंट इंटर्न",
    responsibilities: [
      "Develop web applications using React and TypeScript",
      "Work with UI/UX designs",
      "Participate in code reviews and testing",
      "Collaborate on client projects",
      "Learn modern web development practices"
    ],
    responsibilitiesHindi: [
      "React और TypeScript का उपयोग करके वेब एप्लिकेशन विकसित करें",
      "UI/UX डिज़ाइन के साथ काम करें",
      "कोड रिव्यू और टेस्टिंग में भाग लें",
      "क्लाइंट प्रोजेक्ट्स पर सहयोग करें",
      "आधुनिक वेब डेवलपमेंट प्रथाओं को सीखें"
    ],
    requirements: [
      "Strong foundation in JavaScript/TypeScript",
      "Knowledge of React or similar frontend frameworks",
      "Experience with HTML, CSS, and Git",
      "Problem-solving and teamwork skills",
      "Currently pursuing or completed Computer Science degree"
    ],
    requirementsHindi: [
      "JavaScript/TypeScript में मजबूत नींव",
      "React या समान फ्रंटएंड फ्रेमवर्क का ज्ञान",
      "HTML, CSS, और Git का अनुभव",
      "समस्या-समाधान और टीमवर्क कौशल",
      "कंप्यूटर साइंस की डिग्री प्राप्त कर रहे हैं या पूरी की है"
    ],
    duration: "3-6 months",
    durationHindi: "3-6 महीने",
    location: "Hyderabad, India",
    locationHindi: "हैदराबाद, भारत",
    type: "hybrid",
    isActive: true,
    postedDate: "2025-01-27"
  },
  {
    id: "digital-marketing",
    title: "Digital Marketing Intern",
    titleHindi: "डिजिटल मार्केटिंग इंटर्न",
    responsibilities: [
      "Create and manage social media marketing campaigns",
      "Assist with SEO and PPC strategies",
      "Contribute to content creation and content calendar",
      "Marketing analytics and reporting",
      "Support email marketing initiatives"
    ],
    responsibilitiesHindi: [
      "सोशल मीडिया मार्केटिंग अभियान बनाएं और प्रबंधित करें",
      "SEO और PPC रणनीतियों में सहायता करें",
      "कंटेंट क्रिएशन और कंटेंट कैलेंडर में योगदान दें",
      "मार्केटिंग एनालिटिक्स और रिपोर्टिंग",
      "ईमेल मार्केटिंग पहलों का समर्थन करें"
    ],
    requirements: [
      "Studying marketing or related field",
      "Knowledge of social media platforms",
      "Creative thinking and communication skills",
      "Basic knowledge of Google Analytics and Ads",
      "Strong writing and content creation abilities"
    ],
    requirementsHindi: [
      "मार्केटिंग या संबंधित क्षेत्र में पढ़ाई",
      "सोशल मीडिया प्लेटफॉर्म्स का ज्ञान",
      "क्रिएटिव थिंकिंग और कम्युनिकेशन स्किल्स",
      "Google Analytics और Ads का बुनियादी ज्ञान",
      "मजबूत लेखन और कंटेंट क्रिएशन क्षमताएं"
    ],
    duration: "3-6 months",
    durationHindi: "3-6 महीने",
    location: "Hyderabad, India",
    locationHindi: "हैदराबाद, भारत",
    type: "hybrid",
    isActive: true,
    postedDate: "2025-01-27"
  },
  {
    id: "ui-ux-design",
    title: "UI/UX Design Intern",
    titleHindi: "UI/UX डिज़ाइन इंटर्न",
    responsibilities: [
      "Create user interface designs for web and mobile applications",
      "Conduct user research and usability testing",
      "Develop wireframes, prototypes, and mockups",
      "Collaborate with development team on design implementation",
      "Assist in creating design systems and style guides"
    ],
    responsibilitiesHindi: [
      "वेब और मोबाइल एप्लिकेशन के लिए यूजर इंटरफेस डिज़ाइन बनाएं",
      "यूजर रिसर्च और यूजेबिलिटी टेस्टिंग करें",
      "वायरफ्रेम, प्रोटोटाइप और मॉकअप विकसित करें",
      "डिज़ाइन कार्यान्वयन पर डेवलपमेंट टीम के साथ सहयोग करें",
      "डिज़ाइन सिस्टम और स्टाइल गाइड बनाने में सहायता करें"
    ],
    requirements: [
      "Currently pursuing or completed Design degree",
      "Proficiency in Figma, Adobe XD, or similar design tools",
      "Understanding of user-centered design principles",
      "Basic knowledge of HTML/CSS",
      "Portfolio showcasing design projects"
    ],
    requirementsHindi: [
      "डिज़ाइन की डिग्री प्राप्त कर रहे हैं या पूरी की है",
      "Figma, Adobe XD, या समान डिज़ाइन टूल्स में दक्षता",
      "यूजर-केंद्रित डिज़ाइन सिद्धांतों की समझ",
      "HTML/CSS का बुनियादी ज्ञान",
      "डिज़ाइन प्रोजेक्ट्स दिखाने वाला पोर्टफोलियो"
    ],
    duration: "3-6 months",
    durationHindi: "3-6 महीने",
    location: "Hyderabad, India",
    locationHindi: "हैदराबाद, भारत",
    type: "hybrid",
    isActive: true,
    postedDate: "2025-01-27"
  }
];

// Helper function to get active internships
export const getActiveInternships = () => {
  return internshipOpenings.filter(internship => internship.isActive);
};

// Helper function to get internship by ID
export const getInternshipById = (id: string) => {
  return internshipOpenings.find(internship => internship.id === id);
};

// Helper function to add new internship
export const addInternship = (internship: Omit<InternshipOpening, 'id' | 'postedDate'>) => {
  const newInternship: InternshipOpening = {
    ...internship,
    id: `internship-${Date.now()}`,
    postedDate: new Date().toISOString().split('T')[0]
  };
  
  // In a real application, this would save to a database
  // For now, we'll just return the new internship
  return newInternship;
};

// Helper function to update internship
export const updateInternship = (id: string, updates: Partial<InternshipOpening>) => {
  const index = internshipOpenings.findIndex(internship => internship.id === id);
  if (index !== -1) {
    internshipOpenings[index] = { ...internshipOpenings[index], ...updates };
    return internshipOpenings[index];
  }
  return null;
};

// Helper function to deactivate internship
export const deactivateInternship = (id: string) => {
  return updateInternship(id, { isActive: false });
}; 