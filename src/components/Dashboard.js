import React, {Component} from 'react'
import { withRouter } from "react-router";
import CustomerCard from "./CustomerCard";
import CustomerRow from "./CustomerRow";
import "../assets/dashboard.css";
import Filter from "./Filter";
import searchIcon from "../assets/images/oa-search-bar.svg";
import filterIcon from "../assets/images/oneamerica-filter.svg";

import axios from 'axios';

class Dashboard extends Component {
    // isMobile = window.innerWidth <= 500;

    constructor(props){
        super(props)
            this.state = {
            customers:[],
            search:"",
            filterPopup: false,
            filter:{
                location:false,
                insurance:false,
                time:false
            },
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
            date:new Date(),
            host:null
        }
    }

    async pullCustomers(){
        var url = this.state.host + '/customers'
        const response = await axios.get(url)
        this.setState({ customers: response.data.data })

    }

    searchCustomers = (search) =>{
        var url = this.state.host + '/customers/search'
        axios.get(url,{
            params:{
                name:search
            }
        }).then(response => this.setState({ customers: response.data.data }))
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
                if(element.Email.toLowerCase() === customer.Email.toLowerCase()){
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
        this.pullCustomers();
    }

    componentWillMount(){
        if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
            this.setState({host: "https://oneamerica-nodemon.herokuapp.com"})
        } else {
            this.setState({host: "https://oneamerica-nodemon.herokuapp.com"})
        }
        window.addEventListener('resize', this.handleWindowSizeChange);
    }

    componentWillUnmount(){
        this.setState({width:window.innerWidth});
    }

    toggleFilter(){
        this.setState({
            filterPopup: !this.state.filterPopup
        })
    }

    async deleteSelected(){

        for(var element in this.state.selected){
            var url = this.state.host + '/customers/customers'
            await axios.delete(url,{
                data: {
                    email: this.state.selected[element].Email
                }
            })
        }
        this.clearSelected();
    }

    clearSelected(){
        this.setState({
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
            selected:[]
        })
        this.filterFunction();
    }

    timestampFilter(time){
        var newTimestampFilter = this.state.timestampFilter
        switch(time){
            case "day":
                newTimestampFilter["day"] = !this.state.timestampFilter.day
                break;
            case "week":
                newTimestampFilter["week"] = !this.state.timestampFilter.week
                break;
            case "month":
                newTimestampFilter["month"] = !this.state.timestampFilter.month
                break;
            case "year":
                newTimestampFilter["year"] = !this.state.timestampFilter.year
                break;
            default:
                break;
        }

        this.setState({timestampFilter: newTimestampFilter})
        this.filterFunction();
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
        this.filterFunction();
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
        this.filterFunction();
    }

    compare(list){
        var tempList = {}
        var customers = this.state.customers
        if(list.length > 0 ){
            for(var customer in customers){
                for(var index in list){
                    if(customers[customer].Email === list[index].Email){
                        tempList[list[index].Email] = list[index]
                    }
                }
            }   
        }
        var arr = []
        for(var i in tempList){
            arr.push(tempList[i])
        }
        this.setState({customers: arr})
    }

