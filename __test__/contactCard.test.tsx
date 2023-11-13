import ContactCard from "@/components/ContactCard";
import { render, screen } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";

// Mock useRouter:
jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      prefetch: () => null,
    };
  },
}));

const mockData = {
  first_name: "Fajrin",
  last_name: "Rachman",
  id: 1,
  phones: [
    {
      number: "0899078317",
      id: 1,
    },
  ],
};

describe("Testing Contact Card Showed Up Perfectly", () => {
  beforeAll(() => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // Deprecated
        removeListener: jest.fn(), // Deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  });

  it("Show the avatar", async () => {
    render(
      <MockedProvider>
        <ContactCard data={mockData} />
      </MockedProvider>
    );
    expect(await screen.getAllByTestId("test-avatar")).toBeTruthy();
  });

  it("Show the first name, last name and phones correctly", async () => {
    render(
      <MockedProvider>
        <ContactCard data={mockData} />
      </MockedProvider>
    );
    expect(await screen.getByText("Fajrin Rachman")).toBeTruthy();
    expect(await screen.getByText("0899078317")).toBeTruthy();
  });

  it("Show the action dropdown button", async () => {
    render(
      <MockedProvider>
        <ContactCard data={mockData} />
      </MockedProvider>
    );
    expect(await screen.getAllByTestId("test-dropdown-button")).toBeTruthy();
  });
});
