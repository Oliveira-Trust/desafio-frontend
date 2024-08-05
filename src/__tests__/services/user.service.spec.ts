import { describe, it, expect, vi, beforeAll, afterEach } from 'vitest';
import type { Mock } from 'vitest';
import { getPaginatedUsersRequest, getUsersRequest, deleteUserRequest, createUserRequest, updateUserRequest } from '@/services/user.service';
import { makeRequest } from '@/utils/request.utils';

vi.mock('@/utils/request.utils');

describe('User Requests', () => {
  const usersApiEndpoint = import.meta.env.VITE_USERS_API_ENDPOINT;
  const mockedRequest = makeRequest as Mock;
  
  beforeAll(() => {
    vi.stubGlobal('import.meta', {
      env: {
        VITE_USERS_API_ENDPOINT: usersApiEndpoint
      }
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('getPaginatedUsersRequest', () => {
    it('should return paginated users and item count', async () => {
      const mockResponse = {
        json: vi.fn().mockResolvedValue([{ id: 1, nome: 'Doroteya' }]),
        headers: {
          get: vi.fn().mockReturnValue('10')
        }
      };
      mockedRequest.mockResolvedValue(mockResponse);
  
      const result = await getPaginatedUsersRequest('?page=1');
  
      expect(makeRequest).toHaveBeenCalledWith(usersApiEndpoint + '?page=1');
      expect(mockResponse.json).toHaveBeenCalled();
      expect(result).toEqual({
        data: [{ id: 1, nome: 'Doroteya' }],
        items: 10
      });
    });

    it('should return items as zero when X-total-items is null', async () => {
      const mockResponse = {
        json: vi.fn().mockResolvedValue([]),
        headers: {
          get: vi.fn().mockReturnValue(null)
        }
      };
      mockedRequest.mockResolvedValue(mockResponse);
  
      const result = await getPaginatedUsersRequest('?page=1');
  
      expect(makeRequest).toHaveBeenCalledWith(usersApiEndpoint + '?page=1');
      expect(mockResponse.json).toHaveBeenCalled();
      expect(result).toEqual({
        data: [],
        items: 0
      });
    });
  });



  describe('getUsersRequest', () => {
    it('should return users', async () => {
      const mockResponse = {
        json: vi.fn().mockResolvedValue([{ id: 1, nome: 'Doroteya' }])
      };
      mockedRequest.mockResolvedValue(mockResponse);
  
      const result = await getUsersRequest();
  
      expect(makeRequest).toHaveBeenCalledWith(usersApiEndpoint);
      expect(mockResponse.json).toHaveBeenCalled();
      expect(result).toEqual([{ id: 1, nome: 'Doroteya' }]);
    });
  });

  describe('deleteUserRequest', () => {
    it('should call makeRequest with DELETE method', async () => {
      mockedRequest.mockResolvedValue({});
  
      await deleteUserRequest(1);
  
      expect(makeRequest).toHaveBeenCalledWith(usersApiEndpoint + '/1', { method: 'DELETE' });
    });
  });

  describe('createUserRequest', () => {
    it('should call makeRequest with POST method and user data', async () => {
      const newUser = { nome: 'Doroteya', sobrenome: 'Powder', email: 'email@teste.com' };
      mockedRequest.mockResolvedValue({});
  
      await createUserRequest(newUser);
  
      expect(makeRequest).toHaveBeenCalledWith(usersApiEndpoint, { method: 'POST', body: JSON.stringify(newUser) });
    });
  });

  describe('updateUserRequest', () => {
    it('should call makeRequest with PUT method and user data', async () => {
      const updatedUser = { id: 1, nome: 'Doroteya', sobrenome: 'Powder', email: 'email@teste.com' };
      mockedRequest.mockResolvedValue({});
  
      await updateUserRequest(1, updatedUser);
  
      expect(makeRequest).toHaveBeenCalledWith(usersApiEndpoint + '/1', { method: 'PUT', body: JSON.stringify(updatedUser) });
    });
  });
});