// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import {
  ClientsConfig,
  Cached,
  RecorderState,
  ParamsContext,
  LRUCache,
  Service,
  method,
} from '@vtex/api'

import { queries } from './resolvers'
import { Clients } from './clients'
import { getUserData } from './controllers/getUserData'

const TIMEOUT_MS = 800
const memoryCache = new LRUCache<string, Cached>({ max: 5000 })

// metrics.trackCache('status', memoryCache)

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
