import React from "react";
import {Badge,  Button} from "antd";
import './print.css';
import {digitUppercase, getBusinessData, getHistoryData} from "./getJsonData";

class PromiseTest1 extends React.Component{
    constructor(props) {
        super(props);
    }
    getTaxTotalMoney=(businessPaymentData)=>{
        let taxRateItems = businessPaymentData.taxRateItems;
        if(!taxRateItems||taxRateItems.length ===0){
            return 0;
        }else {
            let totalMoney = 0;
            for(let item of taxRateItems){
                totalMoney += item.taxAmount;
            }
            return totalMoney;
        }
    };
    print=()=> {
        window.print();
    }
    render=()=>{
        const businessHeadData = getBusinessData().paymentRequestHead;
        const businessPaymentData = getBusinessData().foreignCurrencyPaymentItems[0];
        const historyData = getHistoryData();
        const taxTatolMoney = this.getTaxTotalMoney(businessPaymentData);
        const flowHistoryList = historyData[0].flowHistoryList;
        return(
               <section className="code-box-demo-pm" >
                   <div  className="button-style"> <Button type="primary" onClick={this.print} style={{textAlign:"right"}} className="no-print">打印</Button></div>

                   <div>
                        <div className="ant-descriptions-view">
                           <table className="table-view">
                               <tbody className="tbody-view">
                                  <tr>
                                       <th colSpan={6} style={{padding:"8px 12px",fontSize:"16px",fontStyle:"bold"}}>
                                           海外付款申请单
                                       </th>
                                  </tr>
                                  <tr>
                                      <th >
                                      申请说明
                                      </th>
                                      <td colSpan={3}>
                                          {businessHeadData.requestNote||""}
                                      </td>
                                      <th >
                                          共享单据号
                                      </th>
                                      <td>
                                          {businessHeadData.shareOrderId||""}
                                      </td>
                                  </tr>
                                  <tr>
                                      <th >
                                          收款人编码
                                      </th>
                                      <td >
                                          {businessPaymentData.paymentRequestFundItem.receiverCode}
                                      </td>
                                      <th >
                                          收款人名称
                                      </th>
                                      <td colSpan={3}>
                                          {businessPaymentData.paymentRequestFundItem.receiverName}
                                      </td>
                                  </tr>
                                  <tr>
                                      <th >
                                          发票张数
                                      </th>
                                      <td >
                                          {businessHeadData.invoiceAmount}
                                      </td>
                                      <th >
                                          汇款用途
                                      </th>
                                      <td >
                                          {businessPaymentData.remittancePurposeName}
                                      </td>
                                      <th >
                                          汇款费承担方
                                      </th>
                                      <td >
                                          {businessPaymentData.remittanceUndertaker}
                                      </td>
                                  </tr>
                                  <tr>
                                      <th >
                                          收款人常驻国家
                                      </th>
                                      <td >
                                          {businessPaymentData.paymentRequestFundItem.receiverLivingCountry}
                                      </td>
                                      <th >
                                          IBAN（欧盟必填）
                                      </th>
                                      <td >
                                          {businessPaymentData.paymentRequestFundItem.ibanCode}
                                      </td>
                                      <th >
                                          Swift No
                                      </th>
                                      <td >
                                          {businessPaymentData.paymentRequestFundItem.swiftNo}
                                      </td>
                                  </tr>
                                  <tr>
                                      <th >
                                          付款方式
                                      </th>
                                      <td >
                                          {businessPaymentData.paymentRequestFundItem.paymentMethod}
                                      </td>
                                      <th >
                                          汇款性质
                                      </th>
                                      <td >
                                          {businessPaymentData.paymentRequestFundItem.natureOfRemittance}
                                      </td>
                                      <th>
                                          进口日期
                                      </th>
                                      <td >
                                          {businessPaymentData.importDate&&businessPaymentData.importDate.substring(0,11)}
                                      </td>
                                  </tr>
                                  <tr>
                                      <th>
                                          合同/协议号
                                      </th>
                                      <td >
                                          {businessPaymentData.contractCode}
                                      </td>
                                      <th>
                                          合同金额
                                      </th>
                                      <td >
                                          {businessPaymentData.contractMoney&&(businessPaymentData.contractMoney+"    "+businessHeadData.currencyCode)}
                                      </td>
                                      <th>
                                          已付金额
                                      </th>
                                      <td >
                                          {(businessPaymentData.totalPaiedAmount||businessPaymentData.totalPaiedAmount===0)&&(businessPaymentData.totalPaiedAmount+"    "+businessHeadData.currencyCode)}
                                      </td>
                                  </tr>
                                  <tr>
                                      <th>
                                          扣税金额
                                      </th>
                                      <td >
                                          {taxTatolMoney+"    "+businessHeadData.currencyCode}
                                      </td>
                                      <th>
                                          实际付款金额
                                      </th>
                                      <td >
                                          {businessPaymentData.totalAmountPaied&&(businessPaymentData.totalAmountPaied+"    "+businessHeadData.currencyCode)}
                                      </td>
                                      <th>
                                          账面金额
                                      </th>
                                      <td >
                                          {businessPaymentData.bookBalance&&(businessPaymentData.bookBalance+"    "+businessHeadData.currencyCode)}
                                      </td>
                                  </tr>
                                  <tr>
                                      <th >
                                          收款人账号
                                      </th>
                                      <td colSpan={2}>
                                          {businessPaymentData.paymentRequestFundItem.bankLinkNumber}
                                      </td>
                                      <th>
                                          款项支付单位
                                      </th>
                                      <td colSpan={2}>
                                          {businessPaymentData.profitCenterCode&&(businessPaymentData.profitCenterCode+"    "+businessPaymentData.profitCenterName)}
                                      </td>
                                  </tr>
                                  <tr>
                                      <th >
                                          收款人地址（英）
                                      </th>
                                      <td colSpan={2}>
                                          {businessPaymentData.paymentRequestFundItem.receiverAddress}
                                      </td>
                                      <th >
                                          开户行名称（英）
                                      </th>
                                      <td colSpan={2}>
                                          {businessPaymentData.paymentRequestFundItem.receivingBankName}
                                      </td>
                                  </tr>
                                  <tr>
                                      <th>
                                          开户行地址（英）
                                      </th>
                                      <td  colSpan={2}>
                                          {businessPaymentData.paymentRequestFundItem.receiverBankAddress}
                                      </td>
                                      <th>
                                          成本中心
                                      </th>
                                      <td colSpan={2}>
                                          {businessPaymentData.costCenterCode&&(businessPaymentData.costCenterCode+"    "+businessPaymentData.costCenterName)}
                                      </td>
                                  </tr>

                                  <tr>
                                      <th rowSpan={2}>
                                          付款金额
                                      </th>
                                      <th>
                                          大写
                                      </th>
                                      <td >
                                          {businessHeadData.currencyName}
                                      </td>
                                      <td colSpan={3}>
                                          {businessPaymentData.totalAmount&&digitUppercase(businessPaymentData.totalAmount)}
                                      </td>
                                  </tr>
                                  <tr>
                                      <th>
                                          小写
                                      </th>
                                      <td >
                                          {businessHeadData.currencyCode}
                                      </td>
                                      <td colSpan={3}>
                                          {businessPaymentData.totalAmount}
                                      </td>
                                  </tr>

                                  <tr>
                                      <th>
                                          合同履行情况
                                      </th>
                                      <td colSpan={5}>
                                          {businessPaymentData.paymentRequestFundItem.paymentNote}
                                      </td>
                                  </tr>
                                  <tr>
                                      <th>
                                          流程信息
                                      </th>
                                      <td colSpan={5}>
                                          {/*<Badge status="processing" text="Running" />*/}
                                          {/*{businessPaymentData.paymentRequestFundItem.paymentNote}*/}
                                          {flowHistoryList.map((item,index)=>{
                                          return <div style={{width:"50%",float:"left",padding:"2px 30px"}}>
                                              <Badge status="success" text={<span><span>处理任务：{item.flowTaskName} </span>
                                              <span style={{marginLeft:"25px"}}>处理人：{item.executorName}</span></span>} />
                                          </div>
                                      })}
                                      </td>
                                  </tr>
                               </tbody>
                           </table>
                        </div>
                   </div>
               </section>
        )
    }
}
export default PromiseTest1;