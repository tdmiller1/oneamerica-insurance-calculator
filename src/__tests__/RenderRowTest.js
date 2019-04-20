import React from 'react';
import CustomerRow from '../components/CustomerRow';
import Dashboard from '../components/Dashboard';
import { shallow, mount } from 'enzyme';
import { HashRouter as Router } from 'react-router-dom';

describe('<CustomerRow />', () => {

    const minProps = {
        name: {},
        email: {},
        phone: {},
        location: {} ,
        einsurance: {},
        time: {},
        onSelectCustomer:() => {}
    }

    it('should render <td>', () => {
        const wrapper = shallow(<CustomerRow />)
        expect(wrapper.children('td')).toHaveLength(7)
    })


    it('Has props', () => {
        const wrapper = shallow(
            <CustomerRow 
                name={"Foo"} 
                email={"foo@gmail.com"}
                phone={"555-555-5555"} 
                location={"Indianapolis, IN"} 
                einsurance={80000} 
                time={"2017-10-02T09:53:00.000Z"} 
                onSelectCustomer={() => {}} />
        );

        expect(wrapper.prop('name')).toEqual(undefined);

    });
});
