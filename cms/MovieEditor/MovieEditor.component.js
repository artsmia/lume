import React, {Component} from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import {H3} from '../../ui/h'
import {Spinner} from '../../ui/spinner'
import {Button} from '../../ui/buttons'
import Modal from '../../ui/modal'
import Image from '../../shared/Image'
import {Input, Textarea, Label} from '../../ui/forms'
import ImageManager from '../ImageManager'

export default class MovieEditor extends Component {

  static defaultProps = {
    movieId: PropTypes.string.isRequired,
  }

  stringFields = [
    "title",
    "description",
  ]

  constructor(props){
    super(props)
    let initialState = {}
    this.stringFields.forEach( field => initialState[field] = "")
    this.state = initialState

  }

  render() {

    if (!this.props.movie) return null

    const {
      props: {
        movie: {
          video
        }
      },
      state,
      state: {
        videoUrl
      },
      handleChange,
      stringFields,
      handleSave
    } = this

    return (
      <Container>
        <H3>
          Movie Editor
        </H3>
        {stringFields.map( field => (
          <div
            key={field}
          >
            <Label>{field}</Label>
            <Input
              name={field}
              value={state[field]}
              onChange={handleChange}
            />
          </div>
        ))}

        <Label>Video URL</Label>
        <Input
          name={"videoUrl"}
          value={videoUrl}
          onChange={handleChange}
        />
        <Button
          onClick={handleSave}
        >
          Save
        </Button>


      </Container>
    )
  }

  componentWillReceiveProps(nextProps){
    if (
      (
        !this.state.movieId &&
        nextProps.movie
      ) || (
        this.state.movieId !== nextProps.movieId &&
        nextProps.movie.id === nextProps.movieId
      )
    ){

      this.setState({
        movieId: nextProps.movieId,
        videoUrl: nextProps.movie.video.url || ""
      })

      this.stringFields.forEach( field => this.setState({[field]: nextProps.movie[field] || ""}))
    }


  }

  handleChange = ({target: {value, name}}) => this.setState({[name]: value})

  openModal = () => {
    this.setState({
      modalOpen: true
    })
  }

  handleModalClose = () => {
    this.setState({
      modalOpen: false
    })
  }

  handleSave = () => {
    const {
      props: {
        editMovie,
        editVideo,
        movieId,
        movie: {
          video
        }
      },
      stringFields,
      state,
      state: {
        videoUrl
      }
    } = this

    let variables = {
      movieId
    }

    stringFields.forEach( field => variables[field] = state[field])

    editMovie(variables)

    if (videoUrl !== video.url) {
      editVideo({
        videoId: video.id,
        url: videoUrl
      })
    }

  }

}

const Container = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  flex-direction: column;
`
