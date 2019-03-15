import React, {Component} from 'react';
import "../assets/dashboard.css"
import moment from "moment";
class CustomerRow extends Component {

    selectedChange = _ => {
        var customer = {Name: this.props.name, Email: this.props.email, 
        Location: this.props.location, EInsurance: this.props.einsurance, 
    Phone_Number: this.props.phone, TIME: this.props.time}
        this.props.onSelectCustomer(customer)
    }

    parseDate(){
        var date = moment(this.props.time).format('DD-MMM-YYYY HH:mm');
        return date
    }

    render() {
        return(
            <tr>
                <td><input id="checkbox" onClick={this.selectedChange} type="checkbox"/></td>
                <td>{this.props.name}</td>
                <td>{this.props.email}</td>
                <td>{this.props.phone}</td>
                <td>{this.props.location}</td>
                <td>{this.props.einsurance}</td>
                <td>{this.parseDate()}</td>
            </tr>
        )
    }
}

export default CustomerRow;