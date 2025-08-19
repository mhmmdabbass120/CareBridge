import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock,
  CheckCircle,
  Star,
  Building,
  Users,
  Shield,
  Zap
} from "lucide-react";

const ContactSales = () => {
  const userRole: 'admin' = 'admin';

  const features = [
    {
      icon: Users,
      title: "Multi-Role Access",
      description: "Support for doctors, nurses, patients, caregivers, and administrators"
    },
    {
      icon: Shield,
      title: "HIPAA Compliant",
      description: "Enterprise-grade security and compliance for healthcare data"
    },
    {
      icon: Zap,
      title: "Real-time Collaboration",
      description: "Instant messaging, video calls, and live care plan updates"
    },
    {
      icon: Building,
      title: "Scalable Infrastructure",
      description: "From small clinics to large hospital networks"
    }
  ];

  const plans = [
    {
      name: "Starter",
      price: "$99",
      period: "per month",
      description: "Perfect for small practices",
      features: [
        "Up to 100 patients",
        "5 healthcare providers",
        "Basic messaging",
        "Standard support",
        "Mobile app access"
      ],
      popular: false
    },
    {
      name: "Professional",
      price: "$299",
      period: "per month",
      description: "For growing healthcare organizations",
      features: [
        "Up to 1,000 patients",
        "25 healthcare providers",
        "Advanced messaging & video calls",
        "Priority support",
        "Custom integrations",
        "Advanced analytics"
      ],
      popular: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "pricing",
      description: "For large healthcare networks",
      features: [
        "Unlimited patients",
        "Unlimited healthcare providers",
        "Full platform access",
        "24/7 dedicated support",
        "Custom development",
        "On-premise deployment option"
      ],
      popular: false
    }
  ];

  return (
    <Layout userRole={userRole} showSidebar={false}>
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="container max-w-6xl mx-auto p-6 space-y-16">
          {/* Hero Section */}
          <div className="text-center space-y-8 py-16">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                Transform Your
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  {" "}Healthcare Practice
                </span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                CareBridge connects patients, doctors, and healthcare teams with cutting-edge technology 
                for better outcomes and streamlined care coordination.
              </p>
            </div>
            <div className="flex items-center justify-center gap-4">
              <Button size="lg" className="text-lg px-8">
                Start Free Trial
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8">
                Schedule Demo
              </Button>
            </div>
            <div className="flex items-center justify-center gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>30-day free trial</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>No setup fees</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Cancel anytime</span>
              </div>
            </div>
          </div>

          {/* Features Section */}
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold">Why Choose CareBridge?</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Built specifically for healthcare professionals who want to focus on patient care, 
                not paperwork and technology headaches.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {features.map((feature, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 space-y-4">
                    <div className="h-12 w-12 mx-auto rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                      <feature.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-semibold">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Pricing Section */}
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold">Choose Your Plan</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Flexible pricing options that grow with your practice. All plans include core features 
                with 99.9% uptime guarantee.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {plans.map((plan, index) => (
                <Card key={index} className={`relative ${plan.popular ? 'border-primary shadow-lg' : ''}`}>
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-gradient-to-r from-primary to-secondary">Most Popular</Badge>
                    </div>
                  )}
                  <CardHeader className="text-center space-y-4">
                    <div>
                      <h3 className="text-xl font-bold">{plan.name}</h3>
                      <p className="text-sm text-muted-foreground">{plan.description}</p>
                    </div>
                    <div>
                      <span className="text-3xl font-bold">{plan.price}</span>
                      <span className="text-muted-foreground">/{plan.period}</span>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <ul className="space-y-3">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button className="w-full" variant={plan.popular ? 'default' : 'outline'}>
                      {plan.name === 'Enterprise' ? 'Contact Sales' : 'Start Free Trial'}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div className="grid gap-8 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Get in Touch</CardTitle>
                <p className="text-muted-foreground">
                  Ready to transform your healthcare practice? Our team is here to help you get started.
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="text-sm font-medium">First Name</label>
                    <Input placeholder="John" />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Last Name</label>
                    <Input placeholder="Doe" />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Email</label>
                  <Input type="email" placeholder="john.doe@hospital.com" />
                </div>
                <div>
                  <label className="text-sm font-medium">Organization</label>
                  <Input placeholder="General Hospital" />
                </div>
                <div>
                  <label className="text-sm font-medium">Phone</label>
                  <Input type="tel" placeholder="+1 (555) 123-4567" />
                </div>
                <div>
                  <label className="text-sm font-medium">Message</label>
                  <Textarea 
                    placeholder="Tell us about your healthcare organization and how we can help..."
                    className="min-h-[100px]"
                  />
                </div>
                <Button className="w-full">Send Message</Button>
              </CardContent>
            </Card>

            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Phone</p>
                      <p className="text-sm text-muted-foreground">+1 (800) 123-4567</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-sm text-muted-foreground">sales@carebridge.com</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Address</p>
                      <p className="text-sm text-muted-foreground">
                        123 Healthcare Blvd<br />
                        San Francisco, CA 94105
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Business Hours</p>
                      <p className="text-sm text-muted-foreground">
                        Mon-Fri: 8:00 AM - 6:00 PM PST<br />
                        24/7 support for Enterprise
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="h-5 w-5 text-yellow-500" />
                    Customer Reviews
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <blockquote className="border-l-4 border-primary pl-4 italic">
                    "CareBridge has revolutionized how we manage patient care. The real-time 
                    collaboration features have improved our response times by 40%."
                  </blockquote>
                  <p className="text-sm text-muted-foreground mt-2">
                    - Dr. Sarah Johnson, Chief Medical Officer
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ContactSales;