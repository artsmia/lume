import User_Organization from '../../db/models/User_Organization'
import Organization from '../../db/models/Organization'
import {retrieveUserProfile} from './user'
import sendEmail from '../../mailgun'
import mjml2html from 'mjml'

export default async function(src, {organization,userId, role}, ctx){
  try {

    const org = await Organization.findOne({
      where: {
        ...organization,
      }
    })

    let userOrg = await User_Organization.findOne({
      where: {
        userId,
        organizationId: org.id
      }
    })

    if (userOrg){

      if (
        userOrg.role === 'pending' &&
        role !== 'pending'
      ) {

        await notifyNewlyApprovedUser({
          org,
          userId
        })
      }

      await userOrg.update({
          role,
          organizationId: org.id,
          userId,
        },
      )


    } else {
      await User_Organization.create({
        userId,
        organizationId: org.id,
        role
      })

      if (role === 'pending'){
        await notifyAdminsOfPending(org)
      }
    }

    userOrg = await User_Organization.findOne({
      where: {
        userId,
        organizationId: org.id
      }
    })

    let user = {
      id: userOrg.userId,
      role: userOrg.role,
    }

    let profile = await retrieveUserProfile(user.id)

    Object.assign(user, profile)

    return user

  } catch (ex) {
    console.error(ex)
  }
}


function adminEmail({admin, org}) {
  return mjml2html(`
    <mjml>
      <mj-body>
        <mj-section>
          <mj-column>
            <mj-text>

              A new user has joined your Lume organization, ${org.name}.

              Go to your organization's <a href="https://lume.space/cms/${org.subdomain}/settings">settings panel</a> to approve them.
            </mj-text>
          </mj-column>
        </mj-section>
      </mj-body>
    </mjml>
  `)
}

const notifyAdminsOfPending = async (org) =>{
  try {
    let admins = await User_Organization.findAll({
      where: {
        organizationId: org.id,
        role: 'admin'
      }
    })

    admins = await Promise.all(
      admins.map(admin => retrieveUserProfile(admin.userId))
    )

    await Promise.all(
      admins.map(admin => {

        const {html} = adminEmail({
          admin,
          org
        })

        return sendEmail({
          to: admin.email,
          subject: "New User Pending Approval",
          html
        })
      })
    )


  } catch (ex) {
    console.error(ex)
  }
}


function pendingEmail({user,org}){
  return mjml2html(`
    <mjml>
      <mj-body>
        <mj-section>
          <mj-column>
            <mj-text>

              Your request to join ${org.name} has been approved.

              Head over to <a href="https://lume.space/cms/${org.subdomain}">your organization's home</a> to start working on a story now!

            </mj-text>
          </mj-column>
        </mj-section>
      </mj-body>
    </mjml>
  `)
}


const notifyNewlyApprovedUser = async ({userId, org}) => {
  try {

    let user = await retrieveUserProfile(userId)

    let email = pendingEmail({
      user,
      org
    })

    const {html} = pendingEmail({
      user,
      org
    })

    await sendEmail({
      to: user.email,
      subject: `Welcome to ${org.name}!`,
      html
    })

  } catch (ex) {
    console.error(ex)
  }
}
