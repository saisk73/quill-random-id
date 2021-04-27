import React, {component} from "react"
import ReactQuill, { Quill, Mixin, Toolbar }  from 'react-quill'; // ES6
import 'react-quill/dist/quill.snow.css';
import Track from "./plugin"
Quill.register('formats/block', Track);
// Quill.register(RetainClass)
class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = { text: ''}
    this.handleChange = this.handleChange.bind(this)
    this.getData = this.getData.bind(this)
    this.saveData = this.saveData.bind(this)
    // ref
    this.quillRef = null;      // Quill instance
    this.reactQuillRef = null; // ReactQuill component
  }
 
  componentDidMount() {
    this.attachQuillRefs()
  }
  
  componentDidUpdate() {
    this.attachQuillRefs()
  }

  handleChange(value) {
    this.setState({ text: value })
  }

  attachQuillRefs = () => {
    if (typeof this.reactQuillRef.getEditor !== 'function') return;
    this.quillRef = this.reactQuillRef.getEditor();
  }

  getData() {
    let deltas = localStorage.getItem("deltas")
    deltas = JSON.parse(deltas)
    this.quillRef.setContents(deltas)
  }
  
  saveData() {
    let deltas = this.quillRef.getContents()
    console.log(deltas)
    deltas = JSON.stringify(deltas)
    localStorage.setItem("deltas", deltas)
  }
 
  render() {
    return (
      <div>
        <button className="" onClick={this.getData}>GET</button>
        <button className="" onClick={this.saveData}>SAVE</button>
        
        <ReactQuill 
          ref={(el) => { this.reactQuillRef = el }}
          value={this.state.text}
          modules={App.modules}
          onChange={this.handleChange} />
      </div>
    )
  }
}

export default App;
