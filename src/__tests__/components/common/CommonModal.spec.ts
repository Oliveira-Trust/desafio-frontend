import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { mount } from '@vue/test-utils';
import CommonModal from '@/components/common/CommonModal.vue';

describe('CommonModal', () => {
  let wrapper: any;
  const originalSetInterval = window.setInterval;
  const originalClearInterval = window.clearInterval;
  let mockSetInterval: any;
  let mockClearInterval: any;

  beforeEach(() => {
    mockSetInterval = vi.fn();
    mockClearInterval = vi.fn();
    window.setInterval = mockSetInterval;
    window.clearInterval = mockClearInterval;
    wrapper = mount(CommonModal, {
      props: {
        withExpiration: true,
      },
    });
  });

  afterEach(() => {
    window.setInterval = originalSetInterval;
    window.clearInterval = originalClearInterval;
  });

  it('should render the component', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('should set an interval if withExpiration is true', () => {
    expect(mockSetInterval).toHaveBeenCalled();
  });

  it('should increment expiration value every second', async () => {
    const intervalCallback = mockSetInterval.mock.calls[0][0];
    expect(wrapper.vm.expiration).toBe(0);

    intervalCallback();
    expect(wrapper.vm.expiration).toBe(1);

    intervalCallback();
    expect(wrapper.vm.expiration).toBe(2);
  });

  it('should emit close event and clear interval when expiration reaches limit', async () => {
    wrapper.vm.expiration = wrapper.vm.expirationLimit;
    const intervalCallback = mockSetInterval.mock.calls[0][0];
    
    intervalCallback();

    expect(mockClearInterval).toHaveBeenCalledWith(wrapper.vm.expirationInterval);
    expect(wrapper.emitted().close).toBeTruthy();
    expect(wrapper.vm.expiration).toBe(0);
  });

  it('should close the modal when background is clicked', async () => {
    const mockEvent = {
      target: {
        className: 'modal-background',
      },
    };
    wrapper.vm.handleBackgroundClick(mockEvent);
    expect(mockClearInterval).toHaveBeenCalled();
    expect(wrapper.emitted().close).toBeTruthy();
  });

  it('should not close the modal when a non-background element is clicked', async () => {
    const mockEvent = {
      target: {
        className: '',
      },
    };
    wrapper.vm.handleBackgroundClick(mockEvent);
    expect(mockClearInterval).not.toHaveBeenCalled();
    expect(wrapper.emitted().close).toBeFalsy();
  });
});
