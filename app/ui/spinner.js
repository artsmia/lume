import styled, {keyframes} from 'styled-components'

const spin = keyframes`
  0% {
    transform: perspective(120px) rotateX(0deg) rotateY(0deg);
  } 50% {
    transform: perspective(120px) rotateX(-180.1deg) rotateY(0deg);
  } 100% {
    transform: perspective(120px) rotateX(-180deg) rotateY(-179.9deg);
  }
`

export const Spinner = styled.div`
  width: 40px;
  height: 40px;
  background-color: ${({theme}) => theme.colors.black};

  margin: 100px auto;
  animation: ${spin} 1.2s infinite ease-in-out;
`

const Overlay = styled.div`
  position: fixed;
  display: flex;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  background-color: ${({theme}) => theme.colors.lightMediumGray};
`

export const Loading = (props) => {
  return (
    <Overlay>
      <Spinner/>
    </Overlay>
  )
}
