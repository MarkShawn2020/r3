import chalk from 'chalk';

export const R3_LOGO = `
██████╗ ██████╗ 
██╔══██╗╚════██╗
██████╔╝ █████╔╝
██╔══██╗ ╚═══██╗
██║  ██║██████╔╝
╚═╝  ╚═╝╚═════╝ 
`;

export const R3_BANNER = `
╦═╗╦╦  ╦╔═╗╦═╗  ╔═╗
╠╦╝║╚╗╔╝║╣ ╠╦╝  ╚═╗
╩╚═╩ ╚╝ ╚═╝╩╚═  ╚═╝
`;

export const R3_LARGE = `
 ██▀███   ██▓ ██▒   █▓▓█████  ██▀███      ▄▄▄▄   
▓██ ▒ ██▒▓██▒▓██░   █▒▓█   ▀ ▓██ ▒ ██▒   ▓█████▄ 
▓██ ░▄█ ▒▒██▒ ▓██  █▒░▒███   ▓██ ░▄█ ▒   ▒██▒ ▄██
▒██▀▀█▄  ░██░  ▒██ █░░▒▓█  ▄ ▒██▀▀█▄     ▒██░█▀  
░██▓ ▒██▒░██░   ▒▀█░  ░▒████▒░██▓ ▒██▒   ░▓█  ▀█▓
░ ▒▓ ░▒▓░░▓     ░ ▐░  ░░ ▒░ ░░ ▒▓ ░▒▓░   ░▒▓███▀▒
  ░▒ ░ ▒░ ▒ ░   ░ ░░   ░ ░  ░  ░▒ ░ ▒░   ▒░▒   ░ 
  ░░   ░  ▒ ░     ░░     ░     ░░   ░     ░    ░ 
   ░      ░        ░     ░  ░   ░         ░      
                  ░                            ░ 
`;

export const R3_WAVES = `
～～～～～～～～～～～～～～～～～～～～～～～～～～～
  ≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈
～～～～～～～～～～～～～～～～～～～～～～～～～～～
`;

export const R3_MINIMALIST = `
┏━━━┓ ┏━━━┓
┃┏━┓┃ ┃┏━┓┃
┃┗━┛┃ ┗━━┓┃
┃┏┓┏┛ ┏━━┛┃
┃┃┃┗┓ ┃┗━┓┃
┗┛┗━┛ ┗━━┛┛
`;

export const R3_STYLIZED = `
    ____  _____
   / __ \\|__  /
  / /_/ / /_ < 
 / _, _/___/ / 
/_/ |_|/____/  
`;

export const R3_3D = `
 ▄▄▄▄▄▄▄▄▄▄▄  ▄▄▄▄▄▄▄▄▄▄▄ 
▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌
▐░█▀▀▀▀▀▀▀█░▌ ▀▀▀▀▀▀▀▀▀█░▌
▐░▌       ▐░▌          ▐░▌
▐░█▄▄▄▄▄▄▄█░▌ ▄▄▄▄▄▄▄▄▄█░▌
▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌
▐░█▀▀▀▀█░█▀▀  ▀▀▀▀▀▀▀▀▀█░▌
▐░▌     ▐░▌            ▐░▌
▐░▌      ▐░▌  ▄▄▄▄▄▄▄▄▄█░▌
▐░▌       ▐░▌▐░░░░░░░░░░░▌
 ▀         ▀  ▀▀▀▀▀▀▀▀▀▀▀ 
`;

export class AsciiArt {
  static getLogo(style: 'default' | 'banner' | 'large' | 'minimalist' | 'stylized' | '3d' = 'default'): string {
    switch (style) {
      case 'banner':
        return R3_BANNER;
      case 'large':
        return R3_LARGE;
      case 'minimalist':
        return R3_MINIMALIST;
      case 'stylized':
        return R3_STYLIZED;
      case '3d':
        return R3_3D;
      default:
        return R3_LOGO;
    }
  }

  static getColoredLogo(style: 'default' | 'banner' | 'large' | 'minimalist' | 'stylized' | '3d' = 'default'): string {
    const logo = this.getLogo(style);
    return chalk.cyan.bold(logo);
  }

  static getGradientLogo(): string {
    const lines = R3_LOGO.split('\n');
    const colors = [
      chalk.blue,
      chalk.blueBright,
      chalk.cyan,
      chalk.cyanBright,
      chalk.greenBright,
      chalk.green
    ];
    
    return lines.map((line, index) => {
      const colorIndex = index % colors.length;
      return colors[colorIndex](line);
    }).join('\n');
  }

  static getRiverAnimation(): string {
    const river = [
      chalk.blue('～～～') + chalk.cyan('≈≈≈') + chalk.blue('～～～') + chalk.cyan('≈≈≈') + chalk.blue('～～～'),
      chalk.cyan('  ≈≈≈') + chalk.blue('～～～') + chalk.cyan('≈≈≈') + chalk.blue('～～～') + chalk.cyan('≈≈≈  '),
      chalk.blue('～～～') + chalk.cyan('≈≈≈') + chalk.blue('～～～') + chalk.cyan('≈≈≈') + chalk.blue('～～～')
    ];
    return river.join('\n');
  }

  static getFullBanner(): string {
    const logo = this.getGradientLogo();
    const tagline = chalk.gray('三江源 - The Source of Rivers');
    const subtitle = chalk.italic.gray('A Super Scaffold for Independent Developers');
    const river = this.getRiverAnimation();
    
    return `
${river}
${logo}
${chalk.bold.white('RIVER 3')} ${tagline}
${subtitle}
${river}
`;
  }

  static getCompactBanner(): string {
    return `
${chalk.cyan.bold('╔═══════════════════════════════════════╗')}
${chalk.cyan.bold('║')}     ${chalk.bold.white('R3')} ${chalk.gray('-')} ${chalk.yellow('River 3 Scaffold')}            ${chalk.cyan.bold('║')}
${chalk.cyan.bold('║')}     ${chalk.gray('三江源 - The Source of Rivers')}     ${chalk.cyan.bold('║')}
${chalk.cyan.bold('╚═══════════════════════════════════════╝')}
`;
  }

  static getWelcomeBanner(): string {
    const logo = chalk.cyan(`
    ██████╗ ██████╗ 
    ██╔══██╗╚════██╗
    ██████╔╝ █████╔╝
    ██╔══██╗ ╚═══██╗
    ██║  ██║██████╔╝
    ╚═╝  ╚═╝╚═════╝`);
    
    const waves = chalk.blue('～～～') + chalk.cyan('≈≈≈') + chalk.blue('～～～') + chalk.cyan('≈≈≈') + chalk.blue('～～～') + chalk.cyan('≈≈≈') + chalk.blue('～～～');
    
    return `
${waves}
${logo}
    
    ${chalk.bold.white('RIVER 3')} ${chalk.gray('·')} ${chalk.yellow('三江源')}
    ${chalk.italic.gray('Super Scaffold for Independent Developers')}
${waves}
`;
  }
}