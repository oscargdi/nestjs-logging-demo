# NestJS logging demo

This demo project shows how to configure logging in NestJS using structured logging approach. The objective is to create useful and meaningful logs that speed up the analysis of application functioning.

## Structured logging

Trying to search a value or pattern in a bunch of logs can be difficult. There could be different approaches on detailing what happens in a single operation of an application.

Structured logging is the practice of implementing a consistent, predetermined message format for application logs that allows them to be treated as data sets that can be more easily searched and analyzed than text ([1](https://www.sumologic.com/glossary/structured-logging/))

In this demo project, we use JSON format (using [pino](https://www.npmjs.com/package/nestjs-pino)) to standarize the structure of the log records. By executing the following intruction:

```ts
this.logger.info(
  { operation: 'getHello', result: 'success' },
  'Data was retrieved successfully',
);
```

The logging trace will result like this:

```zsh
{"level":30,"time":1677856514013,"pid":1343,"hostname":"5827f8b5222c","traceId":"926d15da-6fe8-46f5-aab4-2ac7a7cce0ac","context":"AppService","operation":"getHello","result":"success","msg":"Data was retrieved successfully"}
```

> Note: For convenience, when environment variable `NODE_ENV` is set to `local` the logs are formatted to a more friendly format for readibility.

```zsh
[15:19:20.065] INFO (3402): Data was retrieved successfully
    traceId: "d5b0de3c-3cca-4a75-b904-9751d43a72db"
    context: "AppService"
    operation: "getHello"
    result: "success"
```

## Log tracing

Since an application can generate thousands of log records in a short period of time and logs can be merged from different sources into a single repository, it can become difficult to trace a single operation within tons of text.

This is the reason why including a tracing value is important to retrieve all log records related to a single operation.

In this demo project, we implement a middleware that sets a unique id to the request (as `X-Trace-ID` header), which is attached to all log records and it is finally returned to the client in the response.

```zsh
{...,"traceId":"f2467efc-47a7-47f7-8e61-5c19d7ab735a",...}
```

In the HTTP Response headers, you will see something like this:

```http
HTTP/1.1 200 OK
X-Powered-By: Express
X-Trace-ID: f2467efc-47a7-47f7-8e61-5c19d7ab735a
Content-Type: application/json; charset=utf-8
Content-Length: 279045
ETag: W/"44205-FJfX2JTgRutneB+huX4Qtsf64Qc"
Date: Fri, 03 Mar 2023 15:31:41 GMT
Connection: keep-alive
Keep-Alive: timeout=5
```

# Extra: HTTP logging

By default NetsJS `HttpService` does not write any log that allow us to track information about request and response.

In this demo, we include an implementation for the `OnModuleInit` interface which modifies the default `HttpService` in order to include an interceptor which logs information about request and response object. The log records will comply with structured logging format and will include the corresponding tracing value. By executing the following intruction:

```ts
this.httpService.get('https://api.publicapis.org/entries');
```

The logging trace will result like this:

```zsh
[15:27:33.462] INFO (5654): Sending HTTP request
    traceId: "3ade9957-47e7-4efc-9ce5-53c80d139aa1"
    context: "HttpLoggingModule"
    method: "GET"
    url: "https://api.publicapis.org/entries"
[15:27:35.763] INFO (5654): Receiving HTTP response
    traceId: "3ade9957-47e7-4efc-9ce5-53c80d139aa1"
    context: "HttpLoggingModule"
    method: "GET"
    url: "https://api.publicapis.org/entries"
    status: 200
    statusText: "OK"
```

# Development environment

1. Install [Docker](https://docs.docker.com/get-docker/) and [VSCode](https://code.visualstudio.com/download)
2. Go to VSCode extensions and install [Remote - Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)
3. Download this repository and open it with VSCode.
4. VSCode will prompt if you want to open the project in a devcontainer.
5. The project should get configured automatically, wait until you see the process finished. Open logs to see progress, you should see a message like below when the setup is done.

```zsh
Done in 495.62s.
pre-commit installed at .git/hooks/pre-commit
Done. Press any key to close the terminal.
```
