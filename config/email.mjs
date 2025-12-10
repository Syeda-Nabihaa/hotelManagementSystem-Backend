import nodemailer from "nodemailer";
export const sendEmail = async (to, subject, html) => {
  try {
    const transporter = nodemailer.createTransport({
        host:"smtp.gmail.com",
        port:587,
        secure:false, 
        auth:{
            user:process.env.EMAIL_USER,
            pass:process.env.EMAIL_PASS,
        }
    });

    await transporter.sendMail({
        from:`"Luxury Hospatility" <${process.env.EMAIL_USER}>`,
        to,
        subject,
        html,

    })
  } catch (error) {
    console.log(error)
  }
};
