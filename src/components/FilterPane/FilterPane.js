import React from "react";
import {connect} from "react-redux";
import DatePicker from "react-datepicker";

import Button from "../UI/Button/Button";
import Modal from "../UI/Modal/Modal";
import Spinner from "../UI/Spinner/Spinner";
import * as actions from "../../store/actions";

import "react-datepicker/dist/react-datepicker.css";
import "./FilterPane.css";

class FilterPane extends React.Component {
  state = {
    startDate: new Date(),
    filtering: false,
    startDate: "",
    endDate: ""
  };

  dateFromChangeHandler = date => {
    this.setState({
      startDate: date
    });
  };

  dateToChangeHandler = date => {
    this.setState({
      endDate: date
    });
  };

  filterClosedHandler = () => {
    this.setState({ filtering: false });
  };

  filterAddHandler = event => {
    event.preventDefault();
    const filters = [];
    filters['from'] = (this.state.startDate+"");
    filters['to'] = (this.state.endDate+"");
    this.props.onFiltered(filters);
  }

  showFilterModal = () => {
    this.setState({ filtering: true });
  };

  render() {
    return (
      <div className="FilterPane">
        <div className="FilterPane-Cont">
          <span className="Label">FILTER </span>
          <Button btnType="Classic-o" clicked={this.showFilterModal}>
            Show Filters
          </Button>
        </div>
        <Modal
          show={this.state.filtering || this.state.loading}
          modalClosed={this.filterClosedHandler}
        >
          <form className="FP-Modal" onSubmit={this.filterAddHandler}>
          {this.props.loading ? (
              <span className="Form-Submitting">
                <Spinner />
              </span>
            ) : (
              <span />
            )}
            <h4 className="FP-Header">Filter </h4>
            <div className="FilterItems">
              <div className="FilterItem">
                <span> From</span>
                <DatePicker
                  selected={this.state.startDate}
                  dateFormat="Y-m-d"
                  onChange={(date) => this.dateFromChangeHandler(date)}
                />
              </div>
              <div className="FilterItem">
                <span> To</span>
                <DatePicker
                  selected={this.state.endDate}
                  dateFormat="Y-m-d"
                  onChange={(date) => this.dateToChangeHandler(date)}
                />
              </div>
            </div>
            <div className="FilterItems">
              <div className="FilterItem">
                {/*<span> User</span>
                <select>
                  <option>All</option>
                  <option>User 1</option>
                  <option>User 1</option>
                </select>*/}
              </div>
            </div>
            <div className="FP-Footer">
              <Button btnType="Classic-o" clicked={this.filterClosedHandler}>
                Cancel
              </Button>
              <Button btnType="Classic" clicked={this.applied}>
                Apply
              </Button>
            </div>
          </form>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return{
    loading: state.filter.loading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFiltered: (filter) => dispatch(actions.filter(filter))
  }
}
//
export default connect(mapStateToProps, mapDispatchToProps)(FilterPane);
