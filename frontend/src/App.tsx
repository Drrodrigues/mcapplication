//import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import React, { useEffect } from 'react'
import { Consumer } from './model/Consumer';
import { useState } from 'react';
import { Accordion, Button, Card, Col, Image, Offcanvas, Row } from 'react-bootstrap';
import { Address, AddressType } from './model/Address';
import contactImage from './resources/Contact.png';
import billingImage from './resources/billing.png';
import shippingImage from './resources/shipping.png';
import deleteIcon from './resources/delete-icon.png';
import editIcon from './resources/edit-icon.png';

import ConsumerComponent from './components/ConsumerComponent';
import consumerService from './services/ConsumerService';

const App: React.FC = () => {

  const EMPTY_ADDRESS : Address = {id: '',street: '',floor: '',city: '',state: '',zipCode: '',type: AddressType.BILLING,country: 'US'};
  const EMPTY_CONSUMER : Consumer = {addresses: [EMPTY_ADDRESS], firstName:'', id:'', lastName:''};

  const [consumers, setConsumers] = useState<Consumer[]>([]);
  const [show, setShow] = useState(false);
  const [currentData, setCurrentData] = useState(EMPTY_CONSUMER);


  const handleClose = () => {
    setShow(false);
    setCurrentData(EMPTY_CONSUMER);
  }
  const handleShow = () => setShow(true);

  useEffect(() => {
    // declare the async data fetching function
    const fetchData = async () => {

      // set state with the result
      setConsumers(await consumerService.getAll());
    }

    // call the function
    fetchData()
      // make sure to catch any error
      .catch(console.error);;
  }, [currentData])


  return (
    <>
     <div className="d-grid gap-2">
    <Button variant="outline-success" onClick={handleShow} size="lg">
        Add consumer
      </Button>
      </div>
      <br/> 
      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
        </Offcanvas.Header>
        <Offcanvas.Body>
         <ConsumerComponent data={currentData} refreshFunction={setCurrentData} afterSubmit={handleClose}/>
        </Offcanvas.Body>
      </Offcanvas>

    <Row md={6} name="consumerSpace">
      {
        !consumers || consumers?.length === 0 ? <div>No consumers found</div> : consumers?.map((c, index) => {
          return (
            <>         
            <Col>
            <Card style={{ width: '18rem' }} data-cy-consumer={index}>
            <div className='d-flex justify-content-between'>

              <Card.Img variant="top" src={contactImage}  style={{width:'25%', marginLeft: 'auto', marginRight:'auto'}}/>
              <Card.Img variant="top" src={editIcon}  style={{width:'5%', height:'5%', cursor: 'pointer', marginRight: '2%'}} onClick={(e) => {
                setCurrentData(c);
                handleShow();
              }}/>
              <Card.Img variant="top" src={deleteIcon}  style={{width:'5%', height:'5%', cursor: 'pointer'}} onClick={(e) => consumerService.remove(c.id, (val: Date)=> setCurrentData(EMPTY_CONSUMER))}/>
              </div>
              <Card.Body>
                <Card.Title>{c.firstName} {c.lastName}</Card.Title>
                <Card.Text>
                 Address Information
                </Card.Text>
                {c.addresses.map(ad => {
                  return (<Accordion>
                    <Accordion.Item eventKey="0">
                      <Accordion.Header><Image src={ad.type === AddressType.BILLING ? billingImage: shippingImage}/></Accordion.Header>
                      <Accordion.Body>
                        {ad.street} - {ad.floor} <br />
                        {ad.state}<br />
                        {ad.city}<br />
                        {ad.zipCode}<br />
                        {ad.country}  <br />
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>);
                })}
              </Card.Body>
            </Card>
            </Col>
              </>
          )
        })
        }
         </Row>
    </>
  );
}
export default App;
