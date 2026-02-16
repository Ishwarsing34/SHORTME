import React, { useState } from 'react'
import axios from 'axios'
import QRCode from 'react-qr-code'
import QRCodegenerator from "qrcode"
import { Github } from "lucide-react"

const API_BASE_URL = "http://localhost:5000"

const Home = () => {

  const [url, setUrl] = useState("")
  const [shortUrl, setShortUrl] = useState("")
  const [copied, setCopied] = useState(false)
  const [qrImage, setQrImage] = useState("")

  const handleShorten = async () => {
    if (!url) return;

    if (!url.startsWith("http")) {
      alert("Enter valid URL with http/https")
      return;
    }

    try {
      const res = await axios.post(`${API_BASE_URL}/shorten`, {
        originalUrl: url
      })

      const newShortUrl = res.data.shortUrl;

      setShortUrl(newShortUrl)
      setCopied(false)

      const qr = await QRCodegenerator.toDataURL(newShortUrl);
      setQrImage(qr)

    } catch (error) {
      console.log(error)
      alert("Something went wrong")
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-4">

      {/* 🔥 GitHub Button */}
      <a
        href="https://github.com/Ishwarsing34/SHORTME"
        target="_blank"
        rel="noopener noreferrer"
        className="absolute top-6 right-6 bg-black text-white px-4 py-2 rounded-full flex items-center gap-2 hover:scale-105 transition"
      >
        <Github size={18} />
        GitHub
      </a>

      {/* Glass Card */}
      <div className="backdrop-blur-xl bg-white/30 border border-white/40 shadow-2xl rounded-3xl p-10 w-full max-w-2xl text-center">

        <h1 className="text-4xl font-extrabold mb-8 text-gray-800 tracking-wide">
          URL Shortener
        </h1>

        {/* Input */}
        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Enter your URL..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full px-5 py-4 rounded-xl bg-black/80 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
          />

          {/* Gradient Button */}
          <button
            onClick={handleShorten}
            className="w-full py-4 rounded-xl font-semibold text-white bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 hover:opacity-90 transition duration-300"
          >
            Shorten URL
          </button>
        </div>

        {shortUrl && (
          <div className="mt-8 space-y-4">

            <p className="text-gray-700 font-medium">Your Short Link:</p>

            <a
              href={shortUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline break-all"
            >
              {shortUrl}
            </a>

            <button
              onClick={handleCopy}
              className={`w-full py-3 rounded-xl font-semibold transition ${
                copied
                  ? "bg-green-500 text-white"
                  : "bg-pink-500 text-white hover:bg-pink-600"
              }`}
            >
              {copied ? "Copied!" : "Copy Link"}
            </button>

            {/* QR Section */}
            <div className="bg-white p-6 rounded-2xl shadow-lg mt-6 inline-block">
              <p className="mb-4 font-semibold text-gray-700">Scan QR Code</p>
              <QRCode value={shortUrl} size={180} />
            </div>

            {qrImage && (
              <a
                download="qr-code.png"
                href={qrImage}
                className="block mt-4 py-3 rounded-xl bg-teal-500 text-white font-semibold hover:bg-teal-600 transition"
              >
                Download QR Code
              </a>
            )}

          </div>
        )}

      </div>
    </div>
  )
}

export default Home
