import React, {Component} from 'react'
import styled from 'styled-components'
import ThemeProvider from '../../mia-ui'
import {DragDropContextProvider} from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import {Flex, Box} from 'grid-styled'
import Link from 'next/link'
import {Icon} from '../../mia-ui/icons'

export default class Template extends Component {


  state = {
    message: "",
    menu: false
  }

  render() {

    const {
      props,
      props: {
        children,
        user
      },
      state: {
        menu
      }
    } = this

    console.log("Template rendered")

    return (
      <ThemeProvider>
        <DragDropContextProvider
          backend={HTML5Backend}
        >
          <div>
            {user ? (
              <div>
                <MenuCheck/>
                <Menu>
                  { user.organizations.map(({subdomain, id, name}) => (
                    <Item
                      key={id}
                    >
                      <Link
                        href={{
                          pathname: '/cms',
                          query: {
                            subdomain
                          }
                        }}
                        as={`/cms/${subdomain}`}
                      >
                        <A>
                          {name}
                        </A>
                      </Link>
                    </Item>
                  ))}
                  <Item>
                    <Link
                      href={{
                        pathname: '/cms/organizations',
                      }}
                      as={'/organizations'}
                    >
                      <A>
                        Join or Create an Organization
                      </A>
                    </Link>
                  </Item>
                  <Item>
                    <Link
                      href={'/logout'}
                    >
                      <A>
                        Logout
                      </A>
                    </Link>
                  </Item>
                </Menu>
                <ProfPic
                  src={user.picture}
                />
              </div>
            ): null}


            {children}

          </div>

        </DragDropContextProvider>
      </ThemeProvider>
    )
  }


  renderName = () => {
    const {
      user
    } = this.props

    if (user.name){
      return <Name>{user.name.given}</Name>
    } else {
      return <Name>{user.email}</Name>
    }
  }

}

const Menu = styled.ul`
  position: absolute;
  top: 58px;
  right: 10px;
  transition: all .2s;
  opacity: 0;
  width: 140px;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  list-style-type: none;
  padding: 0;
  margin: 0;
  background-color: white;
  border: 1px solid grey;
  border-radius: 5px;
`

const MenuCheck = styled.input`
  z-index: 3;
  position: absolute;
  top: 5px;
  right: 50px;
  width: 50px;
  height: 50px;
  opacity: 0;
  cursor: pointer;


  &:checked ~ ${Menu} {
    opacity: 1;
  }
`


MenuCheck.defaultProps = {
  type: 'checkbox'
}

const A = styled.a`
  width: 100%;
  border-radius: 4px;
  text-decoration: none;
  color: black;
  border-bottom: none;
  cursor: pointer;
`

const Item = styled.li`
  margin: 0;
  text-align: center;
  width: 100%;
  padding: 5px 0;
  font-size: 14px;
  transition: all .2s;
  &:hover{
    background-color: ${({theme}) => theme.color.gray30};
  }
`


const ProfPic = styled.img`
  height: 50px;
  width: 50px;
  border-radius: 50px;
  object-fit: cover;
  position: absolute;
  top: 5px;
  right: 50px;
`
