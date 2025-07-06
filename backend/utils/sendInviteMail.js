import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.NODE_MAILER_EMAIL,
    pass: process.env.NODE_MAILER_PASS,
  },
});

const sendInvite = async (collaboratorEmail,senderName,receiverName,acceptInviteLink) => {
  await transporter.sendMail({
    from: `"SaaSFlow" <${"spamacc.noreply@gmail.com"}>`,
    to: collaboratorEmail,
    subject: 'You have been invited to collaborate on SaaS Flow',
    html: `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Your Invitation to Collaborate - SaaS Flow</title>
    <style>
      /* Basic Reset & Body Styles */
      body {
        margin: 0;
        padding: 0;
        background-color: #F8F9FA; /* Very light grey background */
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #343A40; /* Dark grey for default text */
      }
      table {
        border-collapse: collapse;
        width: 100%;
        mso-table-lspace: 0pt; /* Outlook fix */
        mso-table-rspace: 0pt; /* Outlook fix */
      }
      td {
        padding: 0;
      }
      a {
        text-decoration: none;
      }
      img {
        border: 0;
        display: block; /* Remove extra space below images */
      }

      /* Main Container */
      .email-container {
        max-width: 600px;
        margin: 40px auto;
        background-color: #FFFFFF; /* Pure white for the content container */
        border-radius: 10px;
        overflow: hidden;
        box-shadow: 0 5px 25px rgba(0, 0, 0, 0.1); /* Soft, subtle shadow */
      }

      /* Header Section */
      .header {
        background-color: #007BFF; /* A classic, clean blue */
        background-image: linear-gradient(to right, #007BFF, #00C0D4); /* Subtle gradient for dynamism */
        padding: 30px 20px;
        text-align: center;
        color: #FFFFFF; /* White text on blue gradient */
      }
      .header .brand-name {
        display: block;
        font-size: 26px; /* Slightly smaller for a modern touch */
        font-weight: 700;
        color: #FFFFFF;
        margin-bottom: 10px;
        letter-spacing: 0.5px;
        text-transform: uppercase;
      }
      .header h1 {
        margin: 0;
        font-size: 30px; /* Strong, inviting headline */
        font-weight: 600;
        line-height: 1.3;
        color: #FFFFFF;
      }

      /* Content Section */
      .content {
        padding: 35px 40px; /* Ample padding */
        color: #495057; /* Darker grey for body text, good contrast on white */
        font-size: 16px;
        line-height: 1.7; /* Improved line spacing */
      }
      .content p {
        margin-top: 0;
        margin-bottom: 20px;
      }
      .content strong {
        font-weight: 700;
        color: #17A2B8; /* Vibrant Teal accent for emphasis */
      }

      /* Call to Action Button */
      .cta-wrapper {
          text-align: center;
          padding-top: 15px;
          padding-bottom: 15px;
      }
      .cta-button {
        display: inline-block;
        margin-top: 25px;
        background-color: #17A2B8; /* Vibrant Teal button */
        color: #FFFFFF; /* White text on teal */
        padding: 14px 30px;
        border-radius: 6px;
        font-weight: 600;
        font-size: 18px;
        letter-spacing: 0.5px;
        white-space: nowrap;
        transition: background-color 0.2s ease;
      }
      .cta-button:hover {
        background-color: #138496; /* Darker teal on hover */
      }

      /* Footer Section */
      .footer {
        padding: 25px 20px;
        text-align: center;
        font-size: 12px;
        color: #868E96; /* Lighter grey for footer text */
        background-color: #E9ECEF; /* Very light grey footer background */
        border-top: 1px solid #DEE2E6; /* Subtle border */
      }
      .footer p {
        margin: 0;
        line-height: 1.5;
      }
      .footer a {
        color: #868E96;
        text-decoration: underline;
      }
      .footer a:hover {
        color: #495057;
      }

      /* Responsive adjustments */
      @media only screen and (max-width: 620px) {
        .email-container {
          margin: 20px auto;
          border-radius: 0;
          box-shadow: none;
        }
        .header {
          padding: 25px 15px;
        }
        .header .brand-name {
          font-size: 22px;
        }
        .header h1 {
          font-size: 24px;
        }
        .content {
          padding: 20px 25px;
          font-size: 15px;
        }
        .cta-button {
          padding: 12px 25px;
          font-size: 16px;
        }
        .footer {
          padding: 15px 15px;
          font-size: 11px;
        }
      }
    </style>
  </head>
  <body>
    <table role="presentation" align="center" border="0" cellpadding="0" cellspacing="0" width="100%">
      <tr>
        <td style="padding: 20px 0;">
          <table role="presentation" align="center" border="0" cellpadding="0" cellspacing="0" class="email-container">
            <tr>
              <td class="header">
                <span class="brand-name">SaaS Flow</span>
                <h1>You're Invited to Collaborate!</h1>
              </td>
            </tr>

            <tr>
              <td class="content">
                <p>Hello ${receiverName},</p>
                <p>
                  You've received an invitation from <strong style="color: #17A2B8;">${senderName}</strong> to collaborate on a project within
                  <strong style="color: #17A2B8;">SaaS Flow</strong>.
                </p>
                <p>
                  Our platform empowers you to co-create stunning, AI-powered websites seamlessly. Experience real-time collaboration, intuitive prompting, and effortless publishing, all within a unified environment.
                </p>
                <p>
                  Ready to dive in and build something amazing together?
                </p>
                <div class="cta-wrapper">
                  <a href="${acceptInviteLink}" class="cta-button">
                    Accept Your Invitation
                  </a>
                </div>
                <p>
                  We're truly excited to have you join our community and start creating!
                </p>
                <p>
                  Best regards,<br />
                  The SaaS Flow Team
                </p>
              </td>
            </tr>

            <tr>
              <td class="footer">
                <p>&copy; 2025 SaaS Flow. All rights reserved.</p>
                <p>
                  <a href="#" style="color: #868E96;">Privacy Policy</a> |
                  <a href="#" style="color: #868E96;">Terms of Service</a>
                </p>
              </td>
            </tr>
          </table>
          </td>
      </tr>
    </table>
    </body>
</html>`,
  });
};

export default sendInvite ;