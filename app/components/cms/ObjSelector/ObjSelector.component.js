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
      handleSearch,
      handleObjSelection
    } = this

    return (
      <Expander
        header={
          <H3>
            Select Object
          </H3>
        }
        open={exp}
        onRequestOpen={() => this.setState({exp: true})}
        onRequestClose={() => this.setState({exp: false})}
      >
        <Flex
          w={1}
          flexWrap={'wrap'}
        >
          {this.props.organization ? (<Box
            w={1}
          >
            {
              !this.props.organization.customObjApiEnabled ? (
                <Button
                  onClick={handleCreate}
                  color={"green"}
                >
                  Create Object
                </Button>
              ): null
            }
          </Box>) : null}
          <Box
            w={1}
          >
            <Input
              name={'search'}
              value={search}
              onChange={handleChange}
              placeholder={"Search for Objects"}
            />
          </Box>



          <ObjList
            w={1}
            flexDirection={'column'}
            alignItems={'flex-start'}
            justifyContent={'flex-start'}
          >
            {objs ? objs.map(obj => (
              <ObjItem
                key={obj.id || obj.localId}
                onClick={()=>{handleObjSelection(obj)}}
                w={1}
                p={1}
              >

                {obj.title || "Untitled"}
              </ObjItem>
            )) : null}
          </ObjList>


        </Flex>
      </Expander>

    )
  }

  bounce = true

  debounce = (func, wait) => {
    if (this.bounce) {
      clearTimeout(this.bounce)
      this.bounce = setTimeout(
        func,
        wait
      )
    }
  }

  handleObjSelection = async (obj) => {
    try {
      if (
        this.props.organization.customObjApiEnabled
      ) {
        let {
          data: {
            createObj: {
              id: objId
            }
          }
        } = await this.props.createObj({
          localId: obj.localId,
          pullFromCustomApi: true
        })


        this.props.onSelect(objId)

      } else {
        this.props.onSelect(obj.id)
      }
    } catch (ex) {
      console.error(ex)
    }

  }

  handleChange = ({target: {value, name}}) => {


    this.setState(
      ()=> ({[name]: value}),
      ()=>{
        this.debounce(this.handleSearch, 1000)
      }
    )
  }

  handleCreate = async () => {
    try {

      let {
        data: {
          createObj: {
            id: objId
          }
        }
      } = await this.props.createObj({})

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

const ObjList = styled(Flex)`
  height: 500px;
  overflow-y: scroll;

`

const ObjItem = styled(Box)`
  cursor: pointer;
  height: 30px;
  &:hover {
    background-color: ${({theme}) => theme.color.gray30};
  }
`
