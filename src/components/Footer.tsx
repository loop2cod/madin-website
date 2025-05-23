import { Link } from 'react-router-dom'
import { Facebook, Linkedin, Instagram, Mail, Phone, MapPin } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-secondary">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-6  text-secondary-foreground">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
          <Link className="lg:flex items-center" to="/">
            <img src="/logo.avif" alt="Logo" className="h-16 md:h-24 p-3" />
          </Link>
            <p className="text-sm max-w-xl">
            Madin College of Engineering & Management offers quality education through its seven branches, preparing students for successful careers in various engineering fields.
            </p>
            <div className="flex space-x-6 mt-2">
              <Link to="https://www.facebook.com/share/1Attn3hQ4M/?mibextid=LQQJ4d" target="_blank" className="text-primary hover:text-secondary transition-colors">
                <Facebook className="h-6 w-6  text-secondary-foreground" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link to="https://www.linkedin.com/in/tash-keel-express-6a174933a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app" target='_blank' className="text-primary hover:text-secondary transition-colors">
                <Linkedin className="h-6 w-6 text-secondary-foreground" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link to="https://www.instagram.com/tashkeelexpress" target="_blank" className="text-primary hover:text-secondary transition-colors">
                <Instagram className="h-6 w-6 text-secondary-foreground" />
                <span className="sr-only">Instagram</span>
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-3xl mb-6 font-serif"><span className="font-bold"> Contact</span> Us</h3>
            <ul className="space-y-4 text-secondary-foreground font-semibold">
              <li className="flex items-center text-xs">
              <Link to="tel:++71123456787" className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>+91 123456787</span>
              </Link>
              </li>
              <li className="flex items-center text-xs">
              <Link to="mailto:info@tashkeelexpress.com" className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>info@madincollege.com</span>
              </Link>
              </li>
              <li className="flex items-start text-xs">
              <Link target="_blank" to="https://www.google.com/maps/place/Bin+Shabib+Mall/@25.2805449,55.3799611,18.62z/data=!4m6!3m5!1s0x3e5f5c475ed7622b:0xd9e461a20a362c59!8m2!3d25.2806038!4d55.3806696!16s%2Fg%2F11c763yhrp?entry=ttu&g_ep=EgoyMDI0MTExOS4yIKXMDSoASAFQAw%3D%3D" className="flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span>Madin College of Engineering & Management</span>
              </Link>
            </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer