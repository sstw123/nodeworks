import React, { Component } from 'react';
import BucketItem from "./BucketItem"
import BucketContext from "../provider/BucketProvider"

class BucketList extends Component {

    static contextType = BucketContext

    render() {

        const {bucketList} = this.context

        // 코드가 하나만 있고 리턴시킬 경우
        // 화살표 함수와 결합하여 메소드(소괄호)로 바로 리턴 가능
        const list = bucketList.map(
            (bucket) => (
                <BucketItem key={bucket.b_id} bucketItem={bucket}/>
            )
        )

        // 위의 원래 코드 : 중괄호 + return 사용
        // const list1 = bucketList.map(
        //     (bucket) => {
        //         return <BucketItem key={bucket.b_id} bucketItem={bucket} bucket_update={this.props.bucket_update} changeFlag={this.props.changeFlag}/>
        //     }
        // )

        // // 위의 진짜 원래 코드 : 중괄호 + return + 소괄호 사용
        // const list = bucketList.map(
        //     (bucket) => {
        //         return (
        //             <BucketItem key={bucket.b_id} bucketItem={bucket} bucket_update={this.props.bucket_update} changeFlag={this.props.changeFlag}/>
        //         )
        //     }
        // )

        // // 가장 간결한 코드
        // const list3 = bucketList.map(
        //     bucket => <BucketItem key={bucket.b_id} bucketItem={bucket} bucket_update={this.props.bucket_update} changeFlag={this.props.changeFlag}/>
        // )

        return (
            <section className="w3-container-fluid">
                <table className="w3-table-all">
                    <thead>
                        <tr>
                            <th>FLAG</th>
                            <th>BUCKET</th>
                            <th>추가일자</th>
                            <th>완료</th>
                            <th>취소</th>
                        </tr>
                    </thead>
                    <tbody>
                        {list}
                    </tbody>
                </table>
            </section>
        );
    }
}

export default BucketList;