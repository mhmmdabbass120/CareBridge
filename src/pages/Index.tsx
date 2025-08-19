import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { 
  Shield, 
  Users, 
  Calendar, 
  MessageSquare, 
  Activity, 
  ArrowRight,
  CheckCircle,
  Heart,
  Globe,
  Lock
} from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/dashboard');
  };

  const handleRequestDemo = () => {
    navigate('/contact-sales');
  };

  return (
    <Layout showSidebar={false}>
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-secondary/5 py-20">
          <div className="container max-w-6xl mx-auto px-4">
            <div className="text-center space-y-8">
              <div className="space-y-4">
                <Badge variant="secondary" className="px-4 py-2 text-sm">
                  <Shield className="h-4 w-4 mr-2" />
                  HIPAA-Compliant Healthcare Platform
                </Badge>
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                  Connecting Care,
                  <span className="text-primary"> Bridging Lives</span>
                </h1>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  CareBridge is a secure, multi-tenant healthcare coordination platform that connects patients, 
                  doctors, nurses, and caregivers in a seamless, accessible experience.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="px-8" onClick={handleGetStarted}>
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button size="lg" variant="outline" onClick={handleRequestDemo}>
                  Request Demo
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-background">
          <div className="container max-w-6xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Comprehensive Healthcare Management
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Everything you need to coordinate care, manage patients, and improve health outcomes
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <Users className="h-10 w-10 text-primary mb-4" />
                  <CardTitle>Patient Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Comprehensive patient profiles with health records, medications, allergies, and care plans.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <Calendar className="h-10 w-10 text-primary mb-4" />
                  <CardTitle>Smart Scheduling</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Intelligent appointment scheduling with timezone support and automated reminders.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <MessageSquare className="h-10 w-10 text-primary mb-4" />
                  <CardTitle>Secure Messaging</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    HIPAA-compliant messaging system for care team communication with file sharing.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <Activity className="h-10 w-10 text-primary mb-4" />
                  <CardTitle>Vitals Monitoring</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Track and visualize patient vitals with trend analysis and alert notifications.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <Heart className="h-10 w-10 text-primary mb-4" />
                  <CardTitle>Telehealth</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Secure video consultations with waiting rooms and session recording capabilities.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <Globe className="h-10 w-10 text-primary mb-4" />
                  <CardTitle>Global Ready</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Multi-language support with English and Arabic, RTL layout, and timezone awareness.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Security Section */}
        <section className="py-20 bg-muted/50">
          <div className="container max-w-6xl mx-auto px-4">
            <div className="grid gap-12 lg:grid-cols-2 items-center">
              <div className="space-y-6">
                <div className="space-y-4">
                  <Badge variant="secondary" className="px-4 py-2">
                    <Lock className="h-4 w-4 mr-2" />
                    Enterprise Security
                  </Badge>
                  <h2 className="text-3xl md:text-4xl font-bold">
                    Security & Compliance First
                  </h2>
                  <p className="text-xl text-muted-foreground">
                    Built with healthcare compliance in mind, featuring enterprise-grade security 
                    and privacy protection for patient data.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-green-500 mt-0.5" />
                    <div>
                      <h3 className="font-semibold">HIPAA-Ready Design</h3>
                      <p className="text-muted-foreground">
                        Designed following HIPAA guidelines with proper data handling and audit trails.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-green-500 mt-0.5" />
                    <div>
                      <h3 className="font-semibold">End-to-End Encryption</h3>
                      <p className="text-muted-foreground">
                        All data encrypted at rest and in transit with industry-standard protocols.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-green-500 mt-0.5" />
                    <div>
                      <h3 className="font-semibold">Role-Based Access Control</h3>
                      <p className="text-muted-foreground">
                        Granular permissions ensure users only access appropriate patient data.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-green-500 mt-0.5" />
                    <div>
                      <h3 className="font-semibold">Complete Audit Logging</h3>
                      <p className="text-muted-foreground">
                        Comprehensive audit trails for all data access and modifications.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl transform rotate-3"></div>
                <Card className="relative bg-background/95 backdrop-blur-sm border-0 shadow-2xl">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-6 w-6 text-primary" />
                      Security Dashboard
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                      <span className="text-sm">Data Encryption</span>
                      <Badge className="bg-green-500">Active</Badge>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                      <span className="text-sm">Access Monitoring</span>
                      <Badge className="bg-green-500">Active</Badge>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                      <span className="text-sm">Audit Logging</span>
                      <Badge className="bg-green-500">Active</Badge>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                      <span className="text-sm">Session Security</span>
                      <Badge className="bg-green-500">Active</Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary/5">
          <div className="container max-w-4xl mx-auto px-4 text-center space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold">
              Ready to Transform Healthcare Coordination?
            </h2>
            <p className="text-xl text-muted-foreground">
              Join healthcare providers worldwide who trust CareBridge for secure, 
              efficient patient care coordination.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="px-8" onClick={handleGetStarted}>
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" onClick={handleRequestDemo}>
                Contact Sales
              </Button>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Index;
