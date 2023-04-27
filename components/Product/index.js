import useSWR from "swr";
import { useRouter } from "next/router";
import { ProductCard } from "./Product.styled";
import { StyledLink } from "../Link/Link.styled";
import Comments from "../Comments";
import { useState } from "react";
import ProductForm from "./../ProductForm";

export default function Product() {
  const router = useRouter();
  const { id } = router.query;

  const { data, isLoading } = useSWR(`/api/products/${id}`);

  const [isEditMode, setisEditMode] = useState(false);
  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (!data) {
    return;
  }

  return (
    <ProductCard>
      <button
        type="button"
        onClick={() => {
          setIsEditMode(!isEditMode);
        }}
      >
        {isEditMode ? "Cancel Edit" : "Edit Product"}
      </button>
      {isEditMode ? (
        <ProductForm data={data} />
      ) : (
        <>
          <h2>{data.name}</h2>
          <p>Description: {data.description}</p>
          <p>
            Price: {data.price} {data.currency}
          </p>
          {data.reviews.length > 0 && <Comments reviews={data.reviews} />}
        </>
      )}
      <StyledLink href="/">Back to all</StyledLink>
    </ProductCard>
  );
}
