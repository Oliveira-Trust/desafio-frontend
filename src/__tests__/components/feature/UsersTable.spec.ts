import { describe, it, expect, beforeEach, vi, type Mock } from 'vitest'
import { mount } from '@vue/test-utils'
import { createTestingPinia, type TestingPinia } from '@pinia/testing'

import UsersTable from '@/components/feature/UsersTable.vue'
import { mockedAppStore } from '@/__tests__/__mocks__/mocked-store'
import { useAppStore } from '@/stores'
import { exportUsersToCSV } from "@/utils/export.utils";

vi.mock('@/utils/export.utils', () => ({
  exportUsersToCSV: vi.fn()
}));

describe('UsersTable', () => {
  let pinia: TestingPinia;

  beforeEach(() => {
    pinia = createTestingPinia({
      initialState: {
        app: {
          users: mockedAppStore.users,
        },
      },
    });
  });

  it('renders properly', () => {
    const wrapper = mount(UsersTable, {
      global: {
        plugins: [pinia],
      },
    })

    expect(wrapper.text()).toContain('Carteiras')
  })

  it('lists users', () => {
    const wrapper = mount(UsersTable, {
      global: {
        plugins: [pinia],
      },
    })

    expect(wrapper.find(".user-row").exists()).toBe(true);

    const userItems = wrapper.findAll(".user-row");

    expect(userItems.length).toBe(2);
    
    
    expect(userItems[0].text().includes('Doroteya')).toBeTruthy();
    expect(userItems[1].text().includes('Shelden')).toBeTruthy();
  })

  it('emits edit click', () => {
    const wrapper = mount(UsersTable, {
      global: {
        plugins: [pinia],
      },
    })

    expect(wrapper.find(".edit-btn").exists()).toBe(true);

    wrapper.find(".edit-btn").trigger("click");

    wrapper.vm.$nextTick(() => {
      expect(wrapper.emitted("editUserClick")?.length).toEqual(1);
    });
  })

  it('emits delete click', () => {
    const wrapper = mount(UsersTable, {
      global: {
        plugins: [pinia],
      },
    })

    expect(wrapper.find(".delete-btn").exists()).toBe(true);

    wrapper.find(".delete-btn").trigger("click");

    wrapper.vm.$nextTick(() => {
      expect(wrapper.emitted("deleteUserClick")?.length).toEqual(1);
    });
  })

  describe('handlePageClick', () => {
    it('pulls a page of users', () => {
      const store = useAppStore()
      const wrapper: any = mount(UsersTable, {
        global: {
          plugins: [pinia],
        },
      })
  
      store.pullPaginatedUsers = vi.fn()
      
      wrapper.vm.handlePageClick(2);
  
      expect(store.pullPaginatedUsers).toHaveBeenCalledWith({currentPage: 2});
    })

    // it('pulls first page on button click', () => {
    //   const store = useAppStore()
    //   const wrapper: any = mount(UsersTable, {
    //     global: {
    //       plugins: [pinia],
    //     },
    //   })
  
    //   store.paginationData = {
    //     currentPage: 5,
    //     totalItems: 80,
    //     pages: 8
    //   };

    //   expect(wrapper.find('.previous-1-page-button').exists()).toBe(true);
    //   wrapper.find('.previous-1-page-button').trigger('click');
  
    //   expect(store.pullPaginatedUsers).toHaveBeenCalledWith({currentPage: 4});
    // })
  })

  describe('handleFirstPageClick', () => {
    it('pulls the first page of users', () => {
      const store = useAppStore()
      const wrapper: any = mount(UsersTable, {
        global: {
          plugins: [pinia],
        },
      })
  
      store.pullPaginatedUsers = vi.fn()
      
      wrapper.vm.handleFirstPageClick();
  
      expect(store.pullPaginatedUsers).toHaveBeenCalledWith({currentPage: 1});
    })
  })

  describe('handleLastPageClick', () => {
    it('pulls the last page of users', () => {
      const store = useAppStore()
      const wrapper: any = mount(UsersTable, {
        global: {
          plugins: [pinia],
        },
      })

      store.pullPaginatedUsers = vi.fn()
      
      wrapper.vm.handleLastPageClick();

      expect(store.pullPaginatedUsers).toHaveBeenCalledWith({currentPage: 0});
    })
  })

  describe('handlePreviousPageClick', () => {
    it('does not pull the previous page of users', () => {
      const store = useAppStore()
      const wrapper: any = mount(UsersTable, {
        global: {
          plugins: [pinia],
        },
      })

      store.pullPaginatedUsers = vi.fn()
      
      wrapper.vm.handlePreviousPageClick();

      expect(store.pullPaginatedUsers).not.toHaveBeenCalled();
    })

    it('pulls the previous page of users', () => {
      const store = useAppStore()
      const wrapper: any = mount(UsersTable, {
        global: {
          plugins: [pinia],
        },
      })
  
      store.paginationData = {
        currentPage: 2,
        totalItems: 20,
        pages: 2
      };
  
      store.pullPaginatedUsers = vi.fn()
      
      wrapper.vm.handlePreviousPageClick();
  
      expect(store.pullPaginatedUsers).toHaveBeenCalledWith({currentPage: 1});
    })
  })

  describe('handleNextPageClick', () => {
    it('does not pull the next page of users', () => {
      const store = useAppStore()
      const wrapper: any = mount(UsersTable, {
        global: {
          plugins: [pinia],
        },
      })

      store.paginationData = {
        currentPage: 1,
        totalItems: 10,
        pages: 1
      };

      store.pullPaginatedUsers = vi.fn()
      
      wrapper.vm.handleNextPageClick();

      expect(store.pullPaginatedUsers).not.toHaveBeenCalled();
    })

    it('pulls the next page of users', () => {
      const store = useAppStore()
      const wrapper: any = mount(UsersTable, {
        global: {
          plugins: [pinia],
        },
      })

      store.pullPaginatedUsers = vi.fn()
      
      wrapper.vm.handleNextPageClick();

      expect(store.pullPaginatedUsers).toHaveBeenCalledWith({currentPage: 2});
    })
  })

  describe('handleExportToCSV', () => {
    it('exports list to csv file', () => {
      const store = useAppStore()
      const wrapper: any = mount(UsersTable, {
        global: {
          plugins: [pinia],
        },
      });

      (exportUsersToCSV as Mock).mockResolvedValue({});

      store.getAllUsers = vi.fn();

      wrapper.vm.handleExportToCSV();

      expect(store.getAllUsers).toHaveBeenCalled();
      wrapper.vm.$nextTick(() => {
        expect(exportUsersToCSV).toHaveBeenCalled();
      });
    })
  })
})

