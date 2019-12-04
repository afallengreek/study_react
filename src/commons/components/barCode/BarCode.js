/**
 * 条形码
 * create by wanghao ON 2019/3/14
 */
import React, { Component } from 'react';
import JsBarcode from 'jsbarcode';

class BarCode extends Component {
    componentDidMount() {
        this.createBarcode();
    }

    componentWillReceiveProps(nextProps) {
        if (this.props !== nextProps) {
            this.createBarcode();
        }
    }

    createBarcode = () => {
        const { barCode="No.0", showStr } = this.props;
        JsBarcode(this.barcode, barCode, {
            format: "CODE128",                   //选择要使用的条形码类型
            height: 40,                          // 条形码高度
            displayValue :true,                 //是否在下面显示具体文字
            text:showStr ? showStr : "No."+barCode,  //覆盖显示的文本
            font: "Sans-serif",                  //设置文本的字体"OCR-B","fantasy"
            textAlign:"left",                    //设置文本的水平对齐方式
            textPosition:"top",                  //设置文本的垂直位置
            textMargin:4,                        //设置条形码和文本之间的间距
            fontSize:15,                         //设置文本的大小
            background:"#F8F8F8",                //设置条形码的背景
            margin: 8,
        });
    };

    render() {
        return (
            <div className="barcode-box">
                <svg
                    ref={(ref) => {
                        this.barcode = ref;
                    }}
                />
            </div>
        );
    }
}

export default BarCode;
