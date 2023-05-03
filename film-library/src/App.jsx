import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import dayjs from 'dayjs';

import './App.css'
import NavComp from './components/NavbarComponent'
import Sidebar from './components/SidebarComponent'
import FilmList from './components/FilmListComponent'
import FilmForm from './components/FilmFormComponent';
import FILMS from './films';

import { Row, Col, Button } from 'react-bootstrap'

import { useState } from 'react';

function App() {

  const [selectedFilter, setSelectedFilter] = useState('filter-all');
  const [showForm, setShowForm] = useState(false);

  const filters = [
    {label: 'All', id: "filter-all", filterFunction: () => true},
    {label: 'Favorites', id: "filter-favorites", filterFunction: (f) => f.favorite},
    {label: 'Best', id: "filter-best", filterFunction: (f) => f.rating == 5},
    {label: 'SeenLastMonth', id: "filter-seen-last-month", filterFunction: (f) => f.watchDate != undefined && dayjs(f.watchDate).month() == dayjs().month() - 1 },
    {label: 'Unseen', id: 'filter-unseen', filterFunction: (f) => f.watchDate === undefined},
  ]

  return (
    <>
      <NavComp/>

      <Row className='vh-100'>
        <Col md={4} xl={3} className='below-nav bg-light'>
          <Sidebar filters={filters} selected={selectedFilter} onSelect={setSelectedFilter} ></Sidebar>
        </Col>
        <Col className='below-nav'>
          <FilmList films={FILMS.filter(filters.find( (f) => f.id == selectedFilter ).filterFunction)} selectedFilter={filters.find( (f) => f.id == selectedFilter).label}/>
          {showForm ? 
            <FilmForm
              cancel={ () => setShowForm(false)}
            /> 
            : <Button variant="primary" size="lg" className="fixed-right-bottom" onClick={ () => {setShowForm(true)}}> + </Button>}
        </Col>
      </Row>
    </>
  )
}

export default App

