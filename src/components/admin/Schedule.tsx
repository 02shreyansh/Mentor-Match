/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

// Define the schema for form validation using Zod
const formSchema = z.object({
  menteeId: z.string({
    required_error: "Please select a mentee",
  }),
  mentorId: z.string({
    required_error: "Please select a mentor",
  }),
  sessionType: z.enum(['one-on-one', 'group'], {
    required_error: "Please select a session type",
  }),
  sessionDate: z.date({
    required_error: "Please select a date",
  }),
  startTime: z.string({
    required_error: "Please select a start time",
  }),
  duration: z.number({
    required_error: "Please specify duration",
  }).min(15, "Session must be at least 15 minutes").max(120, "Session cannot exceed 2 hours"),
  topic: z.string().min(5, "Topic must be at least 5 characters"),
  description: z.string().optional(),
  notifyParticipants: z.boolean().default(true),
  resourceLinks: z.array(z.string().url("Please enter a valid URL")).optional(),
});

// Sample data for demonstration
const mentees = [
  { id: "1", name: "Alex Johnson" },
  { id: "2", name: "Michael Chen" },
  { id: "3", name: "Sophia Rodriguez" },
  { id: "4", name: "James Wilson" },
  { id: "5", name: "Emma Taylor" },
];

const mentors = [
  { id: "101", name: "Dr. Sarah Williams", specialization: "AIML" },
  { id: "102", name: "Prof. David Lee", specialization: "SDE" },
  { id: "103", name: "Maria Garcia", specialization: "MBA" },
  { id: "104", name: "Thomas Brown", specialization: "Core Electrical" },
  { id: "105", name: "Robert Miller", specialization: "Govt Jobs" },
];

const sessionTypes = [
  { id: "one-on-one", name: "One-on-One" },
  { id: "group", name: "Group Session" },
];

const timeSlots = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", 
  "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", 
  "15:00", "15:30", "16:00", "16:30", "17:00", "17:30"
];

const durations = [
  { value: 15, label: "15 minutes" },
  { value: 30, label: "30 minutes" },
  { value: 45, label: "45 minutes" },
  { value: 60, label: "1 hour" },
  { value: 90, label: "1.5 hours" },
  { value: 120, label: "2 hours" },
];

const ScheduleSessionForm = () => {
  const [open, setOpen] = React.useState(false);
  const [resources, setResources] = React.useState<string[]>([]);
  const [resourceInput, setResourceInput] = React.useState("");

  // Initialize form with Zod resolver
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      sessionType: "one-on-one",
      duration: 30,
      notifyParticipants: true,
      resourceLinks: [],
    },
  });

  // Handle form submission
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // Include resources in the final values
    const finalValues = {
      ...values,
      resourceLinks: resources,
    };
    
    console.log("Form submitted:", finalValues);
    
    // Here you would typically send data to your API
    // Then close the dialog
    setOpen(false);
    
    // Show success toast or notification
    alert("Session scheduled successfully!");
  };

  // Handle adding resource links
  const handleAddResource = () => {
    if (resourceInput && resourceInput.trim()) {
      try {
        // Validate URL
        new URL(resourceInput);
        setResources([...resources, resourceInput]);
        setResourceInput("");
      } catch (err) {
        form.setError("resourceLinks", { 
          message: "Please enter a valid URL" 
        }, { shouldFocus: true });
      }
    }
  };

  // Handle removing resource links
  const handleRemoveResource = (index: number) => {
    const updatedResources = [...resources];
    updatedResources.splice(index, 1);
    setResources(updatedResources);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <CalendarIcon className="mr-2 h-4 w-4" />
          Schedule Session
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Schedule Mentorship Session</DialogTitle>
          <DialogDescription>
            Create a new mentorship session by filling out the information below.
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="menteeId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mentee</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select mentee" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {mentees.map((mentee) => (
                          <SelectItem key={mentee.id} value={mentee.id}>
                            {mentee.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="mentorId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mentor</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select mentor" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {mentors.map((mentor) => (
                          <SelectItem key={mentor.id} value={mentor.id}>
                            {mentor.name} ({mentor.specialization})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="sessionType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Session Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select session type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {sessionTypes.map((type) => (
                          <SelectItem key={type.id} value={type.id}>
                            {type.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="duration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Duration</FormLabel>
                    <Select 
                      onValueChange={(value) => field.onChange(parseInt(value))} 
                      defaultValue={field.value?.toString()}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select duration" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {durations.map((duration) => (
                          <SelectItem key={duration.value} value={duration.value.toString()}>
                            {duration.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="sessionDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Session Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              "pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date < new Date()}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="startTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start Time</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select time" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {timeSlots.map((time) => (
                          <SelectItem key={time} value={time}>
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="topic"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Session Topic</FormLabel>
                  <FormControl>
                    <Input placeholder="E.g., Career path discussion, Technical problem solving" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description (Optional)</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Add session details, goals, or specific topics to cover" 
                      className="resize-none min-h-24" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Card>
              <CardHeader className="py-3">
                <CardTitle className="text-sm font-medium">Resource Links (Optional)</CardTitle>
                <CardDescription>Add helpful resources for this session</CardDescription>
              </CardHeader>
              <CardContent className="py-2">
                <div className="flex gap-2 mb-2">
                  <Input 
                    placeholder="https://example.com/resource" 
                    value={resourceInput}
                    onChange={(e) => setResourceInput(e.target.value)}
                  />
                  <Button 
                    type="button" 
                    variant="secondary"
                    onClick={handleAddResource}
                  >Add</Button>
                </div>
                
                {resources.length > 0 && (
                  <div className="space-y-2 mt-3">
                    {resources.map((resource, index) => (
                      <div key={index} className="flex items-center justify-between gap-2 rounded-md border p-2 text-sm">
                        <span className="truncate">{resource}</span>
                        <Button 
                          type="button" 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleRemoveResource(index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
                <FormMessage>{form.formState.errors.resourceLinks?.message}</FormMessage>
              </CardContent>
            </Card>
            
            <FormField
              control={form.control}
              name="notifyParticipants"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <input
                      type="checkbox"
                      checked={field.value}
                      onChange={field.onChange}
                      className="h-4 w-4 mt-1"
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Notify Participants</FormLabel>
                    <FormDescription>
                      Send email notifications to both mentor and mentee about this session
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Schedule Session</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ScheduleSessionForm;