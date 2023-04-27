import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css'
import NavComp from './components/NavbarComponent'
import Sidebar from './components/SidebarComponent'
import FilmList from './components/FilmListComponent'

import { Container, Row } from 'react-bootstrap'

function App() {
  return (
  <>
    <NavComp></NavComp>
    <Container className='flex'>
      <Row>
        <Sidebar></Sidebar>
        <FilmList></FilmList>
      </Row>
    </Container>
  </>
  )
}

export default App

