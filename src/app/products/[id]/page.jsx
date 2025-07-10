import { ProductService } from '@/lib/services/productService';
import { notFound } from 'next/navigation';
import ProductDetailPage from '@/components/products/ProductDetailPage';

// This is a server component that fetches data and passes it to the client component
export default async function ProductPage({ params }) {
  const { id } = await params;

  // Fetch product data on the server
  const result = await ProductService.getProductById(id);

  if (!result.success) {
    notFound();
  }

  return <ProductDetailPage product={result.data} />;
}

// Generate metadata for SEO
export async function generateMetadata({ params }) {
  const { id } = await params;
  const result = await ProductService.getProductById(id);

  if (!result.success) {
    return {
      title: 'Product Not Found - House of Aerawat',
      description: 'The requested product could not be found.',
    };
  }

  const product = result.data;

  return {
    title: `${product.name} - House of Aerawat`,
    description: product.description || `${product.name} from House of Aerawat`,
    openGraph: {
      title: `${product.name} - House of Aerawat`,
      description:
        product.description || `${product.name} from House of Aerawat`,
      images:
        product.images && product.images.length > 0 ? [product.images[0]] : [],
      type: 'website',
    },
  };
}
