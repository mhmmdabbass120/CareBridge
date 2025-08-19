import { useState, useEffect, useCallback, useMemo } from 'react';
import { patients, doctors, appointments, messages, type Patient, type Doctor, type Appointment, type Message } from '@/lib/data';
import { 
  filterBySearch, 
  sortByDate, 
  groupBy, 
  getRelativeTime, 
  getTimeUntil,
  formatPhoneNumber,
  formatCurrency,
  formatDate,
  formatDateTime
} from '@/lib/utils';

export interface UseHealthcareReturn {
  // State
  patients: Patient[];
  doctors: Doctor[];
  appointments: Appointment[];
  messages: Message[];
  filteredPatients: Patient[];
  filteredDoctors: Doctor[];
  filteredAppointments: Appointment[];
  filteredMessages: Message[];
  
  // Search and filters
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedFilters: Record<string, any>;
  setFilter: (key: string, value: any) => void;
  clearFilters: () => void;
  
  // Sorting
  sortBy: string;
  sortOrder: 'asc' | 'desc';
  setSortBy: (field: string) => void;
  setSortOrder: (order: 'asc' | 'desc') => void;
  
  // Pagination
  currentPage: number;
  itemsPerPage: number;
  setCurrentPage: (page: number) => void;
  setItemsPerPage: (count: number) => void;
  totalPages: number;
  paginatedItems: any[];
  
  // Actions
  addPatient: (patient: Omit<Patient, 'id'>) => void;
  updatePatient: (id: string, updates: Partial<Patient>) => void;
  deletePatient: (id: string) => void;
  
  addDoctor: (doctor: Omit<Doctor, 'id'>) => void;
  updateDoctor: (id: string, updates: Partial<Doctor>) => void;
  deleteDoctor: (id: string) => void;
  
  addAppointment: (appointment: Omit<Appointment, 'id'>) => void;
  updateAppointment: (id: string, updates: Partial<Appointment>) => void;
  deleteAppointment: (id: string) => void;
  
  addMessage: (message: Omit<Message, 'id'>) => void;
  updateMessage: (id: string, updates: Partial<Message>) => void;
  deleteMessage: (id: string) => void;
  
  // Computed values
  stats: {
    totalPatients: number;
    totalDoctors: number;
    totalAppointments: number;
    totalMessages: number;
    activePatients: number;
    availableDoctors: number;
    todayAppointments: number;
    unreadMessages: number;
    highRiskPatients: number;
    pendingAppointments: number;
  };
  
  // Utility functions
  getPatientById: (id: string) => Patient | undefined;
  getDoctorById: (id: string) => Doctor | undefined;
  getAppointmentsByDate: (date: string) => Appointment[];
  getAppointmentsByDoctor: (doctorId: string) => Appointment[];
  getAppointmentsByPatient: (patientId: string) => Appointment[];
  getMessagesByThread: (threadId: string) => Message[];
  
  // Formatting helpers
  formatPhone: (phone: string) => string;
  formatMoney: (amount: number) => string;
  formatDate: (date: string) => string;
  formatDateTime: (dateTime: string) => string;
  getRelativeTime: (date: string) => string;
  getTimeUntil: (date: string) => string;
}

