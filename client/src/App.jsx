import './index.css'

function App() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#FBE1FB]">

      {/* SVG Layer */}
      <div
        className="absolute inset-0 bg-cover bg-center animate-bg opacity-90 bg-[#FBC9CA]"
        style={{ backgroundImage: "url('/grid.svg')" }}
      />

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <h1 className="text-6xl font-extrabold text-black">
       
        </h1>
      </div>

    </div>
  )
}

export default App
