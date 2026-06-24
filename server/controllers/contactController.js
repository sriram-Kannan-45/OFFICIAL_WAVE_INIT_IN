const Contact = require('../models/Contact')
const nodemailer = require('nodemailer')

// Create contact submission
exports.submitContact = async (req, res, next) => {
  try {
    const { name, email, projectType, message } = req.body

    // Validate required fields
    if (!name || !email || !projectType || !message) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields',
      })
    }

    // Create contact entry in database
    let contactId = null
    try {
      const contact = await Contact.create({
        name,
        email,
        projectType,
        message,
      })
      contactId = contact._id
    } catch (dbErr) {
      console.error('Failed to save contact to MongoDB:', dbErr.message)
    }

    // Send notification email in background (do not await, to avoid blocking response for 2-3 seconds)
    sendNotificationEmail({ name, email, projectType, message })

    res.status(201).json({
      success: true,
      message: 'Thank you! We will reply within 24 hours.',
      data: { id: contactId },
    })
  } catch (error) {
    next(error)
  }
}

// Get all contacts (protected - for admin)
exports.getContacts = async (req, res, next) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 }).limit(100)
    res.status(200).json({
      success: true,
      count: contacts.length,
      data: contacts,
    })
  } catch (error) {
    next(error)
  }
}

// Get single contact
exports.getContact = async (req, res, next) => {
  try {
    const contact = await Contact.findById(req.params.id)
    if (!contact) {
      return res.status(404).json({ success: false, message: 'Contact not found' })
    }
    res.status(200).json({ success: true, data: contact })
  } catch (error) {
    next(error)
  }
}

// Send notification email
async function sendNotificationEmail({ name, email, projectType, message }) {
  try {
    const typeLabels = {
      lms: 'AI LMS Portal',
      'ai-product': 'Custom AI Product',
      chatbot: 'AI Chatbot',
      ml: 'ML Models',
      dashboard: 'AI Dashboard',
      consulting: 'Consulting & Strategy',
      other: 'Other',
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    })

    const mailOptions = {
      from: `"WAVE INIT Website" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO,
      subject: `New Contact Form Submission — ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #00C8FF;">New Contact Submission</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; font-weight: bold;">Name:</td><td>${name}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold;">Email:</td><td>${email}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold;">Project Type:</td><td>${typeLabels[projectType] || projectType}</td></tr>
          </table>
          <h3 style="margin-top: 20px;">Message:</h3>
          <div style="background: #f5f5f5; padding: 15px; border-radius: 8px;">
            ${message.replace(/\n/g, '<br>')}
          </div>
          <p style="margin-top: 20px; color: #666; font-size: 12px;">
            Submitted on ${new Date().toLocaleString()}
          </p>
        </div>
      `,
    }

    await transporter.sendMail(mailOptions)
  } catch (error) {
    console.error('Email notification failed:', error.message)
    // Don't throw — submission should still succeed even if email fails
  }
}
