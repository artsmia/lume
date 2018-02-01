import {Component} from 'react'
import styled from 'styled-components'
import {Loading} from '../../ui/spinner'
import PropTypes from 'prop-types'

export default class AppTombstone extends Component {

  state = {
    showMore: false
  }

  render(){

    const {
      props: {
        obj: {
          accessionNumber,
          attribution,
          creditLine,
          culture,
          currentLocation,
          date,
          dimensions,
          medium,
          title,
        }
      },
      state: {
        showMore
      }
    } = this

    return (
      <Container>

        {(title) ? (
          <Title>
            {title}
          </Title>
        ): null}

        {(attribution) ? (
          <Attribution>
            {attribution}
          </Attribution>
        ): null}

        {(culture && date) ? (
          <CultureDate>
            {`(${culture}, ${date})`}
          </CultureDate>
        ): null}

        {(currentLocation) ? (
          <CurrentLocation>
            {currentLocation}
          </CurrentLocation>
        ): null}

        {(showMore) ? (
          <More>

            {(medium) ? (
              <MoreText>
                {medium}
              </MoreText>
            ): null}

            {(dimensions) ? (
              <MoreText>
                {dimensions}
              </MoreText>
            ): null}

            {(creditLine) ? (
              <MoreText>
                {creditLine}
              </MoreText>
            ): null}

            {(accessionNumber) ? (
              <MoreText>
                {accessionNumber}
              </MoreText>
            ): null}

          </More>
        ): null}


        <ShowMore
          onClick={()=>this.setState(({showMore}) => ({showMore:!showMore}))}
        >
          {(showMore) ? "Hide" : "Show More"}
        </ShowMore>


      </Container>
    )
  }
}


const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
`

const Title = styled.h1`
  font-family: ${({theme}) => theme.fonts.regular};
  font-size: 1.2em;
  margin: 0;
`

const Attribution = styled.h2`
  font-family: ${({theme}) => theme.fonts.light};
  font-size: 1em;
  margin: 0;
`

const CultureDate = styled.h3`
  font-family: ${({theme}) => theme.fonts.light};
  font-size: 1em;
  margin: 0;
`

const CurrentLocation = styled.h3`
  font-family: ${({theme}) => theme.fonts.light};
  font-size: 1em;
  margin: 0;
`

const ShowMore = styled.button`
  font-family: ${({theme}) => theme.fonts.light};
  font-size: .8em;
  width: 100%;
  border: 0;
  background-color: white;
  justify-content: center;
`
const More = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`

const MoreText = styled.h5`
  font-family: ${({theme}) => theme.fonts.light};
  font-size: .9em;
  margin: 0;
`
