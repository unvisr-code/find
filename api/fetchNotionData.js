const fetch = require('node-fetch');

const NOTION_API_KEY = 'secret_ySH1EHTrVrLb80p6yQsOztjQ6CB6HRzFo73lg57Tnnd';
const DATABASE_ID = 'fce96a586958411d8a0b153a1563a75a';

module.exports = async (req, res) => {
    try {
        const response = await fetch(`https://api.notion.com/v1/databases/${DATABASE_ID}/query`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${NOTION_API_KEY}`,
                'Content-Type': 'application/json',
                'Notion-Version': '2022-06-28'
            },
            body: JSON.stringify({ page_size: 100 })
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Failed to fetch data from Notion:', response.status, response.statusText, errorText);
            return res.status(response.status).json({ error: 'Failed to fetch data from Notion', details: errorText });
        }

        const data = await response.json();
        return res.status(200).json(data);
    } catch (error) {
        console.error('Error fetching data from Notion:', error);
        return res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
};
