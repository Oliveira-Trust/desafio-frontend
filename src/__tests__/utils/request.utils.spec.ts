import { makeRequest } from '@/utils/request.utils';
import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('makeRequest', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('should make a request with the correct URL and options', async () => {
    const mockFetch = vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ success: true }),
      })
    );

    vi.stubGlobal('fetch', mockFetch);

    const url = 'https://api.example.com/data';
    const options = { method: 'GET' };
    const customHeaders = { Authorization: 'Bearer token' };

    await makeRequest(url, options, customHeaders);

    expect(mockFetch).toHaveBeenCalledOnce();
    expect(mockFetch).toHaveBeenCalledWith(url, {
      ...options,
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        ...customHeaders,
      },
    });
  });

  it('should return the correct response data', async () => {
    const responseData = { success: true };

    vi.stubGlobal('fetch', vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(responseData),
      })
    ));

    const result = await makeRequest('https://api.example.com/data');
    const jsonResult = await result.json();

    expect(jsonResult).toEqual(responseData);
  });
});