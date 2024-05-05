import { encode as base64Encode } from 'base-64';

export const getToken = async () => {
  try {
    const auth = `${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_SID}`;
    const base64Auth = base64Encode(auth); // Using base64Encode to encode in base64

    const response = await fetch(
      'https://api-m.sandbox.paypal.com/v1/oauth2/token',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: 'Basic ' + base64Auth
        },
        body: 'grant_type=client_credentials'
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch token');
    }
    const data = await response.json();
    return data.access_token;
  } catch (error) {
    console.error('Error fetching PayPal token:', error);
    throw error;
  }
};
