import { shallowMount } from '@vue/test-utils';
import AddressPartial from '@/components/functional/addresses/AddressPartial.vue';
describe('AddressPartial.vue', () => {
    it('includes addresses when method is called', () => {
        const msg = 'new message';
        const wrapper = shallowMount(AddressPartial, {
            propsData: { msg }
        });
        expect(wrapper.text()).toMatch(msg);
    });
});
//# sourceMappingURL=AddressPartial.spec.js.map