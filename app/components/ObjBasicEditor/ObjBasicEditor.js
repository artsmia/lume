import React, {Component} from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import {Row, Column} from '../../ui/layout'
import {Label, Input, TextArea} from '../../ui/forms'
import {H2} from '../../ui/h'
import {Button} from '../../ui/buttons'

export default class ObjSettingsEditor extends Component {

  static displayName = "ObjSettingsEditor"

  static propTypes = {
    objId: PropTypes.string.isRequired,
    data: PropTypes.object,
    editOrCreateObj: PropTypes.func.isRequired
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
    currentLocation: "",
    saveStatus: "Saved",
    initialized: false
  }

  fields = [
    "title",
    "attribution",
    "date",
    "medium",
    "dimensions",
    "culture",
    "accessionNumber",
    "text",
    "creditLine",
    "currentLocation"
  ]

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
      handleChange,
      saveObj
    } = this

    return (
      <Container>
        <Content>
          <Row>
            <Button
              onClick={saveObj}
            >
              Save
            </Button>

          </Row>

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
            <Label>Current Location</Label>
            <Input
              name={"currentLocation"}
              value={currentLocation}
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

          </Column>
        </Row>
        <Label>
          About
        </Label>
        <AboutText
          name={"text"}
          value={text}
          onChange={handleChange}
        />
      </Content>
      </Container>
    )
  }

  componentDidMount(){
    this.ensureInitialFields(this.props)
  }

  componentWillReceiveProps(nextProps) {
    this.ensureInitialFields(nextProps)
  }



  ensureInitialFields = (nextProps) => {
    if (!this.state.initialized) {
      this.fields.forEach( field => {
        this.setState({
          [field]: nextProps.data.obj[field]
        })
      })
      this.setState({
        initialized: true
      })
    }
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

      console.log("sent")

      await editOrCreateObj({
        variables: {
          objId,
          ...state
        }
      })

      console.log("received")


    } catch (ex) {
      console.error(ex)
    }
  }

  debounce = (func) => {
    if (this.timer) clearTimeout(this.timer)
    this.timer = setTimeout(func, 2000)
  }

  handleChange = ({target: {value, name}}) => {
    this.setState({[name]: value})
    this.debounce(this.saveObj)
  }


}

const AboutText = styled(TextArea)`
  min-height: 250px;
`

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
