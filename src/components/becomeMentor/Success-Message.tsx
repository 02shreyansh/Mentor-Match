import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

export const SuccessMessage: React.FC = () => {
  return (
    <Card className="text-center">
      <CardHeader className="pb-4">
        <div className="flex justify-center mb-4">
          <CheckCircle className="h-16 w-16 text-green-500" />
        </div>
        <CardTitle className="text-2xl">Application Submitted Successfully!</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 mb-6">
          Thank you for applying to become a mentor. Our team will review your application
          and get back to you within 3-5 business days.
        </p>
        <Button onClick={() => window.location.href = "/"}>
          Return to Home
        </Button>
      </CardContent>
    </Card>
  );
};