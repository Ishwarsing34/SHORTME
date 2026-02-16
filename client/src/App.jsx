import './index.css'
import Home from './pages/Home'  // adjust path if needed

function App() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#FBE1FB]">

      {/* SVG Background Layer */}
      <div
        className="absolute inset-0 bg-cover bg-center animate-bg opacity-90"
        style={{ backgroundImage: "url('/grid.svg')" }}
      />

      {/* Content Layer */}
      <div className="relative z-10 min-h-screen">
        <Home />
      </div>

    </div>
  )
}

export default App
