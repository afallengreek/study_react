import React from "react";
import _ from "lodash";
class test3 extends React.Component{

    render=()=>{
        let result=_.differenceBy([{ 'x': 2 ,y:9,z:8}, { 'x': 1,"y":45,z:543 }], [{ 'x': 2 }], 'x');
        // console.log("result",result);
        let  objects = [{ 'name': "王林", 'code': "1001" }, { 'name': "王企鹅", 'code': "10044" }];
        result=_.differenceWith(objects,[{ 'name': "王林", 'code':  "1001"}],_.isEqual);
        // console.log("打印我的值",result);
        result=_.drop([1,2,3,4,5,6],5);
        // console.log("我的值",result);
        result=_.dropRight([1,2,3,4,5,6],5);
        // console.log("我的搜索值",result);
        let  users = [
            { 'user': 'barney',  'active': true },
            { 'user': 'fred',    'active': false },
            { 'user': 'pebbles', 'active': false }
        ];
        // result= _.dropRightWhile(users, function(o) { return !o.active; });
        // console.log("我的搜索值",result);
        // result=_.dropRightWhile(users, { 'user': 'pebbles', 'active': false });
        // console.log("我的搜索值2",result);
        // result=_.dropRightWhile(users, ['active', false]);
        // console.log("我的搜索值3",result);
        // result=_.dropRightWhile(users, 'active');
        // console.log("我的搜索值4",result);
        result=_.zipObjectDeep(['a.b[0].c', 'a.b[1].c'],[1,2])
        // console.log("我的值",result);
         users = [
            { 'user': 'barney', 'age': 36, 'active': false },
            { 'user': 'fred',   'age': 40, 'active': false }
        ];
        // console.log("我的搜索值",_.every(users, {'active': false}));
        result=_.groupBy([{name:"王林",code:"1009",money:10}, {name:"王林",code:"1009",money:55},
            {name:"王林",code:"1009",money:55},{name:"苏明明",code:"1009",money:88}], 'name');
        // console.log("我的的数据哈",result);
        // console.log("王企鹅测试",_.now());
        let  flipped = _.flip(function() {
            return _.toArray(arguments);
        });

        // console.log(flipped('a', 'b', 'c', 'd'));
        let object = { 'a': 1, 'b': 2 };
        let other = { 'c': 3, 'd': 4 };

        let  values = _.memoize(_.values);
        console.log("我的测试值 ",object,other);
        values(object);
        return(
            <span>423</span>
        )
    }
}
export default test3;