const sendEmailService = async (email) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_NAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const info = await transporter.sendMail({
    from: '"The Exclusive Team" <no-reply@yourwebsite.com>',
    to: email,
    subject: "🎉 Welcome to The Exclusive Family! 🎉",
    text: `Hi there!
  
  Welcome to The Exclusive! We're thrilled to have you on board. 
  Get ready to explore a world of exclusive content and opportunities designed just for you.
  
  If you have any questions, feel free to reply to this email or visit our support page.
  
  Cheers,
  The Exclusive Team`,
    html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2 style="color: #333;">🎉 Welcome to The Exclusive Family! 🎉</h2>
          <p>Hi there,</p>
          <p>We're thrilled to have you on board! At <strong>The Exclusive</strong>, we strive to provide top-notch services and unique experiences for our valued members.</p>
          <p>Here's what you can do next:</p>
          <ul style="margin: 10px 0; padding: 0 20px; color: #555;">
            <li>Explore our exclusive offers and services tailored just for you.</li>
            <li>Connect with like-minded individuals in our growing community.</li>
            <li>Stay tuned for regular updates and perks!</li>
          </ul>
          <p>If you have any questions, feel free to <a href="mailto:support@yourwebsite.com" style="color: #1a73e8;">contact us</a> or visit our <a href="https://yourwebsite.com/support" style="color: #1a73e8;">support page</a>.</p>
          <p>Cheers,<br><strong>The Exclusive Team</strong></p>
          <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
          <p style="font-size: 0.85em; color: #888;">This is an automated email. Please do not reply directly to this email.</p>
        </div>
      `,
  });

  return info;
};

module.exports = sendEmailService;
