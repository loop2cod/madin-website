import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import BlurIn from '@/components/ui/blur-in'
import DotPattern from '@/components/ui/dot-pattern'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Home, ArrowLeft, Search, AlertTriangle } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const NotFound = () => {
  const navigate = useNavigate()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [])

  const handleGoHome = () => {
    navigate('/')
  }

  const handleGoBack = () => {
    navigate(-1)
  }

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
                word="404"
                className="text-6xl md:text-8xl font-bold tracking-tight text-white mb-4"
                duration={1.2}
              />
            </motion.div>
            <motion.p
              className="mt-6 text-lg leading-8 text-gray-200 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
            >
              Oops! The page you're looking for seems to have wandered off
            </motion.p>
          </div>
        </div>
        <DotPattern
          className={cn(
            "absolute inset-0 opacity-20 [mask-image:radial-gradient(400px_circle_at_center,white,transparent)]",
          )}
        />
      </div>

      {/* 404 Content */}
      <div className="relative py-24 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          {/* Main 404 Card */}
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
                    <AlertTriangle className="w-12 h-12 text-white" />
                  </div>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.9 }}
                  className="text-3xl md:text-4xl font-bold mb-6"
                >
                  <span className="bg-gradient-to-r from-secondary to-teal-600 text-transparent bg-clip-text">
                    Page Not Found
                  </span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1.1 }}
                  className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed"
                >
                  The page you're looking for doesn't exist or has been moved. 
                  Don't worry, let's get you back on track!
                </motion.p>

                {/* Action Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1.3 }}
                  className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
                >
                  <Button
                    onClick={handleGoHome}
                    className="bg-secondary hover:bg-secondary/90 text-white px-8 py-3 rounded-lg flex items-center gap-2 transition-all duration-300 hover:scale-105"
                  >
                    <Home className="w-5 h-5" />
                    Go to Homepage
                  </Button>
                  
                  <Button
                    onClick={handleGoBack}
                    variant="outline"
                    className="border-secondary text-secondary hover:bg-secondary hover:text-white px-8 py-3 rounded-lg flex items-center gap-2 transition-all duration-300 hover:scale-105"
                  >
                    <ArrowLeft className="w-5 h-5" />
                    Go Back
                  </Button>
                </motion.div>

                {/* Helpful Links */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1.5 }}
                  className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12"
                >
                  <div 
                    className="flex flex-col items-center p-6 rounded-lg bg-secondary/5 border border-secondary/10 cursor-pointer hover:bg-secondary/10 transition-colors duration-300"
                    onClick={() => navigate('/')}
                  >
                    <Home className="w-8 h-8 text-secondary mb-3" />
                    <h3 className="font-semibold text-secondary mb-2">Home</h3>
                    <p className="text-sm text-muted-foreground text-center">
                      Return to our homepage
                    </p>
                  </div>
                  
                  <div 
                    className="flex flex-col items-center p-6 rounded-lg bg-teal-50 border border-teal-100 cursor-pointer hover:bg-teal-100 transition-colors duration-300"
                    onClick={() => navigate('/about')}
                  >
                    <Search className="w-8 h-8 text-teal-600 mb-3" />
                    <h3 className="font-semibold text-teal-700 mb-2">About Us</h3>
                    <p className="text-sm text-muted-foreground text-center">
                      Learn more about our institution
                    </p>
                  </div>
                  
                  <div 
                    className="flex flex-col items-center p-6 rounded-lg bg-secondary/5 border border-secondary/10 cursor-pointer hover:bg-secondary/10 transition-colors duration-300"
                    onClick={() => navigate('/contact')}
                  >
                    <AlertTriangle className="w-8 h-8 text-secondary mb-3" />
                    <h3 className="font-semibold text-secondary mb-2">Contact</h3>
                    <p className="text-sm text-muted-foreground text-center">
                      Get in touch with us
                    </p>
                  </div>
                </motion.div>

                {/* Animated Error Code */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 1.7 }}
                  className="mt-12 text-center"
                >
                  <p className="text-sm text-muted-foreground">
                    Error Code: <span className="font-mono text-secondary">404</span>
                  </p>
                </motion.div>
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

export default NotFound
