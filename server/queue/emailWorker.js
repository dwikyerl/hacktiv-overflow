require("dotenv").config();
let redisConfig;
if (process.env.NODE_ENV === 'production') {
  redisConfig = {
    redis: {
      port: process.env.REDIS_PORT,
      host: process.env.REDIS_HOST,
      auth: process.env.REDIS_PASS
    }
  };
} else {
  redisConfig = {};
}

const queue = require('kue').createQueue(redisConfig);
const sgMail = require("@sendgrid/mail");

console.log('WORKER CONNECTED');

queue.watchStuckJobs(6000);

queue.on('ready', () => {
  // If you need to
  console.info('Queue is ready!');
});

queue.on('error', (err) => {
  // handle connection errors here
  console.error('There was an error in the main queue!');
  console.error(err);
  console.error(err.stack);
});

const emailSender = ({ to, from, subject, text}) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to,
    from,
    subject,
    text,
    html: text
  };
  return sgMail.send(msg);
}

const sendEmail = (job, done) => {
  emailSender({
    to: job.data.to,
    from: job.data.from,
    subject: job.data.subject,
    text: job.data.text
  })
    .then(() => {
      console.log('email sent')
      done()
    })
    .catch(err => done(err));
}

queue.process('email', 3, (job, done) => {
  sendEmail(job, done);
});
