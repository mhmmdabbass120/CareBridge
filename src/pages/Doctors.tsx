import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Search, 
  Plus, 
  Filter,
  MoreHorizontal,
  User,
  Phone,
  Mail,
  MapPin,
  Star,
  Calendar,
  Users,
  Award,
  GraduationCap,
  Languages,
  Clock,
  Building,
  BookOpen,
  Eye,
  Edit,
  Download,
  Printer
} from "lucide-react";
import { useHealthcare } from "@/hooks/use-healthcare";
import { formatPhoneNumber, getStatusColor } from "@/lib/utils";
import { AddDoctorDialog } from "@/components/AddDoctorDialog";

const Doctors = () => {
  const userRole: 'admin' = 'admin';
  const {
    filteredDoctors: doctors,
    searchTerm,
    setSearchTerm,
    selectedFilters,
    setFilter,
    clearFilters,
    stats
  } = useHealthcare();

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'available': return 'default';
      case 'busy': return 'secondary';
      case 'surgery': return 'destructive';
      case 'on-call': return 'secondary';
      case 'off-duty': return 'outline';
      default: return 'default';
    }
  };

  const DoctorDetailDialog = ({ doctor }: { doctor: any }) => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm">
          <Eye className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Doctor Profile: {doctor.name}
          </DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="font-medium">Specialty:</span>
                <span>{doctor.specialty}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Experience:</span>
                <span>{doctor.experience}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">License Number:</span>
                <span className="font-mono">{doctor.licenseNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Rating:</span>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                  <span>{doctor.rating}</span>
                </div>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Patient Count:</span>
                <span>{doctor.patients} patients</span>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>{formatPhoneNumber(doctor.phone)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>{doctor.email}</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5" />
                <span className="text-sm">{doctor.location}</span>
              </div>
            </CardContent>
          </Card>

          {/* Education & Certifications */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <GraduationCap className="h-4 w-4" />
                Education & Certifications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <span className="font-medium">Education:</span>
                <div className="mt-1 space-y-1">
                  {doctor.education.map((edu: string, index: number) => (
                    <div key={index} className="text-sm text-muted-foreground">
                      • {edu}
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <span className="font-medium">Certifications:</span>
                <div className="mt-1 space-y-1">
                  {doctor.certifications.map((cert: string, index: number) => (
                    <Badge key={index} variant="outline" className="mr-1">
                      {cert}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Specialties & Languages */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Award className="h-4 w-4" />
                Specialties & Languages
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <span className="font-medium">Specialties:</span>
                <div className="mt-1 space-y-1">
                  {doctor.specialties.map((specialty: string, index: number) => (
                    <Badge key={index} variant="secondary" className="mr-1">
                      {specialty}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <span className="font-medium">Languages:</span>
                <div className="mt-1 space-y-1">
                  {doctor.languages.map((lang: string, index: number) => (
                    <Badge key={index} variant="outline" className="mr-1">
                      {lang}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Availability Schedule */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Availability Schedule
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {Object.entries(doctor.availability).map(([day, hours]) => (
                <div key={day} className="flex justify-between">
                  <span className="font-medium capitalize">{day}:</span>
                  <span className="text-sm text-muted-foreground">
                    {Array.isArray(hours) ? hours.join(' - ') : String(hours)}
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Hospital Affiliations & Research */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Building className="h-4 w-4" />
                Affiliations & Research
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <span className="font-medium">Hospital Affiliations:</span>
                <div className="mt-1 space-y-1">
                  {doctor.hospitalAffiliations.map((hospital: string, index: number) => (
                    <div key={index} className="text-sm text-muted-foreground">
                      • {hospital}
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <span className="font-medium">Research Interests:</span>
                <div className="mt-1 space-y-1">
                  {doctor.researchInterests.map((interest: string, index: number) => (
                    <div key={index} className="text-sm text-muted-foreground">
                      • {interest}
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Publications:</span>
                <span>{doctor.publications} papers</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Awards & Recognition */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Award className="h-4 w-4" />
              Awards & Recognition
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {doctor.awards.map((award: string, index: number) => (
                <Badge key={index} variant="secondary">
                  {award}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex justify-end gap-2">
          <Button variant="outline">
            <Edit className="h-4 w-4 mr-2" />
            Edit Profile
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Profile
          </Button>
          <Button variant="outline">
                         <Printer className="h-4 w-4 mr-2" />
             Print Profile
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );

  return (
    <Layout userRole={userRole}>
      <div className="container max-w-7xl mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Medical Staff</h1>
            <p className="text-muted-foreground">
              Manage doctors, schedules, and comprehensive staff information.
            </p>
          </div>
          <AddDoctorDialog />
        </div>

        {/* Quick Stats */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Doctors</CardTitle>
              <User className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalDoctors}</div>
              <p className="text-xs text-muted-foreground">+2 this month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Available Now</CardTitle>
              <div className="h-2 w-2 rounded-full bg-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.availableDoctors}</div>
              <p className="text-xs text-muted-foreground">
                {Math.round((stats.availableDoctors / stats.totalDoctors) * 100)}% availability
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
              <Star className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4.8</div>
              <p className="text-xs text-muted-foreground">Based on patient reviews</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {doctors.reduce((sum, doctor) => sum + doctor.patients, 0)}
              </div>
              <p className="text-xs text-muted-foreground">Across all doctors</p>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search doctors by name, specialty, phone, or location..." 
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={selectedFilters.specialty || ''} onValueChange={(value) => setFilter('specialty', value)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Specialty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Specialties</SelectItem>
                  <SelectItem value="Cardiology">Cardiology</SelectItem>
                  <SelectItem value="Neurology">Neurology</SelectItem>
                  <SelectItem value="Pediatrics">Pediatrics</SelectItem>
                  <SelectItem value="Orthopedic Surgery">Orthopedic Surgery</SelectItem>
                  <SelectItem value="Emergency Medicine">Emergency Medicine</SelectItem>
                  <SelectItem value="Psychiatry">Psychiatry</SelectItem>
                  <SelectItem value="Oncology">Oncology</SelectItem>
                  <SelectItem value="Dermatology">Dermatology</SelectItem>
                </SelectContent>
              </Select>
              <Select value={selectedFilters.status || ''} onValueChange={(value) => setFilter('status', value)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="available">Available</SelectItem>
                  <SelectItem value="busy">Busy</SelectItem>
                  <SelectItem value="surgery">In Surgery</SelectItem>
                  <SelectItem value="on-call">On Call</SelectItem>
                  <SelectItem value="off-duty">Off Duty</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" onClick={clearFilters}>
                <Filter className="h-4 w-4 mr-2" />
                Clear Filters
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6">
              {doctors.map((doctor) => (
                <Card key={doctor.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        <div className="h-16 w-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                          <User className="h-8 w-8 text-white" />
                        </div>
                        <div className="space-y-2">
                          <div>
                            <h3 className="text-lg font-semibold">{doctor.name}</h3>
                            <p className="text-muted-foreground">{doctor.specialty} • {doctor.experience}</p>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                            <div className="flex items-center gap-2">
                              <Phone className="h-3 w-3" />
                              {formatPhoneNumber(doctor.phone)}
                            </div>
                            <div className="flex items-center gap-2">
                              <Mail className="h-3 w-3" />
                              {doctor.email}
                            </div>
                            <div className="flex items-center gap-2">
                              <MapPin className="h-3 w-3" />
                              {doctor.location}
                            </div>
                            <div className="flex items-center gap-2">
                              <Users className="h-3 w-3" />
                              {doctor.patients} patients
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {doctor.specialties.slice(0, 3).map((specialty, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {specialty}
                              </Badge>
                            ))}
                            {doctor.specialties.length > 3 && (
                              <Badge variant="outline" className="text-xs">
                                +{doctor.specialties.length - 3} more
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="text-right space-y-2">
                        <div className="flex items-center gap-2">
                          <Badge variant={getStatusBadgeVariant(doctor.status)}>
                            {doctor.status.replace('-', ' ')}
                          </Badge>
                          <div className="flex items-center gap-1">
                            <DoctorDetailDialog doctor={doctor} />
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          <span className="text-sm font-medium">{doctor.rating}</span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Next available: {doctor.nextAvailable}
                        </p>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <BookOpen className="h-3 w-3" />
                          {doctor.publications} publications
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Doctors;