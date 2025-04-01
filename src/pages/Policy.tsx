import React, { useState } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { InfoIcon, ShieldIcon, LockIcon, UserIcon, BellIcon, ClockIcon, GlobeIcon, AlertTriangleIcon } from 'lucide-react';
import { z } from 'zod';
const PrivacyPolicySubsectionSchema = z.object({
  id: z.string(),
  title: z.string(),
  content: z.string(),
});
const PrivacyPolicySectionSchema = z.object({
  id: z.string(),
  title: z.string(),
  summary: z.string(),
  content: z.string(),
  lastUpdated: z.string().optional(),
  isImportant: z.boolean().optional(),
  icon: z.string(),
  subsections: z.array(PrivacyPolicySubsectionSchema).optional(),
});
const RegulationSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  appliesTo: z.array(z.string()),
});
const PrivacyPolicySchema = z.object({
  version: z.string(),
  lastUpdated: z.string(),
  effectiveDate: z.string(),
  sections: z.array(PrivacyPolicySectionSchema),
  regulations: z.array(RegulationSchema),
  revisionHistory: z.array(z.object({
    date: z.string(),
    version: z.string(),
    changes: z.string(),
  })),
});

type PrivacyPolicy = z.infer<typeof PrivacyPolicySchema>;

// The expanded privacy policy data
const privacyPolicyData: PrivacyPolicy = {
  version: "2.1",
  lastUpdated: "April 1, 2025",
  effectiveDate: "April 15, 2025",
  revisionHistory: [
    {
      date: "April 1, 2025",
      version: "2.1",
      changes: "Updated AI matching algorithm transparency section and added more details about data retention periods."
    },
    {
      date: "January 15, 2025",
      version: "2.0",
      changes: "Major revision to include emergency support services and well-being section policies."
    },
    {
      date: "October 10, 2024",
      version: "1.5",
      changes: "Added sections on anonymous feedback system and success stories leaderboard."
    },
    {
      date: "July 22, 2024",
      version: "1.0",
      changes: "Initial privacy policy created."
    }
  ],
  regulations: [
    {
      id: "gdpr",
      name: "GDPR",
      description: "The General Data Protection Regulation is a regulation in EU law on data protection and privacy in the European Union and the European Economic Area.",
      appliesTo: ["European Union", "European Economic Area"]
    },
    {
      id: "ccpa",
      name: "CCPA",
      description: "The California Consumer Privacy Act is a state statute intended to enhance privacy rights and consumer protection for residents of California.",
      appliesTo: ["California, United States"]
    },
    {
      id: "coppa",
      name: "COPPA",
      description: "The Children's Online Privacy Protection Act is a United States federal law that imposes certain requirements on operators of websites or online services directed to children under 13 years of age.",
      appliesTo: ["United States"]
    },
    {
      id: "pipeda",
      name: "PIPEDA",
      description: "The Personal Information Protection and Electronic Documents Act is the Canadian federal privacy law for private-sector organizations.",
      appliesTo: ["Canada"]
    }
  ],
  sections: [
    {
      id: "data-collection",
      title: "Data Collection",
      icon: "InfoIcon",
      summary: "We collect personal and usage information to provide our mentorship services.",
      content: "Our mentorship platform collects personal information such as your name, email address, academic details, career goals, technical interests, and extracurricular activities to provide personalized mentorship matching. We also collect usage data to improve our services and your experience on the platform.",
      isImportant: true,
      subsections: [
        {
          id: "personal-info",
          title: "Personal Information We Collect",
          content: "We collect the following personal information: Full name, Email address, Educational background and institutions, Career goals and aspirations, Technical interests and expertise level, Academic performance metrics (if provided voluntarily), Extracurricular activities and interests, Profile pictures (optional), and Communication preferences."
        },
        {
          id: "usage-info",
          title: "Usage Information We Collect",
          content: "We automatically collect certain information when you use our platform, including: IP address and device information, Browser type and settings, Operating system, Platform usage patterns and interactions, Mentorship session attendance and engagement metrics, Resource access and download history, Forum participation and content contribution, and Time spent on various platform features."
        },
        {
          id: "cookies",
          title: "Cookies and Tracking Technologies",
          content: "We use cookies and similar tracking technologies to collect information about your browsing activities and to distinguish you from other users of our platform. These technologies help us deliver a better and more personalized service when you browse our platform. They also enable us to track which pages you find most interesting and improve our platform. You can set your browser to refuse all or some browser cookies or to alert you when websites set or access cookies."
        }
      ]
    },
    {
      id: "ai-matching",
      title: "AI-Based Matching System",
      icon: "ShieldIcon",
      summary: "Our AI algorithm matches mentees with mentors based on provided information.",
      content: "Our AI algorithm uses the information you provide to match mentees with appropriate mentors. This automated process considers factors like career goals, technical interests, academic performance, and extracurricular activities. The AI system does not make decisions based on sensitive personal information such as race, religion, or gender.",
      isImportant: true,
      subsections: [
        {
          id: "ai-data-used",
          title: "Data Used in the AI Matching Process",
          content: "Our AI matching system uses the following data points for matching: Career path preferences, Technical interests and skill levels, Academic performance in relevant subjects, Learning style preferences, Availability and scheduling preferences, Communication preferences, Mentorship goals and expectations, and Prior mentorship experiences. The algorithm does not consider demographic information such as age, gender, race, religion, or nationality in its matching decisions."
        },
        {
          id: "ai-transparency",
          title: "AI Algorithm Transparency",
          content: "Our AI matching system uses a combination of collaborative filtering and content-based recommendation techniques. The system initially ranks potential matches based on similarity scores across multiple dimensions, then applies preference rules and availability constraints. While we don't disclose the exact weighting factors (which constitute our proprietary technology), we're committed to algorithmic transparency and fairness. Users can always override AI recommendations and manually select mentors if they wish."
        },
        {
          id: "human-oversight",
          title: "Human Oversight of AI Matching",
          content: "While our matching system is automated, we maintain human oversight of the process. Our team regularly reviews matching patterns to identify potential biases or issues, and we continuously refine our algorithms based on matching outcomes and user feedback. In some cases, such as for specialized mentorship needs or dispute resolution, our staff may manually review and adjust matches."
        }
      ]
    },
    {
      id: "data-usage",
      title: "How We Use Your Data",
      icon: "UserIcon",
      summary: "We use your data for matching, improvement, tracking, notifications, and analytics.",
      content: "We use your data to: (1) Match mentees with suitable mentors, (2) Improve our AI matching algorithm, (3) Track progress toward your learning goals, (4) Send session reminders and important notifications, (5) Generate anonymized analytics about platform usage and effectiveness, and (6) Ensure compliance with our community guidelines.",
      subsections: [
        {
          id: "primary-purposes",
          title: "Primary Purposes",
          content: "The main ways we use your data include: Creating and managing your account, Matching mentees with appropriate mentors, Facilitating communication between mentors and mentees, Scheduling and managing mentorship sessions, Tracking progress toward established goals, Providing personalized resources and recommendations, Processing feedback and improving the quality of mentorships, and Sending important notifications about the platform or your mentorship."
        },
        {
          id: "secondary-purposes",
          title: "Secondary Purposes",
          content: "Additional ways we may use your data include: Improving our platform and services through usage analytics, Developing new features based on user behavior and feedback, Conducting research to advance mentorship effectiveness (always with anonymized data), Creating benchmarks and best practices for mentorship relationships, Ensuring compliance with our community guidelines and terms of service, and Responding to legal requests where required by law."
        },
        {
          id: "progress-tracking",
          title: "Goal Setting & Progress Tracking",
          content: "When you use our goal-setting and progress tracking features, we collect and process data about your established goals, milestones, completion rates, and performance metrics. This information is used to help you and your mentor track progress, identify areas for improvement, and celebrate achievements. This data may also be used in aggregate, anonymized form to help us understand patterns in successful mentorship relationships."
        }
      ]
    },
    {
      id: "data-sharing",
      title: "Data Sharing",
      icon: "GlobeIcon",
      summary: "We share limited personal information for mentorship purposes only.",
      content: "We share limited personal information with mentors and mentees as necessary for the mentorship relationship. We do not sell your personal data to third parties. Anonymous, aggregated data may be used for research or shared with partners to improve educational outcomes.",
      subsections: [
        {
          id: "mentorship-sharing",
          title: "Sharing for Mentorship Purposes",
          content: "We share relevant profile information between mentors and mentees who are matched for a mentorship relationship. This includes names, academic/professional background, interests, goals, and contact details provided for platform communication. We limit this sharing to what is necessary for an effective mentorship relationship."
        },
        {
          id: "service-providers",
          title: "Service Providers",
          content: "We may share data with trusted third-party service providers who perform services on our behalf, such as: Cloud hosting and storage providers, Email and communication service providers, Analytics providers, Customer support services, Payment processors (if applicable for premium features), and Session scheduling tools. All service providers are contractually obligated to use your information only for the purposes of providing services to us and in compliance with this privacy policy."
        },
        {
          id: "research-partners",
          title: "Research & Educational Partners",
          content: "We may share anonymized, aggregated data with educational institutions, researchers, or partners to improve mentorship practices, develop educational resources, or conduct research on effective learning and mentorship. Such data cannot be used to identify individual users. If we ever wish to share identifiable data for research purposes, we will obtain your explicit consent first."
        }
      ]
    },
    {
      id: "feedback-ratings",
      title: "Feedback & Rating System",
      icon: "BellIcon",
      summary: "Feedback is anonymous to mentors but visible to administrators.",
      content: "While feedback and ratings are anonymous to mentors, they are not anonymous to platform administrators who monitor for abuse or inappropriate content. We may use anonymized feedback to showcase top mentors on our leaderboard.",
      subsections: [
        {
          id: "anonymity-limits",
          title: "Limits to Anonymity",
          content: "While we maintain anonymity between mentors and their feedback providers, please note that platform administrators can see who submitted which feedback. This is necessary to prevent abuse of the feedback system, investigate reports of inappropriate behavior, and maintain platform integrity. Administrators are bound by confidentiality requirements and will not disclose your identity to mentors except in cases involving serious policy violations."
        },
        {
          id: "feedback-usage",
          title: "How We Use Feedback Data",
          content: "Feedback and ratings data is used to: Improve the quality of mentorship on the platform, Identify top-performing mentors for recognition on our leaderboard, Help mentors improve their mentorship skills, Match mentees with the most appropriate mentors, and Identify mentors who may need additional training or support. Aggregate feedback statistics may appear on mentor profiles, but individual comments are never attributed to specific mentees."
        },
        {
          id: "disputes-appeals",
          title: "Feedback Disputes & Appeals",
          content: "If a mentor believes they have received unfair or inappropriate feedback, they may appeal to platform administrators. In such cases, administrators will review the feedback without revealing the mentee's identity unless absolutely necessary for resolving serious disputes or policy violations. We reserve the right to remove feedback that violates our community guidelines."
        }
      ]
    },
    {
      id: "well-being-support",
      title: "Emergency & Well-being Support",
      icon: "AlertTriangleIcon",
      summary: "Information in the Emergency Support Section is treated with high confidentiality.",
      content: "Information shared in the Emergency Support & Well-being Section is treated with the highest level of confidentiality and is only accessible to designated counselors or faculty members.",
      isImportant: true,
      subsections: [
        {
          id: "confidentiality-protocol",
          title: "Confidentiality Protocol",
          content: "Information shared through our Emergency & Well-being Support feature is subject to enhanced privacy protections. This information is: Accessible only to qualified counselors, mental health professionals, or designated faculty members, Stored separately from general platform data with additional encryption, Never used for platform analytics or improvement purposes, and Never shared with mentors, other mentees, or third parties without your explicit consent (except in cases where we are legally required to report imminent harm)."
        },
        {
          id: "mandatory-reporting",
          title: "Mandatory Reporting Exceptions",
          content: "While we maintain strict confidentiality, there are certain situations where we may be legally required to break confidentiality. These include: Imminent risk of serious harm to yourself or others, Suspected abuse or neglect of a child, elderly person, or dependent adult, Court orders or subpoenas legally requiring disclosure, and Other situations where we are legally mandated to report. In these situations, we will limit disclosure to only what is legally required."
        },
        {
          id: "crisis-resources",
          title: "External Crisis Resources",
          content: "In addition to our platform support, we may provide links to external crisis resources. Please note that when you use these external resources, their privacy policies, not ours, will apply to information you share with them. We carefully select reputable partners but cannot guarantee the privacy practices of external services."
        }
      ]
    },
    {
      id: "data-security",
      title: "Data Security",
      icon: "LockIcon",
      summary: "We use industry-standard security measures to protect your data.",
      content: "We implement industry-standard security measures to protect your personal information. This includes encryption, secure servers, regular security audits, and strict access controls for our staff.",
      isImportant: true,
      subsections: [
        {
          id: "security-measures",
          title: "Technical Security Measures",
          content: "We employ the following security measures to protect your data: Data encryption in transit and at rest using industry-standard protocols, Secure user authentication with multi-factor authentication options, Regular security assessments and penetration testing, Firewalls and intrusion detection systems, Regular security patches and updates to our systems, and Automated monitoring for suspicious activities or unauthorized access attempts."
        },
        {
          id: "staff-access",
          title: "Staff Access Controls",
          content: "Employee access to user data is strictly limited to those who need it to perform their job functions. All staff with data access must: Complete privacy and security training, Sign confidentiality agreements, Use unique authenticated credentials, Access data through secure channels only, and Have their access regularly audited and reviewed. We maintain access logs and employ the principle of least privilege to limit data exposure."
        },
        {
          id: "breach-response",
          title: "Data Breach Response Plan",
          content: "Despite our best efforts, no security system is impenetrable. In the event of a data breach that affects your personal information, we will: Promptly notify affected users in accordance with applicable laws, Investigate the cause and extent of the breach, Take measures to contain and mitigate the breach, Implement additional safeguards to prevent similar breaches, and Work with law enforcement and regulatory authorities as appropriate."
        }
      ]
    },
    {
      id: "data-retention",
      title: "Data Retention",
      icon: "ClockIcon",
      summary: "We retain data for active accounts and archive inactive ones after 12 months.",
      content: "We retain your data for as long as you maintain an active account on our platform. Inactive accounts may be archived after 12 months of inactivity. You can request data deletion at any time through your account settings.",
      subsections: [
        {
          id: "retention-periods",
          title: "Specific Retention Periods",
          content: "We retain different types of data for different periods: Account profile information: Retained while your account remains active, Communication records: Retained for 24 months from date of communication, Mentorship session notes and resources: Retained for 36 months from creation, Feedback and ratings: Retained indefinitely in anonymized form, Usage logs and platform analytics: Retained for 12 months in identifiable form, then anonymized, and Well-being support information: Retained for 12 months after last interaction, then securely deleted."
        },
        {
          id: "account-deletion",
          title: "Account Deletion Process",
          content: "When you delete your account: Your profile information will be permanently deleted within 30 days, Your profile will be immediately removed from mentor/mentee searches, Content you've shared in forums may remain but will be anonymized, Direct communications will be deleted from both your and your mentor's/mentee's inboxes, and Any shared documents or resources will be removed from your access but may remain accessible to others if they were designated as shared resources."
        },
        {
          id: "data-archives",
          title: "Data Archives & Backups",
          content: "For technical and disaster recovery purposes, your data may remain in our backup systems for up to 90 days after deletion from our main systems. These backups are encrypted and secured with access limited to essential technical personnel only. Backups are only used for system restoration purposes in the event of catastrophic data loss."
        }
      ]
    },
    {
      id: "user-rights",
      title: "Your Rights",
      icon: "UserIcon",
      summary: "You have rights to access, correct, or delete your personal information.",
      content: "You have the right to access, correct, or delete your personal information. You can also request a copy of all data we hold about you. These actions can be performed through your account settings or by contacting our privacy team.",
      subsections: [
        {
          id: "access-rights",
          title: "Right to Access",
          content: "You have the right to request access to the personal information we hold about you. This includes: Confirmation of whether we process your personal data, Copies of your personal data, Information about how we use and share your data, and The sources from which we obtained your data (if not directly from you). You can access most of this information directly through your account dashboard. For additional information, you can submit a formal access request through our privacy portal or by contacting our privacy team."
        },
        {
          id: "correction-rights",
          title: "Right to Correction",
          content: "You have the right to request that we correct any incomplete or inaccurate information we hold about you. Most profile information can be corrected directly through your account settings. For other corrections, please contact our privacy team with the details of what information needs to be corrected and why."
        },
        {
          id: "deletion-rights",
          title: "Right to Deletion",
          content: "You have the right to request deletion of your personal data under certain circumstances, such as when the data is no longer necessary for the purposes for which it was collected. You can delete your account through your account settings, which will initiate our data deletion process. Please note that we may retain certain information as required by law or for legitimate business purposes, as outlined in our retention policy."
        },
        {
          id: "additional-rights",
          title: "Additional Rights",
          content: "Depending on your location, you may have additional rights, including: Right to restrict processing of your data, Right to data portability (receiving your data in a structured, machine-readable format), Right to object to processing based on legitimate interests, Right to withdraw consent for processing based on consent, and Right to not be subject to decisions based solely on automated processing. The availability of these rights depends on applicable laws in your jurisdiction."
        }
      ]
    },
    {
      id: "policy-updates",
      title: "Policy Updates",
      icon: "BellIcon",
      summary: "We may update this policy periodically with notification of significant changes.",
      content: "We may update this privacy policy periodically. We will notify you of significant changes via email or through the platform. Continued use of the platform after updates constitutes acceptance of the new terms.",
      subsections: [
        {
          id: "notification-process",
          title: "How We Notify Users",
          content: "When we make significant changes to this policy, we will notify users through: Email notifications to the address associated with your account, In-app notifications when you log into the platform, A prominent notice on our website, and For major revisions, a 30-day advance notice before changes take effect. Minor changes (such as clarifications or corrections that don't affect your rights) may be made without notification."
        },
        {
          id: "version-history",
          title: "Policy Version History",
          content: "We maintain a complete version history of our privacy policy. Past versions are available upon request from our privacy team. Each version is annotated with the effective dates and a summary of major changes from the previous version."
        }
      ]
    }
  ]
};

const PrivacyPolicyPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("main");
  const [searchTerm, setSearchTerm] = useState("");

  // Get the icon component based on the icon name
  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case "InfoIcon": return <InfoIcon className="h-5 w-5" />;
      case "ShieldIcon": return <ShieldIcon className="h-5 w-5" />;
      case "LockIcon": return <LockIcon className="h-5 w-5" />;
      case "UserIcon": return <UserIcon className="h-5 w-5" />;
      case "BellIcon": return <BellIcon className="h-5 w-5" />;
      case "ClockIcon": return <ClockIcon className="h-5 w-5" />;
      case "GlobeIcon": return <GlobeIcon className="h-5 w-5" />;
      case "AlertTriangleIcon": return <AlertTriangleIcon className="h-5 w-5" />;
      default: return <InfoIcon className="h-5 w-5" />;
    }
  };

  // Filter sections based on search term
  const filteredSections = searchTerm
    ? privacyPolicyData.sections.filter(
      section =>
        section.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        section.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        section.subsections?.some(subsection =>
          subsection.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          subsection.content.toLowerCase().includes(searchTerm.toLowerCase())
        )
    )
    : privacyPolicyData.sections;

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8 md:py-12 lg:py-16 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Privacy Policy
          </h1>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Learn how we collect, use, and protect your data on our mentorship platform.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-2 mt-4">
            <Badge variant="outline" className="py-1 px-3">
              Version {privacyPolicyData.version}
            </Badge>
            <span className="hidden sm:block text-gray-400">•</span>
            <p className="text-sm text-gray-500">
              Last updated: {privacyPolicyData.lastUpdated}
            </p>
            <span className="hidden sm:block text-gray-400">•</span>
            <p className="text-sm text-gray-500">
              Effective: {privacyPolicyData.effectiveDate}
            </p>
          </div>
        </div>

        {/* Search and Navigation */}
        <div className="mb-8 flex flex-col md:flex-row gap-4 items-center">
          <div className="relative w-full md:w-1/2">
            <input
              type="text"
              placeholder="Search privacy policy..."
              className="w-full py-2 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button
                className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
                onClick={() => setSearchTerm("")}
              >
                ✕
              </button>
            )}
          </div>
          <Tabs defaultValue="main" className="w-full md:w-auto" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-3 w-full md:w-auto">
              <TabsTrigger value="main">Main Policy</TabsTrigger>
              <TabsTrigger value="regulations">Regulations</TabsTrigger>
              <TabsTrigger value="history">Revision History</TabsTrigger>
            </TabsList>

            <TabsContent value="main" className={activeTab === "main" ? "block" : "hidden"}>
              {/* Introduction Card */}
              <Card className="mb-8 shadow-sm">
                <CardHeader>
                  <CardTitle>Our Commitment to Your Privacy</CardTitle>
                  <CardDescription>How we protect your information on our mentorship platform</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">
                    At the Mentorship Platform, we take your privacy seriously. This policy outlines how we collect, use,
                    and protect your personal information as you use our service to connect with mentors and pursue your career goals.
                    We've designed our privacy practices to be transparent and to put you in control of your information.
                  </p>
                  <p className="text-gray-700 mt-4">
                    Our platform facilitates meaningful connections between mentors and mentees while respecting everyone's privacy
                    and data rights. We only collect information that is necessary to provide our services, and we are committed
                    to using this information responsibly and transparently.
                  </p>
                </CardContent>
              </Card>

              {/* Key Points Summary */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Key Points</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {privacyPolicyData.sections
                    .filter(section => section.isImportant)
                    .map(section => (
                      <Card key={section.id} className="shadow-sm bg-white/50 hover:bg-white transition duration-200">
                        <CardHeader className="p-4 pb-2">
                          <CardTitle className="text-lg flex items-center gap-2">
                            {getIconComponent(section.icon)}
                            <span>{section.title}</span>
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 pt-2">
                          <p className="text-sm text-gray-600">{section.summary}</p>
                        </CardContent>
                        <CardFooter className="p-4 pt-0">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-blue-600 hover:text-blue-800 p-0 h-auto"
                            onClick={() => document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' })}
                          >
                            Read more →
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                </div>
              </div>

              <Separator className="my-8" />

              {/* Detailed Sections Accordion */}
              <div className="mb-10">
                <h2 className="text-xl font-semibold mb-4">Full Privacy Policy</h2>
                {searchTerm && filteredSections.length === 0 ? (
                  <div className="bg-white p-8 rounded-lg shadow-sm text-center">
                    <p className="text-gray-500">No sections match your search. Try different keywords.</p>
                  </div>
                ) : (
                  <Accordion type="single" collapsible className="bg-white rounded-lg shadow-sm">
                    {filteredSections.map((section) => (
                      <AccordionItem key={section.id} value={section.id} className="border-b last:border-b-0" id={section.id}>
                        <AccordionTrigger className="px-6 py-4 hover:bg-gray-50">
                          <div className="flex items-center gap-3 text-left">
                            <div className="flex-shrink-0 text-blue-600">
                              {getIconComponent(section.icon)}
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-medium">{section.title}</span>
                                {section.isImportant && (
                                  <Badge variant="default" className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                                    Important
                                  </Badge>
                                )}
                              </div>
                              <p className="text-sm text-gray-500 font-normal mt-1">{section.summary}</p>
                            </div>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="px-6 py-4">
                          <div className="text-gray-700 mb-4">
                            <p>{section.content}</p>
                          </div>

                          {section.subsections && section.subsections.length > 0 && (
                            <div className="mt-6 space-y-4">
                              {section.subsections.map(subsection => (
                                <div key={subsection.id} className="border-l-4 border-blue-100 pl-4 py-2">
                                  <h4 className="font-medium text-gray-900 mb-2">{subsection.title}</h4>
                                  <p className="text-gray-700">{subsection.content}</p>
                                </div>
                              ))}
                            </div>
                          )}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                )}
              </div>
            </TabsContent>

            <TabsContent value="regulations" className={activeTab === "regulations" ? "block" : "hidden"}>
              <Card className="mb-8 shadow-sm">
                <CardHeader>
                  <CardTitle>Regulatory Compliance</CardTitle>
                  <CardDescription>Privacy regulations that govern our data processing</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-6">
                    Our mentorship platform complies with various privacy regulations worldwide. Depending on your location,
                    different regulations may apply to how we process your personal data. Below is information about
                    key regulations that may affect your privacy rights.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {privacyPolicyData.regulations.map(regulation => (
                      <Card key={regulation.id} className="border border-gray-200">
                        <CardHeader className="bg-gray-50">
                          <CardTitle className="text-lg">{regulation.name}</CardTitle>
                          <CardDescription>
                            Applies to users in: {regulation.appliesTo.join(', ')}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="pt-4">
                          <p className="text-gray-700">{regulation.description}</p>
                        </CardContent>
                        <CardFooter className="bg-gray-50 border-t border-gray-200 flex justify-end">
                          <Button variant="outline" size="sm">Learn More</Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="history" className={activeTab === "history" ? "block" : "hidden"}>
              <Card className="mb-8 shadow-sm">
                <CardHeader>
                  <CardTitle>Privacy Policy Revision History</CardTitle>
                  <CardDescription>Track how our privacy practices have evolved</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-6">
                    We believe in transparency regarding changes to our privacy practices. Below is a history of
                    significant revisions to our privacy policy, with details about what changes were made and when.
                  </p>

                  <div className="relative border-l-2 border-gray-200 ml-4 pl-8 space-y-8">
                    {privacyPolicyData.revisionHistory.map((revision, index) => (
                      <div key={index} className="relative">
                        <div className="absolute -left-10 mt-1.5 h-4 w-4 rounded-full bg-blue-500"></div>
                        <div className="mb-2">
                          <Badge variant="outline" className="mb-1 mr-2">{revision.version}</Badge>
                          <span className="text-sm text-gray-500">{revision.date}</span>
                        </div>
                        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                          <p className="text-gray-700">{revision.changes}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Alert for policy updates */}
        <Alert className="mb-8 bg-blue-50 border-blue-200">
          <InfoIcon className="h-4 w-4" />
          <AlertTitle>Policy Update Notice</AlertTitle>
          <AlertDescription>
            This privacy policy has been updated and will go into effect on {privacyPolicyData.effectiveDate}.
            Please review the changes, particularly to our AI matching transparency section.
          </AlertDescription>
        </Alert>
        <Card className="mb-8 bg-gray-50 border-none shadow-sm">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <h2 className="text-xl font-semibold mb-3">Contact Us</h2>
                <p className="text-gray-700 mb-4">
                  If you have any questions about our privacy practices or would like to exercise your data rights,
                  please contact our Privacy Team using any of the methods below:
                </p>
                <div className="flex flex-col space-y-2 text-gray-700">
                  <p><strong>Email:</strong> privacy@mentorshipplatform.com</p>
                  <p><strong>Phone:</strong> +1 (555) 123-4567</p>
                  <p><strong>Address:</strong> 123 Education Street, Knowledge City, 12345</p>
                  <p><strong>Data Protection Officer:</strong> Jane Smith (dpo@mentorshipplatform.com)</p>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-semibold mb-3">Quick Actions</h3>
                <div className="flex flex-col space-y-3">
                  <Button className="w-full">Download My Data</Button>
                  <Button variant="outline" className="w-full">Manage Preferences</Button>
                  <Button variant="ghost" className="w-full text-red-600 hover:text-red-800 hover:bg-red-50">
                    Delete My Account
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;