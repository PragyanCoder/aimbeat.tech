import { useParams } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const policies = {
  terms: {
    title: "Terms & Conditions",
    content: `
      1. Acceptance of Terms
      By accessing and using aimbeat.tech services, you agree to be bound by these terms and conditions.

      2. Services
      We provide technology services including but not limited to web development, AI/ML solutions, cloud technology, and consultancy.

      3. Intellectual Property
      All content and materials available on aimbeat.tech are property of aimbeat.tech unless otherwise stated.

      4. User Obligations
      Users must provide accurate information and maintain the confidentiality of their account credentials.
    `
  },
  privacy: {
    title: "Privacy Policy",
    content: `
      1. Data Collection
      We collect information that you provide directly to us when using our services.

      2. Use of Information
      Your information is used to provide and improve our services, communicate with you, and ensure security.

      3. Data Protection
      We implement appropriate technical and organizational measures to protect your personal data.

      4. Your Rights
      You have the right to access, correct, or delete your personal information.
    `
  },
  refund: {
    title: "Refund Policy",
    content: `
      1. Service Cancellation
      Refunds are provided on a case-by-case basis for unused services.

      2. Refund Process
      Refund requests must be submitted within 30 days of service purchase.

      3. Non-refundable Items
      Custom development work and completed consultations are non-refundable.

      4. Processing Time
      Refunds are processed within 5-10 business days.
    `
  },
  aup: {
    title: "Acceptable Use Policy",
    content: `
      1. Prohibited Activities
      Users must not engage in any illegal or unauthorized activities.

      2. Service Usage
      Services must be used in accordance with applicable laws and regulations.

      3. Resource Usage
      Users must not exceed reasonable usage limits or impact other users.

      4. Compliance
      Violation of this policy may result in service termination.
    `
  }
};

export default function PoliciesPage() {
  const { type } = useParams<{ type: keyof typeof policies }>();
  const policy = type && policies[type];

  if (!policy) {
    return (
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8">Policy Not Found</h1>
        <p>The requested policy does not exist.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl">{policy.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="prose prose-slate max-w-none">
            {policy.content.split("\n\n").map((paragraph, index) => (
              <p key={index} className="mb-4">
                {paragraph}
              </p>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
