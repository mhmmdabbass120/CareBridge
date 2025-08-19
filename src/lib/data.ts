// Enhanced data service with comprehensive patient and doctor information
export interface Patient {
  id: string;
  name: string;
  age: number;
  phone: string;
  email: string;
  lastVisit: string;
  condition: string;
  status: 'active' | 'inactive' | 'pending';
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  address: string;
  emergencyContact: {
    name: string;
    phone: string;
    relationship: string;
  };
  insurance: string;
  primaryCarePhysician: string;
  allergies: string[];
  medications: string[];
  bloodType: string;
  height: string;
  weight: string;
  bmi: number;
  lastLabResults: string;
  nextAppointment: string;
  notes: string;
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  experience: string;
  phone: string;
  email: string;
  location: string;
  rating: number;
  patients: number;
  nextAvailable: string;
  status: 'available' | 'busy' | 'surgery' | 'on-call' | 'off-duty';
  licenseNumber: string;
  education: string[];
  certifications: string[];
  languages: string[];
  availability: {
    monday: string[];
    tuesday: string[];
    wednesday: string[];
    thursday: string[];
    friday: string[];
    saturday: string[];
    sunday: string[];
  };
  specialties: string[];
  hospitalAffiliations: string[];
  researchInterests: string[];
  publications: number;
  awards: string[];
}

export interface Appointment {
  id: string;
  patient: string;
  doctor: string;
  time: string;
  date: string;
  duration: string;
  type: 'video' | 'clinic' | 'emergency' | 'follow-up' | 'consultation';
  status: 'confirmed' | 'pending' | 'cancelled' | 'completed' | 'rescheduled';
  reason: string;
  location: string;
  notes: string;
  symptoms: string[];
  diagnosis: string;
  treatment: string;
  followUpDate: string;
  insurance: string;
  cost: number;
  paymentStatus: 'pending' | 'paid' | 'partial' | 'waived';
}

export interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
  isFromUser: boolean;
  attachments: string[];
  priority: 'low' | 'normal' | 'high' | 'urgent';
  read: boolean;
  threadId: string;
}

