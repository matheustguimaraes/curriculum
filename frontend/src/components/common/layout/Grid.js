import styled from "styled-components";

export const ButtonDelete = styled.button`
  cursor: pointer;
  //   padding: 3px;
  border-radius: 3px;
  border: none;
  user-select: none;
  color: #fff;
  background: red;
  &:focus {
    outline: none;
  }
  &:disabled {
    background: gray;
  }
`;

export const Wrapper = styled.div`
  padding: 2rem 0;
`;

export const Grid = styled.div`
  padding: 30px;
  display: grid;
  align-items: center;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 8fr;
  gap: 1.2rem 1.2rem;
  @media (max-width: 960px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 680px) {
    grid-template-columns: 1fr;
  }
`;

export const Item = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.11);
  h4 {
    color: ${({ theme }) => (theme === "light" ? "#212121" : "#fff")};
  }
  p {
    color: ${({ theme }) => (theme === "light" ? "#707070" : "#c7c7c7")};
  }
`;

export const Content = styled.div`
  padding: 1rem 0;
`;

export const Stats = styled.div`
  display: flex;
  align-items: center;
  div {
    display: flex;
    &:first-child {
      margin-right: 0.5rem;
    }
    img {
      margin: 0;
    }
    svg path {
      fill: white;
    }
    span {
      color: white;
      margin-left: 0.5rem;
    }
  }
`;

export const Container = styled.div`
  margin: auto;
  width: 50%;
  @media (min-width: 601px) {
    width: 90%;
  }
  @media (min-width: 993px) {
    width: 80%;
  }
`;

export const Card = styled.div`
  padding: 1rem;
  background: black;
  height: 100%;
`;
