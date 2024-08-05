import TextButton from "@/components/common/TextButton.vue";
import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";

describe('TextButton', () => {
  it('renders properly', () => {
    const wrapper = mount(TextButton, { props: { label: 'Confirmar' } })
    expect(wrapper.text()).toContain('Confirmar')
  })

  it('emits onclick', () => {
    const wrapper = mount(TextButton, { props: { label: 'Confirmar' } })
    expect(wrapper.find("b").exists()).toBe(true);

    wrapper.find("b").trigger("click");

    wrapper.vm.$nextTick(() => {
      expect(wrapper.emitted("onClick")?.length).toEqual(1);
    });
  })
});
