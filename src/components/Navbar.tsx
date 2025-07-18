import { useState, useRef, useEffect } from "react";
import { ChevronDown, ChevronUp, Menu, X } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  return (
    <>
      <header className={`fixed top-0 left-0 w-full z-30 transition-all duration-300 border-b ${isScrolled ? 'backdrop-blur-md bg-primary-foreground' : 'bg-primary-foreground'}`}>
        <div className={`container mx-auto px-4 lg:px-8`}>
          <div className="flex justify-between">
            <Link className="hidden lg:flex items-center" to="/">
              <img src="/logo.avif" alt="Logo" className="h-24 p-3" />
            </Link>

            <div>
              <div
                className="hidden lg:flex items-center space-x-9 text-white bg-secondary ps-28 pe-5 py-1 w-1/4 ms-auto cursor-pointer transition-colors duration-300 hover:bg-teal-600 font-bold font-sans"
                style={{
                  clipPath: "polygon(90% 0%, 100% 0, 100% 100%, 18.5% 100%, 6.5% 0%, 0 0)",
                }}
              >
                APPLY NOW
              </div>
              <div className="hidden lg:flex justify-end items-center mt-4 font-bold tracking-wide">
                <ul className="flex space-x-10 text-base">
                  <li>
                    <Link to="/" className="uppercase hover:text-secondary">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link to="/about" className="uppercase hover:text-secondary">
                      About
                    </Link>
                  </li>
                  <li>
                    <Link to="/admission" className="uppercase hover:text-secondary">
                      Admission
                    </Link>
                  </li>
                  <li>
                    <DropdownMenu onOpenChange={setIsOpen}>
                      <DropdownMenuTrigger className="uppercase hover:text-secondary flex items-center gap-1 outline-none cursor-pointer">
                        Departments {isOpen ? <ChevronUp /> : <ChevronDown />}
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="bg-white ml-28 rounded-none z-50">
                        {[
                          "Civil Engineering",
                          "Mechanical Engineering",
                          "Electrical and Electronics Engineering",
                          "Computer Engineering",
                          "Automobile Engineering",
                          "Architecture",
                        ].map((dept) => (
                          <DropdownMenuItem key={dept} className="rounded-none" asChild>
                            <Link to={`/departments/${dept.replace(/\s+/g, "-")}`}>{dept}</Link>
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </li>
                  <li>
                    <Link to="/facilities" className="uppercase hover:text-secondary">
                      Facilities
                    </Link>
                  </li>
                  <li className="group relative">
  <Link to="/student-corner/0" className="uppercase hover:text-secondary">
    Student Corner
  </Link>
  <ul className="absolute hidden group-hover:block bg-white text-black min-w-[200px] shadow-md z-10 pt-2">
  <li>
      <Link 
        to="/student-corner/syllabus" 
        className="block px-2 py-1.5 hover:bg-gray-100 hover:text-secondary font-normal text-sm"
      >
        Syllabus
      </Link>
    </li>
    <li>
      <Link 
        to="/student-corner/question-papers" 
        className="block px-2 py-1.5 hover:bg-gray-100 hover:text-secondary font-normal text-sm"
      >
        Question Papers
      </Link>
    </li>
    <li>
      <Link 
        to="/student-corner/lab-manual" 
        className="block px-2 py-1.5 hover:bg-gray-100 hover:text-secondary font-normal text-sm"
      >
        Lab Manual
      </Link>
    </li>
  </ul>
</li>
                  <li>
                    <Link to="/gallery" className="uppercase hover:text-secondary">
                      Gallery
                    </Link>
                  </li>
                  <li>
                    <Link to="/contact" className="uppercase hover:text-secondary">
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Navigation Bar */}
          <nav className="flex items-center justify-between">
            {/* Mobile Brand */}
            <Link className="flex lg:hidden items-center" to="/">
              <img src="/logo.avif" alt="Logo" className="w-36 p-2" />
            </Link>

            {/* Toggle Button for Mobile */}
            <button
              className="lg:hidden text-primary"
              onClick={toggleMenu}
              aria-label="Toggle navigation"
            >
              {!isMenuOpen ? <Menu className="w-8 h-8" /> : <X className="w-8 h-8" />}
            </button>
          </nav>
        </div>
      </header>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black z-20 lg:hidden"
              onClick={toggleMenu}
            />

            {/* Sidebar */}
            <motion.div
              ref={menuRef}
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", ease: "easeInOut" }}
              className="lg:hidden fixed top-0 left-0 w-4/5 max-w-sm h-full bg-primary-foreground z-30 shadow-xl overflow-y-auto"
            >
              <div className="flex justify-between items-center p-4 border-b">
                <Link to="/" onClick={toggleMenu}>
                  <img src="/logo.avif" alt="Logo" className="w-32" />
                </Link>
                <button onClick={toggleMenu} className="p-2">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <ul className="flex flex-col py-4 px-6 space-y-3 font-bold">
                <li>
                  <Link
                    to="/"
                    className="block py-3 px-4 rounded hover:bg-gray-100 uppercase hover:text-secondary"
                    onClick={toggleMenu}
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about"
                    className="block py-3 px-4 rounded hover:bg-gray-100 uppercase hover:text-secondary"
                    onClick={toggleMenu}
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admission"
                    className="block py-3 px-4 rounded hover:bg-gray-100 uppercase hover:text-secondary"
                    onClick={toggleMenu}
                  >
                    Admission
                  </Link>
                </li>
                <li className="relative">
                  <details className="group">
                    <summary className="flex justify-between items-center py-3 px-4 rounded hover:bg-gray-100 uppercase hover:text-secondary cursor-pointer list-none">
                      <span>Departments</span>
                      <ChevronDown className="w-5 h-5 group-open:rotate-180 transition-transform" />
                    </summary>
                    <ul className="pl-6 mt-1 space-y-2">
                      <li>
                        <Link
                          to="/departments/Civil-Engineering"
                          className="block py-2 px-4 rounded hover:bg-gray-100 uppercase hover:text-secondary text-sm"
                          onClick={toggleMenu}
                        >
                          Civil Engineering
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/departments/Mechanical-Engineering"
                          className="block py-2 px-4 rounded hover:bg-gray-100 uppercase hover:text-secondary text-sm"
                          onClick={toggleMenu}
                        >
                          Mechanical Engineering
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/departments/Electrical-and-Electronics-Engineering"
                          className="block py-2 px-4 rounded hover:bg-gray-100 uppercase hover:text-secondary text-sm"
                          onClick={toggleMenu}
                        >
                          Electrical & Electronics
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/departments/Computer-Engineering"
                          className="block py-2 px-4 rounded hover:bg-gray-100 uppercase hover:text-secondary text-sm"
                          onClick={toggleMenu}
                        >
                          Computer Engineering
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/departments/Automobile-Engineering"
                          className="block py-2 px-4 rounded hover:bg-gray-100 uppercase hover:text-secondary text-sm"
                          onClick={toggleMenu}
                        >
                          Automobile Engineering
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/departments/Architecture"
                          className="block py-2 px-4 rounded hover:bg-gray-100 uppercase hover:text-secondary text-sm"
                          onClick={toggleMenu}
                        >
                          Architecture
                        </Link>
                      </li>
                    </ul>
                  </details>
                </li>
                <li>
                  <Link
                    to="/facilities"
                    className="block py-3 px-4 rounded hover:bg-gray-100 uppercase hover:text-secondary"
                    onClick={toggleMenu}
                  >
                    Facilities
                  </Link>
                </li>
                <li>
                  <Link
                    to="/student-corner/0"
                    className="block py-3 px-4 rounded hover:bg-gray-100 uppercase hover:text-secondary"
                    onClick={toggleMenu}
                  >
                Student Corner
                  </Link>
                </li>
                <li>
                  <Link
                    to="/gallery"
                    className="block py-3 px-4 rounded hover:bg-gray-100 uppercase hover:text-secondary"
                    onClick={toggleMenu}
                  >
                    Gallery
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="block py-3 px-4 rounded hover:bg-gray-100 uppercase hover:text-secondary"
                    onClick={toggleMenu}
                  >
                    Contact
                  </Link>
                </li>
              </ul>

              {/* Apply Now Button for Mobile */}
              <div className="px-6 py-4">
                <Link
                  to="/admission"
                  className="block w-full bg-secondary text-white text-center py-3 px-4 rounded font-bold hover:bg-teal-600 transition-colors duration-300"
                  onClick={toggleMenu}
                >
                  APPLY NOW
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;