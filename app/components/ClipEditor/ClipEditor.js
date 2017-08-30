import React, {Component} from 'react'
import styled from 'styled-components'
import {Row, Column} from '../../ui/layout'
import {Button} from '../../ui/buttons'
import {s3Url} from '../../config'
import {Input, Label, TextArea} from '../../ui/forms'
import {Expander} from '../../ui/expander'
import Image from '../Image'

export default class extends Component {

  state = {
    clipTitle: "",
    clipDescription: ""
  }

  render () {
    if (this.props.data.loading) return null

    const {
      props: {
        data: {
          clip: {
            id: clipId,
            detail: {
              id: detailId,
              image: {
                id: imageId,
              }
            }
          }
        }
      },
      state: {
        clipTitle,
        clipDescription
      },
      save,
      handleChange
    } = this
    return (
      <Expander
        header={(
          <Row>
            <Column>
              <Label>Clip Title</Label>
              <Input
                name={"clipTitle"}
                value={clipTitle}
                onChange={handleChange}
              />
            </Column>
          </Row>
        )}
        footer={(
          <Button
            onClick={save}
          >
            Save Clip
          </Button>
        )}
      >
        <Row>
          <Column>
            <Label>Clip description</Label>
            <TextArea
              name={"clipDescription"}
              value={clipDescription}
              onChange={handleChange}
            />
          </Column>
          <Column>
            <Image
              imageId={imageId}
              height={'200px'}
              quality={"m"}
            />
          </Column>
        </Row>


      </Expander>
    )
  }

  componentWillReceiveProps(nextProps){
    if (!nextProps.data.loading) {
      this.setState({
        clipTitle: nextProps.data.clip.title || "",
        clipDescription: nextProps.data.clip.description || ""
      })
    }
  }

  handleChange = ({target: {value, name}}) => this.setState({[name]: value})


  save = async () => {
    try {
      const {
        props: {
          editOrCreateClip,
          clipId,
        },
        state: {
          clipTitle: title,
          clipDescription: description
        }
      } = this


      await editOrCreateClip({
        variables: {
          clipId,
          title,
          description
        }
      })
    } catch (ex) {
      console.error(ex)
    }
  }
}
