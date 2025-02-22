export default function OrderConfirmation(orderId, paymentMethod, transactionId) {
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  let transactionIdMessage = '';
  if (transactionId) {
    transactionIdMessage = `<tr>
          <td style="padding: 10px; border: 1px solid #ddd;"><strong>Payment transaction Id:</strong></td>
          <td style="padding: 10px; border: 1px solid #ddd;">${transactionId}</td>
        </tr>`
  }

  // Condition-based message
  let paymentMessage = '';
  if (paymentMethod.toLowerCase() === 'cod' || paymentMethod.toLowerCase() === 'cash on delivery') {
    paymentMessage = "<p><strong>Note:</strong> Please have the exact amount ready at the time of delivery.</p>";
  } else if (paymentMethod.toLowerCase() === 'upi' || paymentMethod.toLowerCase() === 'paypal') {
    paymentMessage = `<p><strong>Payment Successful:</strong> Your payment has been received successfully.</p>`;
  } else {
    paymentMessage = "<p><strong>Payment Status:</strong> Please check your payment details.</p>";
  }

  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #ddd; padding: 20px; border-radius: 10px;">
      <h2 style="color: #4CAF50; text-align: center;">Order Confirmation</h2>
      <p>Dear Customer,</p>
      <p>Thank you for your order. Here are your order details:</p>
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd;"><strong>Order ID:</strong></td>
          <td style="padding: 10px; border: 1px solid #ddd;">${orderId}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd;"><strong>Payment Method:</strong></td>
          <td style="padding: 10px; border: 1px solid #ddd;">${paymentMethod}</td>
        </tr>
        ${transactionIdMessage}
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd;"><strong>Order Date:</strong></td>
          <td style="padding: 10px; border: 1px solid #ddd;">${currentDate}</td>
        </tr>
      </table>

      ${paymentMessage} <!-- Condition-based sentence added here -->

      <p>We appreciate your business and hope to serve you again soon.</p>
      <p>Best Regards,</p>
      <p><strong>E-commerce</strong></p>
    </div>
  `;
}