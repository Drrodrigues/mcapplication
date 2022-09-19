export interface Address{
    id : string
    // US format according to UPS
    street : string
    floor : string
    city : string
    state : string
    zipCode: string
    type: AddressType
    //only US is required
    country : string
}

export enum AddressType {
    BILLING = 'BILLING',
    SHIPPING = 'SHIPPING'
  }