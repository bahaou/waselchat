import { shallowMount } from '@vue/test-utils';
import messageFormatterMixin from '../messageFormatterMixin';

describe('messageFormatterMixin', () => {
  it('returns correct plain text', () => {
    const Component = {
      render() {},
      mixins: [messageFormatterMixin],
    };
    const wrapper = shallowMount(Component);
    const message =
      '<b>Waselchat is an opensource tool. https://www.waselchat.com</b>';
    expect(wrapper.vm.getPlainText(message)).toMatch(
      'Waselchat is an opensource tool. https://www.waselchat.com'
    );
  });
});
