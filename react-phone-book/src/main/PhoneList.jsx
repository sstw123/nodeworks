import React, { Component } from 'react';

class PhoneList extends Component {
    render() {
        // props에서 phoneList만 가져오기
        const {phoneList, name, tel, addr, my_value} = this.props
        return (
            <div>
               <p>전화번호 리스트</p>
               <p>list의 my_value : {my_value}</p>
            </div>
        );
    }
}

export default PhoneList;