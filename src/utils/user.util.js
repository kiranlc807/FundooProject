import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: "smtp.gmail.com",
    port: 465,
    secure:true, 
    auth: {
    user: "fundooo.note@gmail.com", 
    pass: 'gcqo yzlv yctt vvph', 
  },
});

export const sendResetToken = async (userEmail, resetToken) => {
  try {
    const mailOptions = {
      from: 'fundoo <fundooo.note@gmail.com>', 
      to: userEmail,
      subject: 'Password Reset',
      text: `Hello user! \nYour reset token: ${resetToken}`,
    };
    
    await transporter.sendMail(mailOptions);
    console.log(`Reset token sent to ${userEmail}`);
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};