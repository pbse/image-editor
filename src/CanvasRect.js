import React from 'react'

class CanvasRect extends React.Component {
  constructor(props){
    super(props)

    this.setCanvas = this.setCanvas.bind(this)
    this.handleImageLoad = this.handleImageLoad.bind(this)
    this.imgElement = null
  }

  componentDidMount = () => {
    this.redraw()
  }

  componentDidUpdate = () => {
    this.redraw()
  }

  setCanvas = (canvas) => {
    if (canvas) this.canvas = canvas
  }

  handleImageLoad = () => {
    const ctx = this.canvas.getContext('2d')
    const { rect, width, height} = this.props

    ctx.drawImage(this.imgElement, 0, 0, width, height)

    if (rect) {
      ctx.strokeStyle = 'red'
      ctx.strokeRect(
        Math.round(rect.x * width) + 0.5,
        Math.round(rect.y * height) + 0.5,
        Math.round(rect.width * width),
        Math.round(rect.height * height)
      )
    }
  }

  redraw = () => {
    const img = new Image()
    img.src = this.props.image
    img.onload = this.handleImageLoad
    this.imgElement = img
  }

  render() {
    return (
      <canvas
        ref={this.setCanvas}
        style={this.props.style}
        width={this.props.width}
        height={this.props.height}
      />
    )
  }
}

export default CanvasRect;