/// <reference types="jest" />

declare namespace jest {
  interface It {
    withMockNetwork: (
      name: string,
      fn?: ProvidesCallback,
      timeout?: number,
    ) => void;
    recordNetwork: (
      name: string,
      fn?: ProvidesCallback,
      timeout?: number,
    ) => void;
  }
}