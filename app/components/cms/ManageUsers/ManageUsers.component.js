import React, { Component } from 'react'
import styled from 'styled-components'
import { H2 } from '../../mia-ui/text'
import {
  Form,
  Label,
  Input,
  Select,
  Option,
  CheckboxInput
} from '../../mia-ui/forms'
import {
  Table,
  HeaderRow,
  HeaderCell,
  BodyRow,
  BodyCell,
  TableThumb,
  Sorter
} from '../../mia-ui/tables'
import { Button } from '../../mia-ui/buttons'
import { Flex, Box } from 'grid-styled'
import { Expander } from '../../mia-ui/expanders'

export default class ManageUsers extends Component {
  roles = ['admin', 'contributor', 'pending', 'remove']

  state = {
    selfId: ''
  }

  componentDidMount() {
    this.setState({ selfId: localStorage.getItem('userId') })
  }

  render() {
    if (!this.props.users) return null

    const {
      state: { selfId },
      props: { users },
      handleChange
    } = this

    let sortedUsers = users.slice().sort((a, b) => {
      if (a.role === 'pending') {
        return -1
      }
      return +1
    })

    return (
      <Expander header={<H2>Manage User Roles</H2>} open={true}>
        <Table>
          <HeaderRow>
            <HeaderCell w={[1 / 8]} />
            <HeaderCell w={[2 / 8]}>Name</HeaderCell>
            <HeaderCell w={[3 / 8]}>Email</HeaderCell>
            <HeaderCell w={[2 / 8]}>Role</HeaderCell>
          </HeaderRow>
          {sortedUsers
            ? sortedUsers.map(user => (
                <BodyRow key={user.id}>
                  <BodyCell w={[1 / 8]}>
                    <ProfPic src={user.picture} />
                  </BodyCell>
                  <BodyCell w={[2 / 8]}>
                    {user.name
                      ? `${user.name.given || ''} ${user.name.family || ''}`
                      : null}
                  </BodyCell>
                  <BodyCell w={[3 / 8]}>{user.email}</BodyCell>
                  <BodyCell w={[2 / 8]}>
                    <Select
                      value={user.role}
                      name={user.id}
                      onChange={handleChange}
                      disabled={selfId === user.id}
                    >
                      {this.roles.map(role => (
                        <Option key={role} value={role}>
                          {role}
                        </Option>
                      ))}
                    </Select>
                  </BodyCell>
                </BodyRow>
              ))
            : null}
        </Table>
      </Expander>
    )
  }

  handleChange = ({ target: { value, name } }) => {
    this.props.editUserOrganizationRole({
      userId: name,
      role: value
    })
  }
}

const ProfPic = styled.img`
  height: 50px;
  width: 50px;
  object-fit: cover;
`
