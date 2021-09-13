import Breadcrumb from './components/BreadCrumb.js'
import ImageViewer from './components/ImageViewer.js'
import Loading from './components/Loading.js'
import Nodes from './components/Nodes.js'

import { types } from './constants.js'
import { request } from './api.js'
import { validateKeys, validateTypes } from './utils/validate.js'

const appStateTypes = {
  isRoot: types.BOOLEAN,
  nodes: types.ARRAY,
  paths: types.ARRAY,
  isLoading: types.BOOLEAN,
  selectedImageUrl: [types.STRING, types.NULL],
}

export default function App({ $target }) {
  this.state = {
    isRoot: true,
    nodes: [],
    paths: [],
    isLoading: false,
    selectedImageUrl: null,
  }

  const loading = new Loading({
    $target,
    isLoading: this.state.isLoading,
  })

  const breadcrumb = new Breadcrumb({
    $target,
    initialState: this.state.paths,
    onClick: async (id) => {
      if (id) {
        const nextPaths = [...this.state.paths]
        const pathIndex = nextPaths.findIndex((path) => path.id === id)

        this.setState({
          ...this.state,
          paths: nextPaths.slice(0, pathIndex + 1),
        })
      } else {
        this.setState({
          ...this.state,
          paths: [],
        })
      }
      await fetchNodes(id)
    },
  })

  const nodes = new Nodes({
    $target,
    initialState: {
      isRoot: this.state.isRoot,
      nodes: this.state.nodes,
    },
    onPrevClick: async () => {
      const nextPaths = [...this.state.paths]
      nextPaths.pop()

      this.setState({
        ...this.state,
        paths: nextPaths,
      })

      if (nextPaths.length === 0) {
        await fetchNodes()
      } else {
        await fetchNodes(nextPaths[nextPaths.length - 1].id)
      }
    },
    onClick: async (node) => {
      if (node.type === 'DIRECTORY') {
        await fetchNodes(node.id)
        this.setState({
          ...this.state,
          paths: [...this.state.paths, node],
        })
      } else if (node.type === 'FILE') {
        this.setState({
          ...this.state,
          selectedImageUrl: node.filePath,
        })
      }
    },
  })

  const imageViewer = new ImageViewer({
    $target,
    onClose: () => {
      this.setState({
        ...this.state,
        selectedImageUrl: null,
      })
    },
  })

  this.setState = (nextState) => {
    validateKeys(appStateTypes, nextState)
    validateTypes(appStateTypes, nextState)

    this.state = nextState

    nodes.setState({
      isRoot: this.state.isRoot,
      nodes: this.state.nodes,
    })

    imageViewer.setState({
      selectedImageUrl: this.state.selectedImageUrl,
    })

    loading.setState(this.state.isLoading)

    breadcrumb.setState(this.state.paths)
  }

  const fetchNodes = async (id) => {
    this.setState({
      ...this.state,
      isLoading: true,
    })

    const nodes = await request(id ? `/${id}` : `/`)

    this.setState({
      ...this.state,
      nodes,
      isRoot: id ? false : true,
      isLoading: false,
    })
  }

  fetchNodes()
}
