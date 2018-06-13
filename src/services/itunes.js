const ITUNES_ENDPOINT = 'https://itunes.apple.com'
const LIMIT = 200

class ItunesService {
    async getSearchResults(query) {
        const url = `${ITUNES_ENDPOINT}/search?term=${query}&limit=${LIMIT}`;
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                Accept: 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`ItunesService getSearchResults failed, HTTP status ${response.status}`);
          }
          const data = await response.json();
          return data
    }
    async getHomePage() {
        const url = `${ITUNES_ENDPOINT}/search?term=Red+Hot+Chili+Peppers&limit=${LIMIT}`;
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                Accept: 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`ItunesService getMainPage failed, HTTP status ${response.status}`);
          }
          const data = await response.json();
          return data
    }
}

export default new ItunesService();
