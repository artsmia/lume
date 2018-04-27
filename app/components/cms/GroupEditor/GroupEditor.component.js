import React, {Component} from 'react'
import styled from 'styled-components'
import {Button, RoundButton} from '../../mia-ui/buttons'
import {Input, Textarea, Label} from '../../mia-ui/forms'
import {Icon} from '../../mia-ui/icons'
import {Flex, Box} from 'grid-styled'
import ChangeImage from '../DefaultEditors/ChangeImage'

export default class GroupEditor extends Component {


  render() {

    if (!this.props.group) return <Container/>

    const {
      props: {
        group,
        deleteGroup,
        group: {
          image
        }
      },
      state: {
        title,
        description,
        slug
      },
      handleChange,
      handleSave,
      handleTitleChange
    } = this

    return (
      <Container
        flexWrap={'wrap'}
        w={1}
        pr={4}
      >
        <Flex
          w={1}
          justifyContent={'space-between'}
        >
          <Input
            name={"title"}
            value={title}
            onChange={handleTitleChange}
            placeholder={"Title"}
          />
          <Button
            onClick={deleteGroup}
            title={"Delete Group"}
            color={"red"}
          >
            Delete Group
          </Button>
        </Flex>

        <Flex
          w={1}
        >
          <Input
            name={"slug"}
            value={slug}
            placeholder={"Slug"}
            disabled
          />
        </Flex>

        <GroupFlex
          w={1}
          py={2}
        >

          <Box
            width={2/3}
            pr={1}
          >
            <Textarea
              name={"description"}
              value={description}
              onChange={handleChange}
              placeholder={"Description"}
            />
          </Box>
          <Box
            width={1/3}
          >
            <ChangeImage
              label={"Image"}
              name={"imageId"}
              image={image}
              onChange={handleChange}
            />
          </Box>




        </GroupFlex>





      </Container>
    )
  }

  handleSave = () => {
    this.props.editGroup({
      ...this.state
    })
  }

  bounce = true

  debounce = (func, time) => {
    if (this.bounce) {
      clearTimeout(this.bounce)
      this.bounce = setTimeout(
        func,
        time
      )
    }
  }

  handleTitleChange = (e) => {

    let value = e.target.value

    let slugValue = value.replace(/\s/g, '-').toLowerCase()


    this.setState(
      ()=>({
        title: value,
        slug: slugValue
      }),
      ()=>{
        this.debounce(this.handleSave, 2000)
      }
    )

  }

  handleChange = ({target: {value, name}}) => {
    this.setState(
      () => ({[name]: value}),
      () => {
        this.debounce(
          this.handleSave,
          1000
        )
      }
    )
  }

  stateFromProps = (props) => {
    if (!props.group){
      return {}
    }

    if (props.group.id !== this.state.id){

      return {
        ...props.group
      }
    }
  }

  constructor(props){
    super(props)
    this.state = {}
    this.state = {
      ...this.stateFromProps(props)
    }
  }

  componentWillReceiveProps(nextProps){
    this.setState({...this.stateFromProps(nextProps)})
  }
}

const Container = styled(Flex)`
`
const GroupFlex = styled(Flex)`
`
