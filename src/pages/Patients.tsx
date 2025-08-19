import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
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
  Calendar,
  Activity,
  MapPin,
  Shield,
  Pill,
  Heart,
  AlertTriangle,
  Eye,
  Edit,
  Trash2,
  Download,
  Printer
} from "lucide-react";
import { useHealthcare } from "@/hooks/use-healthcare";
import { formatPhoneNumber, getRiskLevelColor, getStatusColor, getBMICategory } from "@/lib/utils";
import { AddPatientDialog } from "@/components/AddPatientDialog";

const Patients = () => {
  const userRole: 'doctor' = 'doctor';
  const {
    filteredPatients: patients,
    searchTerm,
    setSearchTerm,
    selectedFilters,
    setFilter,
    clearFilters,
    stats
  } = useHealthcare();

  const getRiskBadgeVariant = (risk: string) => {
    switch (risk) {
      case 'high': return 'destructive';
      case 'medium': return 'secondary';
      case 'low': return 'default';
      case 'critical': return 'destructive';
      default: return 'default';
    }
  };

  const PatientDetailDialog = ({ patient }: { patient: any }) => (
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
            Patient Details: {patient.name}
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
                <span className="font-medium">Age:</span>
                <span>{patient.age} years</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Blood Type:</span>
                <span>{patient.bloodType}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Height:</span>
                <span>{patient.height}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Weight:</span>
                <span>{patient.weight}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">BMI:</span>
                <span className={getBMICategory(patient.bmi).color}>
                  {patient.bmi} - {getBMICategory(patient.bmi).category}
                </span>
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
                <span>{formatPhoneNumber(patient.phone)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>{patient.email}</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5" />
                <span className="text-sm">{patient.address}</span>
              </div>
            </CardContent>
          </Card>

          {/* Medical Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Medical Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="font-medium">Condition:</span>
                <span>{patient.condition}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Risk Level:</span>
                <Badge variant={getRiskBadgeVariant(patient.riskLevel)}>
                  {patient.riskLevel} risk
                </Badge>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Insurance:</span>
                <span>{patient.insurance}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Primary Care:</span>
                <span>{patient.primaryCarePhysician}</span>
              </div>
            </CardContent>
          </Card>

          {/* Allergies & Medications */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Allergies & Medications</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <span className="font-medium">Allergies:</span>
                <div className="mt-1 space-y-1">
                  {patient.allergies.map((allergy: string, index: number) => (
                    <Badge key={index} variant="outline" className="mr-1">
                      {allergy}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <span className="font-medium">Current Medications:</span>
                <div className="mt-1 space-y-1">
                  {patient.medications.map((med: string, index: number) => (
                    <Badge key={index} variant="secondary" className="mr-1">
                      {med}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Emergency Contact */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Emergency Contact</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="font-medium">Name:</span>
                <span>{patient.emergencyContact.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Phone:</span>
                <span>{formatPhoneNumber(patient.emergencyContact.phone)}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Relationship:</span>
                <span>{patient.emergencyContact.relationship}</span>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="font-medium">Last Visit:</span>
                <span>{patient.lastVisit}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Next Appointment:</span>
                <span>{patient.nextAppointment}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Last Lab Results:</span>
                <span className="text-sm">{patient.lastLabResults}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Notes */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Clinical Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{patient.notes}</p>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex justify-end gap-2">
          <Button variant="outline">
            <Edit className="h-4 w-4 mr-2" />
            Edit Patient
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Records
          </Button>
                     <Button variant="outline">
             <Printer className="h-4 w-4 mr-2" />
             Print Summary
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
            <h1 className="text-3xl font-bold tracking-tight">Patients</h1>
            <p className="text-muted-foreground">
              Manage your patient roster and view their comprehensive health information.
            </p>
          </div>
          <AddPatientDialog />
        </div>

        {/* Quick Stats */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
              <User className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalPatients}</div>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Cases</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activePatients}</div>
              <p className="text-xs text-muted-foreground">+8% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">High Risk</CardTitle>
              <AlertTriangle className="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-destructive">{stats.highRiskPatients}</div>
              <p className="text-xs text-muted-foreground">Require attention</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Appointments Today</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.todayAppointments}</div>
              <p className="text-xs text-muted-foreground">Scheduled visits</p>
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
                  placeholder="Search patients by name, condition, phone, or email..." 
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={selectedFilters.status || ''} onValueChange={(value) => setFilter('status', value)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
              <Select value={selectedFilters.riskLevel || ''} onValueChange={(value) => setFilter('riskLevel', value)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Risk Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Risk Levels</SelectItem>
                  <SelectItem value="low">Low Risk</SelectItem>
                  <SelectItem value="medium">Medium Risk</SelectItem>
                  <SelectItem value="high">High Risk</SelectItem>
                  <SelectItem value="critical">Critical Risk</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" onClick={clearFilters}>
                <Filter className="h-4 w-4 mr-2" />
                Clear Filters
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Patient</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Medical Info</TableHead>
                  <TableHead>Risk Level</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Visit</TableHead>
                  <TableHead className="w-[120px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {patients.map((patient) => (
                  <TableRow key={patient.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                          <User className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-medium">{patient.name}</p>
                          <p className="text-sm text-muted-foreground">Age: {patient.age} • {patient.bloodType}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm">
                          <Phone className="h-3 w-3" />
                          {formatPhoneNumber(patient.phone)}
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Mail className="h-3 w-3" />
                          {patient.email}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <p className="text-sm font-medium">{patient.condition}</p>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Pill className="h-3 w-3" />
                          {patient.medications.length} medications
                        </div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Shield className="h-3 w-3" />
                          {patient.allergies.length} allergies
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getRiskBadgeVariant(patient.riskLevel)}>
                        {patient.riskLevel} risk
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={patient.status === 'active' ? 'default' : 'secondary'}>
                        {patient.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>{patient.lastVisit}</div>
                        <div className="text-muted-foreground">Next: {patient.nextAppointment}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <PatientDetailDialog patient={patient} />
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Patients;