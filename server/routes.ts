import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth } from "./auth";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  subject: z.string(),
  message: z.string(),
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Set up authentication routes
  setupAuth(app);

  // Contact form submission
  app.post("/api/contact", (req, res) => {
    if (!req.isAuthenticated()) {
      return res.sendStatus(401);
    }

    const result = contactSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ message: "Invalid form data" });
    }

    // In a real app, you would send an email or store the contact form submission
    res.status(200).json({ message: "Message received" });
  });

  const httpServer = createServer(app);
  return httpServer;
}
