declare module 'github-colors' {
  interface LanguageColor {
    color: string
  }

  function get(language: string): LanguageColor | undefined

  export = { get }
}
