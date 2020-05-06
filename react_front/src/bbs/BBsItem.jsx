import React, { Component } from 'react';
import PropTypes from 'prop-types';
/*
rcfc : class type 컴포넌트
LifeCycle method를 포함한다
LifeCycle method는 외부 서버 등과 연동할 때 데이터를 불러오거나 데이터를 저장하는 용도의 method 구현이 필요할 때 사용한다
*/
class BBsItem extends Component {
    constructor(props) {
        super(props);
    }

    /*
        전달받은 BBsList로부터 리스트 한 줄을 기준으로 rendering 수행
        bbsVO에는 리스트 1줄(튜플)이 들어있고 key에는 id값이 들어있다
    */
    render() {
        const {bbsVO, key} = this.props

        return (
            <tr key={key}>
                <td>{bbsVO.bbsDate}</td>
                <td>{bbsVO.bbsAuth}</td>
                <td>{bbsVO.bbsTitle}</td>
            </tr>
        )
    }
}

/*
propTypes : react로 데이터를 표현할 때 부모 컴포넌트로부터 수신되는 데이터 타입을 지정할 때 사용한다
일반적으로 타입을 지정하지 않아도 부모로부터 데이터를 받아서 rendering 하는데 큰 문제는 없는데
많은 종류의 데이터를 수신하고 표현할 때 type을 미리 지정하면 경고, 오류 등을 통해 잘못 수신된 데이터가 없도록 알려주는 기능을 만들 수 있다
*/
BBsItem.propTypes = {

};

export default BBsItem;