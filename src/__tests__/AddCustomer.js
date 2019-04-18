import React from 'react';
import Home from '../components/Home';
import { shallow, mount } from 'enzyme';
import { HashRouter as Router } from 'react-router-dom';

describe('<Login />', () => {

    it('Submit works', () => {
        shallow(
            <Router>
                <Home />
            </Router>
        )
        
    });
});