    async filterFunction(){
        await this.pullCustomers();

        var locationList = []
        var locationPromises = []
        for(var region in this.state.locationFilter){
            if(this.state.locationFilter[region]){
                var url = this.state.host + '/filters/location'
                const promise = axios.get(url,{
                    params:{
                        region:region
                    }
                })
                .then(response => {
                    response.data.data.forEach(function(customer){
                        locationList.push(customer)
                    })
                })
                
                locationPromises.push(promise)
            }
        }

        if(locationPromises.length > 0){
            Promise.all(locationPromises).then(response => {
                this.compare(locationList)
            })
        }

        var insuranceList = []
        const tierValues = {
            tier1:[20000,40000],
            tier2:[40001,60000],
            tier3:[60001,80000],
            tier4:[80001,90000],
            tier5:[90001,1000000]
        }

        var insurancePromises = []
        for(var tier in this.state.insuranceNeedsFilter){
            if(this.state.insuranceNeedsFilter[tier]){
                var urlInsurance = this.state.host + '/filters/einsurance'
                const promise = axios.get(urlInsurance,{
                    params:{
                        lower:tierValues[tier][0],
                        upper:tierValues[tier][1]
                    }
                })
                .then(response => {
                    response.data.data.forEach(function(element){
                        insuranceList.push(element)
                    })
                })
                insurancePromises.push(promise)
            }
        }
        if(insurancePromises.length > 0){
            Promise.all(insurancePromises).then(response => {
                this.compare(insuranceList);
            })
        }


        // TODO Needs Refactored
        var timeList = []
        var tempDate = new Date();
        var today = tempDate.toISOString();
        tempDate.setDate(tempDate.getDate() - 1)

        var dayAgo = tempDate.toISOString();
        tempDate = new Date();
        tempDate.setDate(tempDate.getDate() - 7)

        var weekAgo = tempDate.toISOString();
        tempDate = new Date();
        tempDate.setMonth(tempDate.getMonth() - 1)

        var monthAgo = tempDate.toISOString();
        tempDate = new Date();
        tempDate.setFullYear(tempDate.getFullYear() - 1)
        var yearAgo = tempDate.toISOString();
        const timeTierValues = {
            day:[dayAgo,today],
            week:[weekAgo,today],
            month:[monthAgo,today],
            year:[yearAgo,today]
        }

        var timePromises = []
        for(var timeTier in this.state.timestampFilter){
            if(this.state.timestampFilter[timeTier]){
                console.log(timeTierValues[timeTier])
                var urlTimestamp = this.state.host + '/filters/timestamp'
                const promise =  axios.get(urlTimestamp,{
                    params:{
                        lower: timeTierValues[timeTier][0],
                        upper: timeTierValues[timeTier][1]
                    }
                })
                .then(response => {
                    response.data.data.forEach(function(element){
                        timeList.push(element)
                    })
                })
                timePromises.push(promise)
            }
        }

        if(timePromises.length > 0){
            Promise.all(timePromises).then(response => {
                this.compare(timeList);
            })
        }
    }

    mobileFilter(filter){
        switch(filter){
            case "day":
            case "week":
            case "year":
            case "month":
                this.timestampFilter(filter);
                break;
            case "midwest":
            case "northeast":
            case "west":
            case "south":
                this.locationFilter(filter);
                break;
            case "tier1":
            case "tier2":
            case "tier3":
            case "tier4":
            case "tier5":
                this.insuranceNeedsFilter(filter);
                break;
            default:
                break;
        }
    }

