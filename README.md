# NestJS logging demo

This demo project shows how to configure logging in NestJS using structured logging approach. The objective is to create useful and meaningful logs that speed up the analysis of application functioning.

## Structured logging

Trying to search a value or pattern in a bunch of logs can be difficult. There could be different approaches on detailing what happens in a single operation of an application.

Structured logging is the practice of implementing a consistent, predetermined message format for application logs that allows them to be treated as data sets that can be more easily searched and analyzed than text ([1](https://www.sumologic.com/glossary/structured-logging/))

In this demo project, we use JSON format (using [pino](https://www.npmjs.com/package/nestjs-pino)) to standarize the structure of the log records.

```zsh
{"level":30,"time":1677627364853,"pid":32692,"hostname":"248ab4be112f","traceId":"8ca06214-25e7-4a66-a9b3-a0e71af76689","context":"AppService","operation":"getHello","result":"success"}
```

> Note: For convenience, when environment variable `NODE_ENV` is set to `local` the logs are formatted to a more friendly format for readibility.

```zsh
[23:35:07.736] INFO (32251):
    traceId: "54e89d42-9354-4070-970d-a8ac86419c68"
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
