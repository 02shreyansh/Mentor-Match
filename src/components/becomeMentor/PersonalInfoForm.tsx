import React from "react";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Upload } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UseFormReturn } from "react-hook-form";
import { FormSchema } from "@/types/mentor";

interface PersonalInfoFormProps {
  form: UseFormReturn<FormSchema>;
  previewImage: string | null;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  navigateToTab: (tabValue: string) => void;
}

export const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({
  form,
  previewImage,
  handleImageChange,
  navigateToTab
}) => {
  return (
    <div className="space-y-6">
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Important</AlertTitle>
        <AlertDescription>
          Your profile information will be visible to mentees. Please ensure all details are accurate.
        </AlertDescription>
      </Alert>
      
      <div className="flex flex-col md:flex-row items-center gap-6">
        <div className="flex-shrink-0">
          <Avatar className="w-24 h-24">
            {previewImage ? (
              <AvatarImage src={previewImage} alt="Profile preview" />
            ) : (
              <AvatarFallback>ME</AvatarFallback>
            )}
          </Avatar>
        </div>
        <div className="flex-grow">
          <FormField
            control={form.control}
            name="profileImage"
            render={() => (
              <FormItem>
                <FormLabel>
                  <Button variant="outline" className="flex items-center gap-2 cursor-pointer" asChild>
                    <label>
                      <Upload className="h-4 w-4" />
                      Upload Profile Picture
                      <input type="file" onChange={handleImageChange} className="hidden" accept="image/*" />
                    </label>
                  </Button>
                </FormLabel>
                <FormDescription>
                  Please upload a professional profile picture
                </FormDescription>
              </FormItem>
            )}
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name *</FormLabel>
              <FormControl>
                <Input placeholder="Enter your first name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name *</FormLabel>
              <FormControl>
                <Input placeholder="Enter your last name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address *</FormLabel>
              <FormControl>
                <Input placeholder="Enter your email address" type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number *</FormLabel>
              <FormControl>
                <Input placeholder="Enter your phone number" type="tel" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      
      <div className="flex justify-end">
        <Button
          type="button"
          onClick={() => navigateToTab("professional")}
        >
          Next: Professional Info
        </Button>
      </div>
    </div>
  );
};