// Enhanced patient data with phone numbers and more details
export const patients: Patient[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    age: 32,
    phone: '+1 (555) 123-4567',
    email: 'sarah.johnson@email.com',
    lastVisit: '2024-01-15',
    condition: 'Diabetes Type 2',
    status: 'active',
    riskLevel: 'medium',
    address: '123 Oak Street, Springfield, IL 62701',
    emergencyContact: {
      name: 'John Johnson',
      phone: '+1 (555) 123-4568',
      relationship: 'Spouse'
    },
    insurance: 'Blue Cross Blue Shield',
    primaryCarePhysician: 'Dr. Amanda Rodriguez',
    allergies: ['Penicillin', 'Sulfa drugs'],
    medications: ['Metformin 500mg', 'Glipizide 5mg'],
    bloodType: 'O+',
    height: '5\'6"',
    weight: '165 lbs',
    bmi: 26.6,
    lastLabResults: '2024-01-10 - A1C: 7.2%',
    nextAppointment: '2024-01-25 2:00 PM',
    notes: 'Patient shows good compliance with medication. Blood sugar levels improving.'
  },
  {
    id: '2',
    name: 'Michael Chen',
    age: 45,
    phone: '+1 (555) 234-5678',
    email: 'michael.chen@email.com',
    lastVisit: '2024-01-10',
    condition: 'Hypertension',
    status: 'active',
    riskLevel: 'high',
    address: '456 Maple Avenue, Chicago, IL 60601',
    emergencyContact: {
      name: 'Lisa Chen',
      phone: '+1 (555) 234-5679',
      relationship: 'Sister'
    },
    insurance: 'Aetna',
    primaryCarePhysician: 'Dr. James Wilson',
    allergies: ['Shellfish', 'Latex'],
    medications: ['Lisinopril 10mg', 'Amlodipine 5mg'],
    bloodType: 'A+',
    height: '5\'10"',
    weight: '185 lbs',
    bmi: 26.5,
    lastLabResults: '2024-01-08 - BP: 145/95 mmHg',
    nextAppointment: '2024-01-20 10:00 AM',
    notes: 'Blood pressure still elevated. Consider medication adjustment.'
  },
  {
    id: '3',
    name: 'Emma Wilson',
    age: 28,
    phone: '+1 (555) 345-6789',
    email: 'emma.wilson@email.com',
    lastVisit: '2024-01-08',
    condition: 'Asthma',
    status: 'active',
    riskLevel: 'low',
    address: '789 Pine Street, Milwaukee, WI 53201',
    emergencyContact: {
      name: 'Robert Wilson',
      phone: '+1 (555) 345-6790',
      relationship: 'Father'
    },
    insurance: 'UnitedHealth',
    primaryCarePhysician: 'Dr. Sarah Chen',
    allergies: ['Dust mites', 'Pollen', 'Pet dander'],
    medications: ['Albuterol inhaler', 'Fluticasone 220mcg'],
    bloodType: 'B+',
    height: '5\'4"',
    weight: '125 lbs',
    bmi: 21.5,
    lastLabResults: '2024-01-05 - Peak flow: 450 L/min',
    nextAppointment: '2024-01-22 3:30 PM',
    notes: 'Asthma well controlled. Peak flow measurements stable.'
  },
  {
    id: '4',
    name: 'David Rodriguez',
    age: 38,
    phone: '+1 (555) 456-7890',
    email: 'david.rodriguez@email.com',
    lastVisit: '2024-01-05',
    condition: 'Heart Disease',
    status: 'inactive',
    riskLevel: 'high',
    address: '321 Elm Street, Detroit, MI 48201',
    emergencyContact: {
      name: 'Maria Rodriguez',
      phone: '+1 (555) 456-7891',
      relationship: 'Wife'
    },
    insurance: 'Cigna',
    primaryCarePhysician: 'Dr. Michael Johnson',
    allergies: ['Aspirin', 'Ibuprofen'],
    medications: ['Metoprolol 25mg', 'Atorvastatin 20mg'],
    bloodType: 'AB+',
    height: '6\'0"',
    weight: '200 lbs',
    bmi: 27.1,
    lastLabResults: '2024-01-02 - Cholesterol: 180 mg/dL',
    nextAppointment: '2024-01-28 11:00 AM',
    notes: 'Post-MI patient. Cardiac rehabilitation recommended.'
  },
  {
    id: '5',
    name: 'Lisa Thompson',
    age: 55,
    phone: '+1 (555) 567-8901',
    email: 'lisa.thompson@email.com',
    lastVisit: '2024-01-12',
    condition: 'Arthritis',
    status: 'active',
    riskLevel: 'medium',
    address: '654 Birch Lane, Cleveland, OH 44101',
    emergencyContact: {
      name: 'William Thompson',
      phone: '+1 (555) 567-8902',
      relationship: 'Husband'
    },
    insurance: 'Humana',
    primaryCarePhysician: 'Dr. Emily Davis',
    allergies: ['Codeine', 'Morphine'],
    medications: ['Celecoxib 200mg', 'Acetaminophen 500mg'],
    bloodType: 'O-',
    height: '5\'7"',
    weight: '150 lbs',
    bmi: 23.5,
    lastLabResults: '2024-01-09 - ESR: 28 mm/hr',
    nextAppointment: '2024-01-26 1:00 PM',
    notes: 'Rheumatoid arthritis. Joint mobility improving with treatment.'
  },
  {
    id: '6',
    name: 'Robert Kim',
    age: 41,
    phone: '+1 (555) 678-9012',
    email: 'robert.kim@email.com',
    lastVisit: '2024-01-14',
    condition: 'Depression',
    status: 'active',
    riskLevel: 'medium',
    address: '987 Cedar Road, Minneapolis, MN 55401',
    emergencyContact: {
      name: 'Jennifer Kim',
      phone: '+1 (555) 678-9013',
      relationship: 'Wife'
    },
    insurance: 'Kaiser Permanente',
    primaryCarePhysician: 'Dr. Amanda Rodriguez',
    allergies: ['None known'],
    medications: ['Sertraline 100mg', 'Bupropion 150mg'],
    bloodType: 'A-',
    height: '5\'9"',
    weight: '170 lbs',
    bmi: 25.1,
    lastLabResults: '2024-01-12 - PHQ-9 Score: 8',
    nextAppointment: '2024-01-23 4:00 PM',
    notes: 'Depression symptoms improving. Continue current medication regimen.'
  },
  {
    id: '7',
    name: 'Maria Garcia',
    age: 29,
    phone: '+1 (555) 789-0123',
    email: 'maria.garcia@email.com',
    lastVisit: '2024-01-11',
    condition: 'Pregnancy',
    status: 'active',
    riskLevel: 'low',
    address: '147 Willow Way, Denver, CO 80201',
    emergencyContact: {
      name: 'Carlos Garcia',
      phone: '+1 (555) 789-0124',
      relationship: 'Husband'
    },
    insurance: 'Anthem',
    primaryCarePhysician: 'Dr. Sarah Chen',
    allergies: ['None known'],
    medications: ['Prenatal vitamins', 'Folic acid'],
    bloodType: 'B-',
    height: '5\'5"',
    weight: '135 lbs',
    bmi: 22.5,
    lastLabResults: '2024-01-08 - Ultrasound: Normal development',
    nextAppointment: '2024-01-24 2:30 PM',
    notes: 'First pregnancy, 24 weeks. All prenatal screenings normal.'
  },
  {
    id: '8',
    name: 'James Anderson',
    age: 67,
    phone: '+1 (555) 890-1234',
    email: 'james.anderson@email.com',
    lastVisit: '2024-01-09',
    condition: 'Prostate Cancer',
    status: 'active',
    riskLevel: 'critical',
    address: '258 Spruce Street, Seattle, WA 98101',
    emergencyContact: {
      name: 'Patricia Anderson',
      phone: '+1 (555) 890-1235',
      relationship: 'Wife'
    },
    insurance: 'Medicare + AARP',
    primaryCarePhysician: 'Dr. Michael Johnson',
    allergies: ['None known'],
    medications: ['Bicalutamide 50mg', 'Leuprolide 3.75mg'],
    bloodType: 'O+',
    height: '5\'11"',
    weight: '175 lbs',
    bmi: 24.4,
    lastLabResults: '2024-01-06 - PSA: 4.2 ng/mL',
    nextAppointment: '2024-01-21 9:00 AM',
    notes: 'Prostate cancer in remission. Continue monitoring PSA levels.'
  }
];

