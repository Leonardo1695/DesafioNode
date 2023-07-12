import 'styled-componets';

declare module 'styled-components' {
  export interface DefaultTheme {
    primary: string;
    secundary: string;
    background: string;
    text: string;
    info: string,
    success: string,
    error: string,
    warn: string,
  }
}
