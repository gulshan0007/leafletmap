

export function sendFormData(formData) {
    try {
        const response = axios.post('http://192.168.0.108:8000/data/', formData);
        setMessage(response.data.message);
      } catch (error) {
        console.error('Error storing data:', error);
        setMessage('Error: Unable to store data.');
      }
    }