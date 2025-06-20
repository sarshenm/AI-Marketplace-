const express = require('express');
const bodyParser = require('body-parser');

const register = require('./routes/register');
const submitTool = require('./routes/tools.submit');
const recommendTool = require('./routes/tools.recommend');
const adminApprove = require('./routes/admin.approve');

const app = express();
app.use(bodyParser.json());

app.use('/api/register', register);
app.use('/api/tools/submit', submitTool);
app.use('/api/tools/recommend', recommendTool);
app.use('/api/admin/approve', adminApprove);

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`API server running on port ${port}`);
});

module.exports = app;
