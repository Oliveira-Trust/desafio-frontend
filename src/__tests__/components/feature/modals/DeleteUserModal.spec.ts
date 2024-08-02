import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import DeleteUserModal from '@/components/feature/modals/DeleteUserModal.vue'
import { createTestingPinia } from '@pinia/testing'

describe('DeleteUserModal', () => {
  it('renders properly', () => {
    const wrapper = mount(DeleteUserModal, {
      props: {
        user: {
          id: 1,
          nome: 'Test',
          sobrenome: 'User',
          email: ''
        }
      },
      global: {
        plugins: [createTestingPinia()],
      },
    })
    expect(wrapper.text()).toContain('Tem certeza que deseja excluir essa Carteira?')
  })
})
