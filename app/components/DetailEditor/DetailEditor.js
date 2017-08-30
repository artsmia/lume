import React, {Component} from 'react'
import styled from 'styled-components'
import {Row, Column} from '../../ui/layout'
import ImageModule from '../../ui/ImageModule'
import {Button} from '../../ui/buttons'
import {s3Url} from '../../config'
import {Input, Label} from '../../ui/forms'
import {ExpanderContainer, Expander} from '../../ui/expander'
import ClipEditor from '../ClipEditor'

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
            image: {
              id: imageId,
              organization: {
                id: orgId
              }
            },
            clips
          }
        }
      },
      state: {
        detailTitle
      },
      save,
      handleChange
    } = this
    return (
      <Expander
        header={(
          <Row>
            <Column>
              <Label>Detail Title</Label>
              <Input
                name={"detailTitle"}
                value={detailTitle}
                onChange={handleChange}
              />
            </Column>
            <DetailThumb
              src={`${s3Url}/${orgId}/${imageId}/m`}
            />
          </Row>
        )}
        footer={(
          <Button
            onClick={save}
          >
            Save Detail
          </Button>
        )}
      >
        <Row>
          <Column>
            <ExpanderContainer>
              {clips.map( clip => (
                <ClipEditor
                  key={clip.id}
                  clipId={clip.id}
                />
              ))}

            </ExpanderContainer>
            <Button
              onClick={newClip}
            >
              New Clip
            </Button>
          </Column>
        </Row>
      </Expander>
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
      const {
        editOrCreateDetail,
        detailId,
      } = this.props

      let newClipDetailId = detailId

      await editOrCreateDetail({
        variables: {
          detailId,
          newClipDetailId: detailId
        }
      })


    } catch (ex) {
      console.error(ex)
    }
  }

  save = async () => {
    try {
      const {
        props: {
          editOrCreateDetail,
          detailId,
        },
        state: {
          detailTitle: title
        }
      } = this

      let newClipDetailId = detailId

      await editOrCreateDetail({
        variables: {
          detailId,
          title
        }
      })
    } catch (ex) {
      console.error(ex)
    }
  }
}

const DetailThumb = styled.img`
  height: 50px;
  object-fit: contain;
`
