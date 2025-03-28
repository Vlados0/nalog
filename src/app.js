const express = require('express');
const bodyParser = require('body-parser');
const peopleRoutes = require('./routes/people');
const salaryRoutes = require('./routes/salary');

const app = express();

app.use(bodyParser.json({
  type: 'application/json',
  limit: '50mb',
  charset: 'utf-8'
}));

app.use((req, res, next) => {
  res.header('Content-Type', 'application/json; charset=utf-8');
  next();
});

app.use('/api/people', peopleRoutes);
app.use('/api/salary', salaryRoutes);

app.use((err, req, res, next) => {
  console.error('Global error:', err);
  res.status(500).json({ error: 'Internal Server Error' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));