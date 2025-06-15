import BlurIn from '@/components/ui/blur-in'
import { AdmissionForm } from '@/components/AdmissionForm/AdmissionForm';
import { useEffect } from 'react';

const AdmissionPage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [])

  return (
    <div className="md:mt-24">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-secondary to-teal-700 brightness-[0.8]" />
        <div className="relative z-10 px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl text-center">
            <BlurIn
              word="Admission Form"
              className="text-4xl font-bold tracking-tight text-white sm:text-6xl"
            />
            <p className="mt-6 text-lg leading-8 text-gray-200">
              Start your journey with us today
            </p>
          </div>
        </div>
      </div>

      {/* Admission Form */}
      <div className="py-12">
        <div>
          <AdmissionForm />
        </div>
      </div>
    </div>
  )
}

export default AdmissionPage