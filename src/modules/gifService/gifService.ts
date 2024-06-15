import 'dotenv/config'
import { GiphyFetch } from '@giphy/js-fetch-api'

const { GIPHY_API_KEY } = process.env
if (!GIPHY_API_KEY) {
    throw new Error('Provide GIPHY API KEY in your environment variables.')
}

const gf = new GiphyFetch(GIPHY_API_KEY)


export async function getGIF() {
    try {
        const { data } = await gf.random({ tag: 'fun' });
        return data.images.original.url;
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error fetching random GIF:', error);
        throw new Error('Failed to fetch random GIF');
    }
}