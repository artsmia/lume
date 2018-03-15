import React, {Component} from 'react'
import styled from 'styled-components'
import {Table, HeaderRow, HeaderCell, BodyRow, BodyCell, TableThumb, Sorter} from '../../mia-ui/tables'
import {Link, NextA} from '../../mia-ui/links'
import {Button} from '../../mia-ui/buttons'
import PropTypes from 'prop-types'
import getImageSrc from '../../../utils/getImageSrc'

export default class StoryList extends Component {

  static defaultProps = {
    stories: []
  }

  static propTypes = {
    stories: PropTypes.array.isRequired,
  }

  state = {
    variables: this.props.variables
  }


  render() {
    const {
      handleLoadMore,
      handleSort,
      props: {
        stories,
        router: {
          query: {
            subdomain
          }
        },
        organization,
      },
      state: {
        variables
      }
    } = this

    return (
      <Table>

        <HeaderRow>
          <HeaderCell
            width={[1/3,1/6]}
          >

          </HeaderCell>
          <HeaderCell
            width={[1/3, 1/3]}
          >
            Title
            <Sorter
              variables={variables}
              column={'title'}
              upValue={'ASC'}
              downValue={'DESC'}
              onSort={handleSort}
            />
          </HeaderCell>
          <HeaderCell
            width={[0,1/3]}
          >
            Template
          </HeaderCell>
          <HeaderCell
            width={[1/6,1/6]}
          >
            Last Updated
            <Sorter
              variables={variables}
              column={'updatedAt'}
              upValue={'ASC'}
              downValue={'DESC'}
              onSort={handleSort}
            />
          </HeaderCell>
        </HeaderRow>

        {stories ? stories.map(({
          id: storyId,
          previewImage,
          title,
          updatedAt,
          template
        }) => (
          <BodyRow
            key={storyId}
          >
            <BodyCell
              width={[1/3,1/6]}
            >
              {previewImage ? (
                <NextA
                  href={{
                    pathname: "/cms/edit",
                    query: {
                      subdomain,
                      storyId
                    }
                  }}
                  as={`/${subdomain}/cms/${storyId}`}
                >
                  <TableThumb
                    src={getImageSrc({
                      image: previewImage,
                      organization,
                      quality: 's'
                    })}
                  />
                </NextA>
              ):null}
            </BodyCell>
            <BodyCell
              width={[1/3, 1/3]}
            >
              <Link
                href={{
                  pathname: "/cms/edit",
                  query: {
                    subdomain,
                    storyId
                  }
                }}
                as={`/${subdomain}/cms/${storyId}`}
              >
                {title}
              </Link>
            </BodyCell>
            <BodyCell
              width={[0,1/3]}
            >
              {template}
            </BodyCell>
            <BodyCell
              width={[1/6,1/6]}
            >
              {new Date(updatedAt).toLocaleDateString()}
            </BodyCell>
          </BodyRow>
        )):null}

      </Table>


    )
  }

  handleSort = ({column, newValue}) => {
    this.setState(
      (prevState) => {
        let variables = {...this.props.variables}

        for (let [index, order] of variables.filter.order.entries()){
          if (order.column === column){
            variables.filter.order.splice(index,1)
            variables.filter.order.unshift({
              column,
              direction: newValue
            })
            return {
              variables
            }
          }


        }

        variables.filter.order.unshift({
          column,
          direction: newValue
        })


        return {
          variables
        }

      },
      ()=>{
        this.props.refetch(this.state.variables)
      }
    )

  }

  handleLoadMore = async () => {
    try {

      const {
        props: {
          fetchMore,
          stories
        },
        state: {
          variables
        }
      } = this

      let newVariables = {
        filter: {
          ...variables.filter,
          limit: variables.filter.limit,
          offset: this.props.stories.length,
        }
      }

      fetchMore({
        variables: newVariables,
        updateQuery: (previousResult, { fetchMoreResult }) => {
          if (!fetchMoreResult) { return previousResult }

          return Object.assign({}, previousResult, {
            stories: [...previousResult.stories, ...fetchMoreResult.stories]
          })
        },
      })
    } catch (ex) {
      console.error(ex)
    }
  }

}


// <Table>
//   <Header
//     hasSearch
//     columns={[
//       {
//         title: "",
//         width: "100px"
//       },
//       {
//         title: "Title",
//         column: "title",
//         upDirection: "DESC",
//         downDirection: "ASC"
//       },
//       {
//         title: "Last Update",
//         column: "updatedAt",
//         upDirection: "ASC",
//         downDirection: "DESC",
//         width: "130px"
//       }
//     ]}
//     variables={variables}
//     onVariablesChange={handleVariableChange}
//   />
//   {
//     (stories) ? (
//       <Body>
//         {stories.map(
//           ({
//             previewImage,
//             id: storyId,
//             title,
//             updatedAt,
//           }) => (
//             <Link
//               href={{
//                 pathname: "/cms/edit",
//                 query: {
//                   subdomain,
//                   storyId
//                 }
//               }}
//               as={`/${subdomain}/cms/${storyId}`}
//               key={storyId}
//             >
//               <Row>
//                 <Cell
//                   width={"100px"}
//                 >
//                   {previewImage ? (
//                     <Image
//                       imageId={previewImage.id}
//                       size={"50px"}
//                       thumb
//                     />
//                   ):(<NoThumb/>)}
//
//                 </Cell>
//                 <Cell>
//
//                     {title}
//
//                 </Cell>
//                 <Cell
//                   width={"130px"}
//                 >
//                   {new Date(updatedAt).toLocaleDateString()}
//                 </Cell>
//               </Row>
//             </Link>
//         ))}
//         <Button
//           onClick={handleLoadMore}
//         >
//           Load More
//         </Button>
//       </Body>
//     ): <Spinner/>
//   }
// </Table>
