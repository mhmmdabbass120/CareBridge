import { Bell, Menu, User, Search, LogOut, Settings, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useHealthcare } from "@/hooks/use-healthcare";

export const Header = () => {
  const { stats, filteredMessages } = useHealthcare();
  
  // Get urgent messages for notifications
  const urgentMessages = filteredMessages.filter(m => m.priority === 'urgent' && !m.read);
  const notifications = [
    ...urgentMessages.map(m => ({
      id: m.id,
      title: 'Urgent Message',
      description: `From ${m.sender}: ${m.content.slice(0, 50)}...`,
      time: new Date(m.timestamp).toLocaleTimeString(),
      type: 'urgent'
    })),
    {
      id: 'lab-results',
      title: 'Lab Results Ready',
      description: 'New lab results available for 3 patients',
      time: '2 hours ago',
      type: 'info'
    },
    {
      id: 'appointment-reminder',
      title: 'Upcoming Appointments',
      description: `${stats.todayAppointments} appointments scheduled for today`,
      time: '30 min ago',
      type: 'reminder'
    }
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo and Navigation */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <span className="text-white font-bold text-lg">C</span>
            </div>
            <span className="font-bold text-xl text-foreground">CareBridge</span>
          </div>
          
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="/dashboard" className="text-foreground/80 hover:text-foreground transition-colors">
              Dashboard
            </a>
            <a href="/patients" className="text-foreground/80 hover:text-foreground transition-colors">
              Patients
            </a>
            <a href="/appointments" className="text-foreground/80 hover:text-foreground transition-colors">
              Appointments
            </a>
            <a href="/messages" className="text-foreground/80 hover:text-foreground transition-colors">
              Messages
            </a>
          </nav>
        </div>

        {/* Search and Actions */}
        <div className="flex items-center gap-4">
          <div className="relative hidden sm:block">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search patients, appointments..."
              className="w-64 pl-9"
            />
          </div>
          
          {/* Notifications */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                {notifications.length > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs">
                    {notifications.length}
                  </Badge>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80" align="end">
              <div className="space-y-2">
                <h4 className="font-medium">Notifications</h4>
                {notifications.length > 0 ? (
                  <div className="space-y-2">
                    {notifications.map((notification) => (
                      <div key={notification.id} className="p-2 rounded border">
                        <div className="flex justify-between items-start">
                          <div className="space-y-1">
                            <p className="text-sm font-medium">{notification.title}</p>
                            <p className="text-xs text-muted-foreground">{notification.description}</p>
                          </div>
                          <span className="text-xs text-muted-foreground">{notification.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">No new notifications</p>
                )}
              </div>
            </PopoverContent>
          </Popover>
          
          {/* Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium">Dr. Sarah Smith</p>
                  <p className="text-xs text-muted-foreground">sarah.smith@carebridge.com</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <HelpCircle className="mr-2 h-4 w-4" />
                <span>Help & Support</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};