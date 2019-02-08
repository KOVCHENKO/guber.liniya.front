import { shallowMount } from '@vue/test-utils';
import AddressPartial from '@/components/functional/addresses/AddressPartial.vue';
import Calls from '@/views/functional/calls/Calls.vue';

describe('Calls.vue', () => {
    it('should render blank claim when call is created', () => {
        const msg = 'new message';

        const wrapper = shallowMount(Calls, {
            propsData: { msg },
        });

        expect(wrapper.text()).toMatch(msg);
    });
});
