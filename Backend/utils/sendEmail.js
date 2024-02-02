const  {Resend}  =require('resend');

const sendEmail = (options)=>{
    
    const resend = new Resend(process.env.RESEND_API_KEY)
    resend.emails.send({
        from: 'onboarding@resend.dev',
        to: 'radiftajwarmahi420@gmail.com',
        subject: options.subject,
        html: options.message
      });
      console.log(options.email);
    
};

module.exports = sendEmail;