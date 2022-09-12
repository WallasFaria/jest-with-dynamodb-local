/// <reference types="jest" />

declare namespace jest {
  interface It {
    mockNetwork: (
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