import BlurIn from './ui/blur-in'

const Achievements = () => {
  return (
    <div className="md:max-w-[90vw] mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <h3 className='text-4xl font-serif font-extralight mb-4'>
        <BlurIn
          word="Our Achievements"
          className="inline-block bg-gradient-to-r from-secondary to-teal-600 text-transparent bg-clip-text pr-5 font-serif"
        />
      </h3>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main featured achievement */}
        <div className="lg:col-span-1 border border-gray-200 p-4">
          <div className="space-y-4">
            <img
              src="/poly.jpg"
              alt="Students showcasing projects at engineering expo"
              className="w-full"
            />
            <div className="text-center">
              <div className="uppercase text-xs font-semibold tracking-wider text-[#9a0000] mb-2">Academic Excellence</div>
              <h2 className="text-xl font-serif text-[#0a2559] mb-4">
                <p className="hover:underline">
                  Madin College wins National Engineering Innovation Award for third consecutive year
                </p>
              </h2>
              <div className="border-t w-12 mx-auto border-gray-300 mt-4"></div>
            </div>
          </div>
        </div>

        {/* Right side grid - 2x2 achievements */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Top row */}
          <div className="border border-gray-200 p-4">
            <div className="space-y-4">
              <div className="text-center">
                <div className="uppercase text-xs font-semibold tracking-wider text-[#9a0000] mb-2">
                  Career Success
                </div>
                <h2 className="text-base font-serif text-[#0a2559]">
                  <p className="hover:underline">
                    95% placement rate for 2023 graduates with top recruiters including Tata, Infosys, and L&T
                  </p>
                </h2>
                <div className="border-t w-12 mx-auto border-gray-300 mt-4"></div>
              </div>
            </div>
          </div>

          <div className="border border-gray-200 p-4">
            <div className="space-y-4">
              <div className="text-center">
                <div className="uppercase text-xs font-semibold tracking-wider text-[#9a0000] mb-2">
                  Research & Innovation
                </div>
                <h2 className="text-base font-serif text-[#0a2559]">
                  <p className="hover:underline">
                    Mechanical Engineering team develops sustainable cooling system patent
                  </p>
                </h2>
                <div className="border-t w-12 mx-auto border-gray-300 mt-4"></div>
              </div>
            </div>
          </div>

          {/* Bottom row */}
          <div className="border border-gray-200 p-4">
            <div className="space-y-4">
              <img
                src="/sports.jpg"
                alt="College sports team celebrating victory"
                className="w-full h-[240px]"
              />
              <div className="text-center">
                <div className="uppercase text-xs font-semibold tracking-wider text-[#9a0000] mb-2">
                  Student Life
                </div>
                <h2 className="text-base font-serif text-[#0a2559]">
                  <p className="hover:underline">
                    Robotics team wins national championship, qualifies for international competition
                  </p>
                </h2>
                <div className="border-t w-12 mx-auto border-gray-300 mt-4"></div>
              </div>
            </div>
          </div>

          <div className="border border-gray-200 p-4">
            <div className="space-y-4">
              <img
                src="/collage.jpg"
                alt="New college building"
                className="w-full h-[240px]"
              />
              <div className="text-center">
                <div className="uppercase text-xs font-semibold tracking-wider text-[#9a0000] mb-2">
                  Infrastructure
                </div>
                <h2 className="text-base font-serif text-[#0a2559]">
                  <p className="hover:underline">
                    State-of-the-art AI & IoT lab inaugurated with industry partnership
                  </p>
                </h2>
                <div className="border-t w-12 mx-auto border-gray-300 mt-4"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Achievements