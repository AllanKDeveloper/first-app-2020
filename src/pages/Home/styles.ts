import styled from "styled-components";
import { darken } from "polished";

export const ProductList = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(17.5rem, 1fr));
  grid-gap: 1.25rem;
  list-style: none;

  li {
    display: flex;
    flex-direction: column;
    background: #fff;
    border-radius: 0.25rem;
    padding: 1.25rem;
    text-align: center;

    img {
      align-self: center;
      max-width: 15.625rem;
    }

    > strong {
      font-size: 1rem;
      line-height: 1.25rem;
      color: #333;
      margin: 0.313rem 0 0.313rem;
    }

    > p {
      font-size: 0.75rem;
      margin-top: 0.313rem;
      color: #333;
      font-style: italic;
    }

    button {
      background: rgb(248, 151, 29);
      color: #fff;
      border: 0;
      border-radius: 0.25rem;
      overflow: hidden;
      margin-top: auto;

      display: flex;
      align-items: center;
      transition: background 0.2s;

      &:hover {
        background: ${darken(0.06, "rgb(255, 189, 67)")};
      }

      div {
        display: flex;
        align-items: center;
        padding: 0.75rem;
        background: rgba(0, 0, 0, 0.1);

        svg {
          margin-right: 0.313rem;
        }
      }

      span {
        flex: 1;
        text-align: center;
        font-weight: bold;
      }
    }
  }
`;
