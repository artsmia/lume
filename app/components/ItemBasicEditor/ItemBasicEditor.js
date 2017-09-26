import React, {Component} from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import {Row, Column} from '../../ui/layout'
import {Label, Input, TextArea} from '../../ui/forms'
import {H2} from '../../ui/h'

export default class ItemSettingsEditor extends Component {

  static displayName = "ItemSettingsEditor"

  static propTypes = {
    itemId: PropTypes.string.isRequired,
    data: PropTypes.object,
    editOrCreateItem: PropTypes.func.isRequired
  }

  state = {
    title: "",
    attribution: "",
    date: "",
    medium: "",
    dimensions: "",
    culture: "",
    accessionNumber: "",
    text: "",
    creditLine: "",
    currentLocation: ""
  }

  render () {
    if (this.props.data.loading) return null

    const {
      state: {
        title,
        attribution,
        date,
        medium,
        dimensions,
        culture,
        accessionNumber,
        text,
        creditLine,
        currentLocation
      },
      handleChange
    } = this

    return (
      <Container>
        <Content>
        <Row>
          <Column>
            <Label>Title</Label>
            <Input
              name={"title"}
              value={title}
              onChange={handleChange}
            />
            <Label>Date</Label>
            <Input
              name={"date"}
              value={date}
              onChange={handleChange}
            />
            <Label>Culture</Label>
            <Input
              name={"culture"}
              value={culture}
              onChange={handleChange}
            />
            <Label>Dimensions</Label>
            <Input
              name={"dimensions"}
              value={dimensions}
              onChange={handleChange}
            />
            <Label>Accession Number</Label>
            <Input
              name={"accessionNumber"}
              value={accessionNumber}
              onChange={handleChange}
            />
          </Column>
          <Column>
            <Label>Attribution</Label>
            <TextArea
              name={"attribution"}
              value={attribution}
              onChange={handleChange}
            />
            <Label>Medium</Label>
            <TextArea
              name={"medium"}
              value={medium}
              onChange={handleChange}
            />
            <Label>Credit Line</Label>
            <TextArea
              name={"creditLine"}
              value={creditLine}
              onChange={handleChange}
            />
            <Label>Current Location</Label>
            <TextArea
              name={"currentLocation"}
              value={currentLocation}
              onChange={handleChange}
            />
          </Column>
        </Row>
        <Label>
          About
        </Label>
        <TextArea
          name={"text"}
          value={text}
          onChange={handleChange}
        />
      </Content>
      </Container>
    )
  }

  componentWillReceiveProps({data}){
    if (!data.loading) {
      let keys = Object.keys(data.item)
      keys.forEach( key => this.setState({[key]: data.item[key] || ""}))
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

  handleChange = ({target: {value, name}}) => this.setState({[name]: value})


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
