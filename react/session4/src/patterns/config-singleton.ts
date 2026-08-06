class ConfigManager {
  static instance: ConfigManager | null = null;

  private config: Record<string, string> = {};

  private constructor() {
    this.config['env'] = 'development';
    this.config['api_url'] = 'http://localhost:3000';
    this.config['log_level'] = 'info';
  }

  static getInstance(): ConfigManager {
    if (this.instance === null) {
      this.instance = new ConfigManager();
    }
    return this.instance;
  }

  set(key: string, value: string): void {
    this.config[key] = value;
    console.log(`Config set: ${key} = ${value}`);
  }

  get(key: string): string {
    if (!(key in this.config)) {
      throw new Error(`Configuration key not found: ${key}`);
    }
    return this.config[key];
  }
}
const config = ConfigManager.getInstance()
config.set('apiUrl', 'http://localhost:3001')

const sameConfig = ConfigManager.getInstance()
console.log(sameConfig.get('apiUrl'))  // 'http://localhost:3001'
console.log(config === sameConfig)     // true

//If it returns an empty string instead of throwing, silent failure may occur.
//It continues with the wrong value until a problem is caused.
//Throwing error helps to identify the error immediately.
