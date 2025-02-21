import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";
import { motion, useInView } from "framer-motion";
import { Bot, Cpu, Brain, Cloud, Layers, Rocket, Users, Globe2, Package2 } from "lucide-react";
import { CyberWorld } from "@/components/background/cyber-world";
import { MouseSpotlight } from "@/components/background/mouse-spotlight";
import { useRef, useEffect, useState } from "react";

const services = [
  {
    title: "Web Development",
    description: "Custom web applications built with modern technologies",
    icon: <Layers className="w-8 h-8" />,
  },
  {
    title: "AI/ML Solutions",
    description: "Advanced machine learning and artificial intelligence services",
    icon: <Brain className="w-8 h-8" />,
  },
  {
    title: "Cloud Technology",
    description: "Scalable cloud infrastructure and solutions",
    icon: <Cloud className="w-8 h-8" />,
  },
  {
    title: "Consultancy",
    description: "Expert guidance for your technology needs",
    icon: <Rocket className="w-8 h-8" />,
  },
];

function CountUpAnimation({ target, duration = 2000 }: { target: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const elementRef = useRef(null);
  const isInView = useInView(elementRef);

  useEffect(() => {
    if (!isInView) return;

    let startTime: number | null = null;
    const step = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      setCount(Math.floor(progress * target));

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  }, [target, duration, isInView]);

  return <span ref={elementRef}>{count}+</span>;
}

const stats = [
  {
    title: "Happy Customers",
    value: 100,
    icon: <Users className="w-8 h-8" />,
  },
  {
    title: "Deployments",
    value: 40,
    icon: <Package2 className="w-8 h-8" />,
  },
  {
    title: "Worldwide Users",
    value: 2000,
    icon: <Globe2 className="w-8 h-8" />,
  },
];

const portfolio = [
  {
    title: "AI-Powered Analytics",
    image: "https://images.unsplash.com/photo-1639322537228-f710d846310a",
    category: "AI/ML",
  },
  {
    title: "Cloud Infrastructure",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31",
    category: "Cloud",
  },
  {
    title: "Web Applications",
    image: "https://images.unsplash.com/photo-1551650975-87deedd944c3",
    category: "Development",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

export default function HomePage() {
  return (
    <div className="flex flex-col gap-16 py-16 relative bg-background">
      <MouseSpotlight />
      <CyberWorld />

      {/* Hero Section */}
      <section className="container mx-auto px-4 relative overflow-hidden min-h-[80vh] flex items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl relative z-10"
        >
          <div className="flex items-center gap-4 mb-6">
            <Bot className="w-12 h-12 text-primary animate-pulse" />
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="h-1 w-32 bg-gradient-to-r from-primary to-primary/50"
            />
          </div>
          <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/50">
            Innovating Tomorrow with AI
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl">
            aimbeat.tech is a non-profit startup pioneering the future through
            cutting-edge AI solutions and technology services.
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href="/contact">
              <Button size="lg" className="group relative overflow-hidden">
                <span className="relative z-10">Get Started</span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary/50 to-primary"
                  initial={{ x: "100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </Button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Animated Background Elements */}
        <motion.div
          className="absolute top-0 right-0 -z-10 opacity-10"
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 50,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <Cpu className="w-96 h-96" />
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 py-16 bg-muted/50">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.title}
              variants={itemVariants}
              className="text-center"
            >
              <Card className="bg-background/50 backdrop-blur">
                <CardContent className="pt-6">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="mb-4 text-primary inline-block"
                  >
                    {stat.icon}
                  </motion.div>
                  <h3 className="text-4xl font-bold mb-2">
                    <CountUpAnimation target={stat.value} />
                  </h3>
                  <p className="text-muted-foreground">{stat.title}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Services Section */}
      <section className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-3xl font-bold mb-8"
        >
          Our Services
        </motion.h2>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {services.map((service) => (
            <motion.div key={service.title} variants={itemVariants}>
              <Card className="group hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="mb-4 text-primary"
                  >
                    {service.icon}
                  </motion.div>
                  <CardTitle>{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{service.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Portfolio Section */}
      <section className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-3xl font-bold mb-8"
        >
          Our Work
        </motion.h2>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {portfolio.map((item) => (
            <motion.div
              key={item.title}
              variants={itemVariants}
              className="group relative overflow-hidden rounded-lg"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="relative aspect-video"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                    <p className="text-sm text-white/80">{item.category}</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Team Section */}
      <section className="container mx-auto px-4 relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row gap-8 items-center relative z-10"
        >
          <div className="md:w-1/2">
            <motion.h2
              initial={{ x: -50 }}
              whileInView={{ x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-3xl font-bold mb-4"
            >
              Powered by Innovation
            </motion.h2>
            <motion.p
              initial={{ x: -50 }}
              whileInView={{ x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-lg text-muted-foreground mb-6"
            >
              Our team of technology experts is committed to pushing the boundaries
              of what's possible with AI and modern tech solutions.
            </motion.p>
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Link href="/contact">
                <Button variant="outline" className="group">
                  Join Our Team
                  <motion.span
                    className="ml-2"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                </Button>
              </Link>
            </motion.div>
          </div>
          <motion.div
            className="md:w-1/2"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/10 rounded-lg" />
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c"
                alt="Team Collaboration"
                className="rounded-lg w-full object-cover relative z-10"
              />
            </div>
          </motion.div>
        </motion.div>

        {/* Animated Background Element */}
        <motion.div
          className="absolute bottom-0 left-0 -z-10 opacity-5"
          animate={{
            rotate: [0, -360],
          }}
          transition={{
            duration: 60,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <Brain className="w-72 h-72" />
        </motion.div>
      </section>
    </div>
  );
}