export function useHealthcare(): UseHealthcareReturn {
  // State
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<Record<string, any>>({});
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  
  // Local state for CRUD operations
  const [localPatients, setLocalPatients] = useState<Patient[]>(patients);
  const [localDoctors, setLocalDoctors] = useState<Doctor[]>(doctors);
  const [localAppointments, setLocalAppointments] = useState<Appointment[]>(appointments);
  const [localMessages, setLocalMessages] = useState<Message[]>(messages);

  // Filtered and sorted data
  const filteredPatients = useMemo(() => {
    let filtered = localPatients;
    
    // Apply search
    if (searchTerm) {
      filtered = filterBySearch(filtered, searchTerm, ['name', 'condition', 'email', 'phone']);
    }
    
    // Apply filters
    if (selectedFilters.status && selectedFilters.status !== 'all') {
      filtered = filtered.filter(p => p.status === selectedFilters.status);
    }
    if (selectedFilters.riskLevel && selectedFilters.riskLevel !== 'all') {
      filtered = filtered.filter(p => p.riskLevel === selectedFilters.riskLevel);
    }
    if (selectedFilters.condition) {
      filtered = filtered.filter(p => p.condition.toLowerCase().includes(selectedFilters.condition.toLowerCase()));
    }
    
    // Apply sorting
    filtered = sortByDate(filtered, sortOrder === 'asc');
    
    return filtered;
  }, [localPatients, searchTerm, selectedFilters, sortBy, sortOrder]);

  const filteredDoctors = useMemo(() => {
    let filtered = localDoctors;
    
    if (searchTerm) {
      filtered = filterBySearch(filtered, searchTerm, ['name', 'specialty', 'location', 'email', 'phone']);
    }
    
    if (selectedFilters.specialty && selectedFilters.specialty !== 'all') {
      filtered = filtered.filter(d => d.specialty === selectedFilters.specialty);
    }
    if (selectedFilters.status && selectedFilters.status !== 'all') {
      filtered = filtered.filter(d => d.status === selectedFilters.status);
    }
    if (selectedFilters.experience) {
      filtered = filtered.filter(d => d.experience.includes(selectedFilters.experience));
    }
    
    filtered = sortByDate(filtered, sortOrder === 'asc');
    
    return filtered;
  }, [localDoctors, searchTerm, selectedFilters, sortBy, sortOrder]);

  const filteredAppointments = useMemo(() => {
    let filtered = localAppointments;
    
    if (searchTerm) {
      filtered = filterBySearch(filtered, searchTerm, ['patient', 'doctor', 'reason', 'location']);
    }
    
    if (selectedFilters.status && selectedFilters.status !== 'all') {
      filtered = filtered.filter(a => a.status === selectedFilters.status);
    }
    if (selectedFilters.type && selectedFilters.type !== 'all') {
      filtered = filtered.filter(a => a.type === selectedFilters.type);
    }
    if (selectedFilters.date) {
      filtered = filtered.filter(a => a.date === selectedFilters.date);
    }
    if (selectedFilters.doctor) {
      filtered = filtered.filter(a => a.doctor === selectedFilters.doctor);
    }
    
    filtered = sortByDate(filtered, sortOrder === 'asc');
    
    return filtered;
  }, [localAppointments, searchTerm, selectedFilters, sortBy, sortOrder]);

  const filteredMessages = useMemo(() => {
    let filtered = localMessages;
    
    if (searchTerm) {
      filtered = filterBySearch(filtered, searchTerm, ['sender', 'content']);
    }
    
    if (selectedFilters.priority && selectedFilters.priority !== 'all') {
      filtered = filtered.filter(m => m.priority === selectedFilters.priority);
    }
    if (selectedFilters.read) {
      filtered = filtered.filter(m => m.read === selectedFilters.read);
    }
    if (selectedFilters.threadId) {
      filtered = filtered.filter(m => m.threadId === selectedFilters.threadId);
    }
    
    filtered = sortByDate(filtered, sortOrder === 'asc');
    
    return filtered;
  }, [localMessages, searchTerm, selectedFilters, sortBy, sortOrder]);

  // Pagination
  const totalPages = Math.ceil(filteredPatients.length / itemsPerPage);
  const paginatedItems = filteredPatients.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Stats
  const stats = useMemo(() => ({
    totalPatients: localPatients.length,
    totalDoctors: localDoctors.length,
    totalAppointments: localAppointments.length,
    totalMessages: localMessages.length,
    activePatients: localPatients.filter(p => p.status === 'active').length,
    availableDoctors: localDoctors.filter(d => d.status === 'available').length,
    todayAppointments: localAppointments.filter(a => a.date === new Date().toISOString().split('T')[0]).length,
    unreadMessages: localMessages.filter(m => !m.read).length,
    highRiskPatients: localPatients.filter(p => p.riskLevel === 'high' || p.riskLevel === 'critical').length,
    pendingAppointments: localAppointments.filter(a => a.status === 'pending').length,
  }), [localPatients, localDoctors, localAppointments, localMessages]);

  // Actions
  const addPatient = useCallback((patient: Omit<Patient, 'id'>) => {
    const newPatient: Patient = {
      ...patient,
      id: Math.random().toString(36).substr(2, 9),
    };
    setLocalPatients(prev => [...prev, newPatient]);
  }, []);

  const updatePatient = useCallback((id: string, updates: Partial<Patient>) => {
    setLocalPatients(prev => 
      prev.map(p => p.id === id ? { ...p, ...updates } : p)
    );
  }, []);

  const deletePatient = useCallback((id: string) => {
    setLocalPatients(prev => prev.filter(p => p.id !== id));
  }, []);

  const addDoctor = useCallback((doctor: Omit<Doctor, 'id'>) => {
    const newDoctor: Doctor = {
      ...doctor,
      id: Math.random().toString(36).substr(2, 9),
    };
    setLocalDoctors(prev => [...prev, newDoctor]);
  }, []);

  const updateDoctor = useCallback((id: string, updates: Partial<Doctor>) => {
    setLocalDoctors(prev => 
      prev.map(d => d.id === id ? { ...d, ...updates } : d)
    );
  }, []);

  const deleteDoctor = useCallback((id: string) => {
    setLocalDoctors(prev => prev.filter(d => d.id !== id));
  }, []);

  const addAppointment = useCallback((appointment: Omit<Appointment, 'id'>) => {
    const newAppointment: Appointment = {
      ...appointment,
      id: Math.random().toString(36).substr(2, 9),
    };
    setLocalAppointments(prev => [...prev, newAppointment]);
  }, []);

  const updateAppointment = useCallback((id: string, updates: Partial<Appointment>) => {
    setLocalAppointments(prev => 
      prev.map(a => a.id === id ? { ...a, ...updates } : a)
    );
  }, []);

  const deleteAppointment = useCallback((id: string) => {
    setLocalAppointments(prev => prev.filter(a => a.id !== id));
  }, []);

  const addMessage = useCallback((message: Omit<Message, 'id'>) => {
    const newMessage: Message = {
      ...message,
      id: Math.random().toString(36).substr(2, 9),
    };
    setLocalMessages(prev => [...prev, newMessage]);
  }, []);

  const updateMessage = useCallback((id: string, updates: Partial<Message>) => {
    setLocalMessages(prev => 
      prev.map(m => m.id === id ? { ...m, ...updates } : m)
    );
  }, []);

  const deleteMessage = useCallback((id: string) => {
    setLocalMessages(prev => prev.filter(m => m.id !== m.id));
  }, []);

  // Utility functions
  const getPatientById = useCallback((id: string) => {
    return localPatients.find(p => p.id === id);
  }, [localPatients]);

  const getDoctorById = useCallback((id: string) => {
    return localDoctors.find(d => d.id === id);
  }, [localDoctors]);

  const getAppointmentsByDate = useCallback((date: string) => {
    return localAppointments.filter(a => a.date === date);
  }, [localAppointments]);

  const getAppointmentsByDoctor = useCallback((doctorId: string) => {
    return localAppointments.filter(a => a.doctor === doctorId);
  }, [localAppointments]);

  const getAppointmentsByPatient = useCallback((patientId: string) => {
    return localAppointments.filter(a => a.patient === patientId);
  }, [localAppointments]);

  const getMessagesByThread = useCallback((threadId: string) => {
    return localMessages.filter(m => m.threadId === threadId);
  }, [localMessages]);

  // Filter management
  const setFilter = useCallback((key: string, value: any) => {
    setSelectedFilters(prev => ({
      ...prev,
      [key]: value,
    }));
    setCurrentPage(1); // Reset to first page when filters change
  }, []);

  const clearFilters = useCallback(() => {
    setSelectedFilters({});
    setSearchTerm('');
    setCurrentPage(1);
  }, []);

  // Formatting helpers
  const formatPhone = useCallback((phone: string) => formatPhoneNumber(phone), []);
  const formatMoney = useCallback((amount: number) => formatCurrency(amount), []);
  const formatDateHelper = useCallback((date: string) => formatDate(date), []);
  const formatDateTimeHelper = useCallback((dateTime: string) => formatDateTime(dateTime), []);
  const getRelativeTimeHelper = useCallback((date: string) => getRelativeTime(date), []);
  const getTimeUntilHelper = useCallback((date: string) => getTimeUntil(date), []);

  return {
    // State
    patients: localPatients,
    doctors: localDoctors,
    appointments: localAppointments,
    messages: localMessages,
    filteredPatients,
    filteredDoctors,
    filteredAppointments,
    filteredMessages,
    
    // Search and filters
    searchTerm,
    setSearchTerm,
    selectedFilters,
    setFilter,
    clearFilters,
    
    // Sorting
    sortBy,
    sortOrder,
    setSortBy,
    setSortOrder,
    
    // Pagination
    currentPage,
    itemsPerPage,
    setCurrentPage,
    setItemsPerPage,
    totalPages,
    paginatedItems,
    
    // Actions
    addPatient,
    updatePatient,
    deletePatient,
    addDoctor,
    updateDoctor,
    deleteDoctor,
    addAppointment,
    updateAppointment,
    deleteAppointment,
    addMessage,
    updateMessage,
    deleteMessage,
    
    // Computed values
    stats,
    
    // Utility functions
    getPatientById,
    getDoctorById,
    getAppointmentsByDate,
    getAppointmentsByDoctor,
    getAppointmentsByPatient,
    getMessagesByThread,
    
    // Formatting helpers
    formatPhone,
    formatMoney,
    formatDate: formatDateHelper,
    formatDateTime: formatDateTimeHelper,
    getRelativeTime: getRelativeTimeHelper,
    getTimeUntil: getTimeUntilHelper,
  };
}
