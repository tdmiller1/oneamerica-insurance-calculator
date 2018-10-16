import React, {Component} from 'react'
import { withRouter, Switch, Route } from "react-router";


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
        if(this.validation()){
            this.calculate();
        }
        else {
            //this will eventually be some kind of form state
        }
    }

    validation(){
        console.log("validating");
        return ((this.state.income !== -1) && (this.state.gender !== null));
    }

    calculate(){
        console.log("calculating")
        return 0;
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
                            <label for="age">Age</label>
                            <input type="text" name="age" placeholder="45"/>

                            <label for="spouse-age">Spouse Age</label>
                            <input type="text" name="spouse-age" placeholder="43"/>
                        </div>

                        <div className="input-wrapper">
                            <label for="income">Income</label>
                            <input type="text" name="income" placeholder="37000" required/>

                            <label for="spouse-income">Spouse Income</label>
                            <input type="text" name="spouse-income" placeholder="34000"/>
                        </div>

                        <div className="input-wrapper">
                            <label for="gender">Gender</label>
                            <select name="gender" required>
                                <option disabled selected>Select</option>
                                <option>Male</option>
                                <option>Female</option>
                                <option>Prefer not to answer</option>
                            </select>

                            <label for="spouse-age">Number of Children</label>
                            <input type="text" name="spouse-age" placeholder="3"/>
                        </div>

                    </section>
                    <section className="personal-assets">
                        <label for="savings">Savings</label>
                        <input type="text" name="savings" placeholder="15000"/>

                        <label for="checking">Checking</label>
                        <input type="text" name="checking" placeholder="7000"/>

                        <label for="retirement">Retirement</label>
                        <input type="text" name="retirement" placeholder="70000"/>
                    </section>

                    <section>
                        <label for="your-policy">Your Policy</label>
                        <input type="text" name="your-policy" placeholder="200000"/>

                        <label for="offered-through-company">Offered Through Your Company?</label>
                        <select name="offered-through-company" required>
                            <option disabled selected>Select</option>
                            <option>Yes</option>
                            <option>No</option>
                            <option>Prefer not to answer</option>
                        </select>
                    </section>

                    <section className="immediate-needs">
                        <div className="input-wrapper">
                            <label for="mortgage">Mortgage</label>
                            <input type="text" name="mortgage" placeholder="40000"/>

                            <label for="medical">Medical</label>
                            <input type="text" name="medical" placeholder="3000"/>
                        </div>

                        <div className="input-wrapper">
                            <label for="student-loans">Student Loans</label>
                            <input type="text" name="student-loans" placeholder="8000"/>

                            <label for="credit-card">Credit Card</label>
                            <input type="text" name="credit-card" placeholder="1000"/>
                        </div>

                        <div className="input-wrapper">
                            <label for="car-loans">Car Loans</label>
                            <input type="text" name="car-loans" placeholder="5000"/>

                            <label for="other">Other</label>
                            <input type="text" name="other" placeholder="200"/>
                        </div>

                        <label for="final-expenses">Final Expenses</label>
                        <input type="text" name="final-expenses" placeholder="8500"/>
                    </section>

                    {/*  THIS IS WHERE LONG TERM NEEDS IS */}

                    <section className="long-term-needs">
                        <label for="spouse-working">Spouse continue working or take time off?</label>
                        <select name="spouse-working" required>
                            <option disabled selected>Select</option>
                            <option>Continue Working</option>
                            <option>Take Time Off</option>
                            <option>Prefer not to answer</option>
                        </select>

                        <label for="spouse-length">How long?</label>
                        <select name="spouse-length" required>
                            <option disabled selected>Select</option>
                            <option>1/2 year</option>
                            <option>1 year</option>
                            <option>1 1/2 years</option>
                            <option>2 years</option>
                            <option>More than 2 years</option>
                        </select>

                        <label for="years-length">Years your income should provide after you pass?</label>
                        <input type="text" name="years-length" placeholder="200"/>

                        <label for="children-to-college">How many children going to college?</label>
                        <select name="children-to-college" required>
                            <option disabled selected>Select</option>
                            <option>0</option>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>More than 3</option>
                        </select>

                        <label for="type-of-college">What type of college?</label>
                        <select name="type-of-college" required>
                            <option disabled selected>Select</option>
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