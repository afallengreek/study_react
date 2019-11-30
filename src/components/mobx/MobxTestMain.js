import React from "react";
import MobxHoc from "./MobxHoc";
import {observer} from "mobx-react";
import {trace} from "mobx";
import {autorun} from "mobx/lib/mobx";
const MobxTestMain = observer(({ store }) => {
    /* 观察状态改变的函数 */
    autorun(function() {
        console.log("%s of %s items compute %s",
            store.name,
            store.age,
            store.completedCount
        );
    });
    // debugger
    trace(store.traceEnabled);
    return (
        <div>
            <h2>Name: {store.name}</h2>
            <input
                value={store.name}
                onChange={event => (store.name = event.target.value)}
            />
            <h2>Age: {store.age}</h2>
            <input
                type="number"
                value={store.age}
                onChange={event => (store.age = event.target.value)}
            />
            <br />
            <h2>Age: {store.completedCount}</h2>
            <hr />
            <button onClick={() => (store.traceEnabled = !store.traceEnabled)}>
                Toggle breakpoint: {store.traceEnabled.toString()}
            </button>
        </div>
    );
});
export default MobxHoc(MobxTestMain)