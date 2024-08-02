import { setActivePinia, createPinia } from 'pinia'
import { useAppStore } from '@/stores';
import { beforeEach, describe, expect, it } from 'vitest';

describe('App Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('init store', () => {
    const app = useAppStore()
    expect(app.users).toEqual([])
  })
})