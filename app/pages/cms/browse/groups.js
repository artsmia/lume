import React, {Component} from 'react'
import MiaUI from '../../../mia-ui'
import CmsTemplate from '../../../mia-ui/cms/Template'
import {Table, Row, Cell} from '../../../mia-ui/tables'
import apiFetch from '../../../utils/apiFetch'


export default class extends Component {

  static getInitialProps = async (context) => {
    try {
      // const {} = context.query
      const {allGroups: groups} = await apiFetch(`{
        allGroups {
          id
          title
        }
      }`)


      return {
        groups,
      }
    } catch (ex) {
      console.error(ex)
    }
  }

  render() {
    const {
      props: {
        groups
      }
    } = this
    return (
      <MiaUI>
        <CmsTemplate>
          <Table>
            {groups.map( ({id, title}) => (
              <Row
                key={id}
              >
                <Cell
                  width={"30%"}
                >{title}</Cell>
                <Cell>{id}</Cell>
              </Row>
            ))}
          </Table>

        </CmsTemplate>
      </MiaUI>
    )
  }
}
