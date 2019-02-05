import React, {Component} from 'react'
import { withRouter } from "react-router";
import CustomerCard from "./CustomerCard";
import CustomerRow from "./CustomerRow";
import "../assets/dashboard.css";
import Filter from "./Filter";

class Dashboard extends Component {
    // isMobile = window.innerWidth <= 500;

    state = {
        customers:[],
        search:"",
        filter:false,
        selected:[],
        isAuthenticated:true,
        width:window.innerWidth,
        count:0
    }

    pullCustomers = _ =>{
        fetch(`http://localhost:4000/customers`)
        .then(response => response.json() )
        .then(response => {
            this.setState({ customers: response.data })
            this.saveData()
        })

    }

    searchCustomers = (search) =>{
        //Online Version
        fetch(`http://localhost:4000/query/name?name=${search}`)
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

        
    renderRows = ({ Name, Email, Phone_Number, Location, EInsurance, Time}) => 
    <CustomerRow key={Time}
        name={Name}
        email={Email} 
        phone={Phone_Number} 
        location={Location} 
        einsurance={EInsurance}
        time={Time}
        onSelectCustomer={this.selectCustomer}>
    </CustomerRow>

    handleWindowSizeChange = () => {
        this.setState({width:window.innerWidth})
    }

    componentDidMount(){
        this.pullCustomers();
    }

    componentWillMount(){
        window.addEventListener('resize', this.handleWindowSizeChange);
    }

    componentWillUnmount(){
        this.setState({width:window.innerWidth});
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
        const { width } = this.state;
        const isMobile = width <= 980;
        const SearchButton = ({search, changeSearch}) => {
            return (
                <div className="parent">
                    <input className="child" id="search-bar" type="search"
                        onChange={(e) => {
                            search = e.target.value
                        }}
                        onKeyPress={(e) => { 
                            if(e.key === 'Enter'){
                                changeSearch(search);
                                this.setState({search:""})
                            }}}
                        placeholder="John Doe"
                        name="search"
                        />
                    <button className="child" id="search-button"
                    onClick={(e) => {changeSearch(search);
                        this.setState({search:""})}}></button>
                </div>
            )
        }
        if (this.state.isAuthenticated){
            if(isMobile){
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
                        { this.state.search }
                        <SearchButton 
                            search={this.state.search}
                            changeSearch={(search) => {
                                this.setState({search:search})
                                this.searchCustomers(search)} }
                        />
                    </div>

                    <div>
                        <div>
                            {customers.map(this.renderCustomers)}
                        </div>
                    </div>
                </div>
            )}else{
                return(
                    <div id="dashboard-desktop">
                        <div id="dashboard-sidepanel">
                            <h1>Search</h1>
                            <hr id="line"></hr>
                            <p>Find individual user</p>
                            <div>
                                { this.state.search }
                                <SearchButton search={this.state.search} changeSearch={(search) => {
                                    this.setState({search: search})
                                    this.searchCustomers(search)
                            } }/>
                            </div>
                            <h1>Sort By</h1>
                            <hr id="line"></hr>
                            <p>Select how data is sorted</p>

                            <div className="column">
                                <h3>Location</h3>
                                <div className="row">
                                    <input id="checkbox" type="checkbox"/>
                                    <label id="label">One</label>
                                </div>
                                <div className="row">
                                    <input id="checkbox" type="checkbox"/>
                                    <label id="label">One</label>
                                </div>
                                <div className="row">
                                    <input id="checkbox" type="checkbox"/>
                                    <label id="label">One</label>
                                </div>
                            </div>

                            <div className="column">
                                <h3>Location</h3>
                                <div className="row">
                                    <input id="checkbox" type="checkbox"/>
                                    <label id="label">One</label>
                                </div>
                                <div className="row">
                                    <input id="checkbox" type="checkbox"/>
                                    <label id="label">One</label>
                                </div>
                                <div className="row">
                                    <input id="checkbox" type="checkbox"/>
                                    <label>One</label>
                                </div>
                            </div>

                            <div className="column">
                                <h3>Location</h3>
                                <div className="row">
                                    <input id="checkbox" type="checkbox"/>
                                    <label>One</label>
                                </div>
                                <div className="row">
                                    <input id="checkbox" type="checkbox"/>
                                    <label>One</label>
                                </div>
                                <div className="row">
                                    <input id="checkbox" type="checkbox"/>
                                    <label id="label">One</label>
                                </div>
                            </div>

                            <hr id="line"></hr>
                        </div>
                        
                        <div id="dashboard-content">
                            <h1>User Data</h1>
                            <hr id="line"></hr>
                            <div className="parent">
                                <h3 onClick={() => this.deleteSelected()}  className="child">Delete Selected</h3>
                                <h3 onClick={() => this.clearSelected()}  className="child">Clear Selected</h3>
                                <p className="floatRight">Current Date:</p>
                            </div>

                            <table>
                                <tr>
                                    <th></th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>Location</th>
                                    <th>EInsurance</th>
                                    <th>Time</th>
                                </tr>
                                {customers.map(this.renderRows)}
                            </table>
                        </div>
                    </div>
                )
            }
        }else{
            return(
                <div>No Auth</div>
            )
        }
    }

    
}

export default withRouter(Dashboard)