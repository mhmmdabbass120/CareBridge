import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Plus, User, Phone, Mail, MapPin, GraduationCap } from "lucide-react";
import { useHealthcare } from "@/hooks/use-healthcare";
import { toast } from "sonner";

export const AddDoctorDialog = () => {
  const { addDoctor } = useHealthcare();
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    specialty: "",
    experience: "",
    phone: "",
    email: "",
    location: "",
    licenseNumber: "",
    education: "",
    certifications: "",
    languages: "",
    specialties: "",
    hospitalAffiliations: "",
    researchInterests: "",
    awards: "",
    status: "available"
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const doctor = {
      name: formData.name,
      specialty: formData.specialty,
      experience: formData.experience,
      phone: formData.phone,
      email: formData.email,
      location: formData.location,
      rating: 4.5, // Default rating for new doctors
      patients: 0, // Starting with 0 patients
      nextAvailable: "Available now",
      status: formData.status as 'available' | 'busy' | 'surgery' | 'on-call' | 'off-duty',
      licenseNumber: formData.licenseNumber,
      education: formData.education.split(',').map(e => e.trim()).filter(e => e),
      certifications: formData.certifications.split(',').map(c => c.trim()).filter(c => c),
      languages: formData.languages.split(',').map(l => l.trim()).filter(l => l),
      availability: {
        monday: ['9:00 AM', '5:00 PM'],
        tuesday: ['9:00 AM', '5:00 PM'],
        wednesday: ['9:00 AM', '5:00 PM'],
        thursday: ['9:00 AM', '5:00 PM'],
        friday: ['9:00 AM', '5:00 PM'],
        saturday: ['Closed'],
        sunday: ['Closed']
      },
      specialties: formData.specialties.split(',').map(s => s.trim()).filter(s => s),
      hospitalAffiliations: formData.hospitalAffiliations.split(',').map(h => h.trim()).filter(h => h),
      researchInterests: formData.researchInterests.split(',').map(r => r.trim()).filter(r => r),
      publications: 0, // Starting with 0 publications
      awards: formData.awards.split(',').map(a => a.trim()).filter(a => a)
    };

    addDoctor(doctor);
    toast.success("Doctor added successfully!");
    setOpen(false);
    
    // Reset form
    setFormData({
      name: "",
      specialty: "",
      experience: "",
      phone: "",
      email: "",
      location: "",
      licenseNumber: "",
      education: "",
      certifications: "",
      languages: "",
      specialties: "",
      hospitalAffiliations: "",
      researchInterests: "",
      awards: "",
      status: "available"
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Doctor
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Add New Doctor
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Dr. John Smith"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="specialty">Primary Specialty *</Label>
              <Select value={formData.specialty} onValueChange={(value) => handleInputChange('specialty', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select specialty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Cardiology">Cardiology</SelectItem>
                  <SelectItem value="Neurology">Neurology</SelectItem>
                  <SelectItem value="Pediatrics">Pediatrics</SelectItem>
                  <SelectItem value="Orthopedic Surgery">Orthopedic Surgery</SelectItem>
                  <SelectItem value="Emergency Medicine">Emergency Medicine</SelectItem>
                  <SelectItem value="Psychiatry">Psychiatry</SelectItem>
                  <SelectItem value="Oncology">Oncology</SelectItem>
                  <SelectItem value="Dermatology">Dermatology</SelectItem>
                  <SelectItem value="Internal Medicine">Internal Medicine</SelectItem>
                  <SelectItem value="Family Medicine">Family Medicine</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="experience">Years of Experience</Label>
              <Input
                id="experience"
                value={formData.experience}
                onChange={(e) => handleInputChange('experience', e.target.value)}
                placeholder="10 years"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="licenseNumber">License Number</Label>
              <Input
                id="licenseNumber"
                value={formData.licenseNumber}
                onChange={(e) => handleInputChange('licenseNumber', e.target.value)}
                placeholder="MD123456"
              />
            </div>
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="+1 (555) 123-4567"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="location">Office Location</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                placeholder="Main Building, Floor 3"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Current Status</Label>
              <Select value={formData.status} onValueChange={(value) => handleInputChange('status', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="available">Available</SelectItem>
                  <SelectItem value="busy">Busy</SelectItem>
                  <SelectItem value="surgery">In Surgery</SelectItem>
                  <SelectItem value="on-call">On Call</SelectItem>
                  <SelectItem value="off-duty">Off Duty</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Education and Credentials */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium flex items-center gap-2">
              <GraduationCap className="h-5 w-5" />
              Education & Credentials
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="education">Education (comma separated)</Label>
                <Textarea
                  id="education"
                  value={formData.education}
                  onChange={(e) => handleInputChange('education', e.target.value)}
                  placeholder="Harvard Medical School, Johns Hopkins Residency"
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="certifications">Certifications (comma separated)</Label>
                <Textarea
                  id="certifications"
                  value={formData.certifications}
                  onChange={(e) => handleInputChange('certifications', e.target.value)}
                  placeholder="Board Certified Cardiologist, FACC"
                  rows={3}
                />
              </div>
            </div>
          </div>

          {/* Languages and Specialties */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="languages">Languages (comma separated)</Label>
              <Input
                id="languages"
                value={formData.languages}
                onChange={(e) => handleInputChange('languages', e.target.value)}
                placeholder="English, Spanish, French"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="specialties">Sub-specialties (comma separated)</Label>
              <Input
                id="specialties"
                value={formData.specialties}
                onChange={(e) => handleInputChange('specialties', e.target.value)}
                placeholder="Interventional Cardiology, Heart Failure"
              />
            </div>
          </div>

          {/* Professional Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Professional Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="hospitalAffiliations">Hospital Affiliations (comma separated)</Label>
                <Textarea
                  id="hospitalAffiliations"
                  value={formData.hospitalAffiliations}
                  onChange={(e) => handleInputChange('hospitalAffiliations', e.target.value)}
                  placeholder="CareBridge Medical Center, City General Hospital"
                  rows={2}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="researchInterests">Research Interests (comma separated)</Label>
                <Textarea
                  id="researchInterests"
                  value={formData.researchInterests}
                  onChange={(e) => handleInputChange('researchInterests', e.target.value)}
                  placeholder="Heart failure management, Preventive cardiology"
                  rows={2}
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="awards">Awards & Recognition (comma separated)</Label>
            <Textarea
              id="awards"
              value={formData.awards}
              onChange={(e) => handleInputChange('awards', e.target.value)}
              placeholder="Best Cardiologist 2023, Excellence in Patient Care"
              rows={2}
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Add Doctor</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
