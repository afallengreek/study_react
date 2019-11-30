/**
 * Created by liusonglin on 2018/7/12.
 */
import React, {Component} from 'react';
import {Switch, Route, BrowserRouter as Router} from 'react-router-dom'
import modalFoot from "../components/ant_designs/studyReact/Modal/modalFoot";
import modalConfirm from "../components/ant_designs/studyReact/Modal/modalConfirm";
import drawerForm from "../components/ant_designs/studyReact/Drawer/drawerForm";
import normalTable from "../components/ant_designs/studyReact/Table/normalTable";
import ColumnGroup from "../components/ant_designs/studyReact/Table/columnGroup";
import tableDisabled from "../components/ant_designs/studyReact/Table/tableDisabled";
import tableSelectReload from "../components/ant_designs/studyReact/Table/tableSelectReload";
import tableFilter from "../components/ant_designs/studyReact/Table/tableFilter";
import tableSort from "../components/ant_designs/studyReact/Table/tableSort";
import tableControlSortAndFilter from "../components/ant_designs/studyReact/Table/tableControlSortAndFilter";
import tableColumnFilter from "../components/ant_designs/studyReact/Table/tableColumnFilter";
import IndexView from "./IndexView";
import tableHeaderAndFooter from "../components/ant_designs/studyReact/Table/tableHeaderAndFooter";
import tableMoreIntent from "../components/ant_designs/studyReact/Table/tableMoreIntent";
import tableRowSpan from "../components/ant_designs/studyReact/Table/tableRowSpan";
import tableChild from "../components/ant_designs/studyReact/Table/tableChild";
import tableBigData from "../components/ant_designs/studyReact/Table/tableBigData";
import table from "../components/ant_designs/antDesignList/table";
import tableFix from "../components/ant_designs/studyReact/Table/tableFix";
import tableFixTwo from "../components/ant_designs/studyReact/Table/tableFixTwo";
import tableMoreChirdren from "../components/ant_designs/studyReact/Table/tableMoreChirdren";
import EditableTable from "../components/ant_designs/studyReact/Table/tableAddRow";
import tableEditAble from "../components/ant_designs/studyReact/Table/tableEditAble";
import tableRowChild from "../components/ant_designs/studyReact/Table/tableRowChild";
import tableProperty from "../components/ant_designs/studyReact/Table/tableProperty";
import form from "../components/ant_designs/antDesignList/form";
import formHorizontalNormalTable from "../components/ant_designs/studyReact/Form/formNormalHorizontal";
import formNormalHorizontalTwo from "../components/ant_designs/studyReact/Form/formNormalHorizontalTwo";
import formNormalLogin from "../components/ant_designs/studyReact/Form/formNormalLogin";
import formNormalRergister from "../components/ant_designs/studyReact/Form/formNormalRergister";
import formAdvanceSearch from "../components/ant_designs/studyReact/Form/formAdvanceSearch";
import formModalLogin from "../components/ant_designs/studyReact/Form/formModalLogin";
import formAddRow from "../components/ant_designs/studyReact/Form/formAddRow";
import formTimeSubmit from "../components/ant_designs/studyReact/Form/formTimeSubmit";
import formMyDefine from "../components/ant_designs/studyReact/Form/formMyDefine";
import formPropDataDrive from "../components/ant_designs/studyReact/Form/formPropDataDrive";
import formMyValidate from "../components/ant_designs/studyReact/Form/formMyValidate";
import formMyDefinedValidate from "../components/ant_designs/studyReact/Form/formMyDefinedValidate";
import formGetFieldValue from "../components/ant_designs/studyReact/Form/formGetFieldValue";
import formActiveValidate from "../components/ant_designs/studyReact/Form/formActiveValidate";
import formOthers from "../components/ant_designs/studyReact/Form/formOthers";
import menuSelects from "../components/ant_designs/antDesignList/menuSelects";
import normalBreadCrumb from "../components/ant_designs/studyReact/breadCrumb/normalBreadCrumb";
import PhotoBreadCrumb from "../components/ant_designs/studyReact/breadCrumb/photoBreadCrumb";
import myPhotoBreadCrumb from "../components/ant_designs/studyReact/breadCrumb/myPhotoBreadCrumb";
import simpleDropdown from "../components/ant_designs/studyReact/Dropdown/simpleDropdown";
import PageHeader from "../components/ant_designs/components/pageHeader";
import normalLayout from "../components/ant_designs/studyReact/Layout/normalLayout";
import navigationLayout from "../components/ant_designs/studyReact/Layout/navigationLayout";
import navigationWithSliderMenu from "../components/ant_designs/studyReact/Layout/navigationWithSliderMenu";
import navigationInnerSliderMenu from "../components/ant_designs/studyReact/Layout/navigationInnerSliderMenu";
import navigationSliderMenus from "../components/ant_designs/studyReact/Layout/navigationSliderMenus";
import navigationTopMenu from "../components/ant_designs/studyReact/Layout/navigationTopMenu";
import normalAffix from "../components/ant_designs/studyReact/Affix/normalAffix";
import horizontalMenu from "../components/ant_designs/studyReact/Layout/horizontalMenu";
import normalPagination from "../components/ant_designs/studyReact/Pagination/normalPagination";
import normalSteps from "../components/ant_designs/studyReact/Steps/normalSteps";
import progressSteps from "../components/ant_designs/studyReact/Steps/progressSteps";
import normalAutoComplete from "../components/ant_designs/studyReact/AutoComplete/normalAutoComplete";
import menus from "../components/ant_designs/antDesignList/menus";
import NormalCheckBox from "../components/ant_designs/studyReact/checkBox/NormalCheckBox";
import NormalCascader from "../components/ant_designs/studyReact/Cascader/NormalCascader";
import LoginMain from "../components/classMateRoom/Login/LoginMain";
import css_1 from "../components/studyDucoment/studyCss/css_1";
import CssMenu2 from "../components/studyDucoment/studyCss/CssMenu2";
import text1 from "../components/studyDucoment/studyCss/text1";
import JdHeader from "../components/jd/JdPage/JdHeader";
import JdFooter from "../components/jd/JdPage/JdFooter";
import JdContent from "../components/jd/JdPage/JdContent";
import JdStatic from "../components/jd/JdPage/JdStatic";
import apiTest1 from "../components/jsApi/apiTest1";
import apiTest2 from "../components/jsApi/apiTest2";
import apiTest3 from "../components/jsApi/apiTest3";
import apiTest4 from "../components/jsApi/apiTest4";
import apiTest5 from "../components/jsApi/apiTest5";
import apiTest6 from "../components/jsApi/apiTest6";
import apiTest7 from "../components/jsApi/apitest7";
import apiTest8 from "../components/jsApi/apiTest8";
import apiTest9 from "../components/jsApi/apiTest9";
import createUl from "../components/jsApi/createUl";
import moreEvent from "../components/jsApi/moreEvent";
import RotationChart1 from "../components/jsApi/RotationChart1";
import RotationChart2 from "../components/jsApi/RotationChart2";
import fixedTop from "../components/jsApi/fixedTop";
import flyCloud from "../components/jsApi/flyCloud";
import arrayTest from "../components/jsApi/arrayTest";
import accordion from "../components/jsApi/accordion";
import ShutdownAnimation from "../components/jsApi/ShutdownAnimation";
import whirligig from "../components/jsApi/whirligig";
import RandomSquare from "../components/advancedJs/RandomSquare";
import SnakeProject from "../components/advancedJs/SnakeProject";
import tests1 from "../components/workComponentTest/tests1";
import tests2 from "../components/workComponentTest/tests2";
import BookShopPage from "../components/htmlAndCssTest/BookShopPage";
import test3 from "../components/workComponentTest/test3";
import ListTest from "../components/algorithm/ListTest";
import BatchImport from "../components/workComponentTest/BatchImport";
import TodoApp from "../components/studyRedux/todo/TodoApp";
import MathStudy from "../components/es6Study/MathStudy";
import AdvanceFunctionTest1 from "../components/advanceFunctionStudy/AdvanceFunctionTest1";
import TestBreadcrumb from "../components/commonsAssemblyStudy/TestBreadcrumb";
import MobxTestMain from "../components/mobx/MobxTestMain";
import PromiseTest1 from "../components/promise/PromiseTest1";
import mobxProject from "../components/mobx-project/componets/App/index"



