import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import TextInput from '@/components/common/TextInput.vue';

describe('TextInput', () => {
  let wrapper: any;

  const mountComponent = (props: any = {}) => {
    wrapper = mount(TextInput, {
      props,
    });
  };

  it('should render the component', () => {
    mountComponent();
    expect(wrapper.exists()).toBe(true);
  });

  it('should apply read-only class if readOnly prop is true', () => {
    mountComponent({ readOnly: true });
    expect(wrapper.classes()).toContain('read-only');
  });

  it('should apply error class if error prop is true', () => {
    mountComponent({ error: true });
    expect(wrapper.classes()).toContain('error');
  });

  it('should render the currency prefix if isCurrency prop is true', () => {
    mountComponent({ isCurrency: true });
    expect(wrapper.find('.prefix').text()).toBe('R$');
  });

  it('should set the input type to number if isCurrency prop is true', () => {
    mountComponent({ isCurrency: true });
    expect(wrapper.find('input').attributes('type')).toBe('number');
  });

  it('should set the input type to text if isCurrency prop is false', () => {
    mountComponent({ isCurrency: false });
    expect(wrapper.find('input').attributes('type')).toBe('text');
  });

  it('should bind the input name and placeholder attributes', () => {
    const name = 'testName';
    const placeholder = 'testPlaceholder';
    mountComponent({ name, placeholder });

    const input = wrapper.find('input');
    expect(input.attributes('name')).toBe(name);
    expect(input.attributes('placeholder')).toBe(placeholder);
  });

  it('should bind the v-model to the input value', async () => {
    mountComponent();
    const input = wrapper.find('input');
    await input.setValue('testValue');

    expect(input.element.value).toBe('testValue');
  });

  it('should set the input to readonly if readOnly prop is true', () => {
    mountComponent({ readOnly: true });
    const input = wrapper.find('input');
    expect(input.attributes('readonly')).toBeDefined();
  });
});
