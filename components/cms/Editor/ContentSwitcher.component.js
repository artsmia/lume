import ComparisonContentEditor from '../../../contents/comparison/Editor'
import DetailContentEditor from '../../../contents/detail/Editor'
import MovieContentEditor from '../../../contents/movie/Editor'
import ObjContentEditor from '../../../contents/obj/Editor'
import PictureContentEditor from '../../../contents/picture/Editor'


export default ({content}) => {
  switch (content.type) {
    case "comparison": {

      return(
        <ComparisonContentEditor
          contentId={content.id}
        />
      )
    }
    case "detail": {

      return(
        <DetailContentEditor
          contentId={content.id}
        />
      )
    }
    case "movie": {

      return(
        <MovieContentEditor
          contentId={content.id}
        />
      )
    }
    case "obj": {

      return(
        <ObjContentEditor
          contentId={content.id}
        />
      )
    }
    case "picture": {

      return(
        <PictureContentEditor
          contentId={content.id}
        />
      )
    }
    default: {

      return null
    }
  }
}
