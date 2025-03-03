const API_BASE_URL = 'http://localhost:5000/api/chat'; // Replace with your backend URL

export const sendMessage = async (email, message = '') => {
  const response = await fetch(`${API_BASE_URL}/message`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, message }),
  });
  return response.json();
};