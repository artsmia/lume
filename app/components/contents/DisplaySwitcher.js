import ComparisonContentDisplay from './comparison/Display'
import DetailContentDisplay from './detail/Display'
import MovieContentDisplay from './movie/Display'
import ObjContentDisplay from './obj/Display'
import PictureContentDisplay from './picture/Display'


export default ({content}) => {
  switch (content.type) {
    case "comparison": {

      return(
        <ComparisonContentDisplay
          content={content}
        />
      )
    }
    case "detail": {

      return(
        <DetailContentDisplay
          content={content}
        />
      )
    }
    case "movie": {

      return(
        <MovieContentDisplay
          content={content}
        />
      )
    }
    case "obj": {

      return(
        <ObjContentDisplay
          content={content}
        />
      )
    }
    case "picture": {

      return(
        <PictureContentDisplay
          content={content}
        />
      )
    }
    default: {

      return null
    }
  }
}
