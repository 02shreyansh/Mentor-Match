import React from "react";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { UseFormReturn } from "react-hook-form";
import { FormSchema, careerOptions, technicalOptions, extracurricularOptions } from "@/types/mentor";

interface ExpertiseFormProps {
    form: UseFormReturn<FormSchema>;
    navigateToTab: (tabValue: string) => void;
}

export const ExpertiseForm: React.FC<ExpertiseFormProps> = ({
    form,
    navigateToTab
}) => {
    return (
        <div className="space-y-6">
            <FormField
                control={form.control}
                name="careerExpertise"
                render={() => (
                    <FormItem>
                        <div className="mb-4">
                            <FormLabel>Career Expertise Areas *</FormLabel>
                            <FormDescription>
                                Select the career areas where you can guide mentees
                            </FormDescription>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {careerOptions.map((option) => (
                                <FormField
                                    key={option.value}
                                    control={form.control}
                                    name="careerExpertise"
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
                                                            if (checked) {
                                                                field.onChange([...field.value, option.value]);
                                                            } else {
                                                                field.onChange(
                                                                    field.value?.filter(
                                                                        (value) => value !== option.value
                                                                    )
                                                                );
                                                            }
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
                name="technicalInterests"
                render={() => (
                    <FormItem>
                        <div className="mb-4">
                            <FormLabel>Technical Expertise *</FormLabel>
                            <FormDescription>
                                Select the technical areas where you have expertise
                            </FormDescription>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {technicalOptions.map((option) => (
                                <FormField
                                    key={option.value}
                                    control={form.control}
                                    name="technicalInterests"
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
                                                            if (checked) {
                                                                field.onChange([...field.value, option.value]);
                                                            } else {
                                                                field.onChange(
                                                                    field.value?.filter(
                                                                        (value) => value !== option.value
                                                                    )
                                                                );
                                                            }
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
                name="extracurricularExpertise"
                render={() => (
                    <FormItem>
                        <div className="mb-4">
                            <FormLabel>Extracurricular Interests</FormLabel>
                            <FormDescription>
                                Select areas where you can guide mentees outside academics/career
                            </FormDescription>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {extracurricularOptions.map((option) => (
                                <FormField
                                    key={option.value}
                                    control={form.control}
                                    name="extracurricularExpertise"
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
                                                            if (checked) {
                                                                field.onChange([...(field.value || []), option.value]);
                                                            } else {
                                                                field.onChange(
                                                                    field.value?.filter(
                                                                        (value) => value !== option.value
                                                                    )
                                                                );
                                                            }
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

            <div className="flex justify-between">
                <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigateToTab("professional")}
                >
                    Previous: Professional Info
                </Button>
                <Button
                    type="button"
                    onClick={() => navigateToTab("commitment")}
                >
                    Next: Commitment
                </Button>
            </div>
        </div>
    );
};