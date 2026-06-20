---
name: tools-cli
description: CLI app production — commander, clap, click. Spinner, progress bar, error handling, auto-completion, cross-platform.
---

# tools-cli — CLI Apps

## Node.js CLI (commander + inquirer + ora)

```typescript
#!/usr/bin/env node
import { Command } from "commander";
import { input, select, confirm } from "@inquirer/prompts";
import chalk from "chalk";
import ora from "ora";

const program = new Command();

program
  .name("my-cli")
  .description("CLI tool description")
  .version("1.0.0")
  .hook("preAction", () => {
    process.on("SIGINT", () => {
      console.log("\n👋 Tạm biệt!");
      process.exit(0);
    });
  });

program
  .command("init")
  .description("Init a new project")
  .option("-n, --name <name>", "Project name")
  .option("-t, --type <type>", "Project type", "web")
  .action(async (options) => {
    const name = options.name || await input({ message: "Tên dự án:", validate: v => v.length > 0 });
    const type = options.type || await select({
      message: "Loại dự án:",
      choices: [
        { name: "Web", value: "web" },
        { name: "Game", value: "game" },
        { name: "CLI", value: "cli" },
      ]
    });

    const spinner = ora(`Đang tạo ${name}...`).start();
    try {
      await createProject(name, type);
      spinner.succeed(chalk.green(`✅ Đã tạo ${name}`));
    } catch (err) {
      spinner.fail(chalk.red(`❌ Thất bại: ${err}`));
      process.exit(1);
    }
  });

program.parse();
```

## Rust CLI (clap + indicatif)

```rust
use clap::{Parser, Subcommand};
use indicatif::{ProgressBar, ProgressStyle};
use anyhow::Result;

#[derive(Parser)]
#[command(name = "my-cli", version, about = "CLI tool")]
struct Cli {
    #[command(subcommand)]
    command: Commands,
}

#[derive(Subcommand)]
enum Commands {
    /// Init project
    Init { name: String },
    /// Build
    Build { release: bool },
}

#[tokio::main]
async fn main() -> Result<()> {
    let cli = Cli::parse();
    match cli.command {
        Commands::Init { name } => {
            let pb = ProgressBar::new(100);
            pb.set_style(ProgressStyle::with_template("{spinner} {msg} [{bar:40}]")?);
            pb.finish_with_message(format!("✅ Created {}", name));
        }
        Commands::Build { release } => {
            println!("Building (release={})", release);
        }
    }
    Ok(())
}
```

## Python CLI (click + rich)

```python
import click
from rich.console import Console
from rich.progress import Progress
import time

console = Console()

@click.group()
@click.version_option("1.0.0")
def cli():
    """CLI tool description"""

@cli.command()
@click.option("--name", prompt="Name", help="Project name")
@click.option("--type", type=click.Choice(["web", "game", "cli"]), default="web")
def init(name: str, type: str):
    """Init a new project"""
    with Progress() as progress:
        task = progress.add_task(f"Creating {name}...", total=100)
        for i in range(10):
            progress.update(task, advance=10)
            time.sleep(0.05)
    console.print(f"[bold green]✅ Created[/] {name} ({type})")
```

## Xử lý lỗi (graceful)

```typescript
class CLIError extends Error {
  constructor(message: string, public code: number = 1) {
    super(message);
    this.name = "CLIError";
  }
}

async function main() {
  try {
    await run();
  } catch (err) {
    if (err instanceof CLIError) {
      console.error(chalk.red(`❌ ${err.message}`));
      process.exit(err.code);
    }
    console.error(chalk.red(`❌ Unexpected error:`), err);
    process.exit(1);
  }
}
```
