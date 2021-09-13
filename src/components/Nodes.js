// import { getIsNeedRendering } from '../utils/render.js'

export default function Nodes({ $target, initialState, onPrevClick, onClick }) {
  const $nodes = document.createElement('div')
  $nodes.classList.add('Nodes')
  $target.appendChild($nodes)

  this.state = initialState

  this.setState = (nextState) => {
    // if (getIsNeedRendering(this.state, nextState)) {
    //   console.log('Nodes render')

    this.state = nextState
    this.render()
    // }
  }

  this.render = () => {
    const { isRoot, nodes } = this.state
    $nodes.innerHTML = `
      ${
        isRoot
          ? ''
          : `
        <div class="Node">
          <img src="https://cdn.roto.codes/images/prev.png" />
        </div>
      `
      }
      ${nodes
        .map(
          ({ id, type, name }) => `
            <div class="Node" data-id="${id}">
              <img src="${
                type === 'DIRECTORY'
                  ? 'https://cdn.roto.codes/images/directory.png'
                  : 'https://cdn.roto.codes/images/file.png'
              }" />
              ${name}
            </div>
            `,
        )
        .join('')}
    `
  }

  this.render()

  $nodes.addEventListener('click', (e) => {
    const $node = e.target.closest('.Node')
    const { id } = $node.dataset

    // api에서 넘어오는 id가 스트링이라 형변환 필요 없음
    const node = this.state.nodes.find((node) => node.id === id)
    if (node) {
      onClick(node)
    } else {
      onPrevClick()
    }
  })
}
