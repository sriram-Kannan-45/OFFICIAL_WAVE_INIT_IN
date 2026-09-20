import nodemailer from 'nodemailer'

const EMAIL_USER = process.env.EMAIL_USER || 'wave.init.45@gmail.com'
const EMAIL_PASS = process.env.EMAIL_PASS || 'bkll nfxg hyum riia'
const EMAIL_TO = process.env.EMAIL_TO || 'wave.init.45@gmail.com'

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' })
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {}
    const { name, email, company, projectType, message } = body

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields (name, email, message).',
      })
    }

    const typeLabels = {
      'AI Software Development': 'AI Software Development',
      'Full-Stack Web Development': 'Full-Stack Web Development',
      'GenAI Solutions & Assistants': 'GenAI Solutions & Assistants',
      'AI Product Prototyping & MVP': 'AI Product Prototyping & MVP',
      'Intelligent Workflows & Automation': 'Intelligent Workflows & Automation',
      'Internship / Career Inquiry': 'Internship / Career Inquiry',
      lms: 'AI LMS Portal',
      'ai-product': 'Custom AI Product',
      chatbot: 'AI Chatbot',
      ml: 'ML Models',
      dashboard: 'AI Dashboard',
      consulting: 'Consulting & Strategy',
      other: 'Other',
    }

    const resolvedType = typeLabels[projectType] || projectType || 'General Inquiry'
    const companyDisplay = company ? company : 'Not specified'

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
      },
    })

    const htmlContent = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
        <div style="background: #0f172a; padding: 24px 32px; border-bottom: 3px solid #16a34a;">
          <h1 style="color: #ffffff; font-size: 20px; margin: 0; font-weight: 700;">WAVE <span style="color: #16a34a;">INIT</span> SOLUTIONS</h1>
          <p style="color: #94a3b8; font-size: 13px; margin: 6px 0 0 0;">New Project Inquiry / Contact Form Submission</p>
        </div>
        <div style="padding: 32px;">
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
            <tr>
              <td style="padding: 10px 0; color: #64748b; font-size: 13px; width: 140px; font-weight: 600;">Full Name:</td>
              <td style="padding: 10px 0; color: #0f172a; font-size: 14px; font-weight: 600;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #64748b; font-size: 13px; font-weight: 600;">Email:</td>
              <td style="padding: 10px 0; color: #16a34a; font-size: 14px; font-weight: 600;"><a href="mailto:${email}" style="color: #16a34a; text-decoration: none;">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #64748b; font-size: 13px; font-weight: 600;">Company / Project:</td>
              <td style="padding: 10px 0; color: #0f172a; font-size: 14px;">${companyDisplay}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #64748b; font-size: 13px; font-weight: 600;">Project Type:</td>
              <td style="padding: 10px 0; color: #0f172a; font-size: 14px; font-weight: 600;">
                <span style="background: #f0fdf4; color: #16a34a; border: 1px solid #bbf7d0; padding: 3px 10px; font-size: 12px; border-radius: 6px;">
                  ${resolvedType}
                </span>
              </td>
            </tr>
          </table>

          <div style="margin-top: 20px;">
            <p style="color: #64748b; font-size: 13px; font-weight: 600; margin: 0 0 8px 0; text-transform: uppercase; letter-spacing: 0.5px;">Message / Details:</p>
            <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; font-size: 14px; color: #334155; line-height: 1.6; white-space: pre-wrap;">${message}</div>
          </div>

          <div style="margin-top: 32px; padding-top: 16px; border-top: 1px solid #f1f5f9; font-size: 12px; color: #94a3b8;">
            Submitted from official website at <a href="https://www.waveinitsolutions.online" style="color: #16a34a; text-decoration: none;">waveinitsolutions.online</a> on ${new Date().toUTCString()}
          </div>
        </div>
      </div>
    `

    const mailOptions = {
      from: `"WAVE INIT Contact Form" <${EMAIL_USER}>`,
      to: EMAIL_TO,
      replyTo: email,
      subject: `[New Inquiry] ${resolvedType} - from ${name}`,
      text: `New contact submission from ${name} (${email}):\n\nCompany: ${companyDisplay}\nType: ${resolvedType}\n\nMessage:\n${message}`,
      html: htmlContent,
    }

    await transporter.sendMail(mailOptions)

    return res.status(200).json({
      success: true,
      message: 'Thank you! We will reply within 24 hours.',
    })
  } catch (error) {
    console.error('Contact email handler error:', error)
    return res.status(500).json({
      success: false,
      message: 'Failed to send message. Please contact us directly at wave.init.45@gmail.com.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    })
  }
}
