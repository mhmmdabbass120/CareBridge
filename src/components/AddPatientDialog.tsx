import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Plus, User, Phone, Mail, MapPin, Shield, Heart } from "lucide-react";
import { useHealthcare } from "@/hooks/use-healthcare";
import { toast } from "sonner";

export const AddPatientDialog = () => {
  const { addPatient } = useHealthcare();
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    phone: "",
    email: "",
    address: "",
    condition: "",
    status: "active",
    riskLevel: "low",
    bloodType: "",
    height: "",
    weight: "",
    insurance: "",
    emergencyContactName: "",
    emergencyContactPhone: "",
    emergencyContactRelationship: "",
    allergies: "",
    medications: "",
    notes: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const patient = {
      name: formData.name,
      age: parseInt(formData.age),
      phone: formData.phone,
      email: formData.email,
      lastVisit: new Date().toISOString().split('T')[0],
      condition: formData.condition,
      status: formData.status as 'active' | 'inactive' | 'pending',
      riskLevel: formData.riskLevel as 'low' | 'medium' | 'high' | 'critical',
      address: formData.address,
      emergencyContact: {
        name: formData.emergencyContactName,
        phone: formData.emergencyContactPhone,
        relationship: formData.emergencyContactRelationship
      },
      insurance: formData.insurance,
      primaryCarePhysician: "Dr. Sarah Smith",
      allergies: formData.allergies.split(',').map(a => a.trim()).filter(a => a),
      medications: formData.medications.split(',').map(m => m.trim()).filter(m => m),
      bloodType: formData.bloodType,
      height: formData.height,
      weight: formData.weight,
      bmi: calculateBMI(formData.weight, formData.height),
      lastLabResults: "Pending",
      nextAppointment: "To be scheduled",
      notes: formData.notes
    };

    addPatient(patient);
    toast.success("Patient added successfully!");
    setOpen(false);
    
    // Reset form
    setFormData({
      name: "",
      age: "",
      phone: "",
      email: "",
      address: "",
      condition: "",
      status: "active",
      riskLevel: "low",
      bloodType: "",
      height: "",
      weight: "",
      insurance: "",
      emergencyContactName: "",
      emergencyContactPhone: "",
      emergencyContactRelationship: "",
      allergies: "",
      medications: "",
      notes: ""
    });
  };

  const calculateBMI = (weight: string, height: string): number => {
    const weightKg = parseFloat(weight.replace(/[^\d.]/g, ''));
    const heightM = parseFloat(height.replace(/[^\d.]/g, '')) / 100; // Convert cm to m
    
    if (weightKg > 0 && heightM > 0) {
      return Number((weightKg / (heightM * heightM)).toFixed(1));
    }
    return 0;
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Patient
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Add New Patient
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
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="age">Age *</Label>
              <Input
                id="age"
                type="number"
                value={formData.age}
                onChange={(e) => handleInputChange('age', e.target.value)}
                required
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

          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              value={formData.address}
              onChange={(e) => handleInputChange('address', e.target.value)}
            />
          </div>

          {/* Medical Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="condition">Primary Condition</Label>
              <Input
                id="condition"
                value={formData.condition}
                onChange={(e) => handleInputChange('condition', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bloodType">Blood Type</Label>
              <Select value={formData.bloodType} onValueChange={(value) => handleInputChange('bloodType', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select blood type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="A+">A+</SelectItem>
                  <SelectItem value="A-">A-</SelectItem>
                  <SelectItem value="B+">B+</SelectItem>
                  <SelectItem value="B-">B-</SelectItem>
                  <SelectItem value="AB+">AB+</SelectItem>
                  <SelectItem value="AB-">AB-</SelectItem>
                  <SelectItem value="O+">O+</SelectItem>
                  <SelectItem value="O-">O-</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="height">Height</Label>
              <Input
                id="height"
                value={formData.height}
                onChange={(e) => handleInputChange('height', e.target.value)}
                placeholder="170 cm"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="weight">Weight</Label>
              <Input
                id="weight"
                value={formData.weight}
                onChange={(e) => handleInputChange('weight', e.target.value)}
                placeholder="70 kg"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="insurance">Insurance</Label>
              <Input
                id="insurance"
                value={formData.insurance}
                onChange={(e) => handleInputChange('insurance', e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select value={formData.status} onValueChange={(value) => handleInputChange('status', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="riskLevel">Risk Level</Label>
              <Select value={formData.riskLevel} onValueChange={(value) => handleInputChange('riskLevel', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low Risk</SelectItem>
                  <SelectItem value="medium">Medium Risk</SelectItem>
                  <SelectItem value="high">High Risk</SelectItem>
                  <SelectItem value="critical">Critical Risk</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Emergency Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Emergency Contact</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="emergencyContactName">Name</Label>
                <Input
                  id="emergencyContactName"
                  value={formData.emergencyContactName}
                  onChange={(e) => handleInputChange('emergencyContactName', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="emergencyContactPhone">Phone</Label>
                <Input
                  id="emergencyContactPhone"
                  value={formData.emergencyContactPhone}
                  onChange={(e) => handleInputChange('emergencyContactPhone', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="emergencyContactRelationship">Relationship</Label>
                <Input
                  id="emergencyContactRelationship"
                  value={formData.emergencyContactRelationship}
                  onChange={(e) => handleInputChange('emergencyContactRelationship', e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Allergies and Medications */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="allergies">Allergies (comma separated)</Label>
              <Textarea
                id="allergies"
                value={formData.allergies}
                onChange={(e) => handleInputChange('allergies', e.target.value)}
                placeholder="Penicillin, Shellfish"
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="medications">Current Medications (comma separated)</Label>
              <Textarea
                id="medications"
                value={formData.medications}
                onChange={(e) => handleInputChange('medications', e.target.value)}
                placeholder="Metformin 500mg, Lisinopril 10mg"
                rows={3}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Clinical Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => handleInputChange('notes', e.target.value)}
              rows={3}
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Add Patient</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
