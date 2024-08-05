const fetch = require('node-fetch');

const NOTION_API_KEY = 'secret_tJNk9yiO1tinhEa5lOpgMx4ZFdwByKSnN99GBxKs47A';
const DATABASE_ID = '04440d29bcd64fa0ac738cb43a183906';

module.exports = async (req, res) => {
    console.log('savePhoneNumber endpoint called'); // 로그 추가
    try {
        const { clubName, phoneNumber } = req.body;
        console.log('Received data:', { clubName, phoneNumber }); // 로그 추가

        const notionPageData = {
            parent: { database_id: DATABASE_ID },
            properties: {
                '클럽 이름': {
                    title: [
                        {
                            text: {
                                content: clubName
                            }
                        }
                    ]
                },
                '전화번호': {
                    rich_text: [
                        {
                            text: {
                                content: phoneNumber
                            }
                        }
                    ]
                }
            }
        };

        console.log('Sending data to Notion:', notionPageData); // 로그 추가

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
            console.error('Failed to save data to Notion:', response.status, response.statusText, errorText); // 로그 추가
            return res.status(response.status).json({ error: 'Failed to save data to Notion', details: errorText });
        }

        const data = await response.json();
        console.log('Data saved to Notion:', data); // 로그 추가
        return res.status(200).json({ message: 'Phone number saved successfully', data });

    } catch (error) {
        console.error('Error saving data to Notion:', error); // 로그 추가
        return res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
};
