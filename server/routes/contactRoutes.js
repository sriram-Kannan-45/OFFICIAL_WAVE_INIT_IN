const express = require('express')
const router = express.Router()
const contactController = require('../controllers/contactController')
const rateLimit = require('express-rate-limit')

// Rate limiting: max 5 submissions per 15 minutes per IP
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: {
    success: false,
    message: 'Too many submissions. Please try again later.',
  },
  standardHeaders: true,
  legacyHeaders: false,
})

router.post('/', contactLimiter, contactController.submitContact)
router.get('/', contactController.getContacts)
router.get('/:id', contactController.getContact)

module.exports = router
