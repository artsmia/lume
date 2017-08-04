import React, {Component} from 'react'
import MiaUI from '../../../mia-ui'
import CmsTemplate from '../../../mia-ui/cms/Template'
import {Table, Row, Cell, Header, TBody} from '../../../mia-ui/tables'
import apiFetch from '../../../utils/apiFetch'


export default class extends Component {

  static getInitialProps = async (context) => {
    try {
      // const {} = context.query
      const {allItems: items} = await apiFetch(`{
        allItems {
          id
          title
        }
      }`)


      return {
        items,
      }
    } catch (ex) {
      console.error(ex)
    }
  }

  render() {
    const {
      props: {
        items
      }
    } = this
    return (
      <MiaUI>
        <CmsTemplate>
          <Table>
            <TBody>
              <Row
                key="header"
              >
                <Header
                  width={"30%"}
                >
                  Title
                </Header>
                <Header>
                  Id
                </Header>
              </Row>
              {items.map( ({id, title}) => (
                <Row
                  key={id}
                >
                  <Cell
                    width={"30%"}
                  >{title}</Cell>
                  <Cell>{id}</Cell>
                </Row>
              ))}
            </TBody>

          </Table>

        </CmsTemplate>
      </MiaUI>
    )
  }
}
