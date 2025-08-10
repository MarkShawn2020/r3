import chalk from 'chalk';
import { performance } from 'perf_hooks';

export class AnimatedLogo {
  private static animationInterval: NodeJS.Timeout | null = null;

  // Animated water flow frames
  private static readonly WATER_FRAMES = [
    '～～～≈≈≈～～～≈≈≈～～～',
    '≈～～～≈≈≈～～～≈≈≈～～',
    '≈≈～～～≈≈≈～～～≈≈≈～',
    '≈≈≈～～～≈≈≈～～～≈≈≈',
    '～≈≈≈～～～≈≈≈～～～≈≈',
    '～～≈≈≈～～～≈≈≈～～～≈',
    '～～～≈≈≈～～～≈≈≈～～～'
  ];

  // R3 logo with animated waves
  private static readonly R3_WAVE_FRAMES = [
    `
    ╭━━━╮ ╭━━━╮
    ┃╭━╮┃ ╰━━╮┃
    ┃╰━╯┃ ╭━━╯┃
    ┃╭╮╭╯ ╰━━╮┃
    ┃┃┃╰╮ ╭━━╯┃
    ╰╯╰━╯ ╰━━━╯`,
    `
    ╭───╮ ╭───╮
    │╭─╮│ ╰──╮│
    │╰─╯│ ╭──╯│
    │╭╮╭╯ ╰──╮│
    │││╰╮ ╭──╯│
    ╰╯╰─╯ ╰───╯`,
    `
    ┏━━━┓ ┏━━━┓
    ┃┏━┓┃ ┗━━┓┃
    ┃┗━┛┃ ┏━━┛┃
    ┃┏┓┏┛ ┗━━┓┃
    ┃┃┃┗┓ ┏━━┛┃
    ┗┛┗━┛ ┗━━━┛`
  ];

  // Fluid R3 with morphing effect
  private static readonly MORPH_FRAMES = [
    `
    ██▀███  ▓▓▓
    ▓██ ▒ ██▒ ▓▓
    ▓██ ░▄█ ▒  ▓
    ▒██▀▀█▄  ▓▓▓
    ░██▓ ▒██▒ ▓▓
    ░ ▒▓ ░▒▓░  ▓`,
    `
    ▓█▀██▓  ▒▒▒
    ▒▓█ ░ ██░ ▒▒
    ▒▓█ ▒▄▓ ░  ▒
    ░▓█▀▀▓▄  ▒▒▒
    ▒██▒ ░▓█░ ▒▒
    ▒ ░▒ ▒░▒▒  ▒`,
    `
    ▒▓▀▓▒▓  ░░░
    ░▒▓ ▒ ▓▓▒ ░░
    ░▒▓ ░▄▒ ▒  ░
    ▒░▓▀▀▒▄  ░░░
    ░▓▓░ ▒▒▓▒ ░░
    ░ ▒░ ░▒░░  ░`
  ];

  // River flow animation
  private static readonly RIVER_FLOW = [
    { left: '～', mid: '≈', right: '～' },
    { left: '≈', mid: '～', right: '≈' },
    { left: '~', mid: '≈', right: '~' },
    { left: '≈', mid: '~', right: '≈' }
  ];

  // Color gradients for animation
  private static readonly COLOR_GRADIENT = [
    chalk.rgb(0, 119, 190),   // Deep blue
    chalk.rgb(0, 150, 199),   // Ocean blue
    chalk.rgb(0, 180, 216),   // Sky blue
    chalk.rgb(72, 202, 228),  // Light blue
    chalk.rgb(144, 224, 239), // Pale blue
    chalk.rgb(173, 232, 244), // Ice blue
    chalk.rgb(202, 240, 248)  // Mist blue
  ];

  static getAnimatedWater(frame: number = 0): string {
    const waterFrame = this.WATER_FRAMES[frame % this.WATER_FRAMES.length];
    const colors = this.COLOR_GRADIENT;
    
    return waterFrame.split('').map((char, i) => {
      const colorIndex = (i + frame) % colors.length;
      return colors[colorIndex](char);
    }).join('');
  }

  static getFluidLogo(style: 'wave' | 'morph' = 'wave', frame: number = 0): string {
    const frames = style === 'wave' ? this.R3_WAVE_FRAMES : this.MORPH_FRAMES;
    const logoFrame = frames[frame % frames.length];
    const gradient = this.COLOR_GRADIENT;
    
    const lines = logoFrame.split('\n');
    return lines.map((line, lineIndex) => {
      return line.split('').map((char, charIndex) => {
        if (char === ' ') return char;
        const colorIndex = (lineIndex + charIndex + frame) % gradient.length;
        return gradient[colorIndex](char);
      }).join('');
    }).join('\n');
  }

