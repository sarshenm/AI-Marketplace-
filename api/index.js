require('../lib/env.validation');
const express = require('express');
const bodyParser = require('body-parser');

const register = require('./routes/register');
const login = require('./routes/login');
const customerOnboard = require('./routes/customer.onboard');
const submitTool = require('./routes/tools.submit');
const listTools = require('./routes/tools.index');
const recommendTool = require('./routes/tools.recommend');
const adminModerate = require('./routes/admin.moderate');
const cms = require('./routes/cms');

const app = express();
app.use(bodyParser.json());

app.use('/api/register', register);
app.use('/api/login', login);
app.use('/api/customer/onboard', customerOnboard);
app.use('/api/tools/submit', submitTool);
app.use('/api/tools', listTools);
app.use('/api/tools/recommend', recommendTool);
app.use('/api/admin/moderate', adminModerate);
app.use('/api/cms', cms);

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`API server running on port ${port}`);
});

module.exports = app;
