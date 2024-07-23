const fetch = require('node-fetch');

const NOTION_API_KEY = 'secret_tJNk9yiO1tinhEa5lOpgMx4ZFdwByKSnN99GBxKs47A';
const DATABASE_ID = 'fce96a586958411d8a0b153a1563a75a';
const NEW_DATABASE_ID = '04440d29bcd64fa0ac738cb43a183906';

module.exports = async (req, res) => {
    try {
        console.log('Request received');
        
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
        console.log('Notion API response data:', data);
        return res.status(200).json(data);
    } catch (error) {
        console.error('Error fetching data from Notion:', error);
        return res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
};

// 새로운 전화번호 저장 API 엔드포인트 추가
module.exports.savePhoneNumber = async (req, res) => {
    const { phone } = req.body;

    if (!phone) {
        return res.status(400).json({ error: 'Phone number is required' });
    }

    try {
        const response = await fetch(`https://api.notion.com/v1/pages`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${NOTION_API_KEY}`,
                'Content-Type': 'application/json',
                'Notion-Version': '2022-06-28'
            },
            body: JSON.stringify({
                parent: { database_id: NEW_DATABASE_ID },
                properties: {
                    '전화번호': {
                        rich_text: [
                            {
                                text: {
                                    content: phone
                                }
                            }
                        ]
                    }
                }
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Failed to save phone number:', response.status, response.statusText, errorText);
            return res.status(response.status).json({ error: 'Failed to save phone number', details: errorText });
        }

        console.log('Phone number saved successfully');
        return res.status(200).json({ message: 'Phone number saved successfully' });
    } catch (error) {
        console.error('Error saving phone number:', error);
        return res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
};
