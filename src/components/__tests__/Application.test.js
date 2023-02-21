import React from "react";

import axios from "axios";

import { 
  render, 
  cleanup, 
  waitForElement, 
  fireEvent, 
  getByText, 
  getAllByTestId, 
  getByAltText,
  getByPlaceholderText,
  queryByText,
  getByDisplayValue,
  mockRejectedValueOnce
} 
from "@testing-library/react";

import Application from "components/Application";

afterEach(cleanup);

describe("Application", () => {

  it("defaults to Monday and changes the schedule when a new day is selected", async () => {
    const { getByText } = render(<Application />);
  
    await waitForElement(() => getByText("Monday"))
  
    fireEvent.click(getByText("Tuesday"));
  
    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });
  
  it("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {  

    // Render the app
    const { container } = render(<Application />);

    // Wait for data to load
    await waitForElement(() => getByText(container, "Archie Cohen"));

    // From the array of appointments that this returns, use index 0 because it's interview is null
    const appointment = getAllByTestId(container, "appointment")[0];

    fireEvent.click(getByAltText(appointment, "Add"));

    // Enters the student name into the input field
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });

    // Selects an interviewer
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    fireEvent.click(getByText(appointment, "Save"));

    // Check that the SAVE visual state appears
    expect(getByText(appointment, "Saving...")).toBeInTheDocument();

    // Wait for the student name we inputted to appear in the appointment
    await waitForElement(() => queryByText(appointment, "Lydia Miller-Jones"));

    // Now we get the day with our appointment (Monday) so we can confirm that it's been booked
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );

    // Make sure our booked day's spots count went down by 1
    expect(getByText(day, "no spots remaining")).toBeInTheDocument();
  });

  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {

    const { container } = render(<Application />);
    await waitForElement(() => getByText(container, "Archie Cohen"));

    // Find the first appointment in the returned array that has a truthy Archie Cohen query
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );

    fireEvent.click(getByAltText(appointment, "Delete"));

    // Confirm that the visual state changes to the cancel confirm
    expect(getByText(appointment, "Confirm you want to cancel this appointment.")).toBeInTheDocument();

    fireEvent.click(getByText(appointment, "Confirm"));

    // Confirm that the visual state changes to the deleting spinner
    expect(getByText(appointment, "Deleting...")).toBeInTheDocument();

    // Wait for the blank appointment to appear
    await waitForElement(() => getByAltText(appointment, "Add"));

    const day = getAllByTestId(container, "day").find(day => 
      queryByText(day, "Monday")
    );
    expect(getByText(day, "2 spots remaining")).toBeInTheDocument();
  })

  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {

    const { container } = render(<Application />);
    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );

    fireEvent.click(getByAltText(appointment, "Edit"));

    // Checks what the value of the input field is for the matching appointment
    expect(getByDisplayValue(appointment, "Archie Cohen")).toBeInTheDocument();

    // Replace the input field's value with the new name
    fireEvent.change(getByDisplayValue(appointment, "Archie Cohen"), {
      target: { value: "Lydia Miller-Jones" }
    });

    // Click on a different interviewer
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    // Confirm the changes to name and interviewer are appearing
    expect(getByDisplayValue(appointment, "Lydia Miller-Jones")).toBeInTheDocument();
    expect(getByText(appointment, "Sylvia Palmer")).toBeInTheDocument();

    const day = getAllByTestId(container, "day").find(day => 
      queryByText(day, "Monday")
    );
    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
  });

  it("shows the save error when failing to save an appointment", async () => {

    const { container } = render(<Application />);
    await waitForElement(() => getByText(container, "Archie Cohen"));

    // This states that the next put request that we call in the test will fail, no matter what
    axios.put.mockRejectedValueOnce();

    const appointment = getAllByTestId(container, "appointment")[0];

    fireEvent.click(getByAltText(appointment, "Add"));
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    // Then we click save and expect the request to fail, meaning that the ERROR_SAVE state will appear
    fireEvent.click(getByText(appointment, "Save"));

    expect(getByText(appointment, "Saving...")).toBeInTheDocument();

    // We wait for the ERROR_SAVE visual state to appear
    await waitForElement(() => queryByText(appointment, "Unable to save the appointment!"));

    // Ensure that the ERROR_SAVE message is in the document
    expect(getByText(appointment, "Unable to save the appointment!")).toBeInTheDocument();
  });
  
  it("shows the delete error when failing to delete an existing appointment", async () => {

    const { container } = render(<Application />);
    await waitForElement(() => getByText(container, "Archie Cohen"));
    axios.delete.mockRejectedValueOnce();

    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );

    fireEvent.click(getByAltText(appointment, "Delete"));
    expect(getByText(appointment, "Confirm you want to cancel this appointment.")).toBeInTheDocument();
    fireEvent.click(getByText(appointment, "Confirm"));

    await waitForElement(() => queryByText(appointment, "Unable to delete the appointment!"));
    expect(getByText(appointment, "Unable to delete the appointment!")).toBeInTheDocument();
  });
});