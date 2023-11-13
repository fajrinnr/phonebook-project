import { render, fireEvent, waitFor } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import DetailContactPage from "@/app/detail/[id]/page";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("@/hooks/useQueryGetContact", () => ({
  __esModule: true,
  default: jest.fn(),
}));

const mockData = {
  contact_by_pk: {
    id: "1",
    first_name: "John",
    last_name: "Doe",
    phones: [
      {
        id: "1",
        number: "123456789",
      },
      {
        id: "2",
        number: "987654321",
      },
    ],
    created_at: "2023-11-12T12:00:00.000Z",
    updated_at: "2023-11-13T08:30:00.000Z",
  },
};

const mockParams = {
  id: "1",
};

describe("DetailContactPage", () => {
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
  it("renders detail contact information", async () => {
    const useQueryGetContactMock = jest.fn();
    useQueryGetContactMock.mockReturnValue({
      data: mockData,
      loading: false,
      refetch: jest.fn(),
    });
    require("@/hooks/useQueryGetContact").default = useQueryGetContactMock;

    const { getByTestId, getByText } = render(
      <MockedProvider>
        <DetailContactPage params={mockParams} />
      </MockedProvider>
    );

    expect(getByText("Cancel")).toBeTruthy();
    expect(getByText("Edit")).toBeTruthy();

    expect(getByTestId("test-avatar")).toBeTruthy();

    expect(getByText("John Doe")).toBeTruthy();
    expect(getByText("Phone Number")).toBeTruthy();
    expect(getByText("123456789")).toBeTruthy();
    expect(getByText("Phone Number (1)")).toBeTruthy();
    expect(getByText("987654321")).toBeTruthy();

    expect(getByText("Last updated by November 13, 2023")).toBeTruthy();
  });

  it("handles cancel button click", async () => {
    const useRouterMock = jest.fn();
    useRouterMock.mockReturnValue({
      back: jest.fn(),
    });
    require("next/navigation").useRouter = useRouterMock;

    const { getByText } = render(
      <MockedProvider>
        <DetailContactPage params={mockParams} />
      </MockedProvider>
    );

    fireEvent.click(getByText("Cancel"));

    await waitFor(() => {
      expect(useRouterMock().back).toHaveBeenCalled();
    });
  });

  it("handles edit button click", async () => {
    const useRouterMock = jest.fn();
    useRouterMock.mockReturnValue({
      push: jest.fn(),
    });
    require("next/navigation").useRouter = useRouterMock;

    const { getByText } = render(
      <MockedProvider>
        <DetailContactPage params={mockParams} />
      </MockedProvider>
    );

    fireEvent.click(getByText("Edit"));

    await waitFor(() => {
      expect(useRouterMock().push).toHaveBeenCalledWith("/edit-contact/1");
    });
  });
});
