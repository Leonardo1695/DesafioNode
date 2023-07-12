import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        outline: 0;
        box-sizing: border-box;
        input:-webkit-autofill,
        input:-webkit-autofill:hover,
        input:-webkit-autofill:focus,
        textarea:-webkit-autofill,
        textarea:-webkit-autofill:hover,
        textarea:-webkit-autofill:focus,
        select:-webkit-autofill,
        select:-webkit-autofill:hover,
        select:-webkit-autofill:focus {
            -webkit-text-fill-color: ${(props) => props.theme.text};
            -webkit-text-background-color: unset;
            -webkit-box-shadow: unset;
            box-shadow: unset;
            transition: background-color 5000s ease-in-out 0s;
        }
    }

    body {
        color: ${(props) => props.theme.text};
        background: ${(props) => props.theme.background};
        -webkit-font-smoothing: antialiased;
    }

    body, input, button {
        font: 16px 'Roboto Slab', serif;
    }

    button {
        display: flex;
        align-items: center;
        justify-content: center;
        border: none;
        outline: none;
        cursor: pointer;
    }

    button:focus {
        border: none;
        outline: none;
    }

    button:hover {
        filter: brightness(80%);
    }

    button:disabled {
        filter: brightness(60%);
    }

    h1, h2, h3, h4, h5, h6, strong {
        font-weight: 500;
    }

    .bg-red {
		background: #fc0303;
	}

	.bg-yellow {
		background: #fca103;
	}

  /* #root {
    max-width: 960px;
    margin: 0 auto;
    padding: 40px 20px;
  } */
`;
