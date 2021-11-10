import './App.css';
import React, {Component, useState} from 'react';
import { BrowserRouter as Router, Switch, Route, Link, useHistory } from "react-router-dom";

//Welcoming page
const Home = () =>{
  return(
    <>
    <br/><br/><br/>
    <h2 id='home'>
     <em>/* No Comment */ </em>  File Test 
    </h2><br/>
    <button className='link__home'><Link  to='/read-file'>
        Upload File
    </Link></button><br/>
    </>
  );
};

class Input extends Component{
  constructor(props){
    super(props);
    this.state = {
      fileName: '',
      fileContent: ''
    };
  }

  handleFile = e => {

    //file is targeted and saved into a variable
    const file = e.target.files[0];
    const reader = new FileReader();

    //file is read and will check the following conditions
    reader.readAsText(file);
    reader.onload = () => {
      this.setState({fileName: file.name, fileContent: reader.result});
      //checking if comments symbols are included
      if(reader.result.includes('//')){
        
        function stripMultilineComments(str) {
          let posOpen;
          let posClose;
        
          while ((posOpen = str.indexOf('/*')) !== -1) {
        
            posClose = Math.max(
              0, str.indexOf('*/', (posOpen + 2))
            ) || (str.length - 2);
        
            str = [
              str.substring(0, posOpen),
              str.substring(posClose + 2),
            ].join('');
          }
          return str;
        }
        function stripSingleLineComment(str) {
          let idx;
          if (
            (str.trim() !== '') &&
            ((idx = str.indexOf('//')) !== -1)
          ) {
            str = str.substring(0, idx);
          }
          return str;
        }
        
        function stripComments(value) {
          return stripMultilineComments(
            String(value)
          )
          .split('\n')
          .map(stripSingleLineComment)
          .join('\n');
        }

        var newText2 = stripComments(reader.result)
        
        //update the state of name and content after modification
        this.setState({fileName: file.name, fileContent: newText2})
        this.props.setFile(newText2)
      
      }
    }
    //basic error handler
    reader.onerror = () =>{
      console.log('File Error : ', reader.error)
    }
  }

  render(){
    return(
      <>
      <br/><br/><br/>
      <div className='upload_file'>
      <br/><br/>
      <h1>Choose a Text File to import</h1>
      <br/><br/>
      <label class="custom-file-upload">
      <input type='file' onChange={this.handleFile}></input>Choose File ↓</label><br/><br/><br/>
      <button className='btn_disp'><Link to='/output'>
        Show File →
      </Link></button>
      <p>{this.state.fileName}</p>
      </div>
      </>
    )
  }
}

//Display component displaying the file after modifications
const Display = (props) =>{
  return(
    <div className='display_page'>
      <br/><br/><br/>
    <h2>
      Display File
    </h2>
    <br/>
    <div className='text_content'>
      <p>{props.title}</p>
      <p>{props.file}</p>
    </div>
    </div>
  );
};

//simple navbar through links of the Router
const Navbar = () =>{
  return(
    <div className='navbar'>
    <br/>
    <Link to='/'>
        Home
    </Link><br/>
    <Link to='/read-file'>
        Upload File
    </Link><br/>
    <Link to='/output'>
        Display File
    </Link>
    </div>
  );
};



//Router and Switch statement to navigate through differents url
function App() {
  const [file, setFile] = useState("")
  return (
    
    <Router>
    <div id="navbar">
      <Navbar />
    </div>
    <Switch>
      <Route path='/' exact>
        <Home/>
      </Route>

      <Route path='/read-file' exact>
        <Input setFile= {setFile}/>
      </Route>

      <Route path='/output' exact>
        <Display file= {file}/>
      </Route>

    </Switch>
    </Router>
  );
}

export default App;
