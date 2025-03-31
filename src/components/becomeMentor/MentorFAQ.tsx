import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

const MentorFAQ = () => {
    return (
        <div className="mt-8">
            <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="faq-1">
                    <AccordionTrigger>What is expected of mentors?</AccordionTrigger>
                    <AccordionContent>
                        <p>
                            Mentors are expected to provide guidance, support, and insights to mentees based on their expertise
                            and experience. This includes regular check-ins, providing feedback on goals and progress, sharing
                            resources, and being available during agreed-upon times for questions and discussions.
                        </p>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="faq-2">
                    <AccordionTrigger>How are mentors matched with mentees?</AccordionTrigger>
                    <AccordionContent>
                        <p>
                            Our AI-based matching system analyzes mentor profiles and mentee requirements to create the most
                            compatible matches. Factors considered include career goals, technical interests, academic background,
                            extracurricular activities, and availability. Both mentors and mentees can provide feedback on matches
                            to improve future recommendations.
                        </p>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="faq-3">
                    <AccordionTrigger>What resources are provided to mentors?</AccordionTrigger>
                    <AccordionContent>
                        <p>
                            Mentors receive access to our mentorship guide, structured session templates, goal-setting
                            frameworks, progress tracking tools, and a community of other mentors to share best practices.
                            We also provide regular webinars and workshops to help mentors develop their mentoring skills.
                        </p>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="faq-4">
                    <AccordionTrigger>Is there compensation for mentors?</AccordionTrigger>
                    <AccordionContent>
                        <p>
                            While mentorship is primarily a volunteer opportunity to give back to the community, active mentors
                            can receive recognition through our Mentor Achievement Program, which includes certificates,
                            profile badges, and opportunities to participate in exclusive events and networking opportunities.
                            Some specialized mentorship programs may offer honorariums for extensive time commitments.
                        </p>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    )
}

export default MentorFAQ