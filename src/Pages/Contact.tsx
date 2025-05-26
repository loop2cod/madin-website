import { Mail, Phone, MapPin, Facebook, Youtube } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import BlurIn from '@/components/ui/blur-in'
import { useEffect } from 'react'
import contactData from '../data/contact.json'

const Contact = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [])

  const { contact_section } = contactData

  return (
    <div className="md:mt-24">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-secondary to-teal-700 brightness-[0.8]" />
        <div className="relative z-10 px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl text-center">
            <BlurIn
              word="Contact Us"
              className="text-4xl font-bold tracking-tight text-white sm:text-6xl"
            />
            <p className="mt-6 text-lg leading-8 text-gray-200">
              Get in touch with us for any inquiries or support
            </p>
          </div>
        </div>
      </div>
      
      {/* Main Content Container */}
      <div className="flex items-center justify-center w-full">
        <div className='w-full max-w-[90vw]'>
          {/* Grid Layout - changes based on screen size */}
          <div className='grid grid-cols-1 lg:grid-cols-6 gap-4 w-full mx-auto'>
            
            {/* Orange Sidebar - full width on mobile, 2 columns on lg+ */}
            <div className="lg:col-span-2 bg-secondary text-white p-4 md:p-8 flex flex-col justify-between lg:mt-[101px] mb-8">
              <div className="space-y-6 md:space-y-8">
                {/* Phone Numbers */}
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-white flex items-center justify-center">
                      <Phone className="h-5 w-5 md:h-6 md:w-6" />
                    </div>
                    <div>
                      <div className="text-sm opacity-90">Office :</div>
                      <div className="font-medium text-sm md:text-base">
                        {contact_section.office_numbers.join(", ")}
                      </div>
                      <div className="text-sm opacity-90 mt-1">Admission :</div>
                      <div className="font-medium text-sm md:text-base">
                        {contact_section.admission_number}
                      </div>
                    </div>
                  </div>
                </div>

                <hr className="border-white/30" />

                {/* Email */}
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-white flex items-center justify-center">
                      <Mail className="h-5 w-5 md:h-6 md:w-6" />
                    </div>
                    <div>
                      <div className="font-medium text-sm md:text-base break-all">
                        {contact_section.email}
                      </div>
                    </div>
                  </div>
                </div>

                <hr className="border-white/30" />

                {/* Address */}
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-white flex items-center justify-center">
                      <MapPin className="h-5 w-5 md:h-6 md:w-6" />
                    </div>
                    <div>
                      <div className="font-medium text-sm md:text-base">
                        {contact_section.address.line1}
                      </div>
                      <div className="font-medium text-sm md:text-base">
                        {contact_section.address.line2}
                      </div>
                      <div className="font-medium text-sm md:text-base">
                        {contact_section.address.state_country}
                      </div>
                    </div>
                  </div>
                </div>

                <hr className="border-white/30" />
              </div>

              {/* Social Media Icons */}
              <div className="flex gap-4 mt-6">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-white flex items-center justify-center hover:bg-white hover:text-secondary transition-colors cursor-pointer">
                  <Facebook className="h-5 w-5 md:h-6 md:w-6" />
                </div>
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-white flex items-center justify-center hover:bg-white hover:text-secondary transition-colors cursor-pointer">
                  <Youtube className="h-5 w-5 md:h-6 md:w-6" />
                </div>
              </div>
            </div>

            {/* Main Content - full width on mobile, 4 columns on lg+ */}
            <div className="lg:col-span-4 flex-1 p-2 md:p-8">
              <div className="max-w-6xl">
                <h1 className="text-xl md:text-3xl font-bold font-serif mb-6 md:mb-8">
                  <BlurIn 
                    word="Important Phone Numbers" 
                    className="inline-block bg-gradient-to-r from-secondary to-teal-600 text-transparent bg-clip-text font-serif" 
                  />
                </h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                  {contact_section.important_contacts.map((contact, index) => (
                    <Card 
                      key={index} 
                      className="hover:shadow-lg transition-shadow border-l-4 border-l-secondary rounded-none"
                    >
                      <CardContent className="p-4 md:p-6">
                        <h3 className="font-bold text-secondary text-base md:text-lg mb-1">
                          {contact.name}
                        </h3>
                        <p className="text-gray-600 text-xs md:text-sm mb-3 md:mb-4">
                          {contact.designation}
                        </p>
                        <div className="space-y-2">
                          {contact.phone_numbers.map((number, phoneIndex) => (
                            <div key={phoneIndex}>
                              <a
                                href={`tel:${number.replace(/\s*$$[^)]*$$/, "")}`}
                                className="text-secondary hover:text-secondary font-medium text-xs md:text-sm block"
                              >
                                {number}
                              </a>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact