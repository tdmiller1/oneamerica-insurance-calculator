import React, {Component} from 'react'
class Filter extends Component {

    render() {
        return(
            <div id="filter-wrapper">
                <div id="margin">
                    FILTERS
                    <button onClick={this.props.closePopup}>X</button>
                    <div className="banner">Location</div>
                    <div>
                        <p>Area One, State One</p>
                        <p>Area One, State One</p>
                        <p>Area One, State One</p>
                        <p>Area One, State One</p>
                    </div>
                    <div className="banner">Timestamp</div>
                    <div>
                        <p>Last Day</p>
                        <p>Last Day</p>
                        <p>Last Day</p>
                        <p>Last Day</p>
                    </div>
                    <div className="banner">Insurance Needs</div>
                    <div>
                        <p>$20,000-$40,000</p>
                        <p>$20,000-$40,000</p>
                        <p>$20,000-$40,000</p>
                        <p>$20,000-$40,000</p>
                    </div>
                    <button>Clear All Filters</button>
                </div>
            </div>
        )
    }
}

export default Filter;