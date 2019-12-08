const express = require('express');
const axios = require('axios');
const port = process.env.PORT || 5000;
const app = express();
const cors = require('cors')

const { checkAnswer, subLevel } = require('./taskChecker');

app.use(express.json());
app.use(cors());

const xApiKey = 'fixedsecretkey86976';

const users = {};

function asyncErrorHandler(func) {
  return async (req, res, next) => {
      try {
          await func(req, res, next);
      } catch (e) {
          console.log(e);
          return res.status(500).send('Teknisk backendfeil. Si ifra til Anders...');
      }
  };
}

app.put('/api/checkanswer', async (req, res) => {
  console.log('put body', req.body);

  return res.status(405).send();
})

app.post('/api/checkanswer', asyncErrorHandler(async (req, res) => {
  console.log('body', req.body);
  const { task, code, user } = req.body;
  let currentUser = users[user];

  if (!currentUser) {
    currentUser = { subLevel: 1, user };
    users[user] = currentUser;
    // const options = {
    //   method: 'PUT',
    //   url: 'http://frontend-eventyr.com/api/user',
    //   headers: {
    //     'x-api-key': xApiKey
    //   },
    //   data: {
    //     username: user,
    //     currentApp: 3
    //   }
    // };
    // try {
    //   const resp = await axios(options);
    //   console.log(resp.data);
    // } catch (e) {
    //   console.log(e); //moving on, the user might still get the task
    // }
  }
  console.log('current user', currentUser)

  const taskSuccess = checkAnswer(task, code);
  if (!taskSuccess || !user) {
    return res
      .status(200)
      .send({ taskSuccess });
  }

  const taskSubLevel = subLevel(task);
  console.log('task sub level', taskSubLevel)
  if (currentUser.subLevel === taskSubLevel) {
    users[user] = { subLevel: currentUser.subLevel + 1 };
    //update tracking api user subLevel
  } else if (currentUser.subLevel < subLevel(task)) {
    return res
      .status(200)
      .send({ taskSuccess, message: 'Are you sure you have answered all the previous questions at least once?' });
  }

  return res
    .status(200)
    .send({ taskSuccess });
}));


app.listen(port, function () {
  console.log("App now running on port", port);
});

app.get('/api/secret/users', (req, res) => {
  return res.status(200).json(users).send();
});