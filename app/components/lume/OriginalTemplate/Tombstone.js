import { Component } from "react"
import styled from "styled-components"
import { Loading } from "../../mia-ui/loading"
import PropTypes from "prop-types"

export default class AppTombstone extends Component {
  state = {
    showMore: false
  }

  render() {
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
          title
        }
      },
      state: { showMore }
    } = this

    return (
      <Container flex={"0 0 auto"} id={"tombstone"}>
        {title ? <Title>{title}</Title> : null}

        {attribution ? <Attribution>{attribution}</Attribution> : null}

        {culture && date ? (
          <CultureDate>{`(${culture}, ${date})`}</CultureDate>
        ) : null}

        {currentLocation ? (
          <CurrentLocation>{currentLocation}</CurrentLocation>
        ) : null}

        {showMore ? (
          <More>
            {medium ? <MoreText>{medium}</MoreText> : null}

            {dimensions ? <MoreText>{dimensions}</MoreText> : null}

            {creditLine ? <MoreText>{creditLine}</MoreText> : null}

            {accessionNumber ? <MoreText>{accessionNumber}</MoreText> : null}
          </More>
        ) : null}

        <ShowMore
          onClick={() =>
            this.setState(({ showMore }) => ({ showMore: !showMore }))
          }
        >
          {showMore ? "Hide" : "Show More"}
        </ShowMore>
      </Container>
    )
  }
}

const Container = styled.div`
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  background-color: white;
`

const Title = styled.h1`
  font-family: ${({ theme }) => theme.font.regular};
  font-size: 1.2rem;
  margin: 0;
`

const Attribution = styled.h2`
  font-family: ${({ theme }) => theme.font.light};
  font-size: 1rem;
  margin: 0;
`

const CultureDate = styled.h3`
  font-family: ${({ theme }) => theme.font.light};
  font-size: 1rem;
  margin: 0;
`

const CurrentLocation = styled.h3`
  font-family: ${({ theme }) => theme.font.light};
  font-size: 1rem;
  margin: 0;
`

const ShowMore = styled.button`
  font-family: ${({ theme }) => theme.font.light};
  font-size: 0.8rem;
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
  font-family: ${({ theme }) => theme.font.light};
  font-size: 0.9rem;
  margin: 0;
`
