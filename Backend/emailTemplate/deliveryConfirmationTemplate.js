export default function deliveryConfirmationEmail(orderId, otp) {
  return `
  <!DOCTYPE html>
  <html>
  <head>
      <meta charset="UTF-8">
      <title>Delivery Confirmation OTP</title>
  </head>
  <body style="font-family: Arial, sans-serif; line-height: 1.6;">
      <h2 style="color: #333;">Your Order #${orderId} is Out for Delivery</h2>
      <p>Dear <strong>${'User'}</strong>,</p>
      <p>Your order <strong>#${orderId}</strong> is on its way and will be delivered shortly.</p>
      
      <h3>Delivery Confirmation OTP:</h3>
      <p>Please provide the following One-Time Password (OTP) to the delivery person to confirm your delivery:</p>
      <h2 style="color: #d9534f;">${otp}</h2>
      
      <p>Keep this OTP confidential and do not share it with anyone except the authorized delivery agent.</p>
      
      <p>If you have any questions or concerns, feel free to reach out to our support team.</p>
      
      <p><strong>Thank you for shopping with us.</strong></p>
      
      <p>Best regards,</p>
      <p><strong>[Your Company Name]</strong></p>
      <p><a href="mailto:[Customer Support Contact]">[Customer Support Contact]</a></p>
      <p><a href="[Company Website]">[Company Website]</a></p>
  </body>
  </html>
  `;
}

