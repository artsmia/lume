import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList
} from 'graphql'
import organizationType from './organization'
import {RoleEnum} from './enums'
import User_Organization from '../../db/models/User_Organization'
import Organization from '../../db/models/Organization'


const user = new GraphQLObjectType({
  name: "user",
  fields: () => ({
    id: {
      type: GraphQLID
    },
    email: {
      type: GraphQLString
    },
    organizations: {
      type: new GraphQLList(organizationType),
      async resolve({id}, args, ctx){
        try {
          const userOrgs = await User_Organization.findAll({
            where: {
              userId: id
            },
            include: [{
              model: Organization,
              as: 'organization'
            }]
          })
          let orgs = userOrgs.map( org => ({
            ...org.organization.dataValues,
            role: org.role
          }))

          console.log(orgs)

          return orgs
        } catch (ex) {
          console.error(ex)
        }
      }
    },
    name: {
      type: new GraphQLObjectType({
        name: 'name',
        fields: ()=>({
          given: {
            type: GraphQLString
          },
          family: {
            type: GraphQLString
          },
        })
      })
    },
    picture: {
      type: GraphQLString
    },
    role: {
      type: RoleEnum
    }
  })
})

export default user
