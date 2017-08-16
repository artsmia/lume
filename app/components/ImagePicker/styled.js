import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: stretch;
  width: 100%;
  height: 600px;
  border: 1px solid black;
`


export const ThumbColumn = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  align-content: flex-start;
  flex-wrap: wrap;
  margin: 10px;
  width: 40%;
  border: 1px solid black;
`

export const Right = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
  margin: 10px;
  width: 60%;
  border: 1px solid black;
`
export const Preview = styled.img`
  width: 100%;
  height: 100%;
  margin: auto;
  object-fit: contain;
  padding: 10px;
  box-sizing: border-box;
`

export const ImgThumb = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  margin: 5px;
`
