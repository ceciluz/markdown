import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import { marked } from 'marked'
import hljs from 'react-highlight-words'

const initialMarkdown =''

var renderer = new marked.Renderer()

renderer.link = function(href, title, text) {
  return `<a href=${href} target="_blank">${text}</a>`
}


marked.setOptions({
  renderer,
  highlight: function(code) {
    return hljs.highlightAuto(code).value
  },
  breaks: true
})

class App extends React.Component{

  constructor(props) {
    super(props)
    
    this.state = {
      markdown: initialMarkdown
    }
  }
  
  handleChange = e => this.setState({ markdown: e.target.value })

  render() {
    return(
     <div>
        <h1>Markdown Previewer</h1>
        <div className='container'>
          <div className='left'>
            <textarea id='editor' value={this.state.markdown} onChange={this.handleChange}/>
          </div>
          <div className='right'>
            <div id='preview' dangerouslySetInnerHTML={{__html: marked(this.state.markdown)}} />
          </div>
        </div>
      </div>
    )
  }
}
export default App;

ReactDOM.render(<App/>, document.getElementById('root'));