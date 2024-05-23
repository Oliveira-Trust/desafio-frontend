import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import CommonButton from '@/components/common/CommonButton.vue'

describe('CommonButton', () => {
  it('renders properly', () => {
    const wrapper = mount(CommonButton, { props: { label: 'Confirmar' } })
    expect(wrapper.text()).toContain('Confirmar')
  })

  it('emits onclick', () => {
    const wrapper = mount(CommonButton, { props: { label: 'Confirmar' } })
    expect(wrapper.find(".btn").exists()).toBe(true);

    wrapper.find(".btn").trigger("click");

    wrapper.vm.$nextTick(() => {
      expect(wrapper.emitted("onClick")?.length).toEqual(1);
    });
  })

  it('renders with outlined class', () => {
    const wrapper = mount(CommonButton, { props: { label: 'Confirmar', outlined: true } })
    expect(wrapper.find(".outlined").exists()).toBe(true);
  })

  it('renders with small class', () => {
    const wrapper = mount(CommonButton, { props: { label: 'Confirmar', small: true } })
    expect(wrapper.find(".small").exists()).toBe(true);
  })

  it('renders with danger class', () => {
    const wrapper = mount(CommonButton, { props: { label: 'Confirmar', danger: true } })
    expect(wrapper.find(".danger").exists()).toBe(true);
  })
  
  it('renders with disabled class', () => {
    const wrapper = mount(CommonButton, { props: { label: 'Confirmar', disabled: true } })
    expect(wrapper.find(".disabled").exists()).toBe(true);
  })
})
