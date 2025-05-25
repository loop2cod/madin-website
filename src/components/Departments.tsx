import { motion } from "framer-motion"
import { ChevronRight } from "lucide-react"
import BlurIn from "./ui/blur-in"
import { useEffect } from "react"

interface Department {
  id: number
  name: string
  category: "Engineering" | "Management"
  image: string
  description: string
}

export default function Departments() {
    useEffect(() => {
      window.scrollTo({ top: 0, behavior: "instant" })
    }, [])

  const departments: Department[] = [
    {
      id: 1,
      name: "Civil Engineering",
      category: "Engineering",
      image: "/departments/1.jpg",
      description: "Design and build the infrastructure that shapes our world.",
    },
    {
      id: 2,
      name: "Mechanical Engineering",
      category: "Engineering",
      image: "/departments/2.jpg",
      description: "Create innovative solutions through mechanical systems and energy.",
    },
    {
      id: 3,
      name: "Electrical & Electronics Engineering",
      category: "Engineering",
      image: "/departments/3.jpg",
      description: "Power the future with cutting-edge electrical technologies.",
    },
    {
      id: 4,
      name: "Computer Engineering",
      category: "Engineering",
      image: "/departments/4.jpg",
      description: "Build the digital foundations that drive modern innovation.",
    },
    {
      id: 5,
      name: "Automobile Engineering",
      category: "Engineering",
      image: "/departments/5.jpg",
      description: "Drive the evolution of transportation and mobility solutions.",
    },
    {
      id: 6,
      name: "Architecture",
      category: "Engineering",
      image: "/departments/6.jpg",
      description: "Design spaces that inspire and transform how we live.",
    },
    {
      id: 7,
      name: "Master of Business Administration",
      category: "Management",
      image: "/departments/7.jpg",
      description: "Develop leadership skills to excel in the business world.",
    },
  ]

  return (
  <div className="bg-primary/5">
      <div className="md:max-w-[90vw] mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <div className="mb-16 font-serif">
        <h2 className="text-4xl font-bold tracking-tight">
          <BlurIn word="Explore Our Departments" className="inline-block bg-gradient-to-r from-secondary to-teal-600 text-transparent bg-clip-text font-serif" />
        </h2>
        <p className="mt-4 text-xl text-gray-500 max-w-3xl">
          Our academic departments are dedicated to providing students with a comprehensive education and practical skills to succeed in their chosen field.
        </p>
      </div>

      <div className="space-y-8">
        {["Engineering", "Management"].map((category) => (
          <div key={category} className="overflow-hidden">
            <h3 className="text-2xl font-semibold text-gray-900 font-serif">{category}</h3>

            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {departments
                .filter((dept) => dept.category === category)
                .map((department) => (
                  <motion.div
                    key={department.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: department.id * 0.1 }}
                    className="group relative overflow-hidden rounded-0 bg-white/90 backdrop-blur-md transition-all duration-300 border"
                    whileHover={{ y: -5 }}
                  >
                    <div className="aspect-video w-full overflow-hidden">
                      <img
                        src={department.image || "/placeholder.svg"}
                        alt={department.name.toLowerCase()}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-4">
                      <h4 className="text-xl font-semibold text-secondary mb-2 font-serif">{department.name}</h4>
                      <p className="text-gray-600">{department.description}</p>
                      <div className="mt-4 flex justify-end">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="inline-flex items-center text-sm font-medium text-teal-600"
                        >
                          Learn more
                          <ChevronRight className="ml-1 h-4 w-4" />
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  </div>
  )
}
