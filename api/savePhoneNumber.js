const fetch = require('node-fetch');

const NOTION_API_KEY = 'secret_tJNk9yiO1tinhEa5lOpgMx4ZFdwByKSnN99GBxKs47A';
const READ_DATABASE_ID = 'fce96a586958411d8a0b153a1563a75a'; // 기존 읽기 데이터베이스 ID
const WRITE_DATABASE_ID = '04440d29bcd64fa0ac738cb43a183906'; // 새로운 쓰기 데이터베이스 ID

module.exports = async (req, res) => {
    console.log('savePhoneNumber endpoint called');
    try {
        const { clubName, phoneNumber, pageUrl } = req.body;
        console.log('Received data:', { clubName, phoneNumber, pageUrl });

        // 모집 시작일과 마감일을 읽어오는 부분
        const queryResponse = await fetch(`https://api.notion.com/v1/databases/${READ_DATABASE_ID}/query`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${NOTION_API_KEY}`,
                'Content-Type': 'application/json',
                'Notion-Version': '2022-06-28'
            },
            body: JSON.stringify({
                filter: {
                    property: '동아리명',
                    title: {
                        equals: clubName
                    }
                }
            })
        });

        if (!queryResponse.ok) {
            const errorText = await queryResponse.text();
            console.error('Failed to fetch data from Notion:', queryResponse.status, queryResponse.statusText, errorText);
            return res.status(queryResponse.status).json({ error: 'Failed to fetch data from Notion', details: errorText });
        }

        const queryData = await queryResponse.json();
        console.log('Fetched data:', queryData);

        if (queryData.results.length === 0) {
            return res.status(404).json({ error: 'No matching club found' });
        }

        const clubData = queryData.results[0];
        const startDate = clubData.properties['모집 시작일']?.date?.start || '';
        const endDate = clubData.properties['모집 마감일']?.date?.start || '';

        // 현재 시간(타임스탬프)
        const timestamp = new Date().toISOString();

        // 새로운 페이지를 작성하는 부분
        const notionPageData = {
            parent: { database_id: WRITE_DATABASE_ID },
            properties: {
                '동아리명': {
                    title: [
                        {
                            text: {
                                content: clubName
                            }
                        }
                    ]
                },
                '전화번호': {
                    phone_number: phoneNumber
                },
                '모집 시작일': {
                    date: {
                        start: startDate
                    }
                },
                '모집 마감일': {
                    date: {
                        start: endDate
                    }
                },
                'Timestamp': {
                    date: {
                        start: timestamp
                    }
                },
                'URL': {
                    url: pageUrl
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
