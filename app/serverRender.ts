import { RenderOptions, render } from '@testing-library/react'
import React from 'react'
import { renderToPipeableStream } from 'react-dom/server'
import { Writable } from 'stream'

class HtmlWritable extends Writable {
  chunks = new Array<any>()
  html = ''

  _write(
    chunk: any,
    encoding: BufferEncoding,
    callback: (error?: Error) => void
  ) {
    this.chunks.push(chunk)
    callback()
  }

  _final(callback: () => void) {
    this.html = Buffer.concat(this.chunks).toString()
    callback()
  }
}

export default async function serverRender(
  ui: React.ReactElement,
  { wrapper: WrapperComponent, ...options }: Omit<RenderOptions, 'hydrate'> = {}
) {
  const wrapUiIfNeeded = (innerElement: React.ReactNode) =>
    WrapperComponent
      ? React.createElement(WrapperComponent, null, innerElement)
      : innerElement

  document.write(
    await new Promise((resolve, reject) => {
      const { pipe } = renderToPipeableStream(wrapUiIfNeeded(ui), {
        async onAllReady() {
          const writable = new HtmlWritable()
          pipe(writable)
          writable.on('finish', () => resolve(writable.html))
        },
        onShellError(error) {
          reject(error)
        },
        onError(error) {
          reject(error)
        },
      })
    })
  )

  return render(ui, { hydrate: true, ...options })
}
