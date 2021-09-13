import { getIsNeedRendering } from '../utils/render.js'

export default function Breadcrumb({ $target, initialState, onClick }) {
  const $breadcrumb = document.createElement('nav')
  $breadcrumb.className = 'Breadcrumb'
  $target.appendChild($breadcrumb)

  this.state = initialState

  this.setState = (nextState) => {
    if (getIsNeedRendering(this.state, nextState)) {
      this.state = nextState
      this.render()
    }
  }

  this.render = () => {
    $breadcrumb.innerHTML = `
      <div class="Breadcrumb__item">Root</div>
      ${this.state
        .map(
          ({ id, name }) =>
            `<div class="Breadcrumb__item" data-id="${id}">${name}</div>`,
        )
        .join('')}   
    `
  }

  $breadcrumb.addEventListener('click', (e) => {
    const $breadcrumbItem = e.target.closest('.Breadcrumb__item')

    const { id } = $breadcrumbItem.dataset

    onClick(id)
  })

  this.render()
}
