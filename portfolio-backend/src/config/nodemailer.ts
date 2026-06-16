import nodemailer from "nodemailer";

// Create transporter
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Send email function
export async function sendEmail({
  to,
  subject,
  text,
  html,
  fromName,
}: {
  to: string;
  subject: string;
  text?: string;
  html: string;
  fromName?: string;
}) {
  const mailOptions = {
    from: fromName
      ? `"${fromName}" <${process.env.EMAIL_FROM}>`
      : process.env.EMAIL_FROM || process.env.EMAIL_USER,
    to,
    subject,
    text,
    html,
  };

  const info = await transporter.sendMail(mailOptions);
  console.log("Email sent:", info.messageId);
  return info;
}

// Send contact notification to admin
export async function sendContactToAdmin(contact: {
  name: string;
  email: string;
  phone: string;
  service: any[];
  subject: string;
  message: string;
  createdAt: Date;
}) {
  const serviceNames = contact.service.map((s: any) => s.name || s).join(", ");

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 20px; }
        .container { max-width: 600px; margin: 0 auto; background: #f9f9f9; padding: 20px; border-radius: 8px; }
        .header { background: linear-gradient(135deg, #4CAF50, #45a049); color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; margin-bottom: 20px; }
        .content { background: white; padding: 20px; border-radius: 8px; }
        .field { margin-bottom: 15px; padding: 10px; background: #f0f0f0; border-radius: 4px; }
        .field-label { font-weight: bold; color: #555; text-transform: uppercase; font-size: 12px; }
        .field-value { margin-top: 5px; color: #333; font-size: 14px; }
        .user-info { background: linear-gradient(135deg, #667eea, #764ba2); color: white; padding: 15px; margin-bottom: 20px; border-radius: 8px; }
        .footer { text-align: center; padding: 20px; color: #777; font-size: 12px; margin-top: 20px; }
        .button { display: inline-block; padding: 12px 24px; background: #4CAF50; color: white; text-decoration: none; margin: 10px 0; border-radius: 4px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>📬 New Contact Submission</h1>
          <p>A new contact has been submitted to your website</p>
        </div>
        
        <!-- ✅ User Info Section -->
        <div class="user-info">
          <h2>Contact From:</h2>
          <p><strong>${contact.name}</strong></p>
          <p>Email: <a href="mailto:${contact.email}" style="color: white;">${contact.email}</a></p>
          <p>Phone: ${contact.phone}</p>
        </div>
        
        <div class="content">
          <div class="field">
            <div class="field-label">Service</div>
            <div class="field-value">${serviceNames}</div>
          </div>
          <div class="field">
            <div class="field-label">Subject</div>
            <div class="field-value">${contact.subject}</div>
          </div>
          <div class="field">
            <div class="field-label">Message</div>
            <div class="field-value">${contact.message}</div>
          </div>
          <div style="text-align: center; margin-top: 20px;">
            <a href="https://yourwebsite.com/contacts" class="button">View All Contacts</a>
          </div>
        </div>
        
        <div class="footer">
          <p>📅 Received: ${new Date(contact.createdAt).toLocaleString()}</p>
          <p>📧 Reply to: <a href="mailto:${contact.email}">${contact.email}</a></p>
          <p>This is an automated notification from your CA Portfolio website</p>
        </div>
      </div>
    </body>
    </html>
  `;

  const text = `
    New Contact Submission
    ======================
    
    From: ${contact.name}
    Email: ${contact.email}
    Phone: ${contact.phone}
    Service: ${serviceNames}
    Subject: ${contact.subject}
    Message: ${contact.message}
    Received: ${new Date(contact.createdAt).toLocaleString()}
    
    Reply to: ${contact.email}
  `;

  return sendEmail({
    to: process.env.ADMIN_EMAIL!,
    subject: ` New Contact from ${contact.name}: ${contact.subject}`,
    text,
    html,

    fromName: `${contact.name} (${contact.email})`,
  });
}
