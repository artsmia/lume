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
        <DetailContentEditor
          contentId={props.content.id}
          showDemo={props.showDetailDemo}
          onDemoFinish={props.onDetailDemoFinish}
        />
      )
    }
    case 'movie': {
      return <MovieContentEditor contentId={props.content.id} />
    }
    case 'obj': {
      return (
        <ObjContentEditor
          contentId={props.content.id}
          showDemo={props.showObjContentDemo}
          onDemoFinish={props.onObjContentDemoFinish}
        />
      )
    }
    case 'picture': {
      return <PictureContentEditor contentId={props.content.id} />
    }
    default: {
      return null
    }
  }
}
