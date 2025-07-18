import  { useEffect } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import BlurIn from '@/components/ui/blur-in'
import DotPattern from '@/components/ui/dot-pattern'
import { Card, CardContent } from '@/components/ui/card'
import { Clock, Calendar, Camera, Image } from 'lucide-react'

const Gallery = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/5">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-secondary to-teal-700 brightness-[0.8]" />
        <div className="relative z-10 px-4 py-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <BlurIn
                word="Gallery"
                className="text-4xl font-bold tracking-tight text-white sm:text-6xl mb-6"
                duration={1.2}
              />
            </motion.div>
            <motion.p
              className="mt-6 text-lg leading-8 text-gray-200 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
            >
              Capturing moments, preserving memories, and showcasing the vibrant life at our institution
            </motion.p>
          </div>
        </div>
        <DotPattern
          className={cn(
            "absolute inset-0 opacity-20 [mask-image:radial-gradient(400px_circle_at_center,white,transparent)]",
          )}
        />
      </div>

      {/* Coming Soon Content */}
      <div className="relative py-24 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          {/* Main Coming Soon Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <Card className="relative overflow-hidden border-0 shadow-2xl bg-white/95 backdrop-blur-sm">
              <CardContent className="p-12 text-center">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                  className="mb-8"
                >
                  <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-r from-secondary to-teal-600 mb-6">
                    <Camera className="w-12 h-12 text-white" />
                  </div>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.9 }}
                  className="text-4xl md:text-5xl font-bold mb-6"
                >
                  <span className="bg-gradient-to-r from-secondary to-teal-600 text-transparent bg-clip-text">
                    Coming Soon
                  </span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1.1 }}
                  className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed"
                >
                  We're curating an amazing collection of photos and memories from our campus life,
                  events, and achievements. Stay tuned for a visual journey through our institution!
                </motion.p>

                {/* Feature Icons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1.3 }}
                  className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12"
                >
                  <div className="flex flex-col items-center p-6 rounded-lg bg-secondary/5 border border-secondary/10">
                    <Image className="w-8 h-8 text-secondary mb-3" />
                    <h3 className="font-semibold text-secondary mb-2">Campus Life</h3>
                    <p className="text-sm text-muted-foreground text-center">
                      Beautiful moments from daily campus activities and student life
                    </p>
                  </div>

                  <div className="flex flex-col items-center p-6 rounded-lg bg-teal-50 border border-teal-100">
                    <Calendar className="w-8 h-8 text-teal-600 mb-3" />
                    <h3 className="font-semibold text-teal-700 mb-2">Events</h3>
                    <p className="text-sm text-muted-foreground text-center">
                      Memorable moments from festivals, competitions, and celebrations
                    </p>
                  </div>

                  <div className="flex flex-col items-center p-6 rounded-lg bg-secondary/5 border border-secondary/10">
                    <Clock className="w-8 h-8 text-secondary mb-3" />
                    <h3 className="font-semibold text-secondary mb-2">Achievements</h3>
                    <p className="text-sm text-muted-foreground text-center">
                      Proud moments of success, awards, and recognition
                    </p>
                  </div>
                </motion.div>

                {/* Animated Dots */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 1.5 }}
                  className="flex justify-center items-center mt-12 space-x-2"
                >
                  <div className="w-3 h-3 bg-secondary rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-3 h-3 bg-secondary rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-3 h-3 bg-secondary rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </motion.div>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 1.7 }}
                  className="text-sm text-muted-foreground mt-4"
                >
                  We're working hard to bring you something amazing!
                </motion.p>
              </CardContent>

              {/* Background Pattern */}
              <DotPattern
                className={cn(
                  "absolute inset-0 opacity-5 [mask-image:radial-gradient(300px_circle_at_center,white,transparent)]",
                )}
              />
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Gallery