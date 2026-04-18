import { render, screen } from "@testing-library/react";
import { useInfiniteQuery, type InfiniteData } from "@tanstack/react-query";
import StudentList from "..";

jest.mock("@tanstack/react-query", () => ({
  useInfiniteQuery: jest.fn(),
}));

jest.mock("react-router", () => ({
  ...jest.requireActual("react-router"),
  useNavigate: jest.fn(() => jest.fn()),
}));

const mockFilter = {
  name: "",
};

const mockedUseInfiniteQuery = jest.mocked(useInfiniteQuery);

type StudentListPage = {
  students: Array<{
    id: string;
    firstName: string;
    lastName: string;
    GPA: number;
    image: string;
  }>;
  hasNextPage: boolean;
  totalCount: number;
  page: number;
};

const createInfiniteStudentData = (
  overrides: Partial<StudentListPage> = {},
): InfiniteData<StudentListPage> => ({
  pages: [
    {
      students: [
        {
          id: "1",
          firstName: "Test",
          lastName: "Student",
          GPA: 4.0,
          image: "student.png",
        },
      ],
      hasNextPage: false,
      totalCount: 1,
      page: 1,
      ...overrides,
    },
  ],
  pageParams: [1],
});

const createQueryResult = (overrides: Record<string, unknown> = {}) => ({
  data: undefined,
  isFetchingNextPage: false,
  isLoading: false,
  isError: false,
  error: null,
  fetchNextPage: jest.fn(),
  hasNextPage: false,
  ...overrides,
});

beforeEach(() => {
  mockedUseInfiniteQuery.mockReset();
  mockedUseInfiniteQuery.mockReturnValue(
    createQueryResult({ data: createInfiniteStudentData() }) as never,
  );
});

describe("Students list", () => {
  it("if return error show Error comp", () => {
    const error = new Error("Request failed");
    mockedUseInfiniteQuery.mockReturnValue(
      createQueryResult({
        data: undefined,
        isError: true,
        error,
      }) as never,
    );

    render(<StudentList filter={mockFilter} />);

    const el = screen.getByTestId("student-list-error");

    expect(el).toBeVisible();
    expect(el).toHaveTextContent(error.message);
  });

  it("if loading show loading comp", () => {
    mockedUseInfiniteQuery.mockReturnValue(
      createQueryResult({
        data: undefined,
        isLoading: true,
      }) as never,
    );

    render(<StudentList filter={mockFilter} />);

    const el = screen.getByTestId("student-list-loading");

    expect(el).toBeVisible();
    expect(el).toHaveTextContent("Yüklənir...");
  });

  it("students show", () => {});

  it("hasNextPage show div", () => {
    mockedUseInfiniteQuery.mockReturnValue(
      createQueryResult({
        data: createInfiniteStudentData({ hasNextPage: true }),
        hasNextPage: true,
      }) as never,
    );

    render(<StudentList filter={mockFilter} />);

    const el = screen.getByTestId("student-list-sentinel");

    expect(el).toBeVisible();
  });

  it("isFetchingNextPage show loading", () => {
    mockedUseInfiniteQuery.mockReturnValue(
      createQueryResult({
        data: createInfiniteStudentData({ hasNextPage: true }),
        isFetchingNextPage: true,
        hasNextPage: true,
      }) as never,
    );

    render(<StudentList filter={mockFilter} />);

    const el = screen.getByTestId("student-list-next-loading");

    expect(el).toBeVisible();
  });
});
