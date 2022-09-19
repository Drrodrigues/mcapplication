import "@testing-library/jest-dom/extend-expect";
import React from "react";
import { fireEvent, render, waitFor } from "@testing-library/react";
import { AddressType } from "../model/Address";
import ConsumerComponent from "./ConsumerComponent";

describe("List Consumers", () => {
  const address = {id: '', street: 'STREET', floor: 'FLOOR',city: 'CITY',state: 'AL',zipCode: 'ZIP',type: AddressType.BILLING,country: 'US'};
  const consumer =  {addresses: [address], firstName:'FIRST', id:'', lastName:''};

  it("check if component is ok", async () => {
    const { getByText, getByDisplayValue } = render(
        <ConsumerComponent
            data={consumer}
            afterSubmit={jest.fn()}
            refreshFunction={jest.fn()}
        />
    );
    const street = getByDisplayValue("STREET");
    const floor = getByDisplayValue("FLOOR");
    const city = getByDisplayValue("CITY");
    const state = getByDisplayValue("Alabama");
    const zip = getByDisplayValue("ZIP");
    const first= getByDisplayValue("FIRST");

    await waitFor(async () => {
      expect(first).toBeInTheDocument();
      expect(street).toBeInTheDocument();
      expect(floor).toBeInTheDocument();
      expect(city).toBeInTheDocument();
      expect(state).toBeInTheDocument();
      expect(zip).toBeInTheDocument();
    });
  });

  it("check if data is loaded ok", async () => {
    const { getByText } = render(
        <ConsumerComponent
            data={consumer}
            afterSubmit={jest.fn()}
            refreshFunction={jest.fn()}
        />
    );
    const title = getByText("Add Consumer");
    await waitFor(async () => {
      expect(title).toBeInTheDocument();
    });
  });

});
