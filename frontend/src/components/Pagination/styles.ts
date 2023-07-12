import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #fff;
    font: 400 19px Roboto, sans-serif;

    button {
        all: unset;
        width: 40px;
    }

    nav {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;

        ul {
            width: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0;
            li {
                display: flex;
                align-items: center;
                justify-content: center;
                button {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    border: 1px solid #c0c0c0;
                    height: 40px;
                    i {
                        font-size: 20px;
                    }
                }
            }

            .prev, .first {
                margin-right: 10px;
            }

            .next, .last {
                margin-left: 10px;
            }
        }
    }

    .active {
        filter: brightness(110%);
        background: #1EBF99;
    }

    .hide {
        display: none;
        /* visibility: hidden; */
    }

    .count {
        width: 120px;
        display: flex;
        justify-content: center;
        background: #fff;
        color: #1EBF99;
        border-radius: 0.6em;
        padding: 0 20px 0 20px;
    }
`;
