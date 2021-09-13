import { getIsNeedRendering } from '../utils/render.js'

export default function ImageViewer({ $target, onClose }) {
  const $imageViewer = document.createElement('div')
  $imageViewer.className = 'ImageViewer Modal'

  $target.appendChild($imageViewer)

  this.state = {
    selectedImageUrl: null,
  }

  this.setState = (nextState) => {
    if (getIsNeedRendering(this.state, nextState)) {
      this.state = nextState
      this.render()
    }
  }

  this.render = () => {
    $imageViewer.style.display = this.state.selectedImageUrl ? 'block' : 'none'

    if (this.state.selectedImageUrl) {
      $imageViewer.innerHTML = `
        <div class="content">
          <img src="https://cat-api.roto.codes/static${this.state.selectedImageUrl}" />
        </div>
      `
    }
  }

  this.render()

  window.addEventListener('keyup', (e) => {
    if (e.key === 'Escape') {
      onClose()
    }
  })

  $imageViewer.addEventListener('click', (e) => {
    if (Array.from(e.target.classList).includes('Modal')) {
      onClose()
    }
  })
}
