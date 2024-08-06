import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import FilterInput from '@/components/feature/FilterInput.vue'
import { createTestingPinia } from '@pinia/testing'
import { useAppStore } from '@/stores'
import { mockedAppStore } from '@/__tests__/__mocks__/mocked-store'

describe('FilterInput', () => {
  let wrapper: any;

  beforeEach(() => {
    wrapper = mount(FilterInput, {
      global: {
        plugins: [createTestingPinia({
          initialState: {
            app: {
              filter: mockedAppStore.filter,
            },
          },
        })],
      },
    })
  })

  it('should render the component correctly', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('should call onSearchClick when search button is clicked', async () => {
    const store = useAppStore()
    store.pullPaginatedUsers = vi.fn()

    await wrapper.find('.search-button').trigger('click')
    expect(store.pullPaginatedUsers).toHaveBeenCalled()
  })

  it('should call onClearFiltersClick when clear button is clicked', async () => {
    const store = useAppStore()
    store.pullPaginatedUsers = vi.fn()
    store.setFilter = vi.fn()

    await wrapper.find('.clear-button').trigger('click')

    wrapper.vm.$nextTick(() => {
      expect(store.pullPaginatedUsers).toHaveBeenCalled()
      expect(store.setFilter).toHaveBeenCalled()
    });
  })

  it('should change filter store value when input is filled', async () => {
    const store = useAppStore()
    store.pullPaginatedUsers = vi.fn()

    await wrapper.findAll('input').at(0).setValue('updated')
    await wrapper.findAll('input').at(1).setValue('updated')
    await wrapper.findAll('input').at(2).setValue('updated')

    wrapper.vm.$nextTick(() => {
      expect(store.filter).toEqual({ nome: 'updated', sobrenome: 'updated', email: 'updated' })
    });
  })
})
