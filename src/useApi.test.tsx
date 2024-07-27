import { describe, expect, it, vi } from "vitest";
import { useApi } from "./useApi";
import { act, renderHook } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ky from "ky";

vi.mock("ky");

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

describe("useApi", () => {
  it("should return data and loading state", async () => {
    type dataType = {
      data: string;
      label: string;
      number: number;
    };
    const mockData: dataType = {
      data: "mocked data",
      label: "label",
      number: 12,
    };

    const mockResponse = new Response(JSON.stringify(mockData), {
      status: 200,
      statusText: "OK",
      headers: new Headers(),
    });
    vi.spyOn(ky, "get").mockResolvedValue(mockResponse);

    const wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );

    const { result } = renderHook(() => useApi(), { wrapper });

    expect(result.current.isPending).toBe(true);
    expect(result.current.data).toBeUndefined();

    await act(async () => {
      // Wait for the next render
      await new Promise((resolve) => setTimeout(resolve, 100));
    });
    expect(result.current.isPending).toBe(false);
    console.log(result.current.data, " ", result.current.error);
  });
});
