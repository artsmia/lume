import ComparisonContentEditor from './comparison/ComparisonEditor'
import DetailContentEditor from './detail/DetailEditor'
import MovieContentEditor from './movie/MovieEditor'
import ObjContentEditor from './obj/ObjContentEditor'
import PictureContentEditor from './picture/PictureEditor'

export default props => {
  switch (props.content.type) {
    case 'comparison': {
      return <ComparisonContentEditor contentId={props.content.id} />
    }
    case 'detail': {
      return (
        <DetailContentEditor contentId={props.content.id} tour={props.tour} />
      )
    }
    case 'movie': {
      return <MovieContentEditor contentId={props.content.id} />
    }
    case 'obj': {
      return <ObjContentEditor contentId={props.content.id} tour={props.tour} />
    }
    case 'picture': {
      return <PictureContentEditor contentId={props.content.id} />
    }
    default: {
      return null
    }
  }
}
