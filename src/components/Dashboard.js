import React, {Component} from 'react'
import { withRouter } from "react-router";
import CustomerCard from "./CustomerCard";
import Filter from "./Filter";

class Dashbard extends Component {

    state = {
        customers:[],
        search:"",
        filter:false,
        selected:[]
    }

    pullCustomers = _ =>{
        fetch(`http://localhost:4000/customers`)
        .then(response => response.json() )
        .then(response => {
            this.setState({ customers: response.data })
            this.saveData()
        })

    }

    searchCustomers = _ =>{
        //Online Version
        fetch(`http://localhost:4000/query/name?name=${this.state.search}`)
        .then(response => response.json() )
        .then(response => this.setState({ customers: response.data }))
        .then(err => console.log(err))

        //Session Storage Version
        // var search = this.state.search
        // var person = []
        // var customers = JSON.parse(sessionStorage.getItem("customers"))
        // customers.forEach(function(element){
        //     if(element.Name.toLowerCase().includes(search.toLowerCase())){
        //         person.push(element)
        //     }
        // })
        // this.setState({customers: person})
        
    }

    saveData = _ => {
        sessionStorage.setItem('customers', JSON.stringify(this.state.customers))
    }

    selectCustomer = (customer) => {
        this.setState({selected: customer})
        var list = this.state.selected.slice()
        console.log(list)
        list.push(customer)
        this.setState({selected: list})
        console.log(customer)
        console.log(this.state)
    }

    renderCustomers = ({ Name, Email, Phone_Number, Location, EInsurance, Time}) => 
        <CustomerCard key={Time}
            name={Name}
            email={Email} 
            phone={Phone_Number} 
            location={Location} 
            einsurance={EInsurance}
            time={Time}
            onSelectCustomer={this.selectCustomer}>
        </CustomerCard>

    componentDidMount(){
        this.pullCustomers();
    }

    toggleFilter(){
        this.setState({
            filter: !this.state.filter
        })
    }

    deleteSelected(){
        this.state.selected.forEach(function(element){
            fetch(`http://localhost:4000/delete/name?name=${element.Name}`)
        })
        
        this.pullCustomers();
        
    }

    clearSelected(){
        console.log("CLEAR")
    }

    render() {
        const {customers} = this.state;
        return (
             <div>
                {this.state.filter && 
                    <Filter
                        closePopup={this.toggleFilter.bind(this)}
                    />
                }
                 <div id="header">
                    <h1>User Data</h1>
                    <div id="spacer"></div>
                    <button id="filter-button" onClick={this.toggleFilter.bind(this)}>Filter</button>
                 </div>
                <div id="search-area">
                    <hr id="line"></hr>
                    <div className="parent">
                        <h3 onClick={() => this.deleteSelected()}  className="child">Delete Selected</h3>
                        <h3 onClick={() => this.clearSelected()}  className="child">Clear Selected</h3>
                    </div>
                    <div className="parent">
                        <input className="child" id="search-bar" type="text" name="search" placeholder="Tucker" 
                        onKeyPress={(e) => { 
                            if(e.key === 'Enter'){
                                this.searchCustomers();
                            }}}
                        onChange={(e) => {
                            this.setState({
                                search: e.target.value
                            })
                        }}/>
                        <button className="child" id="search-button" onClick={() => this.searchCustomers()}>Search</button>
                    </div>
                </div>

                <div>
                    <div>
                      {customers.map(this.renderCustomers)}
                    </div>
                </div>
            </div>
        )
    }

}

export default withRouter(Dashbard)