    render() {
        const {customers} = this.state;
        const { width } = this.state;
        const isMobile = width <= 1023;
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
                            <img src={searchIcon} alt="Search-Icon"></img>
                        </button>
                </div>
            )
        }
        if(isMobile){
            return (
                <div>
                    {this.state.filterPopup && 
                        <Filter
                        locationFilter={this.state.locationFilter}
                        timestampFilter={this.state.timestampFilter}
                        insuranceNeedsFilter={this.state.insuranceNeedsFilter}
                        closePopup={this.toggleFilter.bind(this)}
                        clearSelected={this.clearSelected.bind(this)}
                        mobileFilter={this.mobileFilter.bind(this)} 
                    />
                    }
                    
                    <div id="dashboard-header">
                        <h1 id="dashboard-user-data">User Data</h1>
                        <div id="header-right">
                            <button id="filter-button" onClick={this.toggleFilter.bind(this)}>
                                <img id="filter-button" alt="filer_button" src={filterIcon}/>
                            </button>
                        </div>
                    </div>
                    <div id="search-area">
                        <hr id="line"></hr>
                        <p id="dashboard-time">{(this.state.date.getMonth()+1) + "/" + this.state.date.getDate() + "/" + this.state.date.getFullYear()}</p>
                        <div className="floatCenter">
                            <h3 id="textButton" onClick={() => this.deleteSelected()}>Delete Selected</h3>
                            <h3 id="textButton" onClick={() => this.clearSelected()}>Clear Selected</h3>
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
                        {
                            this.state.customers.length ? (
                            customers.map(this.renderCustomers)) : (<div>No Customers to show for the filter</div>)
                        }
                        </div>
                    </div>
                </div>
            )
        }else{
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
                                    <input id="checkbox" checked={this.state.locationFilter["northeast"]} onChange={(e) => this.locationFilter("northeast")} type="checkbox"/>
                                    <label id="label">Northeast</label>
                                </div>
                                <div className="row">
                                    <input id="checkbox" checked={this.state.locationFilter["midwest"]} onChange={(e) => this.locationFilter("midwest")} type="checkbox"/>
                                    <label id="label">Midwest</label>
                                </div>
                                <div className="row">
                                    <input id="checkbox" checked={this.state.locationFilter["west"]} onChange={(e) => this.locationFilter("west")} type="checkbox"/>
                                    <label id="label">West</label>
                                </div>
                                <div className="row">
                                    <input id="checkbox" checked={this.state.locationFilter["south"]} onChange={(e) => this.locationFilter("south")} type="checkbox"/>
                                    <label id="label">South</label>
                                </div>
                            </div>

                            <div className="column">
                                <h3>Insurance Needs</h3>
                                <div className="row">
                                    <input id="checkbox" checked={this.state.insuranceNeedsFilter["tier1"]} onChange={(e) => this.insuranceNeedsFilter("tier1")} type="checkbox"/>
                                    <label id="label">$20,000 - $40,000</label>
                                </div>
                                <div className="row">
                                    <input id="checkbox" checked={this.state.insuranceNeedsFilter["tier2"]} onChange={(e) => this.insuranceNeedsFilter("tier2")} type="checkbox"/>
                                    <label id="label">$40,000 - $60,000</label>
                                </div>
                                <div className="row">
                                    <input id="checkbox" checked={this.state.insuranceNeedsFilter["tier3"]} onChange={(e) => this.insuranceNeedsFilter("tier3")} type="checkbox"/>
                                    <label id="label">$60,000 - $80,000</label>
                                </div>
                                <div className="row">
                                    <input id="checkbox" checked={this.state.insuranceNeedsFilter["tier4"]} onChange={(e) => this.insuranceNeedsFilter("tier4")} type="checkbox"/>
                                    <label id="label">$80,000 - $90,000</label>
                                </div>
                                <div className="row">
                                    <input id="checkbox" checked={this.state.insuranceNeedsFilter["tier5"]} onChange={(e) => this.insuranceNeedsFilter("tier5")} type="checkbox"/>
                                    <label id="label">$90,000 - $100,000</label>
                                </div>
                            </div>

                            <div className="column">
                                <h3>Timestamp</h3>
                                <div className="row">
                                    <input id="checkbox" checked={this.state.timestampFilter["day"]} onChange={(e) => this.timestampFilter("day")} type="checkbox"/>
                                    <label id="label">Last Day</label>
                                </div>
                                <div className="row">
                                    <input id="checkbox" checked={this.state.timestampFilter["week"]} onChange={(e) => this.timestampFilter("week")} type="checkbox"/>
                                    <label id="label">Last Week</label>
                                </div>
                                <div className="row">
                                    <input id="checkbox" checked={this.state.timestampFilter["month"]} onChange={(e) => this.timestampFilter("month")} type="checkbox"/>
                                    <label id="label">Last Month</label>
                                </div>
                                <div className="row">
                                    <input id="checkbox" checked={this.state.timestampFilter["year"]} onChange={(e) => this.timestampFilter("year")} type="checkbox"/>
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
                                    <p>Current Date: {(this.state.date.getMonth()+1) + "/" + this.state.date.getDate() + "/" + this.state.date.getFullYear()}</p>
                                </div>
                            </div>
                            <div id="table-wrapper">
                                <div id="table-scroll">
                                    {
                                        this.state.customers.length ? (
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th></th>
                                                    <th><span className="text">Name</span></th>
                                                    <th><span className="text">Email</span></th>
                                                    <th><span className="text">Phone</span></th>
                                                    <th><span className="text">Location</span></th>
                                                    <th><span className="text">EInsurance</span></th>
                                                    <th><span className="text">Time</span></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    customers.map(this.renderRows)
                                                }
                                            </tbody>
                                        </table>) : (<div>No potential customers match the current filter</div>)
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
    }

    
}

export default withRouter(Dashboard)