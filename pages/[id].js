import Product from "../components/Product";
import { useRouter } from "next/router";
import { useSWRMutation } from "swr/mutation";

export default function ProductDetailsPage({ product }) {
  const {
    query: { id },
    push,
  } = useRouter();

  async function updateProduct(url, { arg }) {
    const response = await fetch(url, {
      method: "PUT",
      body: JSON.stringify(arg),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      await response.json();
    } else {
      console.error(`Error: ${response.status}`);
    }
  }

  const { trigger, isMutating } = useSWRMutation(
    `/api/products/${id}`,
    updateProduct
  );

  async function handleEditProduct(event) {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);
    const productData = Object.fromEntries(formData.entries());

    await trigger(productData);
    push("/");
  }

  if (isMutating) {
    return <p>Submitting your changes.</p>;
  }

  return (
    <>
      <Product product={product} onSubmit={handleEditProduct} />
    </>
  );
}
