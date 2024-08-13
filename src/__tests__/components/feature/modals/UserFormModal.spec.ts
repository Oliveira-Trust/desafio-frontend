import { mount } from '@vue/test-utils';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import UserFormModal from '@/components/feature/modals/UserFormModal.vue';
import { useAppStore } from '@/stores';
import { getCryptoValueByCurrencyValue } from '@/utils/currency.utils';
import { createTestingPinia, type TestingPinia } from '@pinia/testing';

vi.mock('@/utils/currency.utils', () => ({
  getCryptoValueByCurrencyValue: vi.fn(),
}));

describe('UserFormModal.vue', () => {
  let pinia: TestingPinia;

  beforeEach(() => {
    pinia = createTestingPinia({
      initialState: {
        app: {
          cryptoCurrencyValue: 50000,
          pullCryptoCurrencyPrice: vi.fn(),
          createUser: vi.fn(),
          updateUser: vi.fn(),
        },
      },
    });
  });

  it('checks default values', async () => {
    const wrapper: any = mount(UserFormModal, {
      global: {
        plugins: [pinia],
      },
      props: {
        isOpen: true,
      },
    });

    
    expect(wrapper.vm.user).toEqual({ nome: '', sobrenome: '', email: '', valor_carteira: 0 });
  });

  it('renders correctly when open', async () => {
    const wrapper: any = mount(UserFormModal, {
      global: {
        plugins: [pinia],
      },
      props: {
        isOpen: true,
        user: { id: 1, nome: 'Usuário', sobrenome: 'teste', email: 'teste@exemplo.com', valor_carteira: 0 },
      },
    });

    expect(wrapper.findComponent({ name: 'CommonModal' }).exists()).toBe(true);
    expect(wrapper.findComponent({ name: 'TextInput' }).exists()).toBe(true);
    expect(wrapper.findComponent({ name: 'CommonButton' }).exists()).toBe(true);
  });

  it('emits close event and resets fields on close', async () => {
    const wrapper: any = mount(UserFormModal, {
      global: {
        plugins: [pinia],
      },
      props: {
        isOpen: true,
        user: { id: 1, nome: 'Usuário', sobrenome: 'teste', email: 'teste@exemplo.com', valor_carteira: 0 },
      },
    });

    await wrapper.vm.close();
    expect(wrapper.emitted().close).toBeTruthy();
    expect(wrapper.vm.userCurrencyToAsk).toBe('');
    expect(wrapper.vm.cryptoCurrencyAmoutToBuy).toBe(0);
  });

  it('validates email correctly', async () => {
    const wrapper: any = mount(UserFormModal, {
      global: {
        plugins: [pinia],
      },
      props: {
        isOpen: true,
        user: { id: 1, nome: 'Usuário', sobrenome: 'teste', email: 'invalidemail', valor_carteira: 0 },
      },
    });

    expect(wrapper.vm.isEmailValid).toBe(false);
  });

  it('validates email correctly', async () => {
    const wrapper: any = mount(UserFormModal, {
      global: {
        plugins: [pinia],
      },
      props: {
        isOpen: true,
        user: { id: 1, nome: 'Usuário', sobrenome: 'teste', email: 'valid@exemplo.com', valor_carteira: 0 },
      },
    });
    expect(wrapper.vm.isEmailValid).toBe(true);
  });

  it('calculates cryptocurrency amount correctly', async () => {
    (getCryptoValueByCurrencyValue as any).mockReturnValue(0.002);
    const wrapper: any = mount(UserFormModal, {
      global: {
        plugins: [pinia],
      },
      props: {
        isOpen: true,
        user: { id: 1, nome: 'Usuário', sobrenome: 'teste', email: 'teste@exemplo.com', valor_carteira: 0 },
      },
    });

    wrapper.vm.userCurrencyToAsk = '100';
    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.cryptoCurrencyAmoutToBuy).toBe(0.002);
    })
  });

  it('creates a new user', async () => {
    const store = useAppStore();
    (getCryptoValueByCurrencyValue as any).mockReturnValue(0.002);
    const wrapper: any = mount(UserFormModal, {
      global: {
        plugins: [pinia],
      },
      props: {
        isOpen: true,
        isEditing: false,
      },
    });
    store.createUser = vi.fn()

    wrapper.vm.user = { nome: 'Usuário', sobrenome: 'teste', email: 'teste@exemplo.com', valor_carteira: 0 };

    wrapper.vm.save();

    wrapper.vm.$nextTick(() => {
      expect(store.createUser).toHaveBeenCalledWith({ nome: 'Usuário', sobrenome: 'teste', email: 'teste@exemplo.com', valor_carteira: 0 })
    });
  })

  it('edits an existing user', async () => {
    const store = useAppStore();
    (getCryptoValueByCurrencyValue as any).mockReturnValue(0.002);
    const wrapper: any = mount(UserFormModal, {
      global: {
        plugins: [pinia],
      },
      props: {
        isOpen: true,
        isEditing: true,
        user: { id: 1, nome: 'Usuário', sobrenome: 'teste', email: 'teste@exemplo.com', valor_carteira: 0 },
      },
    });

    store.updateUser = vi.fn();

    wrapper.find('input[placeholder="Sobrenome"]').setValue('atualizado');
    wrapper.find('input[placeholder="Nome"]').setValue('atualizado');
    wrapper.find('input[placeholder="E-mail"]').setValue('atualizado@exemplo.com');
    wrapper.find('input[placeholder="Valor de compra"]').setValue(10);

    wrapper.vm.save();

    wrapper.vm.$nextTick(() => {
      expect(store.updateUser).toHaveBeenCalledWith(1, { id: 1, nome: 'atualizado', sobrenome: 'atualizado', email: 'atualizado@exemplo.com', valor_carteira: 0 })
    });
  })
});
