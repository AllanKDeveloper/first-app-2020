import styled from "styled-components";
import { darken, lighten } from "polished";

export const Container = styled.div`
  padding: 1.875rem;
  background: #fff;
  border-radius: 0.25rem;
  overflow-x: auto;

  footer {
    margin-top: 1.875rem;
    display: flex;
    justify-content: space-between;
    align-items: center;

    button {
      background: rgb(248, 151, 29);
      color: #fff;
      border: 0;
      border-radius: 0.25rem;
      padding: 0.75rem 1.25rem;
      font-weight: bold;
      text-transform: uppercase;
      transition: background 0.2s;

      &:hover {
        background: ${darken(0.06, "rgb(248, 151, 29)")};
      }
    }
  }
`;

export const ProductTable = styled.table`
  width: 100%;

  thead th {
    color: #999;
    text-align: left;
    padding: 0.75rem;
  }

  tbody td {
    padding: 0.75rem;
    border-bottom: 0.063rem solid #eee;
  }

  img {
    height: 6.25rem;
  }

  strong {
    color: #333;
    display: block;
  }

  span {
    display: block;
    margin-top: 0.313rem;
    font-size: 1.125rem;
    font-weight: bold;
  }

  div {
    display: flex;
    align-items: center;

    input {
      border: 0.063rem solid #ddd;
      border-radius: 0.25rem;
      color: #666;
      padding: 0.375rem;
      width: 3.125rem;
    }
  }

  button {
    background: none;
    border: 0;
    padding: 0.375rem;

    svg {
      color: rgb(248, 151, 29);
      transition: color 0.2s;
    }

    &:hover {
      svg {
        color: ${darken(0.06, "rgb(248, 151, 29)")};
      }
    }

    &:disabled {
      svg {
        color: ${lighten(0.25, "rgb(248, 151, 29)")};
        cursor: not-allowed;
      }
    }
  }
`;

export const Total = styled.div`
  display: flex;
  align-items: baseline;

  span {
    color: #999;
    font-weight: bold;
  }

  strong {
    font-size: 1.75rem;
    margin-left: 0.313rem;
  }
`;
