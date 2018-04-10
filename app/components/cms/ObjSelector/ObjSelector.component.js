import React, {Component} from 'react'
import styled from 'styled-components'
import {Button} from '../../mia-ui/buttons'
import {Input} from '../../mia-ui/forms'
import {Link} from '../../mia-ui/links'
import {Flex, Box} from 'grid-styled'
import {Expander} from '../../mia-ui/expanders'
import {H3} from '../../mia-ui/text'


export default class ObjSelector extends Component {

  state ={
    search: "",
    exp: true,
  }

  render() {

    if (!this.props.objs) return null

    const {
      props: {
        objs,
        onSelect
      },
      handleCreate,
      state: {
        search,
        exp
      },
      handleChange,
      handleSearch
    } = this

    return (
      <Expander
        header={
          <H3>
            Select Object
          </H3>
        }
        exp={exp}
        onChange={(newExp)=>{this.setState({exp: newExp})}}
      >
        <Flex
          w={1}
          flexWrap={'wrap'}
        >
          <Box
            w={1}
          >
            <Input
              value={search}
              onChange={handleChange}
            />
            <Button
              onClick={handleSearch}
            >
              Search
            </Button>
          </Box>
          <Box
            w={1}
          >
            <Button
              onClick={handleCreate}
              color={"green"}
            >
              Create Object
            </Button>
          </Box>


          <Flex
            flexWrap={'wrap'}
            w={1}
          >
            {objs.map(obj => (
              <Box
                key={obj.id}
                onClick={()=>onSelect(obj.id)}
                w={1}
              >

                {obj.title || "Untitled"}
              </Box>
            ))}
          </Flex>


        </Flex>
      </Expander>

    )
  }

  handleChange = ({target: {value, name}}) => this.setState({[name]: value})

  handleCreate = async () => {
    try {

      let {
        data: {
          createObj: {
            id: objId
          }
        }
      } = await this.props.createObj()

      this.props.onSelect(objId)
    } catch (ex) {
      console.error(ex)
    }
  }

  handleSearch = () => {
    this.props.refetch({
      filter: {
        ...this.props.variables.filter,
        search: this.state.search
      }
    })
  }


}
