import { Layout } from "@/components/layout/Layout";
import { DashboardStats } from "@/components/dashboard/DashboardStats";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, 
  Clock, 
  User, 
  Video, 
  MessageCircle,
  Activity,
  Plus,
  ArrowRight
} from "lucide-react";
import { useHealthcare } from "@/hooks/use-healthcare";

const Dashboard = () => {
  // In real app, this would come from auth context
  const userRole: 'doctor' = 'doctor';
  const { 
    appointments, 
    filteredMessages: messages, 
    getAppointmentsByDate,
    stats
  } = useHealthcare();

  // Get today's date and appointments
  const today = new Date().toISOString().split('T')[0];
  const upcomingAppointments = getAppointmentsByDate(today).slice(0, 3);

  // Get recent messages
  const recentMessages = messages.slice(0, 3).map(message => ({
    id: message.id,
    sender: message.sender,
    message: message.content,
    time: new Date(message.timestamp).toLocaleTimeString(),
    unread: !message.read
  }));

  return (
    <Layout userRole={userRole}>
      <div className="container max-w-7xl mx-auto p-6 space-y-8">
        {/* Welcome Section */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Welcome back, Dr. Smith</h1>
            <p className="text-muted-foreground">
              Here's what's happening with your patients today.
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" size="sm">
              <Calendar className="h-4 w-4 mr-2" />
              Schedule
            </Button>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              New Appointment
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <DashboardStats userRole={userRole} />

        {/* Main Content Grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Today's Appointments */}
          <Card className="lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Today's Appointments
              </CardTitle>
              <Button variant="ghost" size="sm">
                <ArrowRight className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingAppointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                      <User className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium">{appointment.patient}</p>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {appointment.date} at {appointment.time}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant={appointment.status === 'confirmed' ? 'default' : 'secondary'}>
                      {appointment.status}
                    </Badge>
                    {appointment.type === 'video' ? (
                      <Video className="h-4 w-4 text-blue-500" />
                    ) : (
                      <Activity className="h-4 w-4 text-green-500" />
                    )}
                    <Button size="sm" variant="outline">
                      View
                    </Button>
                  </div>
                </div>
              ))}
              {upcomingAppointments.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No appointments scheduled for today</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recent Messages */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <MessageCircle className="h-5 w-5" />
                Recent Messages
              </CardTitle>
              <Button variant="ghost" size="sm">
                <ArrowRight className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentMessages.map((message) => (
                <div
                  key={message.id}
                  className={`p-3 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer ${
                    message.unread ? 'border-primary/20 bg-primary/5' : ''
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <p className="font-medium text-sm">{message.sender}</p>
                    {message.unread && (
                      <div className="h-2 w-2 rounded-full bg-primary" />
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                    {message.message}
                  </p>
                  <p className="text-xs text-muted-foreground">{message.time}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button variant="outline" className="h-24 flex-col gap-2">
                <User className="h-6 w-6" />
                <span>Add Patient</span>
              </Button>
              <Button variant="outline" className="h-24 flex-col gap-2">
                <Calendar className="h-6 w-6" />
                <span>Schedule Appointment</span>
              </Button>
              <Button variant="outline" className="h-24 flex-col gap-2">
                <MessageCircle className="h-6 w-6" />
                <span>Send Message</span>
              </Button>
              <Button variant="outline" className="h-24 flex-col gap-2">
                <Activity className="h-6 w-6" />
                <span>Record Vitals</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Dashboard;