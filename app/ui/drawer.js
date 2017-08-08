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
`
const Toggler = styled.button`
  position: fixed;
  top: 0;
  left: ${({width}) => width}px;
  transform: translate(${({width, closed}) => (closed) ? `-${width}` : 0}px, 0);
  transition: .2s all;
`



export default class extends Component {

  static defaultProps = {
    closed: false,
    width: 300
  }

  state = {
    closed: false
  }

  render() {
    const {
      width
    } = this.props
    const {
      closed
    } = this.state
    return (
      <div>
        <Container
          width={width}
          closed={closed}
        >

          <h2>hello</h2>

        </Container>
        <Toggler
          width={width}
          closed={closed}
          onClick={()=> {
            this.setState( (prevState) => {
              return {
                closed: !prevState.closed
              }
            })
          }}
        >
          Toggle
        </Toggler>
      </div>
    )
  }
}
