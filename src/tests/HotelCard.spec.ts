import { shallowMount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest'
import HotelCard from '../components/cards/HotelCard.vue';

describe('HootCard component', async () => {
  const wrapper = await shallowMount(HotelCard, {
    props: {
      image: 'this is an image',
      rating: 4,
      name: 'Super Hotel',
      weekPrices: {
        regular: 16000,
        rewards: 12000
      },
      weekendPrices: {
        regular: 16000,
        rewards: 12000
      },
    }
  })

  it('Should have all props', async () => {
    expect(wrapper.props().image).toBe('this is an image')
    expect(wrapper.props().name).toBe('Super Hotel')
    expect(wrapper.props().rating).toBe(4)
    expect(wrapper.props().weekPrices.regular).toBe(16000)
    expect(wrapper.props().weekPrices.rewards).toBe(12000)
    expect(wrapper.props().weekendPrices.regular).toBe(16000)
    expect(wrapper.props().weekendPrices.rewards).toBe(12000)
  })
})