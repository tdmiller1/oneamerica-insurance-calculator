import React, {Component} from 'react'
import { withRouter, Switch, Route } from "react-router";


class Home extends Component {

    constructor(props){
        super(props)
        this.state = {

            //IMPORTANT: these will all be the national average, not 0. for now they are 0 because
            //I don't know the actual numbers

            //about you information
            age: 0,
            spouse_age: 0,
            income: 0,
            spouse_income: 0,
            gender: null,
            children: 0,

            //personal assets
            savings: 0,
            checkings: 0,
            retirement: 0,

            //current life insurance
            current_policy: 0,
            offered_through_compnay: false,

            //immediate needs
            medical: 0,
            mortgage: 0,
            student_loans: 0,
            car_loans: 0,
            credit_card: 0,
            other: 0,
            final_expenses: 0,

            //long term needs
            spouse_working: false,
            spouse_length: 0,
            years_provide: 0,
            children_to_collge: 0,
            type_of_college: null

        }
    }


    submitInformation(){
        console.log("This works!")
    }

    render() {
        return (
            <div>

                <form onSubmit={(e) => {
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
                                <option selected>Select</option>
                                <option>Male</option>
                                <option>Female</option>
                                <option>Prefer not to answer</option>
                            </select>

                            <label for="spouse-age">Number of Children</label>
                            <input type="text" name="spouse-age" placeholder="3"/>
                        </div>

                    </section>
                    <section className="personal-assets">

                    </section>
                    <section className="life-insurance">

                    </section>
                    <section className="immediate-needs">

                    </section>
                    <section className="long-term-needs">

                    </section>

                    <button type="submit">Calculate</button>

                </form>

            </div>
        )
    }

}

export default withRouter(Home)