  static getRippleEffect(centerX: number = 20, centerY: number = 3, time: number = 0): string {
    const width = 40;
    const height = 6;
    const grid: string[][] = [];
    
    for (let y = 0; y < height; y++) {
      grid[y] = [];
      for (let x = 0; x < width; x++) {
        const distance = Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2));
        const wave = Math.sin(distance * 0.5 - time * 2);
        
        let char = ' ';
        if (wave > 0.7) char = '●';
        else if (wave > 0.3) char = '◐';
        else if (wave > -0.3) char = '○';
        else if (wave > -0.7) char = '◯';
        
        const colorIntensity = Math.floor((wave + 1) * 3);
        const color = this.COLOR_GRADIENT[Math.min(colorIntensity, this.COLOR_GRADIENT.length - 1)];
        grid[y][x] = color(char);
      }
    }
    
    return grid.map(row => row.join('')).join('\n');
  }

  static getFlowingRivers(frame: number = 0): string {
    const width = 50;
    const height = 12;
    const rivers = [
      { name: '长江', startX: 15, flow: '～' },
      { name: '黄河', startX: 25, flow: '≈' },
      { name: '澜沧江', startX: 35, flow: '~' }
    ];
    
    const grid: string[][] = Array(height).fill(null).map(() => Array(width).fill(' '));
    
    // Draw source
    const sourceX = 25;
    const sourceY = 2;
    grid[sourceY][sourceX] = '◉';
    grid[sourceY - 1][sourceX] = '源';
    
    // Draw flowing rivers
    rivers.forEach((river, index) => {
      const startY = sourceY + 1;
      const endY = height - 1;
      
      for (let y = startY; y < endY; y++) {
        const progress = (y - startY) / (endY - startY);
        const offset = Math.sin((frame + index * 2) * 0.3 + y * 0.5) * 3;
        const x = Math.round(sourceX + (river.startX - sourceX) * progress + offset);
        
        if (x >= 0 && x < width) {
          const flowChar = this.RIVER_FLOW[(frame + y) % this.RIVER_FLOW.length];
          const colorIndex = (index * 2 + Math.floor(progress * 4)) % this.COLOR_GRADIENT.length;
          grid[y][x] = this.COLOR_GRADIENT[colorIndex](flowChar.mid);
        }
      }
      
      // River names at the bottom
      if (river.startX - river.name.length / 2 >= 0) {
        const nameX = river.startX - Math.floor(river.name.length / 2);
        for (let i = 0; i < river.name.length; i++) {
          if (nameX + i < width) {
            grid[height - 1][nameX + i] = chalk.cyan(river.name[i]);
          }
        }
      }
    });
    
    return grid.map(row => row.join('')).join('\n');
  }

  static getParticleFlow(frame: number = 0): string {
    const width = 60;
    const height = 8;
    const particles = '·∘○◯◉●◐◑◒◓';
    
    const grid: string[][] = Array(height).fill(null).map(() => Array(width).fill(' '));
    
    // R3 text in the center
    const r3Text = 'R3';
    const textX = Math.floor(width / 2 - r3Text.length);
    const textY = Math.floor(height / 2);
    
    // Create particle flow around R3
    for (let i = 0; i < 30; i++) {
      const angle = (i / 30) * Math.PI * 2 + frame * 0.1;
      const radius = 15 + Math.sin(angle * 2 + frame * 0.2) * 5;
      const x = Math.round(width / 2 + Math.cos(angle) * radius);
      const y = Math.round(height / 2 + Math.sin(angle) * radius / 2);
      
      if (x >= 0 && x < width && y >= 0 && y < height) {
        const particleIndex = Math.floor((i + frame) % particles.length);
        const colorIndex = i % this.COLOR_GRADIENT.length;
        grid[y][x] = this.COLOR_GRADIENT[colorIndex](particles[particleIndex]);
      }
    }
    
    // Draw R3 in the center
    for (let i = 0; i < r3Text.length; i++) {
      grid[textY][textX + i] = chalk.bold.white(r3Text[i]);
    }
    
    return grid.map(row => row.join('')).join('\n');
  }

  static async animateLogo(
    type: 'water' | 'fluid' | 'ripple' | 'rivers' | 'particles' = 'fluid',
    duration: number = 3000,
    fps: number = 10
  ): Promise<void> {
    const startTime = performance.now();
    const interval = 1000 / fps;
    let frame = 0;
    
    return new Promise((resolve) => {
      const animate = () => {
        const elapsed = performance.now() - startTime;
        if (elapsed >= duration) {
          if (this.animationInterval) {
            clearInterval(this.animationInterval);
            this.animationInterval = null;
          }
          resolve();
          return;
        }
        
        // Clear previous frame
        process.stdout.write('\x1b[2J\x1b[H');
        
        let output = '';
        switch (type) {
          case 'water':
            output = this.getAnimatedWater(frame);
            break;
          case 'fluid':
            output = this.getFluidLogo('wave', frame);
            break;
          case 'ripple':
            output = this.getRippleEffect(20, 3, frame * 0.1);
            break;
          case 'rivers':
            output = this.getFlowingRivers(frame);
            break;
          case 'particles':
            output = this.getParticleFlow(frame);
            break;
        }
        
        console.log(output);
        frame++;
      };
      
      this.animationInterval = setInterval(animate, interval);
      animate(); // Run first frame immediately
    });
  }

  static getSpinner(frame: number = 0): string {
    const spinners = [
      '◐', '◓', '◑', '◒'
    ];
    
    const spinner = spinners[frame % spinners.length];
    const colorIndex = frame % this.COLOR_GRADIENT.length;
    
    return this.COLOR_GRADIENT[colorIndex](spinner);
  }

  static getDynamicBanner(command?: string): string {
    const time = Date.now() / 1000;
    
    const topWave = this.getAnimatedWater(Math.floor(time * 10));
    const logo = this.getFluidLogo('wave', Math.floor(time * 5));
    const bottomWave = this.getAnimatedWater(Math.floor(time * 10) + 3);
    
    let actionText = '';
    switch (command) {
      case 'create':
        actionText = chalk.yellow('🚀 Creating new project...');
        break;
      case 'init':
        actionText = chalk.green('🎯 Initializing R3...');
        break;
      case 'build':
        actionText = chalk.blue('🔨 Building project...');
        break;
      default:
        actionText = chalk.white('River 3 - 三江源');
    }
    
    return `
${topWave}
${logo}
    ${chalk.bold(actionText)}
    ${chalk.italic.gray('Super Scaffold for Independent Developers')}
${bottomWave}
`;
  }
}