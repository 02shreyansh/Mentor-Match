import React from "react";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { UseFormReturn } from "react-hook-form";
import { FormSchema, formatOptions } from "@/types/mentor";

interface CommitmentFormProps {
    form: UseFormReturn<FormSchema>;
    navigateToTab: (tabValue: string) => void;
}

export const CommitmentForm: React.FC<CommitmentFormProps> = ({
    form,
    navigateToTab
}) => {
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                    control={form.control}
                    name="hoursPerWeek"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Hours per Week *</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select availability" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="1-2">1-2 hours</SelectItem>
                                    <SelectItem value="3-5">3-5 hours</SelectItem>
                                    <SelectItem value="5-10">5-10 hours</SelectItem>
                                    <SelectItem value="10+">10+ hours</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormDescription>
                                Estimated time you can dedicate to mentoring per week
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="mentorshipDuration"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Mentorship Duration *</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select duration" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="3_months">3 months</SelectItem>
                                    <SelectItem value="6_months">6 months</SelectItem>
                                    <SelectItem value="1_year">1 year</SelectItem>
                                    <SelectItem value="ongoing">Ongoing commitment</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormDescription>
                                How long are you willing to commit to mentoring?
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>

            <FormField
                control={form.control}
                name="preferredFormat"
                render={() => (
                    <FormItem>
                        <div className="mb-4">
                            <FormLabel>Preferred Mentoring Format *</FormLabel>
                            <FormDescription>
                                Select all mentoring formats you're comfortable with
                            </FormDescription>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {formatOptions.map((option) => (
                                <FormField
                                    key={option.value}
                                    control={form.control}
                                    name="preferredFormat"
                                    render={({ field }) => {
                                        return (
                                            <FormItem
                                                key={option.value}
                                                className="flex flex-row items-start space-x-3 space-y-0"
                                            >
                                                <FormControl>
                                                    <Checkbox
                                                        checked={field.value?.includes(option.value)}
                                                        onCheckedChange={(checked) => {
                                                            return checked
                                                                ? field.onChange([...field.value, option.value])
                                                                : field.onChange(
                                                                    field.value?.filter(
                                                                        (value) => value !== option.value
                                                                    )
                                                                );
                                                        }}
                                                    />
                                                </FormControl>
                                                <FormLabel className="font-normal cursor-pointer">
                                                    {option.label}
                                                </FormLabel>
                                            </FormItem>
                                        );
                                    }}
                                />
                            ))}
                        </div>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="shortBio"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Short Bio *</FormLabel>
                        <FormControl>
                            <Textarea
                                placeholder="Tell us about yourself, your journey, and what makes you a great mentor..."
                                className="min-h-[100px]"
                                {...field}
                            />
                        </FormControl>
                        <FormDescription>
                            This will be visible on your mentor profile
                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="motivationStatement"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Motivation for Mentoring *</FormLabel>
                        <FormControl>
                            <Textarea
                                placeholder="Why do you want to become a mentor? What do you hope to achieve?"
                                className="min-h-[100px]"
                                {...field}
                            />
                        </FormControl>
                        <FormDescription>
                            Explain why you want to join our mentorship platform
                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="previousExperience"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Previous Mentoring Experience</FormLabel>
                        <FormControl>
                            <Textarea
                                placeholder="Have you mentored others before? Tell us about your experience..."
                                className="min-h-[100px]"
                                {...field}
                            />
                        </FormControl>
                        <FormDescription>
                            Optional. Share any past mentoring experience you have
                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <Separator className="my-6" />

            <div className="space-y-4">
                <FormField
                    control={form.control}
                    name="acceptTerms"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                                <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                                <FormLabel>
                                    I accept the terms and conditions *
                                </FormLabel>
                                <FormDescription>
                                    By checking this box, you agree to our{" "}
                                    <a href="#" className="text-blue-600 hover:underline">
                                        Terms of Service
                                    </a>{" "}
                                    and{" "}
                                    <a href="#" className="text-blue-600 hover:underline">
                                        Privacy Policy
                                    </a>
                                </FormDescription>
                            </div>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="acceptCodeOfConduct"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                                <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                                <FormLabel>
                                    I accept the mentor code of conduct *
                                </FormLabel>
                                <FormDescription>
                                    By checking this box, you agree to abide by our{" "}
                                    <a href="#" className="text-blue-600 hover:underline">
                                        Mentor Code of Conduct
                                    </a>
                                </FormDescription>
                            </div>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>

            <div className="mt-6 flex justify-between">
                <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigateToTab("expertise")}
                >
                    Previous: Expertise
                </Button>
                <Button type="submit">Submit Application</Button>
            </div>
        </div>

    )
}

