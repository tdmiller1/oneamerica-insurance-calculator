import React from 'react';
import Dashboard from '../components/Dashboard';
import { shallow, mount } from 'enzyme';
import { HashRouter as Router } from 'react-router-dom';

describe('<Dashboard />', () => {

    it('Doesnt explode', () => {
        expect(
            shallow(
                <Dashboard />
            ).length
        ).toEqual(1)
    });
    

    it('Has props', () => {

        const wrapper = shallow(<Dashboard />);

    });
});