export default class Routers extends Component {
    render() {
        return (
            <Router basename="/srm-web">
                <Switch>
                    <Route path='/' exact component={IndexView}/>
                    <Route path='/drawerForm' component={drawerForm}/>
                    <Route path='/modalConfirm' component={modalConfirm}/>
                    <Route path='/modalFoot' component={modalFoot}/>
                    <Route path='/normalTable' component={normalTable}/>
                    <Route path='/ColumnGroupTest' component={ColumnGroup}/>
                    <Route path='/tableDisabled' component={tableDisabled}/>
                    <Route path='/tableSelectReload' component={tableSelectReload}/>
                    <Route path='/tableFilter' component={tableFilter}/>
                    <Route path='/tableSort' component={tableSort}/>
                    <Route path='/tableControlSortAndFilter' component={tableControlSortAndFilter}/>
                    <Route path='/tableColumnFilter' component={tableColumnFilter}/>
                    <Route path='/tableHeaderAndFooter' component={tableHeaderAndFooter}/>
                    <Route path='/tableMoreIntent' component={tableMoreIntent}/>
                    <Route path='/tableRowSpan' component={tableRowSpan}/>
                    <Route path='/tableChild' component={tableChild}/>
                    <Route path='/tableBigData' component={tableBigData}/>
                    <Route path='/table' component={table}/>
                    <Route path='/tableFix' component={tableFix}/>
                    <Route path='/tableFixTwo' component={tableFixTwo}/>
                    <Route path='/tableMoreChirdren' component={tableMoreChirdren}/>
                    <Route path='/EditableTable' component={EditableTable}/>
                    <Route path='/tableEditAble' component={tableEditAble}/>
                    <Route path='/tableRowChild' component={tableRowChild}/>
                    <Route path='/tableProperty' component={tableProperty}/>
                    <Route path='/form' component={form}/>
                    <Route path='/formNormalHorizontal' component={formHorizontalNormalTable}/>
                    <Route path='/formNormalHorizontalTwo' component={formNormalHorizontalTwo}/>
                    <Route path='/formNormalLogin' component={formNormalLogin}/>
                    <Route path='/formNormalRergister' component={formNormalRergister}/>
                    <Route path='/formAdvanceSearch' component={formAdvanceSearch}/>
                    <Route path='/formModalLogin' component={formModalLogin}/>
                    <Route path='/formAddRow' component={formAddRow}/>
                    <Route path='/formTimeSubmit' component={formTimeSubmit}/>
                    <Route path='/formMyDefine' component={formMyDefine}/>
                    <Route path='/formPropDataDrive' component={formPropDataDrive}/>
                    <Route path='/formMyValidate' component={formMyValidate}/>
                    <Route path='/formMyDefinedValidate' component={formMyDefinedValidate}/>
                    <Route path='/formGetFieldValue' component={formGetFieldValue}/>
                    <Route path='/formActiveValidate' component={formActiveValidate}/>
                    <Route path='/formOthers' component={formOthers}/>
                    <Route path='/menuSelects' component={menuSelects}/>
                    <Route path='/normalBreadCrumb' component={normalBreadCrumb}/>
                    <Route path='/photoBreadCrumb' component={PhotoBreadCrumb}/>
                    <Route path='/myPhotoBreadCrumb' component={myPhotoBreadCrumb}/>
                    <Route path='/simpleDropdown' component={simpleDropdown}/>
                    <Route path='/PageHeader' component={PageHeader}/>
                    <Route path='/normalLayout' component={normalLayout}/>
                    <Route path='/navigationLayout' component={navigationLayout}/>
                    <Route path='/navigationWithSliderMenu' component={navigationWithSliderMenu}/>
                    <Route path='/navigationInnerSliderMenu' component={navigationInnerSliderMenu}/>
                    <Route path='/navigationSliderMenus' component={navigationSliderMenus}/>
                    <Route path='/navigationTopMenu' component={navigationTopMenu}/>
                    <Route path='/normalAffix' component={normalAffix}/>
                    <Route path='/horizontalMenu' component={horizontalMenu}/>
                    <Route path='/normalPagination' component={normalPagination}/>
                    <Route path='/normalSteps' component={normalSteps}/>
                    <Route path='/progressSteps' component={progressSteps}/>
                    <Route path='/normalAutoComplete' component={normalAutoComplete}/>
                    <Route path='/menus' component={menus}/>
                    <Route path='/NormalCheckBox' component={NormalCheckBox}/>
                    <Route path='/NormalCascader' component={NormalCascader}/>
                    <Route path='/LoginMain' component={LoginMain}/>
                    <Route path='/css_1' component={css_1}/>
                    <Route path='/CssMenu2' component={CssMenu2}/>
                    <Route path='/text1' component={text1}/>
                    <Route path='/JdHeader' component={JdHeader}/>
                    <Route path='/JdFooter' component={JdFooter}/>
                    <Route path='/JdContent' component={JdContent}/>
                    <Route path='/JdStatic' component={JdStatic}/>
                    <Route path='/apiTest1' component={apiTest1}/>
                    <Route path='/apiTest2' component={apiTest2}/>
                    <Route path='/apiTest3' component={apiTest3}/>
                    <Route path='/apiTest4' component={apiTest4}/>
                    <Route path='/apiTest5' component={apiTest5}/>
                    <Route path='/apiTest6' component={apiTest6}/>
                    <Route path='/apiTest7' component={apiTest7}/>
                    <Route path='/apiTest8' component={apiTest8}/>
                    <Route path='/apiTest9' component={apiTest9}/>
                    <Route path='/createUl' component={createUl}/>
                    <Route path='/moreEvent' component={moreEvent}/>
                    <Route path='/RotationChart1' component={RotationChart1}/>
                    <Route path='/RotationChart2' component={RotationChart2}/>
                    <Route path='/fixedTop' component={fixedTop}/>
                    <Route path='/flyCloud' component={flyCloud}/>
                    <Route path='/arrayTest' component={arrayTest}/>
                    <Route path='/accordion' component={accordion}/>
                    <Route path='/ShutdownAnimation' component={ShutdownAnimation}/>
                    <Route path='/whirligig' component={whirligig}/>
                    <Route path='/RandomSquare' component={RandomSquare}/>
                    <Route path='/SnakeProject' component={SnakeProject}/>
                    <Route path='/tests1' component={tests1}/>
                    <Route path='/tests2' component={tests2}/>
                    <Route path='/BookShopPage' component={BookShopPage}/>
                    <Route path='/test3' component={test3}/>
                    <Route path='/ListTest' component={ListTest}/>
                    <Route path='/BatchImport' component={BatchImport}/>
                    <Route path='/TodoApp' component={TodoApp}/>
                    <Route path='/MathStudy' component={MathStudy}/>
                    <Route path='/TestBreadcrumb' component={TestBreadcrumb}/>
                    <Route path='/AdvanceFunctionTest1' component={AdvanceFunctionTest1}/>
                    <Route path='/MobxTestMain' component={MobxTestMain}/>
                    <Route path='/PromiseTest1' component={PromiseTest1}/>
                    <Route path='/mobxProject' component={mobxProject}/>
                </Switch>
            </Router>
        );
    }
}
