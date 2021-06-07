import React, { FC } from 'react'
import { withAdmin } from 'src/components/hocs/withAuth'
import AdminBase from 'src/components/templates/AdminBase'

const Admin: FC = () => {
  return <AdminBase></AdminBase>
}

export default withAdmin(Admin)
