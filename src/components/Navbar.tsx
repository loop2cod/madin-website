import { useState, useRef, useEffect } from "react";
import { Menu, X, Phone, Mail, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const menuRef = useRef<any>(null);

  // Toggle the menu open/close
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Detect scroll to add backdrop blur effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup on unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Close the menu when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
              className="hidden lg:flex items-center justify-end w-full space-x-9 text-white bg-secondary ps-28 pe-5 py-1 rounded"
              style={{
                clipPath: "polygon(90% 0%, 100% 0, 100% 100%, 8.5% 100%, 6.5% 0%, 0 0)",
              }}
            >
              <Link to="tel:+911234567890" className="flex items-center space-x-2">
                <Phone className="w-6 h-6" />
                <span>+91 1234567890</span>
              </Link>
              <Link to="mailto:info@madin.com" className="flex items-center space-x-2">
                <Mail className="w-6 h-6" />
                <span>info@madin.com</span>
              </Link>
              <Link target="_blank" to="https://www.google.com/maps/place/Bin+Shabib+Mall/@25.2805449,55.3799611,18.62z/data=!4m6!3m5!1s0x3e5f5c475ed7622b:0xd9e461a20a362c59!8m2!3d25.2806038!4d55.3806696!16s%2Fg%2F11c763yhrp?entry=ttu&g_ep=EgoyMDI0MTExOS4yIKXMDSoASAFQAw%3D%3D" className="flex items-center space-x-2">
                <MapPin className="w-6 h-6" />
                <span>Alaturpadi, Kerala</span>
              </Link>
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
                  <Link to="/departments" className="uppercase hover:text-secondary">
                    Departments
                  </Link>
                </li>
                <li>
                  <Link to="/facilities" className="uppercase hover:text-secondary">
                    Facilities
                  </Link>
                </li>
                <li>
                  <Link to="/downloads" className="uppercase hover:text-secondary">
                    Downloads
                  </Link>
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
         <motion.div
         ref={menuRef}
         initial={{ x: "-100%" }}
         animate={{ x: isMenuOpen ? 0 : "-100%" }}
         transition={{ type: "tween", stiffness: 200 }}
         className="lg:hidden fixed top-0 left-0 w-2/3 h-full bg-primary-foreground z-30 shadow-lg"
       >
         <div className="flex justify-between items-center p-4">
           <Link to="/">
             <img src="/logo.avif" alt="Logo" className="w-32" />
           </Link>
         </div>
 
         <ul className="flex flex-col items-start ps-10 space-y-4 font-bold">
           <li>
             <Link to ="/" className="uppercase hover:text-secondary" onClick={toggleMenu}>
               Home
             </Link>
           </li>
           <li>
             <Link to="/about" className="uppercase hover:text-secondary" onClick={toggleMenu}>
               About
             </Link>
           </li>
           <li>
             <Link to="/admission" className="uppercase hover:text-secondary" onClick={toggleMenu}>
               Admission
             </Link>
           </li>
           <li>
             <Link to="/departments" className="uppercase hover:text-secondary" onClick={toggleMenu}>
               Departments
             </Link>
           </li>
           <li>
             <Link to="/facilities" className="uppercase hover:text-secondary" onClick={toggleMenu}>
               Facilities
             </Link>
           </li>
           <li>
             <Link to="/downloads" className="uppercase hover:text-secondary" onClick={toggleMenu}>
               Downloads
             </Link>
           </li>
           <li>
             <Link to="/gallery" className="uppercase hover:text-secondary" onClick={toggleMenu}>
               Gallery
             </Link>
           </li>
           <li>
             <Link to="/contact" className="uppercase hover:text-secondary" onClick={toggleMenu}>
               Contact
             </Link>
           </li>
         </ul>
       </motion.div>
       </>
  );
};

export default Navbar;
