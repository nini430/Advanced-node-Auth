import nodemailer, { SendMailOptions } from 'nodemailer';
import config from 'config';
import log from './logger';

const smtp = config.get<{
  user: string;
  pass: string;
  host: string;
  port: number;
  secure: boolean;
}>('smtp');

const transporter=nodemailer.createTransport({
    ...smtp,
    auth:{
        user:smtp.user,
        pass:smtp.pass
    }
})

export default async function sendEmail(options:SendMailOptions) {
    transporter.sendMail(options,(err,info)=>{
        if(err) {
            log.error(err,'Error sending Email')
            return;
        }

        console.log(`Preview URL ${nodemailer.getTestMessageUrl(info)}`)
    })
}