import React, {useRef} from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal} from './components/modal';
import {Loader} from './components/loader';
import {Header} from './components/header';
import {Footer} from './components/footer';

import {IssContainer} from './components/iss-container';

import './App.css';

function App() {
  /**********MODAL MANAGEMENT********/
  const modal = useRef();
  const loader = useRef();

  //On modal show
  const onModalShow = (icon, title, content, buttons) => {
      modal.current.changeModal(icon, title, content, buttons);
  }

  //Hide main loader
  const onLoadEnd = () =>{
    loader.current.hideLoader();
  }

  /**********MODAL MANAGEMENT END********/


  return (
    <div className="App">
      <Header />
      <IssContainer onModalShow={onModalShow} onLoadEnd={onLoadEnd}/>
      <Loader ref={loader} />
      <Modal ref={modal} />
      <Footer />
    </div>
  );
}

export default App;
