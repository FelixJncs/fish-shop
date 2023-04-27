import ProductList from "../components/ProductList";
import styled from "styled-components";
import ProductForm from "../components/ProductForm";
import useSWRMutation from "swr/mutation";

const Heading = styled.h1`
  text-align: center;
  color: var(--color-nemo);
`;

async function sendRequest(url, { arg }) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(arg),
  });

  if (!response.ok) {
    console.error(response.status);
  }
}

export default function HomePage() {
  const { trigger } = useSWRMutation("/api/products", sendRequest);

  async function handleAddProduct(event) {
    function handleSubmit(event) {
      event.preventDefault();
    }

    const formData = new FormData(event.target);
    const productData = Object.fromEntries(formData);

    await trigger(productData);
    event.target.reset();
  }

  return (
    <>
      <Heading>
        <span role="img" aria-label="A fish">
          🐠
        </span>
        Fish Shop
      </Heading>
      <ProductForm onSubmit={handleAddProduct} value="" />
      <hr />
      <ProductList />
    </>
  );
}
