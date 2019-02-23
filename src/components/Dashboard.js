import React, {Component} from 'react'
import { withRouter } from "react-router";
import CustomerCard from "./CustomerCard";
import CustomerRow from "./CustomerRow";
import "../assets/dashboard.css";
import Filter from "./Filter";
import searchIcon from "../assets/images/oa-search-bar.svg";

class Dashboard extends Component {
    // isMobile = window.innerWidth <= 500;

    constructor(props){
        super(props)
            this.state = {
            customers:[],
            search:"",
            filter:{
                location:false,
                insurance:false,
                time:false
            },
            currentFilter:[],
            locationFilter:{
                northeast:false,
                south:false,
                midwest:false,
                west:false
            },
            insuranceNeedsFilter:{
                tier1:false,
                tier2:false,
                tier3:false,
                tier4:false,
                tier5:false
            },
            timestampFilter:{
                day:false,
                week:false,
                month:false,
                year:false
            },
            selected:[],
            isAuthenticated:true,
            width:window.innerWidth,
            date:""
        }
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
        var selectedCustomers = this.state.selected;
        var newSelectedCustomers = []
        var isInList = false
        if(selectedCustomers.length > 0){
            selectedCustomers.forEach(function(element){
                if(element.Email.toLowerCase() == customer.Email.toLowerCase()){
                    isInList = true;
                }else{
                    newSelectedCustomers.push(element)
                }
            })
            if(!isInList){
                newSelectedCustomers.push(customer)
            }
        }else{
            newSelectedCustomers.push(customer)
        }

        this.setState({selected: newSelectedCustomers})
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
        var date = new Date();
        var stringDate = (date.getMonth()+1) + "/" + date.getDate() + "/" + date.getFullYear();
        this.setState({date: stringDate})
    
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
            fetch(`http://localhost:4000/delete/email?email=${element.Email}`)
        })
        
        this.pullCustomers();
        
    }

    clearSelected(){
        console.log("CLEAR")
    }

    insuranceNeedsFilterCustomers(){
        var customerList = []
        const tierValues = {
            tier1:[20000,40000],
            tier2:[40000,60000],
            tier3:[60000,80000],
            tier4:[80000,90000],
            tier5:[90000,10000]
        }
        for(var tier in this.state.insuranceNeedsFilter){
            if(this.state.insuranceNeedsFilter[tier]){
                fetch(`http://localhost:4000/filter/einsurance/range?lower=${tierValues[tier][0]}&upper=${tierValues[tier][1]}`)
                .then(response => response.json())
                .then(response => {
                    response.data.forEach(function(element){
                        customerList.push(element)
                    })  
                    this.setState({
                        customers: customerList
                    })
                })
            }
        }   
    }

    insuranceNeedsFilter(tier){
        var newInsuranceNeedsFilter = this.state.insuranceNeedsFilter
        switch(tier){
            case "tier1":
                newInsuranceNeedsFilter["tier1"] = !this.state.insuranceNeedsFilter.tier1
                break;
            case "tier2":
                newInsuranceNeedsFilter["tier2"] = !this.state.insuranceNeedsFilter.tier2
                break;
            case "tier3":
                newInsuranceNeedsFilter["tier3"] = !this.state.insuranceNeedsFilter.tier3
                break;
            case "tier4":
                newInsuranceNeedsFilter["tier4"] = !this.state.insuranceNeedsFilter.tier4
                break;
            case "tier5":
                newInsuranceNeedsFilter["tier5"] = !this.state.insuranceNeedsFilter.tier5
                break;
            default:
                break;
        }

        this.setState({insuranceNeedsFilter: newInsuranceNeedsFilter})

        if(this.state.insuranceNeedsFilter.tier1 || this.state.insuranceNeedsFilter.tier2 || this.state.insuranceNeedsFilter.tier3 || this.state.insuranceNeedsFilter.tier4 || this.state.insuranceNeedsFilter.tier5){
            this.filterFunction();
            var newFilter = this.state.filter
            newFilter["insurance"] = true;
            this.setState({filter:newFilter})
        }else{
            this.pullCustomers();
        }
    }

    locationFilterCustomers(){
        var customerList = []

        for(var region in this.state.locationFilter){
            if(this.state.locationFilter[region]){
                fetch(`http://localhost:4000/filter/location/region?region=${region}`)
                .then(response => response.json())
                .then(response => {
                    response.data.forEach(function(element){
                        customerList.push(element)
                    })  
                    this.setState({
                        customers: customerList
                    })
                })
            }
        }
    }

    locationFilter(region){
        var newLocationFilter = this.state.locationFilter
        switch(region){
            case "northeast":
                newLocationFilter["northeast"] = !this.state.locationFilter.northeast
                break;
            case "south":
                newLocationFilter["south"] = !this.state.locationFilter.south
                break;
            case "midwest":
                newLocationFilter["midwest"] = !this.state.locationFilter.midwest
                break;
            case "west":
                newLocationFilter["west"] = !this.state.locationFilter.west
                break;
            default:
                break;
        }

        this.setState({locationFilter: newLocationFilter})

        if(this.state.locationFilter.northeast || this.state.locationFilter.west || this.state.locationFilter.midwest || this.state.locationFilter.south){
            var newFilter = this.state.filter;
            newFilter["location"] = true;
            this.setState({filter:newFilter})
            this.filterFunction();
        }else{
            this.pullCustomers();
        }
    }

    filterFunction(){
        // Get ready for some shit
        var query = {
            region:[],
            insurnace:[],
            timestamp:[]
        }
        for(var region in this.state.locationFilter){
            if(this.state.locationFilter[region]){
                if(query["region"]){
                    var regionList = query["region"]
                    regionList.push(region)
                    query["region"] = regionList
                }else{
                    query["region"] = [region]
                }
            }
        }
        for(var insurance in this.state.insuranceNeedsFilter){
            if(this.state.insuranceNeedsFilter[insurance]){
                if(query["insurance"]){
                    var insurnaceList = query["insurance"]
                    insurnaceList.push(insurance)
                    query["insurance"] = insurnaceList
                }else{
                    query["insurance"] = [insurance]
                }
            }
        }
        for(var time in this.state.timestampFilter){
            if(this.state.timestampFilter[time]){
                query["timestamp"] = time
            }
        }

        console.log(query)

        var queryString = ""

        for(var region in query.region){
            // console.log(query.region[region])

        }

        var test = {
            location:["midwest","south"],
            insurance:["tier1"],
            time:["2019"]
        }

        console.log(test)

        var locationString = ""
        locationString = Object.keys(test.location).map(key => key + '=' + test.location[key]).join('&');
        
        var insuranceString = ""
        insuranceString = Object.keys(test.insurance).map(key => key + '=' + test.insurance[key]).join('&');
        
        var timeString = ""
        timeString = Object.keys(test.time).map(key => key + '=' + test.time[key]).join('&');

        console.log(locationString + '&' + insuranceString + '&' + timeString)

        // /filter/all?location=midwest&insurance_lower=50000&insurance_upper=100000&time_upper=2019-02-06

        //TECHNICALLY IT LOOPS AT COSTANT TIME OKAY SO IT'S NOT THAT BIG OF A DEAL
        


    //     SELECT * FROM oneamerica.customer WHERE (Location LIKE "%IN" OR Location LIKE "%OH" OR Location LIKE "%IL" OR Location LIKE "%MO" OR Location LIKE "%ND" OR Location LIKE "%SD" OR Location LIKE "%KS" OR Location LIKE "%NE" OR Location LIKE "%MI" OR Location LIKE "%IO" OR Location LIKE "%MN" OR Location LIKE "%WI")
    // AND EInsurance >= 50000
    // AND Time >= "2019-02-05"
        var newMasterCustomerList = []
        // No filters checked - INSURANCE - REGION - TIME
        /*if(this.state.filter.location){
            var customerList1 = []
            for(var region in this.state.locationFilter){
                if(this.state.locationFilter[region]){
                    fetch(`http://localhost:4000/filter/location/region?region=${region}`)
                    .then(response => response.json())
                    .then(response => {
                        response.data.forEach(function(element){
                            for(var customer in newMasterCustomerList){
                                if(customer.email == element.email){
                                    customerList1.push(element);
                                }
                            }
                        })
                    })
                }
            }
            newMasterCustomerList = customerList1;
        }
        if(this.state.filter.insurance){
            var customerList = []
            const tierValues = {
                tier1:[20000,40000],
                tier2:[40000,60000],
                tier3:[60000,80000],
                tier4:[80000,90000],
                tier5:[90000,10000]
            }
            for(var tier in this.state.insuranceNeedsFilter){
                if(this.state.insuranceNeedsFilter[tier]){
                    fetch(`http://localhost:4000/filter/einsurance/range?lower=${tierValues[tier][0]}&upper=${tierValues[tier][1]}`)
                    .then(response => response.json())
                    .then(response => {
                        response.data.forEach(function(element){
                            for(var customer in newMasterCustomerList){
                                if(customer.email == element.email){
                                    customerList.push(element)
                                }
                            }
                        })
                    })
                }
            }
            newMasterCustomerList = customerList
        }
        if(this.state.filter.time){

        }

        this.setState({
            customers: newMasterCustomerList
        })*/
        // INSURANCE checked - now location
        // INSURANCE checked - now time
        // LOCATION checked - now insurance
        // LOCATION checked - now time
        // TIME checked - now location
        // TIME checked - now insurance
    }

    render() {
        const {customers} = this.state;
        const { width } = this.state;
        const isMobile = width <= 1040;
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
                        this.setState({search:""})}}>
                            <img src={searchIcon}></img>
                        </button>
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
                    <div id="dashboard-header">
                        <h1>User Data</h1>
                        <div id="header-right">
                            <button id="filter-button" onClick={this.toggleFilter.bind(this)}></button>
                        </div>
                    </div>
                    <div id="search-area">
                        <hr id="line"></hr>
                        <p id="dashboard-time">{this.state.date}</p>
                        <div className="floatLeft">
                            <h3 onClick={() => this.deleteSelected()}  className="floatLeft">Delete Selected</h3>
                            <h3 onClick={() => this.clearSelected()}  className="floatLeft">Clear Selected</h3>
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
                                {/* onClick={(e) => this.locationFilter("northeast")} */}
                                    <input id="checkbox" onChange={(e) => this.locationFilter("northeast")} type="checkbox"/>
                                    <label id="label">Northeast</label>
                                </div>
                                <div className="row">
                                    <input id="checkbox" onChange={(e) => this.locationFilter("midwest")} type="checkbox"/>
                                    <label id="label">Midwest</label>
                                </div>
                                <div className="row">
                                    <input id="checkbox" onChange={(e) => this.locationFilter("west")} type="checkbox"/>
                                    <label id="label">West</label>
                                </div>
                                <div className="row">
                                    <input id="checkbox" onChange={(e) => this.locationFilter("south")} type="checkbox"/>
                                    <label id="label">South</label>
                                </div>
                            </div>

                            <div className="column">
                                <h3>Insurance Needs</h3>
                                <div className="row">
                                    <input id="checkbox" onChange={(e) => this.insuranceNeedsFilter("tier1")} type="checkbox"/>
                                    <label id="label">$20,000 - $40,000</label>
                                </div>
                                <div className="row">
                                    <input id="checkbox" onChange={(e) => this.insuranceNeedsFilter("tier2")} type="checkbox"/>
                                    <label id="label">$40,000 - $60,000</label>
                                </div>
                                <div className="row">
                                    <input id="checkbox" onChange={(e) => this.insuranceNeedsFilter("tier3")} type="checkbox"/>
                                    <label id="label">$60,000 - $80,000</label>
                                </div>
                                <div className="row">
                                    <input id="checkbox" onChange={(e) => this.insuranceNeedsFilter("tier4")} type="checkbox"/>
                                    <label id="label">$80,000 - $90,000</label>
                                </div>
                                <div className="row">
                                    <input id="checkbox" onChange={(e) => this.insuranceNeedsFilter("tier5")} type="checkbox"/>
                                    <label id="label">$90,000 - $100,000</label>
                                </div>
                            </div>

                            <div className="column">
                                <h3>Timestamp</h3>
                                <div className="row">
                                    <input id="checkbox" type="checkbox"/>
                                    <label id="label">Last Day</label>
                                </div>
                                <div className="row">
                                    <input id="checkbox" type="checkbox"/>
                                    <label id="label">Last Week</label>
                                </div>
                                <div className="row">
                                    <input id="checkbox" type="checkbox"/>
                                    <label id="label">Last Month</label>
                                </div>
                                <div className="row">
                                    <input id="checkbox" type="checkbox"/>
                                    <label id="label">Last Year</label>
                                </div>
                            </div>

                            <hr id="line"></hr>
                        </div>
                        
                        <div id="dashboard-content">
                            <h1>User Data</h1>
                            <hr id="line"></hr>
                            <div id="dashboard-data-header" className="floatLeft">
                                <h3 id="textButton" onClick={() => this.deleteSelected()}  className="child">Delete Selected</h3>
                                <h3 id="textButton" onClick={() => this.clearSelected()}  className="child">Clear Selected</h3>
                                <div className="floatRight">
                                    <p>Current Date: {this.state.date}</p>
                                </div>
                            </div>

                            <table>
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Phone</th>
                                        <th>Location</th>
                                        <th>EInsurance</th>
                                        <th>Time</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {customers.map(this.renderRows)}
                                </tbody>
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