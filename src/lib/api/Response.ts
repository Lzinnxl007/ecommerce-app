function Response<T>(data: T, status: number) {
  return new globalThis.Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export { Response }