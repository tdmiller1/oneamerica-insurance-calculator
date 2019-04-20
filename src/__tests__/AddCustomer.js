import React from 'react';
import Results from '../components/Results';
import { shallow, mount } from 'enzyme';
import { HashRouter as Router } from 'react-router-dom';

describe('<Results />', () => {


    const minProps = {
        location: {
            state: {
                type: "",
                amount: "",
                cost: 0,
                plan: ""
            }
        }
    }

    it('Doesnt explode', () => {
        expect(
            shallow(<Results {...minProps} />).length
        ).toEqual(1)
    });


    it('Has props', () => {
        const wrapper = shallow(<Results {...minProps} />);
    });

    it('No props', () => {
        const props = {}
        const wrapper = shallow(<Results {...props} />);

        expect(wrapper.find({ props: 'state' }).length).toBe(0);
    });


});
