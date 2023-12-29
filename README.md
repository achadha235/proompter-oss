Proompter - Framework for AI apps

-- Usable - contains all the important features necessary for production-grade apps
-- Performant - has the features necessary to support high performance, high throughput
-- Extensible - has the features necessary to support a wide variety of use cases

1. `git clone https://achadha235@github.com/achadha235/proompter-oss.git --recurse-submodules`
2. `cd proompter-oss`
3. `./scripts/setup`
4. `bun install`
5. `bun build`

6. Adapters - Allows Proompter to connect to different backends for storage, authentication, payments, notifications, etc.
7. Runners - Allows proompter to run Chatflows from different frameworks / SDKs eg Langchain, Flowise, Langflow etc.
8. Server - Server backends for various frameworks - NextJS express etc.
9. UI - Frontends for Proompter in various libraries

-- Check out Turso

1. Runner's only job is to run a chatflow -

   - input: chatflowId, args
   - returns event emitter

2. Adapter's job is to offer an interface over a specific database

   - getUser
   - createConversation
   - addMessage
   - getConversation

3. Server's job is to take an adapter + runner and coordinate actions
   - Accept HTTP requests
   - Coordinate actions between adapter and runner as per specification
