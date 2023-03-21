import type {
  ClientsConfig,
  Cached,
  RecorderState,
  ParamsContext,
} from '@vtex/api'
import { LRUCache, Service, method } from '@vtex/api'

import { queries } from './resolvers'
import { Clients } from './clients'
import { getUserData } from './controllers/getUserData'

const TIMEOUT_MS = 800
const memoryCache = new LRUCache<string, Cached>({ max: 5000 })

// metrics.trackCache('status', memoryCache)

declare let process: {
  env: {
    VTEX_APP_ID: string
  }
}

const clients: ClientsConfig<Clients> = {
  implementation: Clients,
  options: {
    default: {
      retries: 2,
      timeout: TIMEOUT_MS,
    },
    insiderServiceWorker: {
      memoryCache,
    },
  },
}

export default new Service<Clients, RecorderState, ParamsContext>({
  clients,
  graphql: {
    resolvers: {
      Query: { ...queries },
    },
  },
  routes: {
    userData: method({
      GET: [getUserData],
    }),
  },
})
