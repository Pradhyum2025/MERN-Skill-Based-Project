import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();


export  const mailSender = async(email,title,body)=>{
  try{
    //transport
     let transporter = nodemailer.createTransport({
      host:process.env.MAIL_HOST,
      auth:{
        user:process.env.MAIL_USER,
        pass:process.env.MAIL_PASS
      },
      secure: false,
     })

     let info = await transporter.sendMail({
      from:'Pradhym Pvt Ltd',
      to:`${email}`,
      subject:`${title}`,
      html:`${body}`
     })
     return info;

  }catch(err){
    console.log("error in mailSender",err);
  }
}