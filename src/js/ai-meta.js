// Nur die Angaben über die Anbieter. Bewusst frei von schweren Abhängigkeiten,
// damit die Optionsseite den KI-Teil nicht mitlädt.
export const PROVIDERS = [
  {
    id: 'anthropic',
    label: 'Anthropic (Claude)',
    defaultModel: 'claude-opus-5',
    // Seite, auf der man sich anmeldet und einen Schlüssel erzeugt.
    keyUrl: 'https://console.anthropic.com/settings/keys',
    keyHost: 'console.anthropic.com',
    keyPrefix: 'sk-ant-'
  },
  {
    id: 'openai',
    label: 'OpenAI (ChatGPT)',
    defaultModel: 'gpt-4o-mini',
    keyUrl: 'https://platform.openai.com/api-keys',
    keyHost: 'platform.openai.com',
    keyPrefix: 'sk-'
  }
];

export const providerOf = id => PROVIDERS.find(p => p.id === id) || PROVIDERS[0];
