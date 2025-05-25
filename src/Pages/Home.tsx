import Admission from '@/components/Admission'
import Departments from '@/components/Departments'
import Hero from '@/components/Hero'
import Achievements from '@/components/Achievements'
import WhyChooseUs from '@/components/WhyChooseUs'

const Home = () => {

  
  return (
    <div className='min-h-[72vh] mt-10'>
        <Hero/>
        <Departments/>
        <Admission/>
        <WhyChooseUs/>
        <Achievements/>
    </div>
  )
}

export default Home