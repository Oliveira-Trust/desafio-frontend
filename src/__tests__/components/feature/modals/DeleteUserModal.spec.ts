import { describe, it, expect, vi } from 'vitest'

import { mount } from '@vue/test-utils'
import DeleteUserModal from '@/components/feature/modals/DeleteUserModal.vue'
import { createTestingPinia } from '@pinia/testing'
import { useAppStore } from '@/stores'

describe('DeleteUserModal', () => {
  let wrapper: any;
  const mountComponent = (props = {
    user: {
      id: 1,
      nome: 'Test',
      sobrenome: 'User',
      email: ''
    }
  }) => {
    wrapper = mount(DeleteUserModal, {
      props,
      global: {
        plugins: [createTestingPinia()],
      },
    })
  }
  
  it('renders properly', () => {
    mountComponent();
    expect(wrapper.text()).toContain('Tem certeza que deseja excluir essa Carteira?')
  })

  it('emits close event', async () => {
    mountComponent();
    await wrapper.find('.close-button').trigger('click');
    expect(wrapper.emitted()).toHaveProperty('close');
  })

  it('calls delete user on confirmation', async () => {
    mountComponent();

    const store = useAppStore();
    store.deleteUser = vi.fn();
    
    await wrapper.find('.confirm-button').trigger('click');
    expect(store.deleteUser).toHaveBeenCalledWith(1);
  })
})
