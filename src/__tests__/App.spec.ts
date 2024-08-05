import { describe, it, expect, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import App from '@/App.vue';
import NavBar from '@/components/feature/NavBar.vue';
import Button from '@/components/common/CommonButton.vue';
import UsersTable from '@/components/feature/UsersTable.vue';
import { createTestingPinia } from '@pinia/testing';

describe('App.vue', () => {
  let wrapper: any;

  beforeEach(() => {
    wrapper = mount(App, {
      global: {
        plugins: [createTestingPinia()],
      },
    });
  });

  it('should render the NavBar component', () => {
    expect(wrapper.findComponent(NavBar).exists()).toBe(true);
  });

  it('should render the Button component with correct label', () => {
    const button = wrapper.findComponent(Button);
    expect(button.exists()).toBe(true);
    expect(button.props('label')).toBe('Adicionar Carteira');
  });

  it('should render the UsersTable component', () => {
    expect(wrapper.findComponent(UsersTable).exists()).toBe(true);
  });

  it('should open the UserFormModal when "Adicionar Carteira" button is clicked', async () => {
    const button = wrapper.findComponent(Button);
    await button.trigger('click');
    expect(wrapper.vm.isUserModalOpen).toBe(true);
  });

  it('should close the UserFormModal', async () => {
    wrapper.vm.isUserModalOpen = true;
    await wrapper.vm.closeUserModal();
    expect(wrapper.vm.isUserModalOpen).toBe(false);
  });

  it('should handle edit user event', async () => {
    const user = { id: 1, name: 'Test User' };
    await wrapper.vm.handleEditUser(user);
    expect(wrapper.vm.userToEdit).toEqual(user);
    expect(wrapper.vm.isUserModalOpen).toBe(true);
  });

  it('should handle delete user event', async () => {
    const user = { id: 1, name: 'Test User' };
    await wrapper.vm.handleDeleteUser(user);
    expect(wrapper.vm.userToDelete).toEqual(user);
    expect(wrapper.vm.isDeleteUserModalOpen).toBe(true);
  });

  it('should close the DeleteUserModal', async () => {
    wrapper.vm.isDeleteUserModalOpen = true;
    await wrapper.vm.closeDeleteUserModal();
    expect(wrapper.vm.isDeleteUserModalOpen).toBe(false);
  });
});
