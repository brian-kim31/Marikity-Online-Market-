//file based routing in Next js as opposed to React router Lib

import React from "react";
import { client, urlFor } from '../../lib/client';
 

const ProductDetails = ({ product, products }) => {
    const { image, name, details, price } = product;
    return(
        <div>
            <div
            className="product-detail-container">
                <div>
                    <div className="image-container">
                    <img src={urlFor(image && image[0])} className="product-detail-image" />
                    </div>
                    
                </div>

            </div>


        </div>
    )
}
export const getStaticPaths = async () => {
  const query = `*[_type == "product"] {
    slug {
      current
    }
  }
  `;
  const products = await client.fetch(query);

  const paths = products.map((product) => ({
    params: { 
      slug: product.slug.current
    }
  }));

  return {
    paths,
    fallback: 'blocking'
  }
}
//used if the data required is available at build time at users request
//modified line 29 to template string by use of back tics ``
export const getStaticProps = async ({ params: { slug }}) => {
    const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
    const productsQuery = '*[_type == "product"]'
    
    const product = await client.fetch(query);
    const products = await client.fetch(productsQuery);
  
    console.log(product);
  
    return {
      props: { products, product }
    }
  }

export default ProductDetails