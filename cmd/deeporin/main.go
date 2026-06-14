// Command reasonix is a config- and plugin-driven coding agent CLI.
package main

import (
	"os"

	"deeporin/internal/cli"

	// Blank imports wire compile-time built-ins into their registries.
	_ "deeporin/internal/provider/anthropic"
	_ "deeporin/internal/provider/openai"
	_ "deeporin/internal/tool/builtin"
)

// version is injected at build time via -ldflags "-X main.version=...".
var version = "dev"

func main() {
	os.Exit(cli.Run(os.Args[1:], version))
}
