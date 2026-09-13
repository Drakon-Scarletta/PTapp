// Nur die Angaben über die Anbieter. Bewusst frei von schweren Abhängigkeiten,
// damit die Optionsseite den KI-Teil nicht mitlädt.
export const PROVIDERS = [
  { id: 'anthropic', label: 'Anthropic (Claude)', defaultModel: 'claude-opus-5' },
  { id: 'openai', label: 'OpenAI (ChatGPT)', defaultModel: 'gpt-4o-mini' }
];

export const providerOf = id => PROVIDERS.find(p => p.id === id) || PROVIDERS[0];
