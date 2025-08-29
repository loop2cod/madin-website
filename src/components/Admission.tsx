import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import BlurIn from './ui/blur-in'
import DotPattern from './ui/dot-pattern'
import { PulsatingButton } from './ui/PulsatingButton'
import { useNavigate } from 'react-router-dom'


const Admission = () => {
  const navigate = useNavigate()


  return (
    <section className="relative md:max-w-[90vw] mx-auto px-4 text-right pb-8 md:-mt-76">
      <div className="mb-2">
        <motion.h2
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight"
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
        >
          <BlurIn
      word="Connect, Learn"
       className="inline-block bg-gradient-to-r from-secondary  to-teal-600 text-transparent bg-clip-text pr-5 font-serif"
          />
        </motion.h2>

        <motion.h2
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight"
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
        >
         <BlurIn
         word="& grow with us."
         className="inline-block bg-gradient-to-r from-secondary  to-teal-600 text-transparent bg-clip-text pb-1 font-serif"/>
        </motion.h2>
      </div>

      <motion.p
        className="text-xs sm:text-lg md:text-xl mx-auto text-muted-foreground"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
      >
        Your future starts here— <br />explore new ideas, build lifelong connections, and shape your path.
      </motion.p>
      <DotPattern
        className={cn(
          "[mask-image:radial-gradient(300px_circle_at_center,white,transparent)]",
        )}
      />
      <PulsatingButton onClick={()=>{
        navigate('/admission')
      }} className='!justify-end !ms-auto my-4 mr-2'>Apply Now</PulsatingButton>
    </section>
  )
}

export default Admission