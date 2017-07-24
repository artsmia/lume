import React, {Component} from 'react'
import {getGroups, createGroup} from '../../utils'

export default class GroupBrowser extends Component {

  state = {
    newGroupTitle: "",
    groups: {},
  }

  render() {
    const {
      handleChange,
      createGroup,
      state: {
        groups,
      }
    } = this
    return (
      <div>
        <h1>
          Group Browser
        </h1>
        <input
          name="newGroupTitle"
          onChange={handleChange}
        />
        <button
          onClick={createGroup}
        >
          Create Group
        </button>
        <div>
          {
            Object.keys(groups).map( (id) => {
              let {title} = groups[id]
              return (
                <h4
                  key={id}
                >
                  {title}
                </h4>
              )
            })
          }
        </div>
      </div>
    )
  }


  componentDidMount(){
    try {
      this.getGroups()
    } catch (e) {
      console.error("localStorage and json parsing failed in groupbrowser", e)
    }
  }

  handleChange = ({target: {name, value}}) => {
    this.setState({
      [name]: value
    })
  }

  createGroup = async () => {
    try {
      const {newGroupTitle} = this.state
      const groups = await createGroup({
        title: newGroupTitle
      })
      this.setState({groups})
    } catch (e) {
      console.error("there was an error", e)
    }
  }

  getGroups = async () => {
    try {
      const groups = await getGroups()
      this.setState({groups})
    } catch (e) {
      console.error("there was an error", e)

    }
  }

}
