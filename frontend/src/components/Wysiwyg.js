import React, { Component } from 'react';

import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

/** App.js => Body.js => AttractionBox.js => Wysiwyg.js*/
class Wysiwyg extends Component {
    state ={
        editorState: EditorState.createEmpty(),
    }
    
      onEditorStateChange = (editorState) => {
          console.log()
        this.setState({ editorState : editorState });
      };
    
      render() {
        return (
            <div id="editorWysiwyg">
                <Editor
                    editorState={this.state.editorState}
                    wrapperClassName="demo-wrapper"
                    editorClassName="demo-editor"
                    onEditorStateChange={this.onEditorStateChange} />
            </div>
         
        )
      }
  }
  
  export default Wysiwyg;