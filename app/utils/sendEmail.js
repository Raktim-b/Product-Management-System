const transporter = require("../config/emailVerify");

const sendEmail = async (user, plainPassword) => {
  const loginLink = "http://localhost:4013/auth/login";
  // later replace with your frontend deployed URL

  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: user.email,
    subject: "Your Account Credentials",
    text: "",
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h2>Hello ${user.name},</h2>

        <p>Your account has been created successfully.</p>

        <div style="background: #f4f4f4; padding: 15px; border-radius: 8px;">
        <h3>Login Details:</h3>
          <p><strong>Email:</strong> ${user.email}</p>
          <p><strong>Password:</strong> ${plainPassword}</p>
        </div>

        <p style="margin-top: 20px;">
          Login URL:
        </p>

            <p>
        Login Link: 
        <a href="${loginLink}">
            ${loginLink}
        </a>
        </p>

        <p style="margin-top:20px;">
         Please login and update your password immediately for security purposes.
        </p>
        <p>Thank You,
        </p>
        <p>Admin Team</p>
      </div>
    `,
  });
};

module.exports = sendEmail;
