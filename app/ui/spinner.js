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

export const SpinnerBox = styled.div`
  width: 40px;
  height: 40px;
  background-color: ${({theme}) => theme.colors.black};
  animation: ${spin} 1.2s infinite ease-in-out;
`

export const Box = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`

const Overlay = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  background-color: ${({theme}) => theme.colors.lightMediumGray};
`

export const Spinner = (props) => {
  return (
    <Box>
      <SpinnerBox/>
    </Box>
  )
}


export const Loading = (props) => {
  return (
    <Overlay>
      <SpinnerBox/>
    </Overlay>
  )
}
