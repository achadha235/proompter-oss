- [ ] 7/2/24 exclude .node binaries from prisma-adapter node module - should probably use --noengine https://www.prisma.io/docs/accelerate/getting-started

- [x] 8/2/24 problem: utils/logger in causes file creation - this breaks runners on read only file systems fix: add a flag that disables log path creation on logger initialization
