#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');
const readline = require('readline');

// Configuration
const WATCH_DIR = path.join(process.cwd(), 'packages');
const WATCH_CONFIG = path.join(process.cwd(), 'tsconfig.json');
const WATCH_EXTENSIONS = ['.js', '.json'];
const DEBOUNCE_MS = 300;

let debounceTimer = null;
let isRunning = false;

// ANSI color codes
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  cyan: '\x1b[36m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  gray: '\x1b[90m'
};

function log(message, color = colors.reset) {
  const timestamp = new Date().toLocaleTimeString();
  console.log(`${colors.gray}[${timestamp}]${colors.reset} ${color}${message}${colors.reset}`);
}

function runTypeCheck(reason = 'File changed') {
  if (isRunning) {
    log('Type-check already running, skipping...', colors.yellow);
    return;
  }

  isRunning = true;
  log(`${reason} - Running type-check...`, colors.cyan);

  const typeCheckProcess = spawn('npm', ['run', 'type-check'], {
    stdio: 'inherit',
    shell: true
  });

  typeCheckProcess.on('close', (code) => {
    isRunning = false;
    if (code === 0) {
      log('✓ Type-check completed successfully', colors.green);
    } else {
      log(`✗ Type-check failed with code ${code}`, colors.yellow);
    }
    log('Watching for changes... (press SPACE to re-run)', colors.dim);
  });

  typeCheckProcess.on('error', (err) => {
    isRunning = false;
    log(`Error running type-check: ${err.message}`, colors.yellow);
  });
}

function shouldWatch(filename) {
  const ext = path.extname(filename);
  return WATCH_EXTENSIONS.includes(ext);
}

function watchDirectory(dir) {
  try {
    const watcher = fs.watch(dir, { recursive: true }, (eventType, filename) => {
      if (!filename || !shouldWatch(filename)) {
        return;
      }

      // Debounce rapid changes
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        const relativePath = path.join(path.basename(dir), filename);
        runTypeCheck(`File changed: ${relativePath}`);
      }, DEBOUNCE_MS);
    });

    watcher.on('error', (err) => {
      log(`Watcher error: ${err.message}`, colors.yellow);
    });

    return watcher;
  } catch (err) {
    log(`Failed to watch directory: ${err.message}`, colors.yellow);
    process.exit(1);
  }
}

function watchConfigFile(configPath) {
  try {
    const watcher = fs.watch(configPath, (eventType) => {
      if (eventType === 'change') {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
          runTypeCheck('Config file changed: tsconfig.json');
        }, DEBOUNCE_MS);
      }
    });

    watcher.on('error', (err) => {
      log(`Config watcher error: ${err.message}`, colors.yellow);
    });

    return watcher;
  } catch (err) {
    log(`Failed to watch config file: ${err.message}`, colors.yellow);
    process.exit(1);
  }
}

function setupKeyboardListener() {
  // Configure readline to listen for keypresses
  readline.emitKeypressEvents(process.stdin);

  if (process.stdin.isTTY) {
    process.stdin.setRawMode(true);
  }

  process.stdin.on('keypress', (str, key) => {
    // Handle Ctrl+C
    if (key && key.ctrl && key.name === 'c') {
      log('\nExiting...', colors.cyan);
      process.exit(0);
    }

    // Handle spacebar
    if (key && key.name === 'space') {
      clearTimeout(debounceTimer);
      runTypeCheck('Spacebar pressed');
    }
  });
}

function main() {
  console.clear();
  log(`${colors.bright}Starting type-check watcher...${colors.reset}`, colors.green);
  log(`Watching: ${WATCH_DIR}`, colors.blue);
  log(`Config: ${WATCH_CONFIG}`, colors.blue);
  log(`Extensions: ${WATCH_EXTENSIONS.join(', ')}`, colors.blue);
  log('Press SPACE to manually trigger type-check, Ctrl+C to exit', colors.dim);
  console.log('');

  // Check if watch directory exists
  if (!fs.existsSync(WATCH_DIR)) {
    log(`Error: Directory ${WATCH_DIR} does not exist`, colors.yellow);
    process.exit(1);
  }

  // Check if config file exists
  if (!fs.existsSync(WATCH_CONFIG)) {
    log(`Error: Config file ${WATCH_CONFIG} does not exist`, colors.yellow);
    process.exit(1);
  }

  // Start watching
  const dirWatcher = watchDirectory(WATCH_DIR);
  const configWatcher = watchConfigFile(WATCH_CONFIG);

  // Setup keyboard listener
  setupKeyboardListener();

  // Run type-check once on startup
  runTypeCheck('Initial run');

  // Cleanup on exit
  process.on('SIGINT', () => {
    log('\nCleaning up...', colors.cyan);
    dirWatcher.close();
    configWatcher.close();
    process.exit(0);
  });
}

main();
