/* eslint-disable no-console */
import axios from 'axios'

import { DATA_ENTITY, FIELDS } from '../utils/constants'

export async function getUserData(ctx: Context) {
  const {
    clients: { masterdata },
  } = ctx

  const options = {
    method: 'GET',
    url: `https://${ctx.vtex.account}.vtexcommercestable.com.br/api/vtexid/pub/authenticated/user?authToken=${ctx.vtex.storeUserAuthToken}`,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Proxy-Authorization': ctx.vtex.authToken,
    },
  }

  const user = await axios.request(options).then(res => {
    return res.data
  })

  console.log('USER', user)

  if (!user) {
    ctx.status = 200
    ctx.body = []

    return
  }

  const result = await masterdata.searchDocuments({
    dataEntity: DATA_ENTITY,
    fields: FIELDS,
    schema: 'mdv1',
    where: `userId=${user.userId}`,
    pagination: {
      page: 1,
      pageSize: 10,
    },
  })

  console.log('RESULT', result)

  ctx.status = 200
  ctx.body = result
}
