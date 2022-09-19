import { Address } from "./Address"

export interface Consumer {
    firstName : string
    lastName: string
    id: string
    addresses: Address[]
}