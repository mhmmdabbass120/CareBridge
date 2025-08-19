import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  MessageSquare, 
  FileText, 
  Activity, 
  Settings, 
  Shield,
  Heart,
  Pill,
  ClipboardList
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

interface SidebarProps {
  userRole?: 'patient' | 'doctor' | 'nurse' | 'caregiver' | 'admin';
}

export const Sidebar = ({ userRole = 'doctor' }: SidebarProps) => {
  const navigation = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: LayoutDashboard,
      current: true,
      roles: ['patient', 'doctor', 'nurse', 'caregiver', 'admin']
    },
    {
      name: 'Patients',
      href: '/patients',
      icon: Users,
      current: false,
      roles: ['doctor', 'nurse', 'caregiver', 'admin'],
      badge: '12'
    },
    {
      name: 'Appointments',
      href: '/appointments',
      icon: Calendar,
      current: false,
      roles: ['patient', 'doctor', 'nurse', 'admin'],
      badge: '3'
    },
    {
      name: 'Messages',
      href: '/messages',
      icon: MessageSquare,
      current: false,
      roles: ['patient', 'doctor', 'nurse', 'caregiver', 'admin'],
      badge: '5'
    },
    {
      name: 'Care Plans',
      href: '/care-plans',
      icon: ClipboardList,
      current: false,
      roles: ['patient', 'doctor', 'nurse', 'caregiver']
    },
    {
      name: 'Vitals',
      href: '/vitals',
      icon: Activity,
      current: false,
      roles: ['patient', 'doctor', 'nurse', 'caregiver']
    },
    {
      name: 'Medications',
      href: '/medications',
      icon: Pill,
      current: false,
      roles: ['patient', 'doctor', 'nurse']
    },
    {
      name: 'Documents',
      href: '/documents',
      icon: FileText,
      current: false,
      roles: ['patient', 'doctor', 'nurse', 'admin']
    },
    {
      name: 'Health Records',
      href: '/health-records',
      icon: Heart,
      current: false,
      roles: ['patient', 'doctor', 'nurse']
    }
  ];

  const adminNavigation = [
    {
      name: 'User Management',
      href: '/admin/users',
      icon: Shield,
      current: false,
      roles: ['admin']
    },
    {
      name: 'Audit Logs',
      href: '/admin/audit',
      icon: FileText,
      current: false,
      roles: ['admin']
    },
    {
      name: 'Settings',
      href: '/admin/settings',
      icon: Settings,
      current: false,
      roles: ['admin']
    }
  ];

  const filteredNavigation = navigation.filter(item => item.roles.includes(userRole));
  const filteredAdminNavigation = adminNavigation.filter(item => item.roles.includes(userRole));

  return (
    <div className="flex h-full w-64 flex-col bg-card border-r">
      <div className="flex h-16 items-center justify-between px-4 border-b">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
            <span className="text-white font-bold text-lg">C</span>
          </div>
          <span className="font-bold text-xl">CareBridge</span>
        </div>
      </div>

      <ScrollArea className="flex-1 px-3 py-4">
        <div className="space-y-1">
          {filteredNavigation.map((item) => {
            const Icon = item.icon;
            return (
              <Button
                key={item.name}
                variant={item.current ? "secondary" : "ghost"}
                className="w-full justify-start gap-3 h-10"
                asChild
              >
                <a href={item.href}>
                  <Icon className="h-5 w-5" />
                  <span className="flex-1 text-left">{item.name}</span>
                  {item.badge && (
                    <Badge variant="secondary" className="ml-auto">
                      {item.badge}
                    </Badge>
                  )}
                </a>
              </Button>
            );
          })}
        </div>

        {filteredAdminNavigation.length > 0 && (
          <>
            <div className="px-3 py-2 mt-6">
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Administration
              </h3>
            </div>
            <div className="space-y-1">
              {filteredAdminNavigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Button
                    key={item.name}
                    variant={item.current ? "secondary" : "ghost"}
                    className="w-full justify-start gap-3 h-10"
                    asChild
                  >
                    <a href={item.href}>
                      <Icon className="h-5 w-5" />
                      <span className="flex-1 text-left">{item.name}</span>
                    </a>
                  </Button>
                );
              })}
            </div>
          </>
        )}
      </ScrollArea>

      <div className="p-4 border-t">
        <Button variant="ghost" className="w-full justify-start gap-3" asChild>
          <a href="/profile">
            <Settings className="h-5 w-5" />
            Account Settings
          </a>
        </Button>
      </div>
    </div>
  );
};