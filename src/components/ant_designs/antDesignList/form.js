/**
 * Created by liusonglin on 2018/7/13.
 */
import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import {Comment,Avatar, BackTop, Button, Card,  Tooltip} from "antd";

let textLine=[{name:"formNormalHorizontal",dis:"水平登录栏:水平登录栏，常用在顶部导航栏中。",date:"2018/12/16 12:43"},
    {name:"formNormalHorizontalTwo",dis:"水平登录栏:水平登录栏，常用在顶部导航栏中",date:"2018/12/16 16:55"},
    {name:"formNormalLogin",dis:"登录框:普通的登录框，可以容纳更多的元素。",date:"2018/12/18 10:44"},
    {name:"formNormalRergister",dis:"注册新用户:用户填写必须的信息以注册新用户。",date:"2018/12/18 11:51"},
    {name:"formAdvanceSearch",dis:"高级搜索:三列栅格式的表单排列方式，常用于数据表格的高级搜索。" +
        "有部分定制的样式代码，由于输入标签长度不确定，需要根据具体情况自行调整。",date:"2018/12/18 21:18"},
    {name:"formModalLogin",dis:"弹出层中的新建表单:当用户访问一个展示了某个列表的页面，想新建一项但又不想跳转页面时，" +
        "可以用 Modal 弹出一个表单，用户填写必要信息后创建新的项。",date:"2018/12/19 12:25"},
    {name:"formAddRow",dis:"动态增减表单项动态增加、减少表单项。",date:"2018/12/19 13:10"},
    {name:"formTimeSubmit",dis:"时间类控件:时间类组件的 value 类型为 moment 对象，所以在提交服务器前需要预处理。"
        ,date:"2018/12/19 13:30"},
    {name:"formMyDefine",dis:"自定义表单控件自定义或第三方的表单控件，也可以与 Form 组件一起使用。只要该组件遵循以下的约定：" +
        "1.提供受控属性 value 或其它与 valuePropName 的值同名的属性.2.提供 onChange 事件或 trigger 的值同名的事件。" +
        "3.不能是函数式组件。",date:"2018/12/19 15:33"},
    {name:"formPropDataDrive",dis:<div>表单数据存储于上层组件:  +
        通过使用<b> onFieldsChange</b> 与 <b>mapPropsToFields</b>，可以把表单的数据存储到上层组件或者 Redux、dva 中，更多可参考 rc-form 示例。
        注意：mapPropsToFields 里面返回的表单域数据必须使用 Form.createFormField 包装。</div>,date:"2018/12/19 16:09"},
    {name:"formMyValidate",dis:<div>自行处理表单数据:
            使用 <b>Form.create</b> 处理后的表单具有自动收集数据并校验的功能，但如果您不需要这个功能，或者默认的行为无法满足业务需求，可以选择不使用 Form.create 并自行处理数据。</div>,date:"2018/12/19 17:01"},
    {name:"formMyDefinedValidate",dis:"自定义校验:我们提供了 validateStatus help hasFeedback 等属性，你可以不需要使用 Form.create 和 getFieldDecorator，自己定义校验的时机和内容。"
        +"1.validateStatus: 校验状态，可选 'success', 'warning', 'error', 'validating'。"
        +"2.hasFeedback：用于给输入框添加反馈图标。"
        +"3.help：设置校验文案。",date:"2018/12/19 18:51"},
    {name:"formGetFieldValue",dis:"表单联动:使用 setFieldsValue 来动态设置其他控件的值。",date:"2018/12/19 20:13"},
    {name:"formActiveValidate",dis:"动态校验规则:根据不同情况执行不同的校验规则。",date:"2018/12/19 20:26"},
    {name:"tableFixed",dis:"固定头和列:适合同时展示有大量数据和数据列。若列头与内容不对齐或出现列重复，请指定列的宽度 width。" +
        "建议指定 scroll.x 为大于表格宽度的固定值或百分比。注意，且非固定列宽度之和不要超过 scroll.x。"},
    {name:"tableMoreChirdren",dis:"表头分组:columns[n] 可以内嵌 children，以渲染分组表头。"},
    {name:"EditableTable",dis:"可编辑单元格:带单元格编辑功能的表格。"},
    {name:"tableEditAble",dis:"可编辑行:带行编辑功能的表格。"},
    {name:"tableRowChild",dis:"嵌套子表格:展示每行数据更详细的信息。"},
    {name:"tableProperty",dis:"动态控制表格属性:选择不同配置组合查看效果。"},
    ];

export default class form extends Component {
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
            <Card   title={<b>Form用法大全</b>}  extra={buttons()} style={{display:"inline"}}>{
                        textLine.map((item) => <Link to={'/' + item.name}>{
                            <Comment
                                author={<b style={{fontSize:"15px"}}>{item.name}</b>}
                                avatar={(
                                    <Avatar
                                        src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                                        alt="Han Solo"
                                    />
                                )}
                                content={(
                                    <p>{item.dis}</p>
                                )}
                                datetime={(
                                    <Tooltip title={item.date}>
                                        <span style={{fontSize:"15px"}}>{"编辑:王企鹅  "+item.date}</span>
                                    </Tooltip>
                                )}
                            />
                        }
                        </Link>)
                    }
                    </Card>
            </div>



        );
    }
}