// Enhanced doctor data with phone numbers and more details
export const doctors: Doctor[] = [
  {
    id: '1',
    name: 'Dr. Amanda Rodriguez',
    specialty: 'Cardiology',
    experience: '15 years',
    phone: '+1 (555) 123-4567',
    email: 'amanda.rodriguez@carebridge.com',
    location: 'Main Building, Floor 3',
    rating: 4.9,
    patients: 127,
    nextAvailable: '2024-01-18 2:00 PM',
    status: 'available',
    licenseNumber: 'MD123456',
    education: ['Harvard Medical School', 'Johns Hopkins Residency'],
    certifications: ['Board Certified Cardiologist', 'FACC'],
    languages: ['English', 'Spanish', 'Portuguese'],
    availability: {
      monday: ['9:00 AM', '5:00 PM'],
      tuesday: ['9:00 AM', '5:00 PM'],
      wednesday: ['9:00 AM', '5:00 PM'],
      thursday: ['9:00 AM', '5:00 PM'],
      friday: ['9:00 AM', '3:00 PM'],
      saturday: ['9:00 AM', '12:00 PM'],
      sunday: ['Closed']
    },
    specialties: ['Interventional Cardiology', 'Heart Failure', 'Preventive Cardiology'],
    hospitalAffiliations: ['CareBridge Medical Center', 'City General Hospital'],
    researchInterests: ['Heart failure management', 'Preventive cardiology'],
    publications: 23,
    awards: ['Best Cardiologist 2023', 'Excellence in Patient Care']
  },
  {
    id: '2',
    name: 'Dr. James Wilson',
    specialty: 'Neurology',
    experience: '12 years',
    phone: '+1 (555) 234-5678',
    email: 'james.wilson@carebridge.com',
    location: 'North Wing, Floor 2',
    rating: 4.8,
    patients: 89,
    nextAvailable: '2024-01-19 10:00 AM',
    status: 'busy',
    licenseNumber: 'MD234567',
    education: ['Stanford Medical School', 'UCLA Residency'],
    certifications: ['Board Certified Neurologist', 'FANA'],
    languages: ['English', 'French'],
    availability: {
      monday: ['8:00 AM', '6:00 PM'],
      tuesday: ['8:00 AM', '6:00 PM'],
      wednesday: ['8:00 AM', '6:00 PM'],
      thursday: ['8:00 AM', '6:00 PM'],
      friday: ['8:00 AM', '4:00 PM'],
      saturday: ['Closed'],
      sunday: ['Closed']
    },
    specialties: ['Movement Disorders', 'Epilepsy', 'Multiple Sclerosis'],
    hospitalAffiliations: ['CareBridge Medical Center', 'University Hospital'],
    researchInterests: ['Parkinson\'s disease', 'Epilepsy treatment'],
    publications: 18,
    awards: ['Neurology Research Award', 'Patient Choice Award']
  },
  {
    id: '3',
    name: 'Dr. Sarah Chen',
    specialty: 'Pediatrics',
    experience: '8 years',
    phone: '+1 (555) 345-6789',
    email: 'sarah.chen@carebridge.com',
    location: 'Children\'s Wing, Floor 1',
    rating: 4.9,
    patients: 156,
    nextAvailable: '2024-01-18 4:30 PM',
    status: 'available',
    licenseNumber: 'MD345678',
    education: ['UCSF Medical School', 'Children\'s Hospital Residency'],
    certifications: ['Board Certified Pediatrician', 'FAAP'],
    languages: ['English', 'Mandarin', 'Cantonese'],
    availability: {
      monday: ['8:30 AM', '6:30 PM'],
      tuesday: ['8:30 AM', '6:30 PM'],
      wednesday: ['8:30 AM', '6:30 PM'],
      thursday: ['8:30 AM', '6:30 PM'],
      friday: ['8:30 AM', '5:00 PM'],
      saturday: ['9:00 AM', '2:00 PM'],
      sunday: ['Closed']
    },
    specialties: ['General Pediatrics', 'Adolescent Medicine', 'Developmental Pediatrics'],
    hospitalAffiliations: ['CareBridge Medical Center', 'Children\'s Hospital'],
    researchInterests: ['Childhood obesity', 'Vaccine safety'],
    publications: 12,
    awards: ['Pediatric Excellence Award', 'Community Service Award']
  },
  {
    id: '4',
    name: 'Dr. Michael Johnson',
    specialty: 'Orthopedic Surgery',
    experience: '20 years',
    phone: '+1 (555) 456-7890',
    email: 'michael.johnson@carebridge.com',
    location: 'Surgery Center, Floor 4',
    rating: 4.7,
    patients: 98,
    nextAvailable: '2024-01-22 9:00 AM',
    status: 'surgery',
    licenseNumber: 'MD456789',
    education: ['Yale Medical School', 'Mayo Clinic Residency'],
    certifications: ['Board Certified Orthopedic Surgeon', 'FACS'],
    languages: ['English', 'German'],
    availability: {
      monday: ['7:00 AM', '7:00 PM'],
      tuesday: ['7:00 AM', '7:00 PM'],
      wednesday: ['7:00 AM', '7:00 PM'],
      thursday: ['7:00 AM', '7:00 PM'],
      friday: ['7:00 AM', '5:00 PM'],
      saturday: ['8:00 AM', '12:00 PM'],
      sunday: ['Closed']
    },
    specialties: ['Joint Replacement', 'Sports Medicine', 'Trauma Surgery'],
    hospitalAffiliations: ['CareBridge Medical Center', 'Sports Medicine Institute'],
    researchInterests: ['Minimally invasive surgery', 'Joint preservation'],
    publications: 31,
    awards: ['Surgical Excellence Award', 'Sports Medicine Pioneer']
  },
  {
    id: '5',
    name: 'Dr. Emily Davis',
    specialty: 'Emergency Medicine',
    experience: '10 years',
    phone: '+1 (555) 567-8901',
    email: 'emily.davis@carebridge.com',
    location: 'Emergency Department',
    rating: 4.8,
    patients: 203,
    nextAvailable: '2024-01-18 6:00 PM',
    status: 'on-call',
    licenseNumber: 'MD567890',
    education: ['Columbia Medical School', 'NYU Residency'],
    certifications: ['Board Certified Emergency Physician', 'FACEP'],
    languages: ['English', 'Spanish'],
    availability: {
      monday: ['24/7'],
      tuesday: ['24/7'],
      wednesday: ['24/7'],
      thursday: ['24/7'],
      friday: ['24/7'],
      saturday: ['24/7'],
      sunday: ['24/7']
    },
    specialties: ['Trauma', 'Critical Care', 'Toxicology'],
    hospitalAffiliations: ['CareBridge Medical Center', 'Trauma Center'],
    researchInterests: ['Emergency response protocols', 'Critical care outcomes'],
    publications: 19,
    awards: ['Emergency Medicine Excellence', 'Trauma Care Award']
  },
  {
    id: '6',
    name: 'Dr. Robert Martinez',
    specialty: 'Psychiatry',
    experience: '14 years',
    phone: '+1 (555) 678-9012',
    email: 'robert.martinez@carebridge.com',
    location: 'Mental Health Wing, Floor 2',
    rating: 4.9,
    patients: 112,
    nextAvailable: '2024-01-19 1:00 PM',
    status: 'available',
    licenseNumber: 'MD678901',
    education: ['UCLA Medical School', 'Stanford Residency'],
    certifications: ['Board Certified Psychiatrist', 'FAPA'],
    languages: ['English', 'Spanish', 'Italian'],
    availability: {
      monday: ['9:00 AM', '7:00 PM'],
      tuesday: ['9:00 AM', '7:00 PM'],
      wednesday: ['9:00 AM', '7:00 PM'],
      thursday: ['9:00 AM', '7:00 PM'],
      friday: ['9:00 AM', '5:00 PM'],
      saturday: ['10:00 AM', '3:00 PM'],
      sunday: ['Closed']
    },
    specialties: ['Depression', 'Anxiety Disorders', 'Bipolar Disorder'],
    hospitalAffiliations: ['CareBridge Medical Center', 'Mental Health Institute'],
    researchInterests: ['Treatment-resistant depression', 'Anxiety management'],
    publications: 27,
    awards: ['Psychiatry Excellence Award', 'Mental Health Advocate']
  },
  {
    id: '7',
    name: 'Dr. Jennifer Lee',
    specialty: 'Oncology',
    experience: '16 years',
    phone: '+1 (555) 789-0123',
    email: 'jennifer.lee@carebridge.com',
    location: 'Cancer Center, Floor 5',
    rating: 4.9,
    patients: 78,
    nextAvailable: '2024-01-20 11:00 AM',
    status: 'available',
    licenseNumber: 'MD789012',
    education: ['Johns Hopkins Medical School', 'MD Anderson Residency'],
    certifications: ['Board Certified Oncologist', 'FACP'],
    languages: ['English', 'Korean', 'Japanese'],
    availability: {
      monday: ['8:00 AM', '6:00 PM'],
      tuesday: ['8:00 AM', '6:00 PM'],
      wednesday: ['8:00 AM', '6:00 PM'],
      thursday: ['8:00 AM', '6:00 PM'],
      friday: ['8:00 AM', '4:00 PM'],
      saturday: ['Closed'],
      sunday: ['Closed']
    },
    specialties: ['Breast Cancer', 'Lung Cancer', 'Hematologic Malignancies'],
    hospitalAffiliations: ['CareBridge Medical Center', 'Cancer Research Institute'],
    researchInterests: ['Immunotherapy', 'Precision medicine'],
    publications: 34,
    awards: ['Oncology Research Award', 'Patient Care Excellence']
  },
  {
    id: '8',
    name: 'Dr. Thomas Brown',
    specialty: 'Dermatology',
    experience: '11 years',
    phone: '+1 (555) 890-1234',
    email: 'thomas.brown@carebridge.com',
    location: 'Dermatology Clinic, Floor 1',
    rating: 4.8,
    patients: 134,
    nextAvailable: '2024-01-18 3:00 PM',
    status: 'available',
    licenseNumber: 'MD890123',
    education: ['Northwestern Medical School', 'UCSF Residency'],
    certifications: ['Board Certified Dermatologist', 'FAAD'],
    languages: ['English', 'French'],
    availability: {
      monday: ['8:30 AM', '5:30 PM'],
      tuesday: ['8:30 AM', '5:30 PM'],
      wednesday: ['8:30 AM', '5:30 PM'],
      thursday: ['8:30 AM', '5:30 PM'],
      friday: ['8:30 AM', '4:30 PM'],
      saturday: ['9:00 AM', '2:00 PM'],
      sunday: ['Closed']
    },
    specialties: ['Medical Dermatology', 'Surgical Dermatology', 'Cosmetic Dermatology'],
    hospitalAffiliations: ['CareBridge Medical Center', 'Dermatology Institute'],
    researchInterests: ['Skin cancer prevention', 'Psoriasis treatment'],
    publications: 21,
    awards: ['Dermatology Excellence Award', 'Skin Cancer Prevention Award']
  }
];

// Enhanced appointment data
export const appointments: Appointment[] = [
  {
    id: '1',
    patient: 'Sarah Johnson',
    doctor: 'Dr. Amanda Rodriguez',
    time: '9:00 AM',
    date: '2024-01-18',
    duration: '30 min',
    type: 'follow-up',
    status: 'confirmed',
    reason: 'Diabetes follow-up and medication review',
    location: 'Room 302, Cardiology Wing',
    notes: 'Patient reports improved blood sugar control. Review A1C results.',
    symptoms: ['Fatigue', 'Increased thirst'],
    diagnosis: 'Diabetes Type 2',
    treatment: 'Metformin adjustment',
    followUpDate: '2024-02-15',
    insurance: 'Blue Cross Blue Shield',
    cost: 150,
    paymentStatus: 'paid'
  },
  {
    id: '2',
    patient: 'Michael Chen',
    doctor: 'Dr. James Wilson',
    time: '10:30 AM',
    date: '2024-01-18',
    duration: '45 min',
    type: 'consultation',
    status: 'confirmed',
    reason: 'Neurological consultation for headaches',
    location: 'Room 201, Neurology Wing',
    notes: 'Patient experiencing frequent migraines. Consider imaging studies.',
    symptoms: ['Severe headaches', 'Nausea', 'Light sensitivity'],
    diagnosis: 'Migraine',
    treatment: 'Sumatriptan prescription',
    followUpDate: '2024-02-01',
    insurance: 'Aetna',
    cost: 200,
    paymentStatus: 'pending'
  },
  {
    id: '3',
    patient: 'Emma Wilson',
    doctor: 'Dr. Sarah Chen',
    time: '2:00 PM',
    date: '2024-01-18',
    duration: '30 min',
    type: 'follow-up',
    status: 'pending',
    reason: 'Pediatric asthma check-up',
    location: 'Room 105, Children\'s Wing',
    notes: 'Monitor peak flow measurements and adjust inhaler dosage.',
    symptoms: ['Wheezing', 'Shortness of breath'],
    diagnosis: 'Asthma',
    treatment: 'Albuterol inhaler adjustment',
    followUpDate: '2024-02-08',
    insurance: 'UnitedHealth',
    cost: 120,
    paymentStatus: 'paid'
  },
  {
    id: '4',
    patient: 'David Rodriguez',
    doctor: 'Dr. Michael Johnson',
    time: '3:30 PM',
    date: '2024-01-18',
    duration: '60 min',
    type: 'follow-up',
    status: 'confirmed',
    reason: 'Post-surgery follow-up',
    location: 'Room 410, Surgery Center',
    notes: 'Post-MI patient. Check incision healing and cardiac function.',
    symptoms: ['Chest discomfort', 'Fatigue'],
    diagnosis: 'Post-MI status',
    treatment: 'Cardiac rehabilitation',
    followUpDate: '2024-02-12',
    insurance: 'Cigna',
    cost: 250,
    paymentStatus: 'partial'
  },
  {
    id: '5',
    patient: 'Lisa Thompson',
    doctor: 'Dr. Emily Davis',
    time: '4:00 PM',
    date: '2024-01-18',
    duration: '30 min',
    type: 'follow-up',
    status: 'cancelled',
    reason: 'Arthritis treatment follow-up',
    location: 'Room 205, Rheumatology',
    notes: 'Patient cancelled due to transportation issues. Reschedule needed.',
    symptoms: ['Joint pain', 'Stiffness'],
    diagnosis: 'Rheumatoid arthritis',
    treatment: 'Celecoxib continuation',
    followUpDate: '2024-01-25',
    insurance: 'Humana',
    cost: 180,
    paymentStatus: 'waived'
  },
  {
    id: '6',
    patient: 'Robert Kim',
    doctor: 'Dr. Amanda Rodriguez',
    time: '9:00 AM',
    date: '2024-01-19',
    duration: '30 min',
    type: 'follow-up',
    status: 'confirmed',
    reason: 'Routine check-up and depression monitoring',
    location: 'Room 302, Cardiology Wing',
    notes: 'Monitor depression symptoms and medication effectiveness.',
    symptoms: ['Depression', 'Anxiety'],
    diagnosis: 'Major depressive disorder',
    treatment: 'Sertraline continuation',
    followUpDate: '2024-02-20',
    insurance: 'Kaiser Permanente',
    cost: 150,
    paymentStatus: 'paid'
  },
  {
    id: '7',
    patient: 'Maria Garcia',
    doctor: 'Dr. Sarah Chen',
    time: '11:00 AM',
    date: '2024-01-19',
    duration: '45 min',
    type: 'follow-up',
    status: 'pending',
    reason: 'Prenatal check-up',
    location: 'Room 105, Children\'s Wing',
    notes: '24-week prenatal visit. Check fetal development and maternal health.',
    symptoms: ['None'],
    diagnosis: 'Normal pregnancy',
    treatment: 'Prenatal care continuation',
    followUpDate: '2024-02-02',
    insurance: 'Anthem',
    cost: 200,
    paymentStatus: 'pending'
  },
  {
    id: '8',
    patient: 'James Anderson',
    doctor: 'Dr. Michael Johnson',
    time: '1:00 PM',
    date: '2024-01-19',
    duration: '60 min',
    type: 'consultation',
    status: 'confirmed',
    reason: 'Prostate cancer monitoring',
    location: 'Room 410, Surgery Center',
    notes: 'Monitor PSA levels and discuss treatment options.',
    symptoms: ['None'],
    diagnosis: 'Prostate cancer in remission',
    treatment: 'Active surveillance',
    followUpDate: '2024-02-15',
    insurance: 'Medicare + AARP',
    cost: 300,
    paymentStatus: 'paid'
  },
  {
    id: '9',
    patient: 'Sarah Johnson',
    doctor: 'Dr. Thomas Brown',
    time: '2:30 PM',
    date: '2024-01-19',
    duration: '30 min',
    type: 'consultation',
    status: 'confirmed',
    reason: 'Skin rash evaluation',
    location: 'Room 108, Dermatology Clinic',
    notes: 'Patient reports new skin rash on arms and legs.',
    symptoms: ['Skin rash', 'Itching'],
    diagnosis: 'Contact dermatitis',
    treatment: 'Topical corticosteroid cream',
    followUpDate: '2024-02-05',
    insurance: 'Blue Cross Blue Shield',
    cost: 175,
    paymentStatus: 'paid'
  },
  {
    id: '10',
    patient: 'Michael Chen',
    doctor: 'Dr. Jennifer Lee',
    time: '3:00 PM',
    date: '2024-01-19',
    duration: '45 min',
    type: 'consultation',
    status: 'pending',
    reason: 'Cancer screening consultation',
    location: 'Room 501, Cancer Center',
    notes: 'Discuss appropriate cancer screening based on age and risk factors.',
    symptoms: ['None'],
    diagnosis: 'Preventive consultation',
    treatment: 'Screening recommendations',
    followUpDate: '2024-02-10',
    insurance: 'Aetna',
    cost: 250,
    paymentStatus: 'pending'
  }
];

