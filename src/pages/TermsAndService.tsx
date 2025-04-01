import  { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs,  TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { AlertCircle, ArrowLeft, FileText, Home, Shield } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const TermsAndServicePage = () => {
  const [activeTab, setActiveTab] = useState("terms");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleAcceptTerms = () => {
    if (acceptedTerms) {
      setShowSuccess(true);
      // Reset after 3 seconds
      setTimeout(() => setShowSuccess(false), 3000);
    }
  };

  const lastUpdated = "March 15, 2025";

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      {/* Breadcrumbs */}
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="#"><Home className="h-4 w-4 mr-1" /> Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="#">Legal</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="#" className="font-medium">Terms & Conditions</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar for larger screens */}
        <div className="hidden lg:block lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Legal Documents</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <nav className="space-y-1">
                <Button 
                  variant={activeTab === "terms" ? "default" : "ghost"} 
                  className="w-full justify-start" 
                  onClick={() => setActiveTab("terms")}
                >
                  <FileText className="h-4 w-4 mr-2" /> Terms of Service
                </Button>
                <Button 
                  variant={activeTab === "privacy" ? "default" : "ghost"} 
                  className="w-full justify-start" 
                  onClick={() => setActiveTab("privacy")}
                >
                  <Shield className="h-4 w-4 mr-2" /> Privacy Policy
                </Button>
                <Button 
                  variant={activeTab === "conduct" ? "default" : "ghost"} 
                  className="w-full justify-start" 
                  onClick={() => setActiveTab("conduct")}
                >
                  <AlertCircle className="h-4 w-4 mr-2" /> Code of Conduct
                </Button>
              </nav>
            </CardContent>
            <CardFooter className="flex flex-col items-start">
              <p className="text-sm text-muted-foreground">Last Updated</p>
              <p className="text-sm font-medium">{lastUpdated}</p>
            </CardFooter>
          </Card>

          <div className="mt-6">
            <Button variant="outline" className="w-full">
              <ArrowLeft className="h-4 w-4 mr-2" /> Back to Home
            </Button>
          </div>
        </div>

        {/* Main content */}
        <div className="lg:col-span-3">
          {/* Mobile tabs (shown only on smaller screens) */}
          <div className="block lg:hidden mb-6">
            <Tabs defaultValue="terms" onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="terms">Terms</TabsTrigger>
                <TabsTrigger value="privacy">Privacy</TabsTrigger>
                <TabsTrigger value="conduct">Conduct</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>
                {activeTab === "terms" && "Terms of Service"}
                {activeTab === "privacy" && "Privacy Policy"}
                {activeTab === "conduct" && "Code of Conduct"}
              </CardTitle>
              <CardDescription>
                Last updated on {lastUpdated}. Please read carefully before using our platform.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-sm">
              {activeTab === "terms" && (
                <div className="space-y-6">
                  <p className="text-muted-foreground italic">
                    This Terms of Service ("Terms") governs your access to and use of the Mentorship Platform. 
                    By accessing or using our service, you agree to be bound by these Terms.
                  </p>

                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                      <AccordionTrigger>1. Terms & Definitions</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-4">
                          <p>
                            <strong>Platform:</strong> Refers to the Mentorship Platform website, mobile applications, and related services.
                          </p>
                          <p>
                            <strong>User:</strong> Any individual who accesses or uses the Platform, including Mentors and Mentees.
                          </p>
                          <p>
                            <strong>Mentor:</strong> A user who provides guidance, advice, or mentorship services on the Platform.
                          </p>
                          <p>
                            <strong>Mentee:</strong> A user who seeks guidance, advice, or mentorship services on the Platform.
                          </p>
                          <p>
                            <strong>Content:</strong> All text, information, data, images, videos, audio, and other materials uploaded, posted, or shared on the Platform.
                          </p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-2">
                      <AccordionTrigger>2. Account Registration & Eligibility</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-4">
                          <p>
                            To use certain features of the Platform, you must register for an account. You agree to provide accurate and complete information when registering and to update this information to keep it accurate and current.
                          </p>
                          <p>
                            You are responsible for maintaining the security of your account credentials and for all activities that occur under your account. You must immediately notify us of any unauthorized use of your account.
                          </p>
                          <p>
                            The Platform is intended for users who are at least 16 years of age. By accessing or using the Platform, you represent that you are at least 16 years old. If you are under 18, you must have the consent of a parent or legal guardian.
                          </p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-3">
                      <AccordionTrigger>3. Platform Usage & Conduct</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-4">
                          <p>
                            You agree to use the Platform only for lawful purposes and in accordance with these Terms. You agree not to use the Platform:
                          </p>
                          <ul className="list-disc pl-6 space-y-2">
                            <li>In any way that violates any applicable federal, state, local, or international law or regulation.</li>
                            <li>To engage in any conduct that restricts or inhibits anyone's use or enjoyment of the Platform.</li>
                            <li>To impersonate or attempt to impersonate any person or entity.</li>
                            <li>To engage in any harassing, intimidating, predatory, or stalking conduct.</li>
                            <li>To engage in any fraudulent or deceptive activity.</li>
                            <li>To transmit any harmful or malicious code, files, or programs.</li>
                          </ul>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-4">
                      <AccordionTrigger>4. Mentorship Relationship</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-4">
                          <p>
                            The Platform facilitates mentorship relationships between Mentors and Mentees. However, the Platform is not responsible for the conduct of Users or the content of mentorship sessions.
                          </p>
                          <p>
                            Mentors are not employees or agents of the Platform, and the Platform makes no representations or warranties regarding the quality, appropriateness, or effectiveness of mentorship provided.
                          </p>
                          <p>
                            Users are solely responsible for establishing the terms and expectations of their mentorship relationships, including but not limited to frequency, duration, and content of mentorship sessions.
                          </p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-5">
                      <AccordionTrigger>5. Intellectual Property Rights</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-4">
                          <p>
                            The Platform and its entire contents, features, and functionality (including but not limited to all information, software, text, displays, images, video, and audio, and the design, selection, and arrangement thereof) are owned by the Company, its licensors, or other providers of such material and are protected by copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.
                          </p>
                          <p>
                            You retain ownership of any Content you submit, post, or display on or through the Platform. By submitting, posting, or displaying Content on the Platform, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, adapt, publish, translate, distribute, and display such Content.
                          </p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-6">
                      <AccordionTrigger>6. Termination & Suspension</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-4">
                          <p>
                            We may terminate or suspend your account and access to the Platform immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach these Terms.
                          </p>
                          <p>
                            Upon termination, your right to use the Platform will immediately cease. If you wish to terminate your account, you may simply discontinue using the Platform or contact us to request account deletion.
                          </p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              )}

              {activeTab === "privacy" && (
                <div className="space-y-6">
                  <p className="text-muted-foreground italic">
                    This Privacy Policy describes how we collect, use, and disclose information when you use our Mentorship Platform.
                  </p>

                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="privacy-1">
                      <AccordionTrigger>1. Information We Collect</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-4">
                          <p><strong>Information You Provide:</strong> We collect information you provide when you register for an account, create or update your profile, use the Platform features, or communicate with us.</p>
                          <ul className="list-disc pl-6 space-y-2">
                            <li>Account information: name, email address, password, phone number</li>
                            <li>Profile information: education, work experience, skills, interests</li>
                            <li>Content you share: messages, feedback, documents, notes</li>
                            <li>Communication: emails, support requests, survey responses</li>
                          </ul>
                          <p><strong>Automatically Collected Information:</strong> When you use our Platform, we may automatically collect certain information, including:</p>
                          <ul className="list-disc pl-6 space-y-2">
                            <li>Device information: IP address, browser type, device type, operating system</li>
                            <li>Usage information: pages visited, features used, time spent on the Platform</li>
                            <li>Location information: general location based on IP address</li>
                          </ul>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="privacy-2">
                      <AccordionTrigger>2. How We Use Your Information</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-4">
                          <p>We use the information we collect to:</p>
                          <ul className="list-disc pl-6 space-y-2">
                            <li>Provide, maintain, and improve the Platform</li>
                            <li>Create and manage your account</li>
                            <li>Match mentees with suitable mentors</li>
                            <li>Facilitate communication between users</li>
                            <li>Respond to your comments, questions, and requests</li>
                            <li>Send you technical notices, updates, security alerts, and administrative messages</li>
                            <li>Monitor and analyze trends, usage, and activities in connection with the Platform</li>
                            <li>Detect, prevent, and address technical issues and fraudulent or illegal activities</li>
                          </ul>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="privacy-3">
                      <AccordionTrigger>3. Information Sharing & Disclosure</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-4">
                          <p>We may share information as follows:</p>
                          <ul className="list-disc pl-6 space-y-2">
                            <li><strong>Between Users:</strong> Information shared between mentors and mentees is visible to those participants.</li>
                            <li><strong>Service Providers:</strong> We may share information with third-party vendors who provide services on our behalf.</li>
                            <li><strong>Legal Requirements:</strong> We may disclose information if required by law or if we believe it's necessary to protect our rights, property, or safety.</li>
                            <li><strong>Business Transfers:</strong> If we are involved in a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction.</li>
                          </ul>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="privacy-4">
                      <AccordionTrigger>4. Data Security</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-4">
                          <p>We implement appropriate technical and organizational measures to protect the security of your personal information. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.</p>
                          <p>You are responsible for maintaining the confidentiality of your account credentials and for any activities that occur under your account.</p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="privacy-5">
                      <AccordionTrigger>5. Your Rights & Choices</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-4">
                          <p>You have the right to:</p>
                          <ul className="list-disc pl-6 space-y-2">
                            <li>Access, update, or delete your personal information</li>
                            <li>Object to the processing of your personal information</li>
                            <li>Request restrictions on the processing of your personal information</li>
                            <li>Request the transfer of your personal information</li>
                            <li>Opt out of certain communications</li>
                          </ul>
                          <p>To exercise these rights, please contact us using the information provided at the end of this Privacy Policy.</p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              )}

              {activeTab === "conduct" && (
                <div className="space-y-6">
                  <p className="text-muted-foreground italic">
                    This Code of Conduct outlines our expectations for all members of the Mentorship Platform community.
                  </p>

                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="conduct-1">
                      <AccordionTrigger>1. Our Pledge</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-4">
                          <p>We pledge to make participation in our community a harassment-free experience for everyone, regardless of age, body size, disability, ethnicity, gender identity and expression, level of experience, nationality, personal appearance, race, religion, or sexual identity and orientation.</p>
                          <p>We are committed to creating an environment that promotes growth, learning, and professional development for all participants.</p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="conduct-2">
                      <AccordionTrigger>2. Expected Behavior</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-4">
                          <p>We expect all community members to:</p>
                          <ul className="list-disc pl-6 space-y-2">
                            <li>Be respectful and considerate of different viewpoints and experiences</li>
                            <li>Give and gracefully accept constructive feedback</li>
                            <li>Take responsibility for your actions and their impact on others</li>
                            <li>Focus on what is best for the community as a whole</li>
                            <li>Show empathy towards other community members</li>
                            <li>Respect the privacy and boundaries of others</li>
                            <li>Honor commitments and scheduled mentorship sessions</li>
                            <li>Communicate openly and honestly</li>
                          </ul>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="conduct-3">
                      <AccordionTrigger>3. Unacceptable Behavior</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-4">
                          <p>Unacceptable behaviors include:</p>
                          <ul className="list-disc pl-6 space-y-2">
                            <li>Harassment, intimidation, or discrimination in any form</li>
                            <li>Offensive comments related to gender, gender identity, sexual orientation, disability, mental illness, race, religion, or socioeconomic status</li>
                            <li>Unwelcome sexual attention or advances</li>
                            <li>Deliberate intimidation, stalking, or following</li>
                            <li>Sharing others' private information without explicit permission</li>
                            <li>Sustained disruption of discussions or events</li>
                            <li>Advocating for or encouraging any of the above behaviors</li>
                            <li>Any behavior that would be considered inappropriate in a professional setting</li>
                          </ul>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="conduct-4">
                      <AccordionTrigger>4. Reporting & Enforcement</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-4">
                          <p>If you experience or witness unacceptable behavior, please report it to us immediately using the platform's reporting feature or by contacting our support team.</p>
                          <p>All reports will be reviewed and investigated promptly and fairly. The platform team is committed to maintaining the confidentiality of the reporter.</p>
                          <p>Consequences for violating our Code of Conduct may include:</p>
                          <ul className="list-disc pl-6 space-y-2">
                            <li>A warning with a request to modify behavior</li>
                            <li>Temporary suspension from the platform</li>
                            <li>Permanent removal from the platform</li>
                            <li>Other actions deemed appropriate based on the circumstances</li>
                          </ul>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="conduct-5">
                      <AccordionTrigger>5. Mentorship-Specific Guidelines</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-4">
                          <p><strong>For Mentors:</strong></p>
                          <ul className="list-disc pl-6 space-y-2">
                            <li>Provide guidance within your areas of expertise</li>
                            <li>Be honest about your limitations and knowledge gaps</li>
                            <li>Maintain professional boundaries</li>
                            <li>Respect confidentiality and privacy</li>
                            <li>Provide constructive feedback in a supportive manner</li>
                          </ul>
                          <p><strong>For Mentees:</strong></p>
                          <ul className="list-disc pl-6 space-y-2">
                            <li>Come prepared to mentorship sessions</li>
                            <li>Be respectful of mentors' time and expertise</li>
                            <li>Be open to feedback and willing to learn</li>
                            <li>Communicate your goals and expectations clearly</li>
                            <li>Follow through on agreed-upon actions</li>
                          </ul>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex flex-col items-start space-y-4">
              {showSuccess && (
                <Alert className="w-full bg-green-50 text-green-800 border-green-200">
                  <AlertTitle className="flex items-center">
                    <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Terms Accepted
                  </AlertTitle>
                  <AlertDescription>
                    Thank you for accepting our terms and conditions. You can now continue using the platform.
                  </AlertDescription>
                </Alert>
              )}
            
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="terms" 
                  checked={acceptedTerms}
                  onCheckedChange={(checked) => setAcceptedTerms(!!checked)}
                />
                <Label htmlFor="terms" className="text-sm">
                  I have read and agree to the terms and conditions
                </Label>
              </div>
              
              <div className="flex w-full justify-between">
                <Button variant="outline">Download PDF</Button>
                <Button 
                  onClick={handleAcceptTerms}
                  disabled={!acceptedTerms}
                >
                  Accept & Continue
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TermsAndServicePage;