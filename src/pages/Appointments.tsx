import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Search, 
  Plus, 
  Filter,
  Calendar,
  Clock,
  User,
  Video,
  MapPin,
  Activity,
  ChevronLeft,
  ChevronRight,
  DollarSign,
  FileText,
  AlertCircle,
  CheckCircle,
  XCircle,
  Eye,
  Edit,
  Phone,
  Mail,
  Download,
  Printer
} from "lucide-react";
import { useHealthcare } from "@/hooks/use-healthcare";
import { formatPhoneNumber, formatCurrency, formatDate, formatDateTime } from "@/lib/utils";

const Appointments = () => {
  const userRole: 'doctor' = 'doctor';
  const {
    filteredAppointments: appointments,
    searchTerm,
    setSearchTerm,
    selectedFilters,
    setFilter,
    clearFilters,
    stats,
    getPatientById,
    getDoctorById
  } = useHealthcare();

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'confirmed': return 'default';
      case 'pending': return 'secondary';
      case 'cancelled': return 'destructive';
      case 'completed': return 'default';
      case 'rescheduled': return 'outline';
      default: return 'default';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return <Video className="h-4 w-4 text-blue-500" />;
      case 'clinic': return <MapPin className="h-4 w-4 text-green-500" />;
      case 'emergency': return <AlertCircle className="h-4 w-4 text-red-500" />;
      case 'follow-up': return <CheckCircle className="h-4 w-4 text-blue-500" />;
      case 'consultation': return <FileText className="h-4 w-4 text-purple-500" />;
      default: return <Activity className="h-4 w-4 text-gray-500" />;
    }
  };

  const AppointmentDetailDialog = ({ appointment }: { appointment: any }) => {
    const patient = getPatientById(appointment.patient);
    const doctor = getDoctorById(appointment.doctor);
    
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="ghost" size="sm">
            <Eye className="h-4 w-4" />
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Appointment Details
            </DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Appointment Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="font-medium">Date:</span>
                  <span>{formatDate(appointment.date)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Time:</span>
                  <span>{appointment.time} ({appointment.duration})</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Type:</span>
                  <div className="flex items-center gap-2">
                    {getTypeIcon(appointment.type)}
                    <span className="capitalize">{appointment.type.replace('-', ' ')}</span>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Status:</span>
                  <Badge variant={getStatusBadgeVariant(appointment.status)}>
                    {appointment.status}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Location:</span>
                  <span className="text-sm">{appointment.location}</span>
                </div>
              </CardContent>
            </Card>

            {/* Patient Information */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Patient Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {patient && (
                  <>
                    <div className="flex justify-between">
                      <span className="font-medium">Name:</span>
                      <span>{patient.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Age:</span>
                      <span>{patient.age} years</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Phone:</span>
                      <span>{formatPhoneNumber(patient.phone)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Email:</span>
                      <span className="text-sm">{patient.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Condition:</span>
                      <span className="text-sm">{patient.condition}</span>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Medical Details */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Medical Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="font-medium">Reason:</span>
                  <span className="text-sm">{appointment.reason}</span>
                </div>
                <div>
                  <span className="font-medium">Symptoms:</span>
                  <div className="mt-1 flex flex-wrap gap-1">
                    {appointment.symptoms.map((symptom: string, index: number) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {symptom}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Diagnosis:</span>
                  <span className="text-sm">{appointment.diagnosis}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Treatment:</span>
                  <span className="text-sm">{appointment.treatment}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Follow-up Date:</span>
                  <span className="text-sm">{appointment.followUpDate}</span>
                </div>
              </CardContent>
            </Card>

            {/* Financial Information */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Financial Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="font-medium">Insurance:</span>
                  <span className="text-sm">{appointment.insurance}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Cost:</span>
                  <span className="font-mono">{formatCurrency(appointment.cost)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Payment Status:</span>
                  <Badge variant={
                    appointment.paymentStatus === 'paid' ? 'default' :
                    appointment.paymentStatus === 'pending' ? 'secondary' :
                    appointment.paymentStatus === 'partial' ? 'outline' : 'destructive'
                  }>
                    {appointment.paymentStatus}
                  </Badge>
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
              <p className="text-sm text-muted-foreground">{appointment.notes}</p>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex justify-end gap-2">
            <Button variant="outline">
              <Edit className="h-4 w-4 mr-2" />
              Edit Appointment
            </Button>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export Details
            </Button>
                       <Button variant="outline">
             <Printer className="h-4 w-4 mr-2" />
             Print Summary
           </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  };

  const AppointmentCard = ({ appointment }: { appointment: any }) => (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
              <User className="h-6 w-6" />
            </div>
            <div className="space-y-1">
              <h3 className="font-medium">{appointment.patient}</h3>
              <p className="text-sm text-muted-foreground">{appointment.reason}</p>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {appointment.time} ({appointment.duration})
                </div>
                <div className="flex items-center gap-1">
                  {getTypeIcon(appointment.type)}
                  {appointment.location}
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span>Cost: {formatCurrency(appointment.cost)}</span>
                <span>•</span>
                <span>Insurance: {appointment.insurance}</span>
              </div>
            </div>
          </div>
          <div className="text-right space-y-2">
            <Badge variant={getStatusBadgeVariant(appointment.status)}>
              {appointment.status}
            </Badge>
            <p className="text-sm text-muted-foreground">
              with {appointment.doctor}
            </p>
            <div className="flex items-center gap-1">
              <AppointmentDetailDialog appointment={appointment} />
          <Button size="sm" variant="outline">
                <Edit className="h-4 w-4" />
          </Button>
          <Button size="sm" variant="outline">
            {appointment.type === 'video' ? 'Join Call' : 'View Details'}
          </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  // Group appointments by date
  const appointmentsByDate = appointments.reduce((groups, appointment) => {
    const date = appointment.date;
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(appointment);
    return groups;
  }, {} as Record<string, any[]>);

  const today = new Date().toISOString().split('T')[0];
  const todayAppointments = appointmentsByDate[today] || [];
  const upcomingAppointments = Object.entries(appointmentsByDate)
    .filter(([date]) => date > today)
    .flatMap(([, apps]) => apps);

  return (
    <Layout userRole={userRole}>
      <div className="container max-w-7xl mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Appointments</h1>
            <p className="text-muted-foreground">
              Manage your appointment schedule and patient visits with comprehensive details.
            </p>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Schedule Appointment
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Today's Appointments</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{todayAppointments.length}</div>
              <p className="text-xs text-muted-foreground">
                {todayAppointments.filter(a => a.type === 'video').length} video, 
                {todayAppointments.filter(a => a.type === 'clinic').length} in-person
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Confirmation</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.pendingAppointments}</div>
              <p className="text-xs text-muted-foreground">Require attention</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total This Week</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{appointments.length}</div>
              <p className="text-xs text-muted-foreground">All appointments</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Revenue Today</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatCurrency(todayAppointments.reduce((sum, a) => sum + a.cost, 0))}
              </div>
              <p className="text-xs text-muted-foreground">From today's appointments</p>
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
                  placeholder="Search appointments by patient, doctor, or reason..." 
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
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="rescheduled">Rescheduled</SelectItem>
                </SelectContent>
              </Select>
              <Select value={selectedFilters.type || ''} onValueChange={(value) => setFilter('type', value)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                                 <SelectContent>
                   <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="video">Video</SelectItem>
                  <SelectItem value="clinic">Clinic</SelectItem>
                  <SelectItem value="emergency">Emergency</SelectItem>
                  <SelectItem value="follow-up">Follow-up</SelectItem>
                  <SelectItem value="consultation">Consultation</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" onClick={clearFilters}>
                <Filter className="h-4 w-4 mr-2" />
                Clear Filters
              </Button>
            </div>
          </CardHeader>
        </Card>

        {/* Appointments Tabs */}
        <Tabs defaultValue="today" className="space-y-6">
          <TabsList>
            <TabsTrigger value="today">Today ({todayAppointments.length})</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming ({upcomingAppointments.length})</TabsTrigger>
            <TabsTrigger value="all">All Appointments</TabsTrigger>
          </TabsList>

          <TabsContent value="today" className="space-y-4">
            <div className="grid gap-4">
              {todayAppointments.length > 0 ? (
                todayAppointments.map((appointment) => (
                <AppointmentCard key={appointment.id} appointment={appointment} />
                ))
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No appointments scheduled for today</p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="upcoming" className="space-y-4">
            <div className="grid gap-4">
              {upcomingAppointments.length > 0 ? (
                upcomingAppointments.map((appointment) => (
                <AppointmentCard key={appointment.id} appointment={appointment} />
                ))
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No upcoming appointments</p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="all" className="space-y-4">
            <div className="grid gap-4">
              {appointments.length > 0 ? (
                appointments.map((appointment) => (
                  <AppointmentCard key={appointment.id} appointment={appointment} />
                ))
              ) : (
                <div className="text-center py-8 text-muted-foreground">
              <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No appointments found</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Appointments;