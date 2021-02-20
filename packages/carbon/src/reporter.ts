import chalk from 'chalk';

export const emergency = (message: string) => {
    console.error(chalk.bold.redBright(`${message}`));
};

export const alert = (message: string) => {
    console.error(chalk.bold.redBright(`${message}`));
};

export const critical = (message: string) => {
    console.error(chalk.bold.redBright(`${message}`));
};

export const error = (message: string) => {
    console.warn(chalk.bold.yellowBright(`${message}`));
};

export const warning = (message: string) => {
    console.warn(chalk.yellow(`${message}`));
};

export const notice = (message: string) => {
    console.log(`${message}`);
};

export const info = (message: string) => {
    console.log(chalk.blue(`${message}`));
};

export const debug = (message: string) => {
    console.log(chalk.cyan(`${message}`));
};
