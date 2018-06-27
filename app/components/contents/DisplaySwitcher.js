import ComparisonContentDisplay from './comparison/Display'
import DetailContentDisplay from './detail/Display'
import MovieContentDisplay from './movie/Display'
import ObjContentDisplay from './obj/Display'
import PictureContentDisplay from './picture/Display'
import MapContentDisplay from './map/MapDisplay'

export default ({ content }) => {
  switch (content.type) {
    case 'comparison': {
      return <ComparisonContentDisplay content={content} />
    }
    case 'detail': {
      return <DetailContentDisplay content={content} />
    }
    case 'movie': {
      return <MovieContentDisplay content={content} />
    }
    case 'obj': {
      return <ObjContentDisplay content={content} />
    }
    case 'picture': {
      return <PictureContentDisplay content={content} />
    }
    case 'map': {
      return <MapContentDisplay content={content} />
    }
    default: {
      return null
    }
  }
}
