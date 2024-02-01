const  {Resend}  =require('resend');

const sendEmail = (options)=>{
    
    const resend = new Resend('re_eXgM76h2_Q17T7pfAmZeKjwi17AQwFSzy')
    resend.emails.send({
        from: 'onboarding@resend.dev',
        to: 'radiftajwarmahi420@gmail.com',
        subject: options.subject,
        html: options.message
      });
      console.log(options.email);
    
};

module.exports = sendEmail;