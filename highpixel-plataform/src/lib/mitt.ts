import mitt from "mitt"

export type Events = {
  logout: undefined
}

export const emitter = mitt<Events>();