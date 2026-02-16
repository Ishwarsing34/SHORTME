import express from 'express'
import UrlModel from '../models/url-model.js'
import { nanoid } from 'nanoid'

const urlRouter = express.Router()

// 🔹 Create Short URL
urlRouter.post("/shorten", async (req, res) => {

  try {
    const { originalUrl } = req.body

    if (!originalUrl) {
      return res.status(400).json({
        error: "URL is required"
      })
    }

    // Validate URL
    try {
      new URL(originalUrl)
    } catch {
      return res.status(400).json({
        error: "Invalid URL"
      })
    }

    // Generate unique shortId
    let shortId
    let exists = true

    while (exists) {
      shortId = nanoid(7)
      const existingUrl = await UrlModel.findOne({ shortId })

      if (!existingUrl) {
        exists = false
      }
    }

    const url = await UrlModel.create({
      shortId,
      originalUrl
    })

    res.json({
      shortId: url.shortId,
      shortUrl: `${process.env.BASE_URL}/${url.shortId}`
    })

  } catch (error) {
    console.log(error)
    res.status(500).json({
      error: "Server error"
    })
  }
})


// 🔹 Redirect to Original URL
urlRouter.get("/:shortId", async (req, res) => {

  try {
    const { shortId } = req.params

    const url = await UrlModel.findOne({ shortId })

    if (!url) {
      return res.status(404).json({
        error: "URL NOT FOUND"
      })
    }

    // Increase click count
    url.clicks += 1
    await url.save()

    return res.redirect(url.originalUrl)

  } catch (error) {
    console.log(error)
    res.status(500).json({
      error: "Server error"
    })
  }
})

export default urlRouter
