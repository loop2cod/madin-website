// import { Pause, Play } from "lucide-react"
// import { useRef, useState } from "react"


const Hero = () => {
    // const [isPlaying, setIsPlaying] = useState(true)
    // const videoRef = useRef<HTMLVideoElement>(null)
  
    // const togglePlayPause = () => {
    //   if (videoRef.current) {
    //     if (isPlaying) {
    //       videoRef.current.pause()
    //     } else {
    //       videoRef.current.play()
    //     }
    //     setIsPlaying(!isPlaying)
    //   }
    // }
  return (
    <div className="relative w-full">
      {/* Video Hero Section */}
      <div className="relative w-full h-[80vh] min-h-[500px] bg-black">
        {/* <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          poster="/ban.png"
          playsInline
          muted
          autoPlay
          loop
        >
          <source src="/ban.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video> */}
        <img className="absolute inset-0 w-full h-full object-cover" src="/poly.jpg" alt="collage image" />

        {/* Overlay gradient for better text visibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />


        {/* <div className="absolute bottom-0 left-0 p-6 md:p-12 w-full">
          <div className="max-w-4xl">
            <div className="mb-4">
              <span className="text-xs md:text-sm uppercase tracking-widest text-white font-medium">
                Engineering & Management
              </span>
            </div>

            <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif text-white leading-tight mb-8">
              Madin salutes graduates at University's 2nd Commencement
            </h1>

            <div className="w-24 h-1 bg-white/40 mb-8" />
          </div>
        </div> */}

        {/* Play/Pause button */}
        {/* <button
          className="absolute bottom-6 right-6 bg-black/50 hover:bg-black/70 text-white rounded-full p-3 transition-colors cursor-pointer"
          aria-label={isPlaying ? "Pause video" : "Play video"}
          onClick={togglePlayPause}
        >
          {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
        </button> */}
      </div>
    </div>
  )
}

export default Hero