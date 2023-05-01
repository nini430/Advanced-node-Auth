export default {
    port:process.env.PORT,
    logLevel:'info',
    dbUri:process.env.MONGO_URI,
    smtp:{
        host:process.env.SMTP_HOST,
        user:process.env.SMTP_USER,
        pass:process.env.SMTP_PASS,
        port:process.env.SMTP_PORT,
        secure:false
    }
}