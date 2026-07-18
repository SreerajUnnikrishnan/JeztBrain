import axios from 'axios';

async function testAIChat() {
  try {
    const response = await axios.post('http://localhost:5000/api/ai/chat', {
      message: 'Hello, are you online?',
      history: []
    });
    console.log('Response:', response.data);
  } catch (err) {
    console.log('Error:', err.response?.data || err.message);
  }
}

testAIChat();
