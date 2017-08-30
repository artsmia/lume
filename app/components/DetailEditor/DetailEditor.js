import React, {Component} from 'react'
import styled from 'styled-components'
import {Row, Column} from '../../ui/layout'
import ImageModule from '../../ui/ImageModule'
import {Button} from '../../ui/buttons'
import {s3Url} from '../../config'
import {Input, Label} from '../../ui/forms'
import {ExpanderContainer, Expander} from '../../ui/expander'

export default class extends Component {

  state = {
    detailTitle: ""
  }

  render () {
    if (this.props.data.loading) return null

    const {
      newClip,
      props: {
        data: {
          detail: {
            id: detailId,
            title,
            image: {
              id: imageId,
              organization: {
                id: orgId
              }
            }
          }
        }
      },
      state: {
        detailTitle
      }
    } = this
    return (
      <Row>
        <Column>
          <ExpanderContainer>
            <Expander
              header={(
                <Row>
                  <Column>
                    <Label>Detail Title</Label>
                    <Input
                      name={"detailTitle"}
                      value={detailTitle}
                    />
                  </Column>
                  <DetailThumb
                    src={`${s3Url}/${orgId}/${imageId}/m`}
                  />
                </Row>
              )}
              footer={(
                <Button>
                  Save Detail
                </Button>
              )}
            >
              <Row>
                <Column>
                  <Button
                    onClick={newClip}
                  >
                    New Clip
                  </Button>
                </Column>
                <Column>
                  <DetailImg
                    src={`${s3Url}/${orgId}/${imageId}/m`}
                  />
                </Column>
              </Row>
            </Expander>
          </ExpanderContainer>
        </Column>

      </Row>
    )
  }

  componentWillReceiveProps(nextProps){
    if (!nextProps.data.loading) {
      this.setState({detailTitle: nextProps.data.detail.title || ""})
    }
  }

  handleChange = ({target: {value, name}}) => this.setState({[name]: value})

  newClip = async () => {
    try {
      console.log(this.props)
      const {
        editOrCreateClip,
        detailId,
      } = this.props

      console.log(
        await editOrCreateClip({
          detailId
        })
      )


    } catch (ex) {
      console.error(ex)
    }
  }
}

const DetailThumb = styled.img`
  height: 50px;
  object-fit: contain;
`

const DetailImg = styled.img`
  height: 200px;
  object-fit: contain;
`
