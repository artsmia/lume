import React, {Component} from 'react'
import styled from 'styled-components'
import Modal from '../../ui/modal'
import Image from '../../shared/Image'

export default class AdditionalImages extends Component {

  state = {
    modal: false,
    selectedImageId: ""
  }


  render() {
    const {
      props: {
        additionalImages,
      },
      state: {
        modal,
        selectedImageId
      }
    } = this
    return (
      <Container>
        {additionalImages.map(image => (
          <ImgContainer
            key={image.id}
            onClick={()=>this.setState({
              selectedImageId: image.id,
              modal: true
            })}
          >
            <Image
              imageId={image.id}
              height={"60px"}
            />
          </ImgContainer>
        ))}

        <Modal
          open={modal}
          onClose={()=>this.setState({
            selectedImageId: "",
            modal: false
          })}
        >
          {(selectedImageId) ? (
            <Image
              imageId={selectedImageId}
            />
          ): null}

        </Modal>
      </Container>
    )
  }
}

const Container = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
`
const ImgContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80px;
  width: 80px;
  cursor: pointer;
  border: 1px solid lightgrey;
  margin: 5px;
`
