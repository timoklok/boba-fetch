import React from 'react';
import OptionSelect from '../components/OptionSelect';
import { mount } from 'enzyme';

describe('OptionSelect', () => {

	it('removes loading state after receiving list prop', () => {
		const list = [{ 'id': 'item-one', 'value': '1' }, { 'id': 'item-two', 'value': '2' }];
		
		const wrapper = mount(<OptionSelect listName='test' list={[]} currentResult={[]}></OptionSelect>);
		const button = wrapper.find('DropdownButton'); 
		
		expect(button.text()).toEqual('loading...');

		wrapper.setProps({ list: list })
		expect(button.text()).toEqual('select test');
	});

	
	// it('renders clear button after making selection', () => {	
	// });
	
});
