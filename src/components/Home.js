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

                </form>

            </div>
        )
    }

}

export default withRouter(Home)