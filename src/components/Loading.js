// import { getIsNeedRendering } from '../utils/render.js'

export default function Loading({ $target }) {
  const $loading = document.createElement('div')
  $loading.className = 'Loading Modal'

  $target.appendChild($loading)

  this.state = false

  this.setState = (nextState) => {
    // if (getIsNeedRendering(this.state, nextState)) {
    //   console.log('Loading render')

    this.state = nextState
    this.render()
    // }
  }

  this.render = () => {
    $loading.innerHTML = `
      <div>
        <img width="100%" src="https://cdn.roto.codes/images/nyan-cat.gif" alt="loading..." />
      </div>   
    `
    $loading.style.display = this.state ? 'block' : 'none'
  }
}
