import { Handler } from '@netlify/functions';
import fetch from 'node-fetch';

const handler: Handler = async (event) => {
  const response = await fetch('https://cloud.appwrite.io/v1/account/sessions/email', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // Add any additional headers required by Appwrite
    },
    body: event.body,
  });

  const data = await response.json();

  return {
    statusCode: response.status,
    body: JSON.stringify(data),
  };
};

export { handler };
