import React, { Component } from "react"
import styled from 'styled-components'

const Wraper = styled.div`
  font-weight: 200;
  font-family: 'IBM Plex Sans Regular';
  * {
    box-sizing: border-box;
  }
`
const Header = styled.div`
  position: fixed;
  top: 0;
  width: 100vw;
  height: 45px;
  line-height: 45px;
  background: #fd9e9e;
  text-align: center;
`

const Body = styled.div`
  padding: 10px 15px;
  margin-top: 50px;
  width: 100vw;
  input {
    line-height: 30px;
    border: 1px solid #eee;
    text-indent:5px;
  }
  button {
    display: block;
    background: #ffaeae;
    border: none;
    line-height: 20px;
    padding: 5px 15px;
    border-radius: 5px;
    color: #fff;
    margin-top: 10px;
    &:focus {
      outline: none;
    }
  }
`

export default class extends Component {

  state = {
    success: false,
    marks: 0
  }

  submit = async () => {
    let res = await fetch(`/api/marks/${this.state.userid}`)
    res = await res.json()
    this.setState({ success: true, marks: res.marks })
  }

  change = e => {
    console.log(e.target.value)
    this.setState({ userid: e.target.value })
  }

  render () {
    const { success, marks } = this.state
    return (
      <Wraper>
        <Header>花鸟岛</Header>
        <Body>
          <p>查看积分</p>
          <input type="text" onChange={this.change} placeholder="输入你的游戏id"/>
          <button onClick={this.submit}>提交</button>

          { success ? <div>
            您的积分数：{marks}
          </div>: null}
        </Body>
      </Wraper>
    )
  }
}