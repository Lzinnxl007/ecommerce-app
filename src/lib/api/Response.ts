interface BodyProps {
  status: number;
  message?: string;
  data?:
    | {
        [key: string]: any;
      }
    | string;
}

function Response<T>(data: BodyProps["data"], status: number) {
  const body = {
    status,
  } as BodyProps;

  if (typeof data == "string") {
    body.message = data;
  } else {
    body.data = { ...data };
  }

  return new globalThis.Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export { Response };
