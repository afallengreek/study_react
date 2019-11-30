/**
 * Created by liusonglin on 2018/7/13.
 */
import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import { Avatar, BackTop, Button, Card} from "antd";

const { Meta } = Card;
let textLine=[{name:"normalTable",dis:"基本用法:简单的表格，最后一列是各种操作。"},
    {name:"ColumnGroupTest",dis:"使用 JSX 风格的 API（2.5.0 以后引入）:这个只是一个描述 columns 的语法糖，所以你不能用其他组件去包裹 Column 和 ColumnGroup"},
    {name:"tableDisabled",dis:"可选择:第一列是联动的选择框。默认点击 checkbox 触发选择行为，需要点击行触发可以参考例子：https://codesandbox.io/s/000vqw38rl"},
    {name:"tableSelectReload",dis:"选择和操作:选择后进行操作，完成后清空选择，通过 rowSelection.selectedRowKeys 来控制选中项。"},
    {name:"tableFilter",dis:"自定义选择项:通过 rowSelection.selections 自定义选择项，默认不显示下拉选项，设为 true 时显示默认选择项。"},
    {name:"tableSort",dis:"筛选和排序:对某一列数据进行筛选，使用列的 filters 属性来指定需要筛选菜单的列，onFilter 用于筛选当前数据，filterMultiple 用于指定多选和单选。" +
        "对某一列数据进行排序，通过指定列的 sorter 函数即可启动排序按钮。sorter: function(rowA, rowB) { ... }， rowA、rowB 为比较的两个行数据。" +
        "使用 defaultSortOrder 属性，设置列的默认排序顺序。"},
    {name:"tableControlSortAndFilter",dis:"可控的筛选和排序:使用受控属性对筛选和排序状态进行控制。1.columns 中定义了 filteredValue 和 sortOrder 属性即视为受控模式。" +
        "2.只支持同时对一列进行排序，请保证只有一列的 sortOrder 属性是生效的。3.务必指定 column.key。"},
    {name:"tableColumnFilter",dis:"自定义筛选菜单:通过 filterDropdown 自定义的列筛选功能，并实现一个搜索列的示例。"},
    {name:"tableHeaderAndFooter",dis:"带边框:添加表格边框线，页头和页脚。"},
    {name:"tableMoreIntent",dis:"可展开:当表格内容较多不能一次性完全展示时。"},
    {name:"tableRowSpan",dis:"表格行/列合并表头只支持列合并，使用 column 里的 colSpan 进行设置。表格支持行/列合并，使用 render 里的单元格属性 colSpan 或者 rowSpan 设值为 0 时，设置的表格不会渲染。"},
    {name:"tableChild",dis:"树形数据展示:表格支持树形数据的展示，当数据中有 children 字段时会自动展示为树形表格，如果不需要或配置为其他字段可以用 childrenColumnName 进行配置。\n" +
        "可以通过设置 indentSize 以控制每一层的缩进宽度。注：暂不支持父子数据递归关联选择。"},
    {name:"tableBigData",dis:"固定表头:方便一页内展示大量数据。" +
        "需要指定 column 的 width 属性，否则列头和内容可能不对齐。"},
    {name:"tableFixTwo",dis:"固定列:对于列数很多的数据，可以固定前后的列，横向滚动查看其它数据，需要和 scroll.x 配合使用。" +
        "若列头与内容不对齐或出现列重复，请指定列的宽度 width。建议指定 scroll.x 为大于表格宽度的固定值或百分比。注意，且非固定列宽度之和不要超过 scroll.x。"},
    {name:"tableFixed",dis:"固定头和列:适合同时展示有大量数据和数据列。若列头与内容不对齐或出现列重复，请指定列的宽度 width。" +
        "建议指定 scroll.x 为大于表格宽度的固定值或百分比。注意，且非固定列宽度之和不要超过 scroll.x。"},
    {name:"tableMoreChirdren",dis:"表头分组:columns[n] 可以内嵌 children，以渲染分组表头。"},
    {name:"EditableTable",dis:"可编辑单元格:带单元格编辑功能的表格。"},
    {name:"tableEditAble",dis:"可编辑行:带行编辑功能的表格。"},
    {name:"tableRowChild",dis:"嵌套子表格:展示每行数据更详细的信息。"},
    {name:"tableProperty",dis:"动态控制表格属性:选择不同配置组合查看效果。"},
    ];

export default class table extends Component {
    handleRollback=()=>{
        this.props.history.goBack();
    }
    render() {
        const buttons = () => {
            return [
                <Button key="rollBack" type={"primary"} style={{marginLeft: 5}} onClick={this.handleRollback}>返回</Button>,
                <Button key="rollBack" style={{marginLeft: 5}} onClick={this.handleRollback}>返回</Button>,
            ];
        };
        return (
            <div>
                <BackTop />
            <Card   title={<b>Table用法大全</b>}  extra={buttons()} style={{display:"inline"}}>{
                        textLine.map((item) => <Link to={'/' + item.name} key={item.name}>
                            <Card
                                style={{width: "100%"}}
                            >
                                <Meta
                                    avatar={<Avatar
                                        src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>}
                                    title={item.name}
                                    description={item.dis}
                                />
                            </Card>
                        </Link>)
                    }
                    </Card>
            </div>



        );
    }
}