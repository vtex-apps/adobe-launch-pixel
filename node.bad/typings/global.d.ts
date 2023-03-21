import type { RecorderState, ServiceContext } from '@vtex/api'

declare global {
  type Context = ServiceContext

  interface State extends RecorderState {
    locale: string
  }
}