// Enhanced message data
export const messages: Message[] = [
  {
    id: '1',
    sender: 'Sarah Johnson',
    content: 'Hi Dr. Rodriguez, I hope you\'re doing well. I wanted to follow up on the care plan you sent me last week. I\'ve been following the medication schedule, but I have a question about the evening dose timing.',
    timestamp: '2024-01-18 10:30 AM',
    isFromUser: false,
    attachments: [],
    priority: 'normal',
    read: false,
    threadId: '1'
  },
  {
    id: '2',
    sender: 'Dr. Amanda Rodriguez',
    content: 'Hello Sarah! I\'m glad you reached out. How has the new medication schedule been working for you? I can definitely help adjust the timing if needed.',
    timestamp: '2024-01-18 10:45 AM',
    isFromUser: true,
    attachments: [],
    priority: 'normal',
    read: true,
    threadId: '1'
  },
  {
    id: '3',
    sender: 'Sarah Johnson',
    content: 'The morning dose has been fine, but I\'m having trouble remembering the evening dose. Is there a way to adjust the timing or set a reminder?',
    timestamp: '2024-01-18 11:00 AM',
    isFromUser: false,
    attachments: [],
    priority: 'normal',
    read: false,
    threadId: '1'
  },
  {
    id: '4',
    sender: 'Dr. Amanda Rodriguez',
    content: 'Absolutely! Let me adjust that for you. I\'ll send an updated schedule that might work better with your routine. We can also set up medication reminders through our patient portal.',
    timestamp: '2024-01-18 11:15 AM',
    isFromUser: true,
    attachments: [],
    priority: 'normal',
    read: true,
    threadId: '1'
  },
  {
    id: '5',
    sender: 'Dr. James Wilson',
    content: 'Patient Michael Chen\'s lab results are ready for review. His glucose levels show improvement, but blood pressure is still elevated. Consider medication adjustment.',
    timestamp: '2024-01-18 2:00 PM',
    isFromUser: false,
    attachments: ['lab_results.pdf'],
    priority: 'high',
    read: false,
    threadId: '2'
  },
  {
    id: '6',
    sender: 'Nurse Kelly',
    content: 'Emma Wilson completed her morning vitals check. Blood pressure is 120/80, heart rate 72 bpm. All within normal range.',
    timestamp: '2024-01-18 6:00 AM',
    isFromUser: false,
    attachments: ['vitals_report.pdf'],
    priority: 'normal',
    read: true,
    threadId: '3'
  },
  {
    id: '7',
    sender: 'David Rodriguez',
    content: 'I\'m experiencing some chest discomfort after the exercise routine you prescribed. Should I be concerned?',
    timestamp: '2024-01-17 4:30 PM',
    isFromUser: false,
    attachments: [],
    priority: 'urgent',
    read: false,
    threadId: '4'
  },
  {
    id: '8',
    sender: 'Dr. Michael Johnson',
    content: 'David, please call the office immediately. Chest discomfort after exercise could be concerning. We need to evaluate this right away.',
    timestamp: '2024-01-17 4:45 PM',
    isFromUser: true,
    attachments: [],
    priority: 'urgent',
    read: true,
    threadId: '4'
  },
  {
    id: '9',
    sender: 'Lisa Thompson',
    content: 'My arthritis symptoms have improved significantly with the new treatment plan. Thank you so much!',
    timestamp: '2024-01-16 3:00 PM',
    isFromUser: false,
    attachments: [],
    priority: 'normal',
    read: true,
    threadId: '5'
  },
  {
    id: '10',
    sender: 'Dr. Emily Davis',
    content: 'That\'s wonderful news, Lisa! I\'m so glad the treatment is working well for you. Keep up with the exercises we discussed.',
    timestamp: '2024-01-16 3:15 PM',
    isFromUser: true,
    attachments: [],
    priority: 'normal',
    read: true,
    threadId: '5'
  }
];

// Utility functions
export const getPatientById = (id: string): Patient | undefined => {
  return patients.find(patient => patient.id === id);
};

export const getDoctorById = (id: string): Doctor | undefined => {
  return doctors.find(doctor => doctor.id === id);
};

export const getAppointmentsByDate = (date: string): Appointment[] => {
  return appointments.filter(appointment => appointment.date === date);
};

export const getAppointmentsByDoctor = (doctorId: string): Appointment[] => {
  return appointments.filter(appointment => appointment.doctor === doctorId);
};

export const getAppointmentsByPatient = (patientId: string): Appointment[] => {
  return appointments.filter(appointment => appointment.patient === patientId);
};

export const getMessagesByThread = (threadId: string): Message[] => {
  return messages.filter(message => message.threadId === threadId);
};

export const getUnreadMessageCount = (): number => {
  return messages.filter(message => !message.read).length;
};

export const getHighRiskPatients = (): Patient[] => {
  return patients.filter(patient => patient.riskLevel === 'high' || patient.riskLevel === 'critical');
};

export const getAvailableDoctors = (): Doctor[] => {
  return doctors.filter(doctor => doctor.status === 'available');
};
