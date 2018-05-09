import React, {Component} from 'react'
import styled from 'styled-components'
import ThemeProvider from '../../mia-ui'
import {DragDropContextProvider} from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import {Flex, Box} from 'grid-styled'
import Link from 'next/link'
import {Icon} from '../../mia-ui/icons'
import {CheckboxInput} from '../../mia-ui/forms'

import Feedback from '../Feedback'
import Joyride from 'react-joyride'
import Floater from 'react-floater'

export default class Template extends Component {


  state = {
    message: "",
    menu: false,
  }


  showTips = ({target: {checked}}) => {
    this.props.showTips({show: checked})
  }

  render() {

    const {
      props,
      props: {
        children,
        user,
        tips,
        toolTips
      },
      state: {
        menu,
      },
      showTips
    } = this

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

                  { user.organizations ? user.organizations.map(({subdomain, id, name}) => (
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
                  )) : null}
                  <Hr/>
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
                  <Hr/>

                  <Item>
                    <span>Show Tips</span>
                    <input
                      type={'checkbox'}
                      checked={toolTips.show}
                      onChange={showTips}
                    />
                  </Item>
                  <Hr/>

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

            <Feedback
              user={user}
            />



            {/* <Joyride
              steps={toolTips.tips}
              run={toolTips.show}
              showSkipButton={true}
            /> */}

            {toolTips.show ? toolTips.tips.map((tip, index) => (
              <Floater
                key={`tip.target-${index}`}
                target={tip.target}
                content={tip.content}
                placement={tip.placement}
                wrapperOptions={{
                  offset: -22,
                  placement: tip.placement,
                  position: true
                }}
              >
                <Tip>?</Tip>

              </Floater>
            )) : null}

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

const Tip = styled.span`
  background-color: ${({theme}) => theme.color.blue};
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  height: 30px;
  width: 30px;
  border-radius: 30px;
  font-size: 25px;
  opacity: .5;
  transition: .2s all;
  z-index: 3000;
  &:hover {
    opacity: 1;
  }
`

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

const Hr = styled.hr`
  width: 100%;
  margin: 0;
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
