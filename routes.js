let Router = require('express-promise-router');
// let { Message } = require('./models');
let { ValidationError } = require('objection');

let router = new Router();

// GET /
router.get('/', async(request, response) => {

  response.render('home');
});

router.get('/streamer', async(request, response) => {

  response.render('streamer');
})

router.get('/client', async(request, response) => {

  response.render('client');
})

router.post('/client', async(request, response) => {
  let messages = await Stream.query().select('*').orderBy('created_at', 'DESC');

  let messageBody = request.body.body;
  let messageTime = new Date();

  try {
    await Message.query().insert({
      body: messageBody,
      createdAt: messageTime,
    });

  } catch(error) {
    if (error instanceof ValidationError) {
      let messages = await Message.query().select('*').orderBy('created_at', 'DESC');
      let errors = error.data;

      response.render('client', { messages, er