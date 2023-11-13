import { getCategoriesContact } from "@/helpers";

describe("Test Helper Get Categories Contact", () => {
  const mockData = [
    {
      first_name: "Fajrin",
      last_name: "Rachman",
      id: 39018,
    },
    {
      first_name: "Rachman",
      last_name: " Fajrin",
      id: 39028,
    },
    {
      first_name: "Noor",
      last_name: "Rachman",
      id: 39029,
    },
  ];

  it("Separate the Categories Perfectly", () => {
    expect(getCategoriesContact(mockData, [39018])).toStrictEqual({
      favorites: [
        {
          first_name: "Fajrin",
          last_name: "Rachman",
          id: 39018,
        },
      ],
      general: [
        {
          first_name: "Rachman",
          last_name: " Fajrin",
          id: 39028,
        },
        {
          first_name: "Noor",
          last_name: "Rachman",
          id: 39029,
        },
      ],
    });
    expect(getCategoriesContact(mockData, [39028])).toStrictEqual({
      favorites: [
        {
          first_name: "Rachman",
          last_name: " Fajrin",
          id: 39028,
        },
      ],
      general: [
        {
          first_name: "Fajrin",
          last_name: "Rachman",
          id: 39018,
        },
        {
          first_name: "Noor",
          last_name: "Rachman",
          id: 39029,
        },
      ],
    });
    expect(getCategoriesContact(mockData, [39018, 39029])).toStrictEqual({
      favorites: [
        {
          first_name: "Fajrin",
          last_name: "Rachman",
          id: 39018,
        },
        {
          first_name: "Noor",
          last_name: "Rachman",
          id: 39029,
        },
      ],
      general: [
        {
          first_name: "Rachman",
          last_name: " Fajrin",
          id: 39028,
        },
      ],
    });
  });
});
