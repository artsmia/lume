import { compose, withApollo } from "react-apollo"
import Component from "./MediaManager.component"
import query from "../../../apollo/queries/medias"
import OrgQuery from "../../../apollo/queries/organization"

import { withRouter } from "next/router"

let ExportComponent = Component

ExportComponent = compose(query, OrgQuery)(ExportComponent)

ExportComponent = withRouter(ExportComponent)

export default ExportComponent
