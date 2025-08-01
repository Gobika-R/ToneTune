export async function rephraseSentence(sentence, tone) {
  console.log('Making API call to rephrase:', { sentence, tone });
  try {
    const response = await fetch('http://localhost:5000/rephrase', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sentence, tone })
    });
    console.log('Response status:', response.status);
    if (!response.ok) {
      const errorText = await response.text();
      console.log('Error response:', errorText);
      throw new Error('Failed to rephrase');
    }
    const data = await response.json();
    console.log('Success response:', data);
    return data.rephrased;
  } catch (error) {
    console.log('Fetch error:', error);
    throw error;
  }
}