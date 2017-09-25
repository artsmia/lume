import styled from 'styled-components'
import react, {Component} from 'react'

const Container = styled.div`
  height: 100vh;
  width: ${({width}) => width}px;
  position: fixed;
  top: 0;
  left: 0;
  background-color: white;
  transition: .2s all;
  transform: translate(${({width, closed}) => (closed) ? `-${width}` : 0}px, 0);
  border-right: .5px solid ${({theme}) => theme.colors.gray};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  z-index: 1001;
`
const Toggler = styled.button`
  position: fixed;
  top: 5px;
  left: ${({width}) => width + 5}px;
  transform: translate(${({width, closed}) => (closed) ? `-${width}` : 0}px, 0);
  transition: .2s all;
  width: 60px;
  height: 60px;
  border-radius: 60px;
  background-color: ${({theme}) => theme.colors.gray};
  border: 1px solid ${({theme}) => theme.colors.lightMediumGray};
  outline: none;
  z-index: 1002;

`



export default class extends Component {

  static defaultProps = {
    closed: false,
    width: 300
  }

  state = {
    closed: true
  }

  render() {
    const {
      toggle,
      props: {
        width
      },
      state: {
        closed
      },
    } = this
    return (
      <div>
        <Container
          width={width}
          closed={closed}
        >

          {this.props.children}

        </Container>
        <Toggler
          width={width}
          closed={closed}
          onClick={toggle}
        >
          Menu
        </Toggler>
      </div>
    )
  }

  toggle = () => {
    this.setState( (prevState) => {
      return {
        closed: !prevState.closed
      }
    })
  }
}
