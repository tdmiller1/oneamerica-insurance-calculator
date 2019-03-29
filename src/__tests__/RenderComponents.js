import React from 'react';
import App from '../App';
import Home from '../components/Home';
import Results from '../components/Results';
import Dashboard from '../components/Dashboard';
import Login from '../components/Login';
import CreateUser from '../components/CreateUser';
import Failure from '../components/Failure';
import Success from '../components/Success';
import CustomerCard from '../components/CustomerRow';
import CustomerRow from '../components/CustomerCard';
import Filter from '../components/Filter';
import { shallow } from 'enzyme';

it('App renders without shallow crashing', () => {
    shallow(<App />);
  });

  it('Home renders without shallow crashing', () => {
    shallow(<Home />);
  });

  it('Results renders without shallow crashing', () => {
    shallow(<Results />);
  });

  it('Dashboard renders without shallow crashing', () => {
    shallow(<Dashboard />);
  });

  it('Login renders without shallow crashing', () => {
    shallow(<Login />);
  });

  it('CreateUser renders without shallow crashing', () => {
    shallow(<CreateUser />);
  });

  it('Failure renders without shallow crashing', () => {
    shallow(<Failure />);
  });

  it('Success renders without shallow crashing', () => {
    shallow(<Success />);
  });

  it('CustomerCard renders without shallow crashing', () => {
    shallow(<CustomerCard />);
  });

  it('CustomerCard with props renders without shallow crashing', () => {
    var defaultProps = {
      name:"Dave",
      email:"dave@gmail.com", 
        phone:"5555555555", 
        location:"Indianapolis, IN", 
        einsurance:900000,
        time:"2019-09-01"
    }

    shallow(<CustomerCard {...defaultProps} />);
  });

  it('CustomerRow renders without shallow crashing', () => {
    shallow(<CustomerRow />);
  });

  it('CustomerRow with props renders without shallow crashing', () => {
    var defaultProps = {
      name:"Dave",
      email:"dave@gmail.com", 
        phone:"5555555555", 
        location:"Indianapolis, IN", 
        einsurance:900000,
        time:"2019-09-01"
    }
    shallow(<CustomerRow {...defaultProps} />);
  });
  
  
  it('Filter renders without shallow crashing', () => {
    var filterProps = {
      locationFilter:{
        northeast:true,
        west:false,
        midwest:false,
        south:false
      },
      timestampFilter:{
        day:true,
        week:false,
        month:false,
        year:false
      },
      insuranceNeedsFilter:{
        tier1:true,
        tier2:false,
        tier3:false,
        tier4:false,
        tier5:false
      }
    }
    shallow(
    <Filter 
      locationFilter={filterProps.locationFilter}
      timestampFilter={filterProps.timestampFilter}
      insuranceNeedsFilter={filterProps.insuranceNeedsFilter} />
      );
  });
