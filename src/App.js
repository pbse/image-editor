// Entrance File For This App

import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import Editor from '../src/Editor'
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';

class App extends Component {
  
  constructor(props){
    super(props);

    this.state = {
      uploadedFile: null,
    };
  }

  /* Function to save Image
     Could write logic to 
     save it in server by 
     making a post call
  */ 
  
  onImageDrop(files) {
    this.setState({
      uploadedFile: files[0]
    });
  }

  render() {
    return (
      <div className="container">
      <div className="row">
      <form>
        <div className="FileUpload col-md-2">
          <Dropzone
            onDrop={this.onImageDrop.bind(this)}
            multiple={false}
            accept="image/*"
            style={{margin: '20px', width:'160px', height:'80px', border: '1px solid #CCC'}}>
            <div>Drop an image or click to select a file to upload.</div>
          </Dropzone>
        </div>

        <div className="imageDisplay col-md-10">
          {this.state.uploadedFile === null ? null :
          <div>
            <Editor
              image={this.state.uploadedFile.preview}
              width={250}
              height={250}
              borderRadius={0}
              scale={1}
              rotate={0}
            />
          </div>}
        </div>
      </form>
      </div>
      </div>
    )
  }
}

export default App;