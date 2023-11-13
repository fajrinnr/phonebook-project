import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import ContactCard from "@/components/ContactCard";
import { MockedProvider } from "@apollo/client/testing";
import { useRouter } from "next/navigation";
import useMutationDeleteContact from "@/hooks/useMutationDeleteContact";

jest.mock("next/navigation", () => ({
  __esModule: true,
  useRouter: jest.fn(),
}));

jest.mock("@/hooks/useMutationDeleteContact", () => ({
  __esModule: true,
  default: jest.fn(),
}));

const mockData = {
  first_name: "John",
  last_name: "Doe",
  id: 1,
  phones: [{ number: "123456789", id: 1 }],
};

const mockOnChangeFav = jest.fn();
const mockOnDelete = jest.fn();

describe("ContactCard", () => {
  beforeAll(() => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  });
  it("renders contact information and handles click events", async () => {
    // Mock useRouter
    (useRouter as any).mockReturnValue({
      push: jest.fn(),
    });

    // Mock useMutationDeleteContact
    (useMutationDeleteContact as any).mockReturnValue({
      deleteContact: jest.fn().mockResolvedValue({}),
      loading: false,
    });

    // Render the component
    render(
      <MockedProvider>
        <ContactCard
          data={mockData}
          onChangeFav={mockOnChangeFav}
          onDelete={mockOnDelete}
        />
      </MockedProvider>
    );

    // Assert that the avatar is rendered
    expect(screen.getByTestId("test-avatar")).toBeTruthy();

    // Assert that the contact information is rendered
    expect(screen.getByText("John Doe")).toBeTruthy();
    expect(screen.getByText("123456789")).toBeTruthy();

    // Trigger a click event on the card
    fireEvent.click(screen.getByTestId("test-card"));

    // Assert that useRouter.push function is called
    await waitFor(() => {
      expect(useRouter().push).toHaveBeenCalledWith(`/detail/1`);
    });
  });
});
