import { setActivePinia, createPinia } from 'pinia';
import { describe, it, expect, beforeEach, vi, type Mock } from 'vitest';
import { getPaginatedUsersRequest, deleteUserRequest, updateUserRequest, createUserRequest, getUsersRequest } from '@/services/user.service';
import { pullCryptoCurrencyPriceRequest } from '@/services/currency.service';
import { useAppStore } from '@/stores';
import { nextTick } from 'vue';

vi.mock('@/services/user.service', () => ({
  getPaginatedUsersRequest: vi.fn(),
  getUsersRequest: vi.fn(),
  deleteUserRequest: vi.fn(),
  updateUserRequest: vi.fn(),
  createUserRequest: vi.fn(),
}));

vi.mock('@/services/currency.service', () => ({
  pullCryptoCurrencyPriceRequest: vi.fn(),
}));

describe('App Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('should fetch and set paginated users', async () => {
    const mockUsersResponse = {
      data: [
        { id: 1, nome: 'Usuário', sobrenome: 'Teste', email: 'teste@example.com' },
        { id: 2, nome: 'Usuário2', sobrenome: 'Teste', email: 'teste2@example.com' },
      ],
      items: 2,
    };
    (getPaginatedUsersRequest as Mock).mockResolvedValue(mockUsersResponse);

    const store = useAppStore();
    await store.pullPaginatedUsers({ pageLimit: 10 });

    expect(store.users).toEqual(mockUsersResponse.data);
    expect(store.paginationData).toEqual({
      currentPage: 1,
      totalItems: mockUsersResponse.items,
      pages: 1,
    });
  });

  it('should create a user and refresh the user list', async () => {
    const store = useAppStore();
    const mockUser = { nome: 'Usuário3', sobrenome: 'Teste', email: 'teste3@example.com' };
    (createUserRequest as Mock).mockResolvedValue({});
    vi.spyOn(store, 'pullPaginatedUsers');

    await store.createUser(mockUser);

    expect(createUserRequest).toHaveBeenCalledWith(mockUser);
  });

  it('should update a user and refresh the user list', async () => {
    const store = useAppStore();
    const mockUserUpdate = { nome: 'Usuário3', sobrenome: 'Teste', email: 'teste3@example.com' };
    const userId = 1;
    (updateUserRequest as Mock).mockResolvedValue({});
    vi.spyOn(store, 'pullPaginatedUsers');

    await store.updateUser(userId, mockUserUpdate);

    expect(updateUserRequest).toHaveBeenCalledWith(userId, mockUserUpdate);
  });

  it('should delete a user and refresh the user list', async () => {
    const store = useAppStore();
    const userId = 1;
    (deleteUserRequest as Mock).mockResolvedValue({});
    vi.spyOn(store, 'pullPaginatedUsers');

    await store.deleteUser(userId);

    expect(deleteUserRequest).toHaveBeenCalledWith(userId);
  });

  it('should fetch and set cryptocurrency price', async () => {
    const mockPriceResponse = {
      BTCBRL: { bid: 50000 },
    };
    (pullCryptoCurrencyPriceRequest as Mock).mockResolvedValue(mockPriceResponse);

    const store = useAppStore();
    await store.pullCryptoCurrencyPrice();

    expect(pullCryptoCurrencyPriceRequest).toHaveBeenCalledWith('BTC', 'BRL');
    expect(store.cryptoCurrencyValue).toBe(mockPriceResponse.BTCBRL.bid);
  });

  it('should fetch all users', async () => {
    const mockUsers = [
      { id: 1, nome: 'Usuário', sobrenome: 'Teste', email: 'teste@example.com' },
      { id: 2, nome: 'Usuário2', sobrenome: 'Teste', email: 'teste2@example.com' },
    ];
    (getUsersRequest as Mock).mockResolvedValue(mockUsers);

    const store = useAppStore();
    const users = await store.getAllUsers();

    expect(getUsersRequest).toHaveBeenCalled();
    expect(users).toEqual(mockUsers);
  });

  it('should set filter correctly', () => {
    const store = useAppStore();
    const filterData = { nome: 'Usuário3', sobrenome: 'Teste', email: 'teste3@example.com' };

    store.setFilter(filterData);

    expect(store.filter).toEqual(filterData);
  });
});