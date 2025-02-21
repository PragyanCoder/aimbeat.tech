import { Link } from "wouter";
import { Separator } from "@/components/ui/separator";

export default function Footer() {
  const policyLinks = [
    { href: "/policies/terms", label: "Terms & Conditions" },
    { href: "/policies/privacy", label: "Privacy Policy" },
    { href: "/policies/refund", label: "Refund Policy" },
    { href: "/policies/aup", label: "AUP Policy" },
  ];

  return (
    <footer className="bg-muted mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">aimbeat.tech</h3>
            <p className="text-sm text-muted-foreground">
              Founded in 2023, we're a non-profit tech startup dedicated to
              innovation and excellence in technology services.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {policyLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>
                    <a className="text-sm hover:underline">{link.label}</a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Contact</h3>
            <p className="text-sm text-muted-foreground">
              Have questions? Reach out to us at
              <a href="mailto:contact@aimbeat.tech" className="ml-1 underline">
                contact@aimbeat.tech
              </a>
            </p>
          </div>
        </div>
        <Separator className="my-8" />
        <p className="text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} aimbeat.tech. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
