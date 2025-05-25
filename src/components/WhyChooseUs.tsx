import { ArrowUpRight } from 'lucide-react'
import BlurIn from './ui/blur-in'

interface FeatureCardProps {
  title: string
  description: string
  imageUrl: string
}

const FeatureCard = ({ title, description, imageUrl }: FeatureCardProps) => (
  <div className="relative w-full overflow-hidden group border">
    <div
      className="absolute inset-0 bg-cover bg-center opacity-0 md:opacity-90 group-hover:opacity-100 transition-opacity duration-300"
      style={{ backgroundImage: `url('${imageUrl}')` }}
      aria-hidden="true"
    />
    <div className="absolute inset-y-0 left-0 w-full bg-gray-100 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-in-out z-10" />
    <div className="relative p-6 md:p-8 flex flex-col justify-between h-full z-20">
      <div>
        <h3 className="text-2xl md:text-3xl font-serif text-gray-900 mb-3 text-secondary md:text-white group-hover:text-secondary">
          {title}
        </h3>
        <p className="text-gray-700 text-sm md:text-base text-black md:text-white group-hover:text-black">
          {description}
        </p>
      </div>
      <div className="self-end mt-4">
        <div className="w-10 h-10 rounded-full bg-transparent border border-black md:border-white group-hover:border-secondary flex items-center justify-center transition-colors duration-300">
          <ArrowUpRight className="w-5 h-5 text-secondary md:text-white group-hover:text-secondary transition-colors duration-300" />
        </div>
      </div>
    </div>
  </div>
)

const WhyChooseUs = () => {
  const features = [
    {
      title: "Excellence in Academics",
      description: "Our experienced faculty and well-structured academic programs ensure a strong foundation in both theory and practical skills, preparing students to excel in their technical careers.",
      imageUrl: "/library1.jpg"
    },
    {
      title: "Advanced Infrastructure & Practical Training",
      description: "Our college provides modern equipment, digital classrooms, and hands-on lab sessions that give students a real-world experience aligned with industry standards.",
      imageUrl: "/mech.jpg"
    },
    {
      title: "Career-Focused Training & Placement Support",
      description: "We offer comprehensive career development programs, including resume building, mock interviews, and strong industry connections that help students secure promising job opportunities.",
      imageUrl: "/library1.jpg"
    }
  ]

  return (
    <section className=''>
      <div className="md:max-w-[90vw] mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="pr-4 lg:pr-16">
            <h2 className="text-4xl md:text-4xl font-serif font-extralight  md:mb-6 mb-2">
            <BlurIn
      word="WHY CHOOSE US"
       className="inline-block bg-gradient-to-r from-secondary  to-teal-600 text-transparent bg-clip-text pr-5 font-serif"
          />
            </h2>
            <p className="text-secondary text-lg">
              Madin prides itself in its history of 14+ years
            </p>

            <div className="hidden lg:block relative mt-24 ml-36">
              <img
                src="/arrowdown.svg" 
                alt=""
              />
            </div>
          </div>
          
          <div className="md:space-y-6 space-y-4 col-span-2">
            {features.map((feature, index) => (
              <FeatureCard 
                key={index}
                title={feature.title}
                description={feature.description}
                imageUrl={feature.imageUrl}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default WhyChooseUs