import { LegalLayout } from "./LegalLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, MapPin, Phone } from "lucide-react";

const Contact = () => {
  return (
    <LegalLayout title="Contact Us" lastUpdated="May 8, 2026">
      <p className="text-lg mb-8">We're here to help! If you have any questions, concerns, or feedback, please don't hesitate to reach out to our team.</p>

      <div className="grid gap-6 md:grid-cols-2 mb-12">
        <Card className="border-border/50 bg-card/50 shadow-sm">
          <CardContent className="p-6 flex items-start gap-4">
            <div className="p-3 bg-primary/10 rounded-xl">
              <Mail className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-1">Email Support</h3>
              <p className="text-muted-foreground text-sm mb-2">Our team typically responds within 24 hours.</p>
              <a href="mailto:support@clickbio.in" className="text-primary hover:underline font-medium">support@clickbio.in</a>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card/50 shadow-sm">
          <CardContent className="p-6 flex items-start gap-4">
            <div className="p-3 bg-primary/10 rounded-xl">
              <MapPin className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-1">Office Location</h3>
              <p className="text-muted-foreground text-sm">
                ClickBio Inc.<br />
                Tech Park, Sector 62<br />
                Noida, UP 201309<br />
                India
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <h2>Business Inquiries</h2>
      <p>For partnership opportunities, enterprise solutions, or media inquiries, please contact <a href="mailto:partners@clickbio.in">partners@clickbio.in</a>.</p>
    </LegalLayout>
  );
};

export default Contact;
