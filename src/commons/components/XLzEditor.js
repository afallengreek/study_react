import React from "react";
import 'braft-editor/dist/index.css'
import BraftEditor from 'braft-editor'


const controls=[
    'undo', 'redo','text-color', 'bold', 'italic', 'separator',
    'text-indent', 'text-align', 'clear'
]
class XLzEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editState: BraftEditor.createEditorState(null),
            textValue: null,
            initialed: false
        }
    }

    componentWillMount() {
        if (this.props.value) {
            this.setState({
                    editState: BraftEditor.createEditorState(this.props.value),
                    initialed: true
                }
            )
        }
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.value !== this.props.value && nextProps.value !== this.state.textValue) {
            this.setState({
                    editState: BraftEditor.createEditorState(nextProps.value),
                    initialed: true
                }
            )
        }
    }

    onChange = (editorState) => {
        this.setState({
            editState: editorState,
            textValue: editorState.toHTML(),
        },()=>{
                if (!editorState.isEmpty()) {
                    this.props.onChange(editorState.toHTML());
                } else if (this.state.initialed) {
                    this.props.onChange(null);
                }
            }
        )
    }

    render() {
        return (
            <div style={{border: '1px solid'}}>
                <BraftEditor
                    controls={controls}
                    contentStyle={{height:this.props.height?this.props.height:100,...this.props.style}}
                    onChange={this.onChange}
                    value={this.state.editState}
                />
            </div>
        );
    }
}

export default XLzEditor;
