import React, {Component} from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import {Button} from '../../ui/buttons'
import Router from 'next/router'
import {H3} from '../../ui/h'
import {Row} from '../../ui/layout'
import {Label, Input, Checkbox} from '../../ui/forms'

export default class ObjSettingsEditor extends Component {

  static displayName = "ObjSettingsEditor"

  static propTypes = {
    objId: PropTypes.string.isRequired,
    data: PropTypes.object,
    editOrCreateObj: PropTypes.func.isRequired
  }

  state = {
    pullFromCustomApi: false,
    localId: "",
  }

  render () {
    if (this.props.data.loading) return null

    const {
      deleteObj,
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
              onClick={deleteObj}
            >
              Delete Obj
            </Button>
          </Row>
        </Content>

      </Container>
    )
  }

  componentWillReceiveProps({data}){
    if (!data.loading) {
      let keys = Object.keys(data.obj)
      keys.forEach( key => {
        if (key === "pullFromCustomApi") {
          this.setState({pullFromCustomApi: data.obj[key]})
        } else {
          this.setState({[key]: data.obj[key] || ""})
        }
      })
    }
  }

  componentWillUpdate(prevProps, prevState){
    // let keys = Object.keys(prevState)
    //
    // let change = keys.find( key => prevState[key] !== this.state.key)
    //
    // if (change) {
    //   this.debounce(this.saveObj)
    // }
  }

  saveObj = async() => {
    try {
      const {
        props: {
          editOrCreateObj,
          objId
        },
        state
      } = this

      await editOrCreateObj({
        variables: {
          objId,
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

  deleteObj = async () => {
    try {

      const {
        props: {
          deleteObj,
          objId,
        }
      } = this

      let {
        orgSub
      } = Router.router.query

      await deleteObj({
        variables: {
          objId
        }
      })


      Router.push({
        pathname: '/cms/browse/objs',
        query: {
          orgSub,
        }
      }, `/${orgSub}/cms/objs`)


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
        pathname: '/cms/browse/objs',
        query: {
          orgSub,
        }
      }, `/${orgSub}/cms/objs`)


    } catch (ex) {
      console.error(ex)
    }
  }

}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  box-sizing: border-box;
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  border: 1px solid black;
  box-sizing: border-box;

`
