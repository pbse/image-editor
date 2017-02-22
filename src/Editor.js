/* This file contains the Library
   It produces Image Editing Functionality
*/

import React from 'react'
import AvatarEditor from 'react-avatar-editor'
import CanvasRect from '../src/CanvasRect'


class Editor extends React.Component {
  
  constructor(props) {
    super(props);
    
    this.state = {
      position: { x: 0.5, y: 0.5 },
      scale: this.props.scale,
      rotate: this.props.scale,
      borderRadius: this.props.borderRadius,
      preview: null,
      width: this.props.width,
      height: this.props.height
    };
  }

  /* Call to Save Function
     Here the data can be passed
     To Server
     Internal Call to Library
  */

  handleSave = (data) => {
    const img = this.editor.getImageScaledToCanvas().toDataURL()
    const rect = this.editor.getCroppingRect()

    this.setState({
      preview: img,
      croppingRect: rect
    })
  }

  // Function to handle Scaling

  handleScale = (e) => {
    const scale = parseFloat(e.target.value)
    this.setState({ scale })
  }

  // Function to handle Rotation

  rotateLeft = (e) => {
    e.preventDefault()

    this.setState({
      rotate: this.state.rotate - 90
    })
  }

  rotateRight = (e) => {
    e.preventDefault()
    this.setState({
      rotate: this.state.rotate + 90
    })
  }

  // Function to handle Border Radius

  handleBorderRadius = (e) => {
    const borderRadius = parseFloat(e.target.value)
    this.setState({ borderRadius })
  }

  // Function to handle X Side of Image

  handleXPosition = (e) => {
    const x = parseFloat(e.target.value)
    this.setState({ position: { ...this.state.position, x } })
  }

  // Function to handle Y Side Of Image

  handleYPosition = (e) => {
    const y = parseFloat(e.target.value)
    this.setState({ position: { ...this.state.position, y } })
  }

  // Function to check Width

  handleWidth = (e) => {
    const width = parseFloat(e.target.value)
    this.setState({ width })
  }

  // Function to check Height

  handleHeight = (e) => {
    const height = parseFloat(e.target.value)
    this.setState({ height })
  }

  // Internal call to Library

  setEditorRef = (editor) => {
    if (editor) this.editor = editor
  }

  // Function to handle Position Change

  handlePositionChange = position => {
    this.setState({ position })
  }

  render () {
    return (
      <div>
      <div className="col-md-5">
        <AvatarEditor
          ref={this.setEditorRef}
          scale={parseFloat(this.state.scale)}
          width={this.state.width}
          height={this.state.height}
          position={this.state.position}
          onPositionChange={this.handlePositionChange}
          rotate={parseFloat(this.state.rotate)}
          borderRadius={this.state.borderRadius}
          onSave={this.handleSave}
          image={this.props.image}
        />
        <br />
        <label>Zoom:</label>
        <input
          name="scale"
          type="range"
          onChange={this.handleScale}
          min="1"
          max="2"
          step="0.01"
          defaultValue="1"
        />
        <br />
        <label>Border radius:</label>
        <input
          name="scale"
          type="range"
          onChange={this.handleBorderRadius}
          min="0"
          max="100"
          step="1"
          defaultValue="0"
        />
        <br />
        <label>Width:</label>
        <input
          name="width"
          type="number"
          onChange={this.handleWidth}
          min="50"
          max="300"
          step="10"
          className="form-control"
          value={this.state.width}
        />
        <br />
        <label>Height:</label>
        <input
          name="height"
          type="number"
          onChange={this.handleHeight}
          min="50"
          max="300"
          step="10"
          className="form-control"
          value={this.state.height}
        />
        <br />
        <label>X Position:</label>
        <input
          name="scale"
          type="range"
          onChange={this.handleXPosition}
          min="0"
          max="1"
          step="0.01"
          value={this.state.position.x}
        />
        <br />
        <label>Y Position:</label>
        <input
          name="scale"
          type="range"
          onChange={this.handleYPosition}
          min="0"
          max="1"
          step="0.01"
          value={this.state.position.y}
        />
        <br />
        <label>Rotate:</label>&nbsp;&nbsp;
        <button className="btn btn-primary" onClick={this.rotateLeft}>Left</button>&nbsp;&nbsp;
        <button className="btn btn-primary" onClick={this.rotateRight}>Right</button>
        <br />
        <br />
        <input className="btn btn-success" type="button" onClick={this.handleSave} value="Preview" />
        <br />
        </div>
        <div className="col-md-5">
        <img
          src={this.state.preview}
          style={{ borderRadius: `${(Math.min(this.state.height, this.state.width) + 10) * ((this.state.borderRadius / 2) / 100)}px` }}
        />
        </div>

        {this.state.croppingRect ? 
          <CanvasRect
            width={200 * 478 / 270}
            height={250}
            image={this.props.image}
            rect={this.state.croppingRect}
            style={{margin: '20px'}}
          />
          :
          null}
      </div>
    )
  }
}

export default Editor;