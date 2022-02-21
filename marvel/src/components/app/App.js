import { Component } from "react";

import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";

import decoration from '../../resources/img/vision.png';


class App extends Component {
    state = {
        selectedChar: null
    }

    onCharSelected = (id) => {
        this.setState({
            selectedChar: id
        })
    }

    render() {
        return (
            <div className="app" >
                <AppHeader />
                <main>
                    <ErrorBoundary>
                        <RandomChar />
                    </ErrorBoundary>
                    <div className="char__content">
                        <ErrorBoundary>
                            <CharList onCharSelected={this.onCharSelected} />
                        </ErrorBoundary>
                        <ErrorBoundary>
                            <CharInfo charId={this.state.selectedChar} />
                        </ErrorBoundary>
                    </div>
                    <img className="bg-decoration" src={decoration} alt="vision" />
                </main>
            </div>
        )
    }
}


export default App;

// import React, { Component, createRef } from 'react';
// import { Container } from 'react-bootstrap';
// // import './App.css';

// class Form extends Component {

//     // myRef = createRef();

//     // componentDidMount() {
//     //     this.myRef.current.focus();
//     // }

//     setInputRef = elem => {
//         this.myRef = elem;
//     }

//     focusFirstTI = () => {
//         if (this.myRef) {
//             this.myRef.focus();
//         }
//     }

//     render() {
//         return (
//             <Container>
//                 <form className="w-50 border mt-5 p-3 m-auto">
//                     <div className="mb-3">
//                         <label htmlFor="exampleFormControlInput1" className="form-label">Email address</label>
//                         <input
//                             ref={this.setInputRef}
//                             type="email"
//                             className="form-control"
//                             id="exampleFormControlInput1"
//                             placeholder="name@example.com" />
//                     </div>
//                     <div className="mb-3">
//                         <label htmlFor="exampleFormControlTextarea1" className="form-label">Example textarea</label>
//                         <textarea onClick={this.focusFirstTI} className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
//                     </div>
//                 </form>
//             </Container>
//         )
//     }
// }


// function App() {
//     return (
//         <Form />
//     );
// }

// export default App;



// import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
// import { Container } from 'react-bootstrap';
// // import './App.css';

// class Form extends Component {

//     handleClick = () => {
//         console.log('click');
//     }

//     render() {
//         return (
//             <Container>
//                 <form onClick={this.handleClick} className="w-50 border mt-5 p-3 m-auto"
//                     style={{
//                         'overflow': 'hidden',
//                         'position': 'relative'
//                     }}>
//                     <div className="mb-3">
//                         <label htmlFor="exampleFormControlInput1" className="form-label">Email address</label>
//                         <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
//                     </div>
//                     <div className="mb-3">
//                         <label htmlFor="exampleFormControlTextarea1" className="form-label">Example textarea</label>
//                         <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
//                     </div>
//                     <Portal>
//                         <Msg />
//                     </Portal>
//                 </form>
//             </Container>
//         )
//     }
// }

// const Portal = (props) => {
//     const node = document.createElement('div');
//     document.body.appendChild(node);

//     return ReactDOM.createPortal(props.children, node);

// }


// const Msg = () => {
//     return (
//         <div
//             style={{
//                 'width': '500px',
//                 'height': '150px',
//                 'backgroundColor': 'red',
//                 'position': 'absolute',
//                 'right': '0',
//                 'bottom': '0'
//             }}>
//             Hello
//         </div>
//     )
// }

// function App() {
//     return (
//         <Form />
//     );
// }

// export default App;


