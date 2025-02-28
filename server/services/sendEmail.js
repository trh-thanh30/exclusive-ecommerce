const nodemailer = require("nodemailer");

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
    html: `
      <div style="max-width: 600px; margin: auto; font-family: Arial, sans-serif; color: #444;">
        <div style="text-align: center; padding: 20px;">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0IFDrfAN8n1cIWJRv8b9NA3FdUvhnrJ0o-w&s" alt="The Exclusive Logo" width="120" style="margin-bottom: 10px;">
          <h2 style="color: #1a73e8;">Welcome to The Exclusive! 🎊</h2>
          <p style="font-size: 16px;">We’re thrilled to have you on board! 🚀</p>
        </div>
        <div style="padding: 20px; background-color: #f9f9f9; border-radius: 10px;">
          <p>🔥 <strong>Here’s what you get:</strong></p>
          <ul style="padding-left: 20px;">
            <li>🔹 <b>Exclusive offers and premium content</b> tailored just for you.</li>
            <li>🔹 Connect with a vibrant community of like-minded individuals.</li>
            <li>🔹 Stay updated with special perks and exciting news!</li>
          </ul>

          <div style="text-align: center; margin-top: 20px;">
            <a href="https://yourwebsite.com" style="background-color: #1a73e8; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-size: 16px;">
              Explore Now 🌟
            </a>
          </div>
        </div>

        <div style="text-align: center; margin-top: 30px;">
          <p>If you have any questions, feel free to reach out to us:</p>
          <p>
            📧 <a href="mailto:ththanh.dhkm17a1hn@sv.gmail.com" style="color: #1a73e8;">support@yourwebsite.com</a> <br>
            🌍 <a href="https://hi/support" style="color: #1a73e8;">Visit Support Page</a>
          </p>
        </div>

        <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
        <p style="text-align: center; font-size: 12px; color: #888;">🚀 Thanks for joining! Get ready for an amazing experience!</p>
      </div>
    `,
  });

  return info;
};

module.exports = sendEmailService;
