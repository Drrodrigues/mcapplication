import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Consumer } from '../model/Consumer';
import { ChangeEvent, useState } from 'react';
import { Figure } from 'react-bootstrap';
import consumerService from '../services/ConsumerService';
import { AddressType } from '../model/Address';



export interface ChildComponentProps {
    data: Consumer;
    refreshFunction: Function
    afterSubmit: Function
}

const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>, data: Consumer) => {
    const target = event.target;
    const obj: any = {}
    obj[target.name] = target.value;
    Object.assign(data, obj);
}

const handleAddressInputChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>, data: Consumer, index: number) => {
    const target = event.target;
    const obj: any = {}
    obj[target.name] = target.value;
    Object.assign(data.addresses[index], obj);
}


const ConsumerComponent: React.FC<ChildComponentProps> = ({ data, refreshFunction, afterSubmit }) => {

    const [, setState] = useState(new Date());

    return (
    <Form>
        <Row>
            <Form.Group as={Col} controlId="formGridFirstName" >
                <Form.Label>
                    First Name
                </Form.Label>
                <Form.Control type="text" placeholder="Enter First Name" defaultValue={data.firstName} name='firstName' onChange={e => handleInputChange(e, data)} />

            </Form.Group>

            <Form.Group as={Col} controlId="formGridLastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="text" placeholder="Enter Last Name" defaultValue={data.lastName} name='lastName' onChange={(e) => handleInputChange(e, data)} />
            </Form.Group>
        </Row>

        {
        data.addresses.map((ad, index) =>
            <>
            <hr/>
            <Button variant="outline-danger" size="sm" onClick={ (e) => {
                data.addresses = data.addresses.filter( address=> address.id !== ad.id);
                setState(new Date());
              }}>X</Button>
            Address {index + 1}                
            
                <Row>
                    <Col xs lg="8">
                        <Form.Group as={Col} controlId="formGridType">
                            <Form.Label>Type</Form.Label>
                            <Form.Select defaultValue={ad.type ? ad.type : "Choose..."} name='type' onChange={(e) => handleAddressInputChange(e, data, index)}>
                                <option value="Choose..." disabled selected>Choose...</option>
                                <option value="BILLING">Billing</option>
                                <option value="SHIPPING">Shipping</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col xs lg="8">
                        <Form.Group controlId="formGridStreet">
                            <Form.Label>Street</Form.Label>
                            <Form.Control type="text" placeholder="1234 Main St" name='street' defaultValue={ad.street} onChange={(e) => handleAddressInputChange(e, data, index)} />
                        </Form.Group>
                    </Col>
                    <Col xs lg="4">
                        <Form.Group controlId="formGridFloor">
                            <Form.Label>Floor</Form.Label>
                            <Form.Control type="text" placeholder="Apartment, studio, or floor" name='floor' defaultValue={ad.floor} onChange={(e) => handleAddressInputChange(e, data, index)} />
                        </Form.Group>
                    </Col>
                </Row>
                <Form.Group as={Col} controlId="formGridCity">
                    <Form.Label>City</Form.Label>
                    <Form.Control type="text" defaultValue={ad.city} name='city' onChange={(e) => handleAddressInputChange(e, data, index)} />
                </Form.Group>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridState">
                        <Form.Label>State</Form.Label>
                        <Form.Select defaultValue={ad.state ? ad.state : "Choose..."} name='state' onChange={(e) => handleAddressInputChange(e, data, index)}>
                            <option value="Choose..." disabled selected>Choose...</option>
                            <option value="AL">Alabama</option>
                            <option value="AK">Alaska</option>
                            <option value="AZ">Arizona</option>
                            <option value="AR">Arkansas</option>
                            <option value="CA">California</option>
                            <option value="CO">Colorado</option>
                            <option value="CT">Connecticut</option>
                            <option value="DE">Delaware</option>
                            <option value="DC">District Of Columbia</option>
                            <option value="FL">Florida</option>
                            <option value="GA">Georgia</option>
                            <option value="HI">Hawaii</option>
                            <option value="ID">Idaho</option>
                            <option value="IL">Illinois</option>
                            <option value="IN">Indiana</option>
                            <option value="IA">Iowa</option>
                            <option value="KS">Kansas</option>
                            <option value="KY">Kentucky</option>
                            <option value="LA">Louisiana</option>
                            <option value="ME">Maine</option>
                            <option value="MD">Maryland</option>
                            <option value="MA">Massachusetts</option>
                            <option value="MI">Michigan</option>
                            <option value="MN">Minnesota</option>
                            <option value="MS">Mississippi</option>
                            <option value="MO">Missouri</option>
                            <option value="MT">Montana</option>
                            <option value="NE">Nebraska</option>
                            <option value="NV">Nevada</option>
                            <option value="NH">New Hampshire</option>
                            <option value="NJ">New Jersey</option>
                            <option value="NM">New Mexico</option>
                            <option value="NY">New York</option>
                            <option value="NC">North Carolina</option>
                            <option value="ND">North Dakota</option>
                            <option value="OH">Ohio</option>
                            <option value="OK">Oklahoma</option>
                            <option value="OR">Oregon</option>
                            <option value="PA">Pennsylvania</option>
                            <option value="RI">Rhode Island</option>
                            <option value="SC">South Carolina</option>
                            <option value="SD">South Dakota</option>
                            <option value="TN">Tennessee</option>
                            <option value="TX">Texas</option>
                            <option value="UT">Utah</option>
                            <option value="VT">Vermont</option>
                            <option value="VA">Virginia</option>
                            <option value="WA">Washington</option>
                            <option value="WV">West Virginia</option>
                            <option value="WI">Wisconsin</option>
                            <option value="WY">Wyoming</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridZip">
                        <Form.Label>Zip</Form.Label>
                        <Form.Control type="text" defaultValue={ad.zipCode} name='zipCode' onChange={(e) => handleAddressInputChange(e, data, index)} />
                    </Form.Group>

                </Row>
                <Row>
                    <Form.Label>Country</Form.Label>
                    <Figure>
                        <Figure.Image
                            src={`https://flagcdn.com/48x36/${ad.country.toLowerCase()}.png`}
                        />
                    </Figure>
                </Row>

            </>
            
        )}
            <hr/>
              <Button variant="outline-secondary" onClick={ (e) => {
                data.addresses.push({id: '',street: '',floor: '',city: '',state: '',zipCode: '',type: AddressType.BILLING,country: 'US'});
                setState(new Date());
              }}>
                Add Address</Button>
                <hr/>       
         <Button variant="primary" onClick={ (e) => consumerService.create(data, () => {refreshFunction(data); afterSubmit()})}>
                    {data.id ? 'Update Consumer' : 'Add Consumer'}
                </Button>
    </Form >
);
}

export default ConsumerComponent;