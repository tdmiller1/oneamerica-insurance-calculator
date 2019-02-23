import React, {Component} from 'react';
import "../assets/dashboard.css"
class CustomerCard extends Component {

    state = {
        selected: false
    }

    selectedChange = _ => {
        var customer = {Name: this.props.name, Email: this.props.email, Location: this.props.location, EInsurance: this.props.einsurance, Phone_Number: this.props.phone, TIME: this.props.time}

        this.props.onSelectCustomer(customer);
    }

    render() {
        return(
            <div className="client_card">
            {/* <button onClick={this.selectedChange}>"checkbox placeholder"</button> */}
                <div id="card-header">
                    <h4 id="name-field">Name: <span>{this.props.name}</span></h4>
                    <div id="card-header-right">
                        <input onClick={this.selectedChange} id="card-checkbox" type="checkbox"/>
                    </div>
                </div>
                <div id="floatLeft">
                    <p id="gray_row">Email: <span>{this.props.email}</span></p>
                    <p>Location: <span>{this.props.location}</span></p>
                    <p id="gray_row">Insurance Needs: <span>{this.props.einsurance}</span></p>
                    <p>Phone: <span>{this.props.phone}</span></p>
                    <p id="timestamp"><i>Timestamp: <strong>{this.props.time}</strong></i></p>
                </div>
            </div>
        )
    }
}

export default CustomerCard;