const cheerio = require("cheerio");
const axios = require("axios");

function ringtone(title) {
    return new Promise((resolve, reject) => {
        axios.get('https://meloboom.com/en/search/'+title)
        .then((get) => {
            let $ = cheerio.load(get.data)
            let hasil = []
            $('#__next > main > section > div.jsx-2244708474.container > div > div > div > div:nth-child(4) > div > div > div > ul > li').each(function (a, b) {
                hasil.push({ title: $(b).find('h4').text(), source: 'https://meloboom.com/'+$(b).find('a').attr('href'), audio: $(b).find('audio').attr('src') })
            })
            resolve(hasil)
        })
    })
}

async function ChatWithGpt(textMessage) {
  const options = {
    method: 'POST',
    url: 'https://cheapest-gpt-4-turbo-gpt-4-vision-chatgpt-openai-ai-api.p.rapidapi.com/v1/chat/completions',
    headers: {
      'content-type': 'application/json',
      'X-RapidAPI-Key': 'a11d1a8c29msh929304d0f51084bp13c73ejsn183f8235d6da',
      'X-RapidAPI-Host': 'https://cheapest-gpt-4-turbo-gpt-4-vision-chatgpt-openai-ai-api.p.rapidapi.com'
    },
    data: {
      messages: [
        {
          role: 'user',
          content: textMessage
        }
      ],
      model: 'gpt-4-turbo-preview',
      max_tokens: 200,
      temperature: 0.9
    }
  };

  try {
    const response = await axios.request(options);
    return response.data.choices[0].message.content;
  } catch (error) {
    return error;
  }
}

module.exports = ringtone, ChatWithGpt;
