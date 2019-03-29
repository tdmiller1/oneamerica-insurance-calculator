import React from 'react';
import Home from '../components/Home';
import { shallow, mount } from 'enzyme';
import { HashRouter as Router } from 'react-router-dom';
import { exportAllDeclaration } from '@babel/types';
import { JestEnvironment } from '@jest/environment';

describe('<Login />', () => {
    const state = {

        //about you information
        age: 1,
        spouse_age: 1,
        income: -1,
        spouse_income: 1,
        gender: null,
        children: 1,

        //personal assets
        savings: 1,
        checkings: 1,
        retirement: 1,

        //current life insurance
        current_policy: 1,
        offered_through_company: false,

        //immediate needs
        medical: 1,
        mortgage: 1,
        student_loans: 1,
        car_loans: 1,
        credit_card: 1,
        other: 1,
        final_expenses: 1,
        total_expenses: 0,

        //long term needs
        spouse_working: false,
        spouse_length: 1,
        years_provide: 1,
        children_to_college: 1,
        type_of_college: null,

        total_insurance_needs: 1

    }

    it('Submit works', () => {
        shallow(
            <Router>
                <Home />
            </Router>
        )
        
    });
});