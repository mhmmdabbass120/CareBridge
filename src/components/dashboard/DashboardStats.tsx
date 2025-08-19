import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  Calendar, 
  MessageSquare, 
  Activity,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import { useHealthcare } from "@/hooks/use-healthcare";

interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon: React.ComponentType<{ className?: string }>;
  trend?: {
    value: number;
    label: string;
    positive: boolean;
  };
  variant?: 'default' | 'warning' | 'success' | 'info';
}

const StatCard = ({ title, value, description, icon: Icon, trend, variant = 'default' }: StatCardProps) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'warning':
        return 'border-orange-200 bg-orange-50/50';
      case 'success':
        return 'border-green-200 bg-green-50/50';
      case 'info':
        return 'border-blue-200 bg-blue-50/50';
      default:
        return '';
    }
  };

  return (
    <Card className={getVariantStyles()}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && (
          <p className="text-xs text-muted-foreground mt-1">
            {description}
          </p>
        )}
        {trend && (
          <div className="flex items-center space-x-1 text-xs mt-2">
            <TrendingUp className={`h-3 w-3 ${trend.positive ? 'text-green-500' : 'text-red-500'}`} />
            <span className={trend.positive ? 'text-green-500' : 'text-red-500'}>
              {trend.positive ? '+' : ''}{trend.value}%
            </span>
            <span className="text-muted-foreground">{trend.label}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

interface DashboardStatsProps {
  userRole: 'patient' | 'doctor' | 'nurse' | 'caregiver' | 'admin';
}

export const DashboardStats = ({ userRole }: DashboardStatsProps) => {
  const { stats: healthcareStats } = useHealthcare();
  
  // Different stats based on user role
  const getStatsForRole = () => {
    switch (userRole) {
      case 'patient':
        return [
          {
            title: 'Upcoming Appointments',
            value: 2,
            description: 'Next: Tomorrow 2:00 PM',
            icon: Calendar,
            variant: 'info' as const
          },
          {
            title: 'Pending Tasks',
            value: 3,
            description: 'Blood pressure check due',
            icon: CheckCircle,
            variant: 'warning' as const
          },
          {
            title: 'New Messages',
            value: 1,
            description: 'From Dr. Smith',
            icon: MessageSquare,
            variant: 'info' as const
          },
          {
            title: 'Vitals This Week',
            value: 5,
            description: 'Last recorded: Today',
            icon: Activity,
            variant: 'success' as const
          }
        ];

      case 'doctor':
        return [
          {
            title: 'Total Patients',
            value: healthcareStats.totalPatients,
            description: 'Active patients under care',
            icon: Users,
            trend: { value: 8.2, label: 'from last month', positive: true }
          },
          {
            title: "Today's Appointments",
            value: healthcareStats.todayAppointments,
            description: `${healthcareStats.pendingAppointments} pending confirmations`,
            icon: Calendar,
            variant: 'info' as const
          },
          {
            title: 'Unread Messages',
            value: healthcareStats.unreadMessages,
            description: 'Require attention',
            icon: MessageSquare,
            variant: 'warning' as const
          },
          {
            title: 'High Risk Patients',
            value: healthcareStats.highRiskPatients,
            description: 'Need monitoring',
            icon: AlertCircle,
            variant: 'warning' as const
          }
        ];

      case 'nurse':
        return [
          {
            title: 'Assigned Patients',
            value: 32,
            description: '5 critical',
            icon: Users,
            variant: 'warning' as const
          },
          {
            title: 'Tasks Today',
            value: 14,
            description: '8 completed',
            icon: CheckCircle,
            variant: 'success' as const
          },
          {
            title: 'Vitals to Record',
            value: 6,
            description: '2 overdue',
            icon: Activity,
            variant: 'warning' as const
          },
          {
            title: 'Team Messages',
            value: 3,
            description: 'All read',
            icon: MessageSquare
          }
        ];

      case 'admin':
        return [
          {
            title: 'Total Doctors',
            value: healthcareStats.totalDoctors,
            description: `${healthcareStats.availableDoctors} available now`,
            icon: Users,
            trend: { value: 12.5, label: 'from last month', positive: true }
          },
          {
            title: 'Total Patients',
            value: healthcareStats.totalPatients,
            description: `${healthcareStats.activePatients} active`,
            icon: Users,
            variant: 'info' as const
          },
          {
            title: 'Total Appointments',
            value: healthcareStats.totalAppointments,
            description: `${healthcareStats.todayAppointments} today`,
            icon: Calendar,
            variant: 'info' as const
          },
          {
            title: 'System Messages',
            value: healthcareStats.totalMessages,
            description: `${healthcareStats.unreadMessages} unread`,
            icon: MessageSquare,
            variant: 'success' as const
          }
        ];

      default:
        return [];
    }
  };

  const stats = getStatsForRole();

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
};