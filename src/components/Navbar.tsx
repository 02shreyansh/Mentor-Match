import { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu, Bell, Search } from 'lucide-react';
import { Link } from 'react-router-dom';


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Find Mentors", href: "#" },
    { name: "Become a Mentor", href: "#" },
    { name: "Resources", href: "#" },
    { name: "Success Stories", href: "#" },
    { name: "About Us", href: "#" },
  ];

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <Link to={"/"}><span className="text-primary font-bold text-xl">MM</span></Link>
            </div>
            {/* Desktop navigation */}
            <div className="hidden md:ml-6 md:flex md:space-x-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-gray-500 hover:text-primary inline-flex items-center px-1 pt-1 text-sm font-medium"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          {/* Desktop actions */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <Button variant="ghost" size="icon">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="outline" className="hidden lg:flex cursor-pointer"><Link to ={`/signin`}>Sign In</Link></Button>
            <Button><Link to={"/signup"}>Get Started</Link></Button>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <div className="flex flex-col mt-6 space-y-4">
                  {navLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.href}
                      className="text-gray-500 hover:text-primary px-3 py-2 text-base font-medium"
                      onClick={() => setIsOpen(false)}
                    >
                      {link.name}
                    </a>
                  ))}
                  <div className="pt-4 space-y-2">
                    <Button variant="outline" className="w-full"><Link to ={`/signin`}>Sign In</Link></Button>
                    <Button className="w-full">Get Started</Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;