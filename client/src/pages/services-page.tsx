import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const services = [
  {
    title: "Web Development",
    description: "Custom web applications tailored to your needs using modern frameworks and best practices. We specialize in responsive design, progressive web apps, and complex web platforms.",
    image: "https://images.unsplash.com/photo-1580192985016-7e15ef081dd8",
    features: ["Custom Web Apps", "E-commerce Solutions", "CMS Development", "API Integration"]
  },
  {
    title: "AI/ML Solutions",
    description: "Harness the power of artificial intelligence and machine learning to transform your business. From predictive analytics to computer vision, we deliver cutting-edge AI solutions.",
    image: "https://images.unsplash.com/photo-1655393001768-d946c97d6fd1",
    features: ["Predictive Analytics", "Natural Language Processing", "Computer Vision", "Deep Learning"]
  },
  {
    title: "Cloud Technology",
    description: "Scale your infrastructure with our cloud solutions. We help businesses migrate, optimize, and manage their cloud presence across major platforms.",
    image: "https://images.unsplash.com/photo-1496450681664-3df85efbd29f",
    features: ["Cloud Migration", "Infrastructure Setup", "DevOps Solutions", "Cloud Security"]
  },
  {
    title: "Consultancy",
    description: "Expert guidance for your technology initiatives. Our experienced consultants help you make informed decisions and implement effective solutions.",
    image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952",
    features: ["Tech Strategy", "Digital Transformation", "Project Management", "Technology Assessment"]
  },
  {
    title: "SaaS Solutions",
    description: "Build and deploy scalable software-as-a-service applications. We help you create subscription-based software solutions that drive recurring revenue.",
    image: "https://images.unsplash.com/photo-1476357471311-43c0db9fb2b4",
    features: ["SaaS Development", "Subscription Management", "Multi-tenant Architecture", "Analytics Integration"]
  }
];

export default function ServicesPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8">Our Services</h1>
      <p className="text-xl text-muted-foreground mb-12 max-w-3xl">
        We offer a comprehensive range of technology services to help businesses innovate and grow in the digital age.
      </p>

      <div className="grid gap-8">
        {services.map((service, index) => (
          <Card key={service.title} className="overflow-hidden">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="h-64 md:h-auto">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <CardHeader className="p-0 mb-4">
                  <CardTitle className="text-2xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <p className="text-muted-foreground mb-4">
                    {service.description}
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {service.features.map((feature) => (
                      <div
                        key={feature}
                        className="bg-muted px-3 py-1 rounded-full text-sm"
                      >
                        {feature}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
