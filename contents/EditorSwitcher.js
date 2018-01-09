import ComparisonContentEditor from './comparison/Editor'
import DetailContentEditor from './detail/Editor'
import MovieContentEditor from './movie/Editor'
import ObjContentEditor from './obj/Editor'
import PictureContentEditor from './picture/Editor'


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
