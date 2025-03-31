import React from "react";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Github, Linkedin } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { FormSchema } from "@/types/mentor";

interface ProfessionalInfoFormProps {
  form: UseFormReturn<FormSchema>;
  navigateToTab: (tabValue: string) => void;
}

export const ProfessionalInfoForm: React.FC<ProfessionalInfoFormProps> = ({
  form,
  navigateToTab
}) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="currentPosition"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Current Position *</FormLabel>
              <FormControl>
                <Input placeholder="Enter your current position" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="company"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company/Institution *</FormLabel>
              <FormControl>
                <Input placeholder="Enter your company or institution" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="experience"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Years of Experience *</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select your experience level" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="1-2 years">1-2 years</SelectItem>
                <SelectItem value="3-5 years">3-5 years</SelectItem>
                <SelectItem value="5-10 years">5-10 years</SelectItem>
                <SelectItem value="10+ years">10+ years</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="space-y-6">
        <FormField
          control={form.control}
          name="linkedinUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2">
                <Linkedin className="h-4 w-4" />
                LinkedIn Profile URL *
              </FormLabel>
              <FormControl>
                <Input placeholder="https://www.linkedin.com/in/yourusername" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="githubUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2">
                <Github className="h-4 w-4" />
                GitHub Profile URL
              </FormLabel>
              <FormControl>
                <Input placeholder="https://github.com/yourusername" {...field} />
              </FormControl>
              <FormDescription>
                Optional, but recommended for technical mentors
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="academicBackground"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Academic Background *</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Please provide details about your education, degrees, and institutions" 
                className="min-h-[120px]"
                {...field} 
              />
            </FormControl>
            <FormDescription>
              Please provide details about your education, degrees, and institutions
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="flex justify-between">
        <Button
          type="button"
          variant="outline"
          onClick={() => navigateToTab("personal")}
        >
          Previous: Personal Info
        </Button>
        <Button
          type="button"
          onClick={() => navigateToTab("expertise")}
        >
          Next: Expertise
        </Button>
      </div>
    </div>
  );
};