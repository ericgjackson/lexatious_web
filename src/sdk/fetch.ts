import { isError } from 'ltypes';

const fetch = async (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
  let fullyQualifiedURL;
  if (process.env.NODE_ENV === 'production') {
    fullyQualifiedURL = 'https://lexatious.com/wordhex' + input;
  } else {
    fullyQualifiedURL = 'http://localhost/wordhex' + input;
  }
  let response: Response;

  try {
    response = await window.fetch(fullyQualifiedURL, init);
  } catch (error) {
    throw new Error(`Network error: check your internet connection`);
  }

  if (response.ok) {
    return response;
  }

  try {
    const json = await response.json();

    if (isError(json)) {
      throw new Error(json.message);
    }
  } catch (error) {
    // Get here if the backend did not send back valid JSON.  This can happen in case of errors.
    // The response may be empty, for example.
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  } finally {
    // do nothing
  }

  throw new Error(`HTTP ${response.status}: ${response.statusText}`);
};

export default fetch;
