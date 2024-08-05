const fetch = require('node-fetch');

const NOTION_API_KEY = 'secret_tJNk9yiO1tinhEa5lOpgMx4ZFdwByKSnN99GBxKs47A';
const DATABASE_ID = '04440d29bcd64fa0ac738cb43a183906';

module.exports = async (req, res) => {
    console.log('savePhoneNumber endpoint called');
    try {
        const { clubName, phoneNumber } = req.body;
        console.log('Received data:', { clubName, phoneNumber });

        const notionPageData = {
            parent: { database_id: DATABASE_ID },
            properties: {
                '동아리명': { // Notion 데이터베이스의 실제 속성 이름으로 변경
                    title: [
                        {
                            text: {
                                content: clubName
                            }
                        }
                    ]
                },
                '전화번호': { // phone_number 형식으로 변경
                    phone_number: phoneNumber
                }
            }
        };

        console.log('Sending data to Notion:', notionPageData);

        const response = await fetch('https://api.notion.com/v1/pages', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${NOTION_API_KEY}`,
                'Content-Type': 'application/json',
                'Notion-Version': '2022-06-28'
            },
            body: JSON.stringify(notionPageData)
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Failed to save data to Notion:', response.status, response.statusText, errorText);
            return res.status(response.status).json({ error: 'Failed to save data to Notion', details: errorText });
        }

        const data = await response.json();
        console.log('Data saved to Notion:', data);
        return res.status(200).json({ message: 'Phone number saved successfully', data });

    } catch (error) {
        console.error('Error saving data to Notion:', error);
        return res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
};
