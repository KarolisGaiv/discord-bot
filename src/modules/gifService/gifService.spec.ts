import { describe, it, expect, beforeAll, afterAll, vi } from 'vitest';
import { GiphyFetch } from '@giphy/js-fetch-api';
import { getGIF } from './gifService'; 

// Mock the GiphyFetch class
vi.mock('@giphy/js-fetch-api', () => ({
  GiphyFetch: vi.fn().mockImplementation(() => ({
    random: vi.fn()
  }))
}));

describe('getGIF', () => {
  const originalEnv = process.env;
  let mockGiphyFetchInstance: GiphyFetch;

  beforeAll(() => {
    // Mock environment variable
    process.env.GIPHY_API_KEY = 'test-api-key';
    mockGiphyFetchInstance = new GiphyFetch('test-api-key');
  });

  afterAll(() => {
    // Restore original environment variables
    process.env = originalEnv;
  });

  it('should return the URL of a random GIF when the API call is successful', async () => {
    const mockResponse = {
      data: {
        images: {
          original: {
            url: 'https://test-url.com/gif'
          }
        }
      }
    };

    (mockGiphyFetchInstance.random as vi.Mock).mockResolvedValueOnce(mockResponse);

    const result = await getGIF(mockGiphyFetchInstance);

    expect(result).toBe('https://test-url.com/gif');
    expect(mockGiphyFetchInstance.random).toHaveBeenCalledWith({ tag: 'fun' });
  });

  it('should throw an error when the API call fails', async () => {
    (mockGiphyFetchInstance.random as vi.Mock).mockRejectedValueOnce(new Error('API Error'));

    await expect(getGIF(mockGiphyFetchInstance)).rejects.toThrow();
  });

  it.skip('should throw an error if GIPHY_API_KEY is not provided', () => {
    process.env.GIPHY_API_KEY = '';

    expect(() => {
      delete require.cache[require.resolve('./gifService')];
      require('./gifService');
    }).toThrow('Provide GIPHY API KEY in your environment variables.');
  });
});
