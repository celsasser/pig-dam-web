# Pig DAM: Web Library

## Overview

Architected around `express`. Superimposes our command architecture over the server and routes.

## Architecture

The server architecture is designed around express. The route handlers are based on our [Command](https://github.com/celsasser/pig-dam-cmd.git) pattern.

### Routes

All route handlers should be derived from `CommandHttpRouteHandler`. Instances of derived commands will be created on demand by our `HttpRouteFactory`. It is through `HttpRouteFactory` that an API is configured.

#### [CommandHttpRouteHandler](src/route/base.ts)
Base class for all route handlers. All errors will be logged during processing by `HttpRouteFactory` so routes to not need to log their own failure conclusions.

#### [CommandHttpServer](test/unit/server/instance.spec.ts)
It is the server. See [factories](src/server/factory.ts) for configuring servers. It will log startup information and failure.

There is no special shutdown handling built into the server. We have support for termination by signal and unhandled errors in our [command](https://github.com/celsasser/pig-dam-cmd.git) module. Such exit processing has support for shutting down the server (if there is one).

#### [HttpRouteFactory](src/route/factory.ts)
Applications will configure their APIs through an instance of `HttpRouteFactory`. `HttpRouteFactory` will configure handlers via [MetaRoute](/src/types/route.ts) definitions.`HttpRouteFactory` will proxy requests through it's own handler. This handler creates an instance of `MetaRoute.Command`, executes and monitors it. All errors will be logged by this proxy.

