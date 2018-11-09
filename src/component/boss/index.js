import React, {Component} from 'react'
import {connect} from 'react-redux'
import UserCard from '../../component/user_card'
import {actionCreators} from '../../store/chat_user'

const mapStateToProps = state => ({
  userList: state.getIn(['chatUser', 'userList']),
})
const mapDispathToProps = dispatch => ({
  getUserList: (type) => {
    dispatch(actionCreators.getUserList(type))
  }
})

@connect(mapStateToProps, mapDispathToProps)
class Boss extends Component {
  componentDidMount() {
    this.props.getUserList('genius')
  }

  render() {
    return (
      <div>
        <UserCard userlist={this.props.userList}></UserCard>
      </div>
    )
  }
}

export default Boss