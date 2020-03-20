import React, { Component } from 'react';
import PhoneInsert from "./PhoneInsert"
import PhoneList from "./PhoneList"
// import PropTypes from 'prop-types';

class PhoneMain extends Component {
    id = 5;

    // state : source of truth
    state = {
        phoneList : [
            {id:0, name:"이름1", phone:"010-1111-1111"},
            {id:1, name:"이름2", phone:"010-2222-2222"},
            {id:2, name:"이름3", phone:"010-3333-3333"},
            {id:3, name:"이름4", phone:"010-4444-4444"},
            {id:4, name:"이름5", phone:"010-5555-5555"}
        ],
        my_value : ""
    }

    // constructor(props) {
    //     super(props);

    // }

    // componentWillMount() {

    // }

    // componentDidMount() {

    // }

    // componentWillReceiveProps(nextProps) {

    // }

    // shouldComponentUpdate(nextProps, nextState) {

    // }

    // componentWillUpdate(nextProps, nextState) {

    // }

    // componentDidUpdate(prevProps, prevState) {

    // }

    // componentWillUnmount() {

    // }

    my_value_change = (text) => {
        this.setState({my_value : text})
    }

    render() {
        return (
            <React.Fragment>
                <header>
                    <h2>My Phone Book</h2>
                </header>
                <section>
                    <PhoneInsert my_value={this.state.my_value} my_value_change={this.my_value_change}/>
                    <PhoneList phoneList={this.state.phoneList} my_value={this.state.my_value} name="홍길동" tel="123" addr="서울특별시"/>
                </section>
            </React.Fragment>
        );
    }
}

// PhoneMain.propTypes = {

// };

export default PhoneMain;