export default function OrderCancellationEmail(orderId, customerName,userRole, paymentMethod) {
  let str= '';
  if(userRole==='Buyer'){
   str=`<p>We regret to inform you that your order <strong>#${orderId}</strong> has been successfully cancelled as per your request.</p>`
  }else{
   str=`<p>We regret to inform you that due to report of your order we declare it a spam order and  we did cancelled your order <strong>#${orderId}</strong> </p>`
  }

  return `
  <!DOCTYPE html>
  <html>
  <head>
      <meta charset="UTF-8">
      <title>Order Cancellation</title>
  </head>
  <body style="font-family: Arial, sans-serif; line-height: 1.6;">
      <h2 style="color: #333;">Your Order #${orderId} Has Been Cancelled</h2>
      <p>Dear <strong>${customerName}</strong>,</p>
     ${str}
      
      ${paymentMethod === 'UPI' ? `
      <h3>Refund Information:</h3>
      <p>Since you paid via <strong>UPI</strong>, the refund process has been initiated. The amount will be credited to your original payment source within <strong>3-5 business days</strong>.</p>
      ` : `
      <h3>Payment Information:</h3>
      <p>As this was a <strong>Cash on Delivery (COD)</strong> order, no payment was charged. If you had made any advance payment, the refund (if applicable) will be processed accordingly.</p>
      `}

      <p>If you have any questions or need further assistance, feel free to reach out to our support team.</p>
      
      <p><strong>Thank you for shopping with us.</strong></p>
      
      <p>Best regards,</p>
      <p><strong>E-commerce</strong></p>
      <p><a href="mailto:22cs10pr97@mitsgwl.ac.in">[Customer Support Contact]</a></p>
      
  </body>
  </html>
  `;
}

