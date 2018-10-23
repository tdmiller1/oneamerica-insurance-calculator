import React, {Component} from 'react';
import { withRouter, Switch, Route } from "react-router";
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { createBrowserHistory, createHashHistory, createMemoryHistory } from "history"

class Home extends Component {

    constructor(props){
        super(props)
        this.state = {

            //IMPORTANT: these will all be the national average, not 0. for now they are 0 because
            //I don't know the actual numbers

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

            //long term needs
            spouse_working: false,
            spouse_length: 1,
            years_provide: 1,
            children_to_collge: 1,
            type_of_college: null

        }
    }


    submitInformation(){

        console.log(this.state)

        if(this.validation()){
            this.calculate();
            this.props.history.push("/results")
        }
        else {
            //this will eventually be some kind of form state
        }
    }

    validation(){
        console.log("Begin form validation.");
        if(this.state.gender !== "Male" && this.state.gender !== "Female" && this.state.gender !== "Prefer not to answer"){
            alert("Please select a gender.")
        }
        return ((this.state.income !== -1) && (this.state.gender !== null));
    }

    calculate(){
        console.log("Begin Calculation")
        //this is where the oneAmerica algorithm will go

    }

    render() {
        return (
            <div>

                <form onSubmit={(e) => {
                    e.preventDefault();
                    this.submitInformation()
                }}>

                    <section className="about-you">

                        <div className="input-wrapper">
                            <label htmlFor="age">Age</label>
                            <input type="text" name="age" placeholder="45" onChange={(e) => {
                                this.setState({
                                    age: e.target.value
                                })
                            }}/>

                            <label htmlFor="spouse-age">Spouse Age</label>
                            <input type="text" name="spouse-age" placeholder="43" onChange={(e) => {
                                this.setState({
                                    spouse_age: e.target.value
                                })
                            }}/>
                        </div>

                        <div className="input-wrapper">
                            <label htmlFor="income">Income</label>
                            <input type="text" name="income" placeholder="37000" required onChange={(e) => {
                                this.setState({
                                    income: e.target.value
                                })
                            }}/>

                            <label htmlFor="spouse-income">Spouse Income</label>
                            <input type="text" name="spouse-income" placeholder="34000" onChange={(e) => {
                                this.setState({
                                    spouse_income: e.target.value
                                })
                            }}/>
                        </div>

                        <div className="input-wrapper">
                            <label htmlFor="gender">Gender</label>
                            <select name="gender" required onChange={(e) => {
                                this.setState({
                                    gender: e.target.value
                                })
                            }}>
                                <option disabled defaultValue>Select</option>
                                <option>Male</option>
                                <option>Female</option>
                                <option>Prefer not to answer</option>
                            </select>

                            <label htmlFor="spouse-age">Number of Children</label>
                            <input type="text" name="spouse-age" placeholder="3" onChange={(e) => {
                                this.setState({
                                    children: e.target.value
                                })
                            }}/>
                        </div>

                    </section>
                    <section className="personal-assets">
                        <label htmlFor="savings">Savings</label>
                        <input type="text" name="savings" placeholder="15000" onChange={(e) => {
                            this.setState({
                                savings: e.target.value
                            })
                        }}/>

                        <label htmlFor="checking">Checking</label>
                        <input type="text" name="checking" placeholder="7000" onChange={(e) => {
                            this.setState({
                                checking: e.target.value
                            })
                        }}/>

                        <label htmlFor="retirement">Retirement</label>
                        <input type="text" name="retirement" placeholder="70000" onChange={(e) => {
                            this.setState({
                                age: e.target.value
                            })
                        }}/>
                    </section>

                    <section>
                        <label htmlFor="your-policy">Your Policy</label>
                        <input type="text" name="your-policy" placeholder="200000" onChange={(e) => {
                            this.setState({
                                current_policy: e.target.value
                            })
                        }}/>

                        <label htmlFor="offered-through-company">Offered Through Your Company?</label>
                        <select name="offered-through-company" required onChange={(e) => {
                            this.setState({
                                offered_through_company: e.target.value
                            })
                        }}>
                            <option disabled defaultValue>Select</option>
                            <option>Yes</option>
                            <option>No</option>
                            <option>Prefer not to answer</option>
                        </select>
                    </section>

                    <section className="immediate-needs">
                        <div className="input-wrapper">
                            <label htmlFor="mortgage">Mortgage</label>
                            <input type="text" name="mortgage" placeholder="40000" onChange={(e) => {
                                this.setState({
                                    mortgage: e.target.value
                                })
                            }}/>

                            <label htmlFor="medical">Medicdal</label>
                            <input type="text" name="medical" placeholder="3000" onChange={(e) => {
                                this.setState({
                                    medical: e.target.value
                                })
                            }}/>
                        </div>

                        <div className="input-wrapper">
                            <label htmlFor="student-loans">Student Loans</label>
                            <input type="text" name="student-loans" placeholder="8000" onChange={(e) => {
                                this.setState({
                                    student_loans: e.target.value
                                })
                            }}/>

                            <label htmlFor="credit-card">Credit Card</label>
                            <input type="text" name="credit-card" placeholder="1000" onChange={(e) => {
                                this.setState({
                                    credit_card: e.target.value
                                })
                            }}/>
                        </div>

                        <div className="input-wrapper">
                            <label htmlFor="car-loans">Car Loans</label>
                            <input type="text" name="car-loans" placeholder="5000" onChange={(e) => {
                                this.setState({
                                    car_loans: e.target.value
                                })
                            }}/>

                            <label htmlFor="other">Other</label>
                            <input type="text" name="other" placeholder="200" onChange={(e) => {
                                this.setState({
                                    other: e.target.value
                                })
                            }}/>
                        </div>

                        <label htmlFor="final-expenses">Final Expenses</label>
                        <input type="text" name="final-expenses" placeholder="8500" onChange={(e) => {
                            this.setState({
                                final_expenses: e.target.value
                            })
                        }}/>
                    </section>

                    {/*  THIS IS WHERE LONG TERM NEEDS IS */}

                    <section className="long-term-needs">
                        <label htmlFor="spouse-working">Spouse continue working or take time off?</label>
                        <select name="spouse-working" required onChange={(e) => {
                            this.setState({
                                spouse_working: e.target.value
                            })
                        }}>
                            <option disabled defaultValue>Select</option>
                            <option>Continue Working</option>
                            <option>Take Time Off</option>
                            <option>Prefer not to answer</option>
                        </select>

                        <label htmlFor="spouse-length">How long?</label>
                        <select name="spouse-length" required onChange={(e) => {
                            this.setState({
                                spouse_length: e.target.value
                            })
                        }}>
                            <option disabled defaultValue>Select</option>
                            <option>1/2 year</option>
                            <option>1 year</option>
                            <option>1 1/2 years</option>
                            <option>2 years</option>
                            <option>More than 2 years</option>
                        </select>

                        <label htmlFor="years-length">Years your income should provide after you pass?</label>
                        <input type="text" name="years-length" placeholder="200" onChange={(e) => {
                            this.setState({
                                years_provide: e.target.value
                            })
                        }}/>

                        <label htmlFor="children-to-college">How many children going to college?</label>
                        <select name="children-to-college" required onChange={(e) => {
                            this.setState({
                                children_to_college: e.target.value
                            })
                        }}>
                            <option disabled defaultValue>Select</option>
                            <option>0</option>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>More than 3</option>
                        </select>

                        <label htmlFor="type-of-college">What type of college?</label>
                        <select name="type-of-college" required onChange={(e) => {
                            this.setState({
                                type_of_college: e.target.value
                            })
                        }}>
                            <option disabled defaultValue>Select</option>
                            <option>Public University</option>
                            <option>Private College</option>
                            <option>Trade School</option>
                            <option>Community College</option>
                            <option>Other / Prefer not to answer</option>
                        </select>
                    </section>

                    <button type="submit">Calculate</button>

                </form>

            </div>
        )
    }

}



export default withRouter(Home)

