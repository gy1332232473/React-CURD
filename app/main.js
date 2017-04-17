import React, { Component } from 'react';
import ReactDOM , { render } from "react-dom";
import Style from "../css/style.css"
// -----------------------------父组件--------------------------------
class CURD extends Component {
    constructor(props){
        super(props);
        // 这里是设置初始的状态
        this.state = {
            items : [
                {name:"天妈妈1号",done:true},
                {name:"天妈妈2号",done:true},
                {name:"天妈妈3号",done:true},
                {name:"天妈妈4号",done:true},
                {name:"天妈妈5号",done:true},
                {name:"天妈妈6号",done:true},
                {name:"天妈妈7号",done:true},
                {name:"天妈妈8号",done:true}
            ]
        }
    }
    // 父组件更新State的方法，接收新的数组，更新State重新render UI层面
    handlechange (newitems) {
        this.setState({
            items : newitems
        })
    }
    render() {
        return (
            <div>
                <Typenew entries={this.state.items} onPush={this.handlechange.bind(this)}/>
                <List entries={this.state.items} onDel={this.handlechange.bind(this)}/>
            </div>
        );
    }
}
// -----------------------------输入框组件--------------------------------
class Typenew extends Component {
    constructor(props){
        super(props);
    }
    // 点击新增按钮时触发事件的新增obj方法
    handlePush (event) {
        // 阻止from表单的默认的Submit事件
        event.preventDefault();
        // 浅拷贝，保证原来数据的安全
        var items = this.props.entries;
        // 获取输入框中的value值，通过refs获取
        var pushtxt = this.refs.Input.value;
        // 新增对象，对象赋值
        var obj = {};
        obj["name"] = pushtxt;
        obj["done"] = true;
        // 对象push到数组中
        items.push(obj);
        // 子组件给父组件传参，以更改State来重新render UI层面
        this.props.onPush(items);
    }
    render() {
        return (
            <form>
                <input type="text" ref="Input" placeholder="请输入要新增的内容"/>
                <input type="submit" value="新增" onClick={this.handlePush.bind(this)}/>
            </form>
        );
    }
}
// -----------------------------列表组件--------------------------------
class List extends Component {
    constructor(props){
        super(props);
        // 这是自定义的一个默认的状态，来判断修改区域的组件状态
        this.state = {
            modify : -1
        }
    }
    // 删除方法
    handleDelete (event) {
        // 获取自定义的属性，用来判断index下标位置
        var index = event.target.getAttribute("data-key");
        // 浅拷贝，保证原来数据的安全
        var items = this.props.entries;
        // 使用数组方法splice删除相对应index下标的对象
        items.splice(index,1);
        // 子组件给父组件传参，以更改State来重新render UI层面
        this.props.onDel(items);
    }
    // 修改方法，改变模块
    handleXiugai (event) {
        // 获取自定义的属性，用来判断index下标位置
        var index = event.target.getAttribute("data-key");
        // 改变默认的修改区域，显示input框
        this.setState({
            modify : index
        })
    }
    // input框输入时更新State状态
    handleInput (event) {
        // 获取自定义的属性，用来判断index下标位置
        var index = event.target.getAttribute("data-key");
        // 浅拷贝，保证原来数据的安全
        var items = this.props.entries;
        // 获取input框中的value值
        var inputtxt = event.target.value;
        // 修改相对应的index下标对象中的name值
        items[index].name = inputtxt;
        // 子组件给父组件传参，以更改State来重新render UI层面
        this.props.onDel(items);
        
    }
    // 完成更改模块
    handleOk () {
        // 完成时恢复span的状态
        this.setState({
            modify : -1
        })
    }
    // 复选框的State
    handleCheck (event) {
        // 获取checkbox的checked属性值
        var done = event.target.checked
        // 获取自定义的属性，用来判断index下标位置
        var index = event.target.getAttribute("data-key");
        // 浅拷贝，保证原来数据的安全
        var items = this.props.entries;
        // 修改相对应的index下标的done值
        items[index].done = done;
        // 子组件给父组件传参，以更改State来重新render UI层面
        this.props.onDel(items);
    }
    render() {
        return (
            <ul>
                {
                    this.props.entries.map(function(value,i){
                        // 这里是使用if判断来根据更改modify的State值来对这个UI层面进行重新的渲染
                        if(this.state.modify != i){
                            return (
                                <li>
                                    <input data-key={i} type="checkbox" ref="checkbox" checked={value.done} onClick={this.handleCheck.bind(this)}/>
                                    <span className={"check-" + value.done}>{value.name}</span>
                                    <button data-key={i} onClick={this.handleXiugai.bind(this)}>修改</button>
                                    <button data-key={i} onClick={this.handleDelete.bind(this)}>删除</button>
                                </li>
                            )
                        }else{
                            return (
                                <li>
                                    <input type="checkbox" checked={value.done}/>
                                    <input type="text" data-key={i} onChange={this.handleInput.bind(this)} value={value.name}/>
                                    <button onClick={this.handleOk.bind(this)}>完成</button>
                                    <button data-key={i} onClick={this.handleDelete.bind(this)}>删除</button>
                                </li>
                            )
                        }
                        // 使用bind绑定了this的指向
                    }.bind(this))
                }
            </ul>
        );
    }
}
// 将组件render在box这个容器
render(<CURD />,document.getElementById("box"))