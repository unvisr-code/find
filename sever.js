const express = require('express');
const fetchNotionData = require('./api/fetchNotionData');
const savePhoneNumber = require('./api/savePhoneNumber');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(express.json());

app.get('/api/fetchNotionData', fetchNotionData);
app.post('/api/savePhoneNumber', savePhoneNumber);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
