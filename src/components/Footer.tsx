import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Facebook, Twitter, Instagram, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1 - About */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">MentorMatch</h3>
            <p className="text-gray-400">
              Connecting students with experienced mentors to help them achieve their academic and career goals.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                <Linkedin className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Column 2 - Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white">Find Mentors</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Become a Mentor</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Success Stories</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Resources</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">FAQ</a></li>
            </ul>
          </div>

          {/* Column 3 - Resources */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Resources</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white">Blog</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Career Guides</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Interview Prep</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Webinars</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Events</a></li>
            </ul>
          </div>

          {/* Column 4 - Newsletter */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Stay Updated</h3>
            <p className="text-gray-400">Subscribe to our newsletter for the latest updates and resources.</p>
            <div className="flex space-x-2">
              <Input 
                type="email" 
                placeholder="Your email address" 
                className="bg-gray-800 border-gray-700 text-white"
              />
              <Button>
                <Mail className="h-4 w-4 mr-2" />
                <span>Subscribe</span>
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">&copy; {new Date().getFullYear()} MentorMatch. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-white text-sm">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-white text-sm">Terms of Service</a>
            <a href="#" className="text-gray-400 hover:text-white text-sm">Contact Us</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;