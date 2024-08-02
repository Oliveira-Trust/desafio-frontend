import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createTestingPinia, type TestingPinia } from '@pinia/testing'

import UsersTable from '@/components/feature/UsersTable.vue'
import { mockedAppStore } from '@/__tests__/__mocks__/mocked-store'


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
})

