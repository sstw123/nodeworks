import React, {createContext} from "react"

// observer(감시자) 역할
// Main 컴포넌트의 state를 관리하려면 Main 컴포넌트에서 <BucketContext.Provider value={this.state}></BucketContext.Provider> 로 묶어주기
// 상위(Main) 컴포넌트에서 하위(List, Item, View, Edit 등) 컴포넌트로 state 변수를 전달
// 하위 컴포넌트에서 Main 컴포넌트의 state 변수를 변경하여 여러 컴포넌트에 전달할 때 사용할 handler method를 배포하는 역할
const BucketProvider = createContext(
    {
        bucketList : [],
        changeFlag : (id) => {},
        bucket_add : (b_title) => {},
        bucket_update : (id, b_title) => {},
        bucket_complete : (id, bucket_end_date) => {},
        toggleCancel : (id) => {}
    }
)

export default BucketProvider