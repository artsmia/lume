import React, {Component} from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import {Button} from '../../ui/buttons'
import Router from 'next/router'
import {H3} from '../../ui/h'
import {Row} from '../../ui/layout'
import {Label, Input, Checkbox} from '../../ui/forms'

export default class ItemSettingsEditor extends Component {

  static displayName = "ItemSettingsEditor"

  static propTypes = {
    itemId: PropTypes.string.isRequired,
    data: PropTypes.object,
    editOrCreateItem: PropTypes.func.isRequired
  }

  state = {
    pullFromCustomApi: false,
    localId: "",
  }

  render () {
    if (this.props.data.loading) return null

    const {
      deleteItem,
      state: {
        pullFromCustomApi,
        localId,
      },
      handleCheckboxChange,
      handleChange,
      handleSaveAndExit
    } = this

    return (
      <Container>
        <Content>
          <H3>
            Settings
          </H3>
          <Row>
            <Label>
              Use custom API:
            </Label>
            <Checkbox
              name={"pullFromCustomApi"}
              checked={pullFromCustomApi}
              onChange={handleCheckboxChange}
            />
          </Row>
          <Row>
            <Label>
              Local ID:
            </Label>
            <Input
              name={"localId"}
              value={localId}
              onChange={handleChange}
            />
          </Row>
          <Row>
            <Button
              onClick={handleSaveAndExit}
            >
              Save and Exit
            </Button>
            <Button
              color={"red"}
              onClick={deleteItem}
            >
              Delete Item
            </Button>
          </Row>
        </Content>

      </Container>
    )
  }

  componentWillReceiveProps({data}){
    if (!data.loading) {
      let keys = Object.keys(data.item)
      keys.forEach( key => {
        if (key === "pullFromCustomApi") {
          this.setState({pullFromCustomApi: data.item[key]})
        } else {
          this.setState({[key]: data.item[key] || ""})
        }
      })
    }
  }

  componentWillUpdate(prevProps, prevState){
    let keys = Object.keys(prevState)

    let change = keys.find( key => prevState[key] !== this.state.key)

    if (change) {
      this.debounce(this.saveItem)
    }
  }

  saveItem = async() => {
    try {
      const {
        props: {
          editOrCreateItem,
          itemId
        },
        state
      } = this

      await editOrCreateItem({
        variables: {
          itemId,
          ...state
        }
      })

    } catch (ex) {
      console.error(ex)
    }
  }

  debounce = (func) => {
    if (this.timer) clearTimeout(this.timer)
    this.timer = setTimeout(func, 2000)
  }

  deleteItem = async () => {
    try {

      const {
        props: {
          deleteItem,
          itemId,
        }
      } = this

      let {
        orgSub
      } = Router.router.query

      await deleteItem({
        variables: {
          itemId
        }
      })


      Router.push({
        pathname: '/cms/browse/items',
        query: {
          orgSub,
        }
      }, `/${orgSub}/cms/items`)


    } catch (ex) {
      console.error(ex)
    }
  }

  handleCheckboxChange = ({target: {name, checked}}) => this.setState({[name]: checked})

  handleChange = ({target: {value, name}}) => this.setState({[name]: value})

  handleSaveAndExit = async () => {
    try {

      let {
        orgSub
      } = Router.router.query


      Router.push({
        pathname: '/cms/browse/items',
        query: {
          orgSub,
        }
      }, `/${orgSub}/cms/items`)


    } catch (ex) {
      console.error(ex)
    }
  }

}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  box-sizing: border-box;
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  border: 1px solid black;
  box-sizing: border-box;

`
