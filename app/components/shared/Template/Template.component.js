import React, { Component } from 'react'
import styled from 'styled-components'
import { Flex, Box } from 'grid-styled'
import Link from 'next/link'
import { Icon } from '../../mia-ui/icons'
import { CheckboxInput } from '../../mia-ui/forms'
import Joyride from 'react-joyride'
import Feedback from '../Feedback'
import Floater from 'react-floater'
import tours from './tours.js'

export default class Template extends Component {
  state = {
    message: '',
    menu: false,
    showTour: false,
    showTips: false,
    tourIndex: 0,
    tour: []
  }

  handleTourClick = () => {
    this.setState(
      ({ showTour }) => ({ showTour: !showTour }),
      () => {
        if (this.state.showTour) {
          switch (this.props.router.pathname) {
            case '/cms/organizations': {
              this.setState({ tour: tours.organizations })
              break
            }
            case '/cms': {
              let tour = tours.cmsHome.basic

              let org = this.props.user.organizations.find(
                org => org.subdomain === this.props.router.query.subdomain
              )

              if (org.role === 'admin') {
                tour.splice(1, 0, ...tours.cmsHome.adminOnly)
              }

              this.setState({ tour })
              break
            }
            case '/cms/edit': {
              this.setState({ tour: tours.editor.frankenstein })
              break
            }
            default: {
              break
            }
          }
        }
      }
    )
  }

  tourCallback = async e => {
    try {
      if (e.lifecycle === 'tooltip' && e.step.code) {
        await e.step.code()
      }
    } catch (ex) {
      console.error(ex)
    }
  }

  render() {
    const {
      props,
      props: { children, user, tutorial },
      state: { menu, showTips, showTour },
      handleTourClick,
      tourCallback
    } = this

    return (
      <div>
        <Container>
          <MenuCheck
            type={'checkbox'}
            onClick={() => {
              this.setState(({ menu }) => ({
                menu: !menu
              }))
            }}
            checked={this.state.menu}
          />
          <Menu>
            {user
              ? user.organizations.map(({ subdomain, id, name }) => (
                  <Item key={id}>
                    <Link
                      href={{
                        pathname: '/cms',
                        query: {
                          subdomain
                        }
                      }}
                      as={`/${subdomain}`}
                    >
                      <A>{name}</A>
                    </Link>
                  </Item>
                ))
              : null}
            {user ? <Hr /> : null}
            {user ? (
              <Item>
                <Link
                  href={{
                    pathname: '/cms/organizations'
                  }}
                  as={'/organizations'}
                >
                  <A>Join or Create an Organization</A>
                </Link>
              </Item>
            ) : null}

            {user ? <Hr /> : null}

            {/* <Item>
              <span>Show Tips</span>
              <input
                type={'checkbox'}
                checked={showTips}
                onChange={() => {
                  this.setState(({ showTips }) => ({ showTips: !showTips }))
                }}
              />
            </Item>
            <Item>
              <span>Show Tour</span>
              <input
                type={'checkbox'}
                checked={showTour}
                onChange={handleTourClick}
              />
            </Item> */}
            {user ? <Hr /> : null}
            {user ? (
              <Item>
                <Link href={'/logout'}>
                  <A>Logout</A>
                </Link>
              </Item>
            ) : (
              <Item>
                <Link href={'/login'}>
                  <A>Login or Signup</A>
                </Link>
              </Item>
            )}
          </Menu>
          <ProfPic src={user ? user.picture : '/static/placeholder0.png'} />
        </Container>

        {children}

        <Feedback user={user} />
        {showTour ? (
          <Joyride
            run={showTour}
            steps={this.state.tour}
            continuous
            callback={tourCallback}
          />
        ) : null}
      </div>
    )
  }

  renderName = () => {
    const { user } = this.props

    if (user.name) {
      return <Name>{user.name.given}</Name>
    } else {
      return <Name>{user.email}</Name>
    }
  }
}

const Tip = styled.span`
  background-color: ${({ theme }) => theme.color.blue};
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  height: 30px;
  width: 30px;
  border-radius: 30px;
  font-size: 25px;
  opacity: 1;
  transition: 0.2s all;
  z-index: 3000;
  &:hover {
    opacity: 1;
  }
`

const Menu = styled.ul`
  position: absolute;
  top: 58px;
  right: 10px;
  transition: all 0.2s;
  opacity: 0;
  width: 140px;
  flex-wrap: wrap;
  align-items: flex-start;
  list-style-type: none;
  padding: 0;
  margin: 0;
  background-color: white;
  border: 1px solid grey;
  border-radius: 5px;
  display: none;
  &:hover {
    opacity: 1;
    display: flex;
  }
`

const Container = styled.div`
  @media print {
    display: none;
  }
  font-family: ${({ theme }) => theme.font.light};
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

  ${'' /* &:focus ~ ${Menu} {
    opacity: 1;
    display: flex;
  } */}

  &:checked ~ ${Menu} {
    opacity: 1;
    display: flex;
  }


`

// MenuCheck.defaultProps = {
//   type: 'checkbox'
// }

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
  transition: all 0.2s;
  &:hover {
    background-color: ${({ theme }) => theme.color.gray30};
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
