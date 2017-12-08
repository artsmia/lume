import React, {Component} from 'react'
import styled from 'styled-components'
import {s3Url} from '../../config'
import Link from 'next/link'
import Image from '../../shared/Image'
import PropTypes from 'prop-types'
import {Button} from '../../ui/buttons'
import {Row} from '../../ui/layout'

export default class ObjList extends Component {

  static displayName = "ObjList"

  static propTypes = {
    search: PropTypes.string,
    data: PropTypes.object,
  }


  render(){

    if (this.props.data.loading) return null

    const {
      props: {
        data: {
          objs,
          fetchMore
        },
        subdomain
      }
    } = this
    return (
      <ObjsContainer>
        {objs.map((obj, index) => (
          <Link
            key={index}
            href={{
              pathname: 'lume/obj',
              query: {
                subdomain: subdomain,
                objId: obj.id
              }
            }}
            as={`/${subdomain}/obj/${obj.id}`}
          >
            <ImageLink>
              {(obj.mainImage) ? (
                <Image
                  imageId={obj.mainImage.id}
                  height={"200px"}
                  quality={"m"}
                />
              ): (
                <NoImage>
                  {(obj.title) ? obj.title : ""}
                </NoImage>
              )}
            </ImageLink>
          </Link>
        ))}
        {(objs.length <= 20) ? (
          <Row>
              <Button
                color={"white"}
                onClick={()=>{
                  fetchMore({
                    variables: {
                      filter: {
                        limit: 20,
                        offset: objs.length,
                      },
                    },
                    updateQuery: (previousResult, { fetchMoreResult }) => {
                      if (!fetchMoreResult) { return previousResult }

                      return Object.assign({}, previousResult, {
                        objs: [...previousResult.objs, ...fetchMoreResult.objs]
                      })
                    },
                  })
                }}
              >
                Load More
              </Button>
          </Row>
        ) : null}
      </ObjsContainer>
    )
  }
}

const ImageLink = styled.a`
  cursor: pointer;
`

const ObjsContainer = styled.div`
  min-height: 100vh;
  width: 100%;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  align-content: flex-start;
  flex-wrap: wrap;
  padding: 20px;
  box-sizing: border-box;
`

const NoImage = styled.div`
  height: 200px;
  width: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid grey;
`
