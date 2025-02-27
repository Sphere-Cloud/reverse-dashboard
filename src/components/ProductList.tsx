import { ListGroup } from 'react-bootstrap';
import '../styles/product-list.css';
import axios from 'axios';
import { useEffect, useState } from 'react';

interface Product {
  id: number;
  company_id: number | null;
  category_id: number | null;
  description: string;
  unit_measurement?: string;
  picture?: Uint8Array;
  created_at: Date;
  updated_at: Date;
  barcode?: string;
  is_active: boolean;
  price_sale?: number; // Añadí price_sale para que funcione el ejemplo
}

interface Inventory {
  id: number;
  company_id: number | null;
  batch_id?: number;
  batch_name?: string;
  product_id: number;
  quantity: number;
  price_sale: number;
  price_purchase: number;
  created_by: number | null;
  created_at: Date;
  updated_by: number | null;
  updated_at: Date;
  is_active: boolean;
}

interface CartItem {
  product: Product;
  inventory: Inventory;
  quantity: number;
}

interface ProductListProps {
  products: Product[];
  addToCart: (cartItem: CartItem) => void;
}

const ProductList = ({ products, addToCart }: ProductListProps) => {
  const [inventories, setInventories] = useState<{ [key: number]: Inventory }>({});
 

  // Obtener los inventarios de cada producto
  useEffect(() => {
    const fetchInventories = async () => {
      const inventoryMap: { [key: number]: Inventory } = {};

      for (const product of products) {
        try {
          const data = await fetchProductInventories(product.id);
          if (data.length > 0) {
            inventoryMap[product.id] = data[0]; // Selecciona el primer inventario
          }
        } catch (error) {
          console.error(`Error fetching inventories for product ${product.id}:`, error);
        }
      }

      setInventories(inventoryMap);
    };

    fetchInventories();
  }, [products]);

  // Función para manejar el clic en un producto
  const handleAddToCart = (product: Product) => {
    const productInventory = inventories[product.id];
    if (productInventory) {
      addToCart({
        product: product,
        inventory: productInventory,
        quantity: 1, // Cantidad inicial
      });
    } else {
      console.warn(`No inventories found for product ${product.id}`);
    }
  };


  return (
    <div className="product-container">
      <ListGroup className="product-list">
        {products.map((product) => {
          const productInventory = inventories[product.id];
          const price = productInventory ? productInventory.price_sale.toFixed(2) : 'N/A';

          return (
            <ListGroup.Item
              key={product.id}
              action
              onClick={() => handleAddToCart(product)}
              className="list-item"
            >
              <span>{product.description}</span>
              <span>${price}</span>
            </ListGroup.Item>
          );
        })}
      </ListGroup>
    </div>
  );
};

// Función para obtener los inventarios de un producto
async function fetchProductInventories(productId: number): Promise<Inventory[]> {
  try {
    const response = await axios.get(`http://localhost:8080/products/${productId}/inventories`);
    return response.data;
  } catch (error) {
    console.error('Error fetching product inventories:', error);
    throw error;
  }
}

export default ProductList;