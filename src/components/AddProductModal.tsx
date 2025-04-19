import { useState, useEffect } from 'react';
import { Button, Form, Alert, InputGroup } from 'react-bootstrap';
import Modal from './Modal';

interface CartItem {
  product: Product;
  inventory: Inventory;
  quantity: number;
}

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
  price_sale?: number;
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

// Definimos las props del componente
interface AddProductModalProps {
  show: boolean;
  handleClose: () => void;
  addProductToCart: (cartItem: CartItem) => void;
}

const AddProductModal: React.FC<AddProductModalProps> = ({
  show,
  handleClose,
  addProductToCart,
}) => {
  const [error, setError] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Estado para manejar los datos del producto
  const [product, setProduct] = useState<Product>({
    id: 0,
    company_id: null,
    category_id: null,
    description: '',
    unit_measurement: '',
    created_at: new Date(),
    updated_at: new Date(),
    barcode: '',
    is_active: true,
    price_sale: 0,
  });

  // Estado para manejar la cantidad del producto
  const [quantity, setQuantity] = useState<number>(1);

  useEffect(() => {
    clean();
  }, [show]);

  // Manejador de cambios en los inputs
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (/^\d*\.?\d{0,2}$/.test(value) && name === 'quantity') {
      setQuantity(Number(value));
    } else if (/^\d*\.?\d{0,2}$/.test(value) && name === 'price_sale') {
      setProduct({
        ...product,
        ['price_sale']: Number(value),
      });
    } else {
      setProduct({
        ...product,
        [name]: value,
      });
    }
  };

  // Manejador de envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsSubmitting(true);
    try {
      if (product.price_sale == 0) {
        setError('El precio de venta no puede ser cero.');
        return;
      }

      if (quantity <= 0) {
        setError('La cantidad debe ser mayor a cero.');
        return;
      }

      if (!product.description) {
        setError('La descripción es obligatoria.');
        return;
      }
      await onSubmit();
      handleClose();
    } catch (err) {
      setError(`Error al guardar el monto inicial: ${err}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const onSubmit = async () => {
    // Crear un inventario ficticio para el producto personalizado
    const customInventory: Inventory = {
      id: 0, // ID ficticio
      company_id: null,
      product_id: product.id,
      quantity: 100, // Cantidad ficticia
      price_sale: product.price_sale || 0,
      price_purchase: 0, // Precio de compra ficticio
      created_by: null,
      created_at: new Date(),
      updated_by: null,
      updated_at: new Date(),
      is_active: true,
    };

    // Crear el CartItem
    const cartItem: CartItem = {
      product: product,
      inventory: customInventory,
      quantity: quantity,
    };

    console.log(cartItem);

    // Agregar el producto al carrito
    addProductToCart(cartItem);
    clean(); // Limpiar los campos después de enviar
    handleClose(); // Cerrar el modal después de enviar
  };

  const clean = () => {
    setProduct({
      id: 0,
      company_id: null,
      category_id: null,
      description: '',
      unit_measurement: '',
      created_at: new Date(),
      updated_at: new Date(),
      barcode: '',
      is_active: true,
      price_sale: 0,
    });
    setQuantity(1);
    setError('');
  };

  return (
    <Modal
      show={show}
      title={'Agregar Producto Personalizado'}
      content={
        <div style={{ padding: '0 15px' }}>
          <Form onSubmit={handleSubmit}>
            {error && (
              <Alert variant="danger" className="mt-2" style={{ fontSize: 14 }}>
                {error}
              </Alert>
            )}
            {/* Campo para la descripción del producto */}
            <Form.Group
              controlId="formProductDescription"
              style={{
                display: 'flex',
                flexDirection: 'column',
                margin: '10px',
              }}
            >
              <Form.Label style={{ fontWeight: 500, textAlign: 'start' }}>
                Descripción del Producto
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese la descripción del producto"
                name="description"
                value={product.description}
                onChange={handleInputChange}
                required
                disabled={isSubmitting}
                isInvalid={!!error}
              />
            </Form.Group>

            {/* Campo para el precio del producto */}
            <Form.Group
              controlId="formProductPrice"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '20px',
                margin: '10px',
              }}
            >
              <Form.Label
                style={{ fontWeight: 500, width: '50%', textAlign: 'start' }}
              >
                Precio
              </Form.Label>
              <InputGroup style={{ width: '50%' }}>
                <InputGroup.Text>$</InputGroup.Text>
                <Form.Control
                  type="number"
                  placeholder="Ingrese el precio del producto"
                  name="price_sale"
                  value={product.price_sale}
                  onChange={handleInputChange}
                  min="0"
                  required
                  disabled={isSubmitting}
                  isInvalid={!!error}
                />
                <InputGroup.Text>MXN</InputGroup.Text>
              </InputGroup>
            </Form.Group>

            {/* Campo para la cantidad del producto */}
            <Form.Group
              controlId="formProductQuantity"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '20px',
                margin: '10px',
              }}
            >
              <Form.Label
                style={{ fontWeight: 500, width: '50%', textAlign: 'start' }}
              >
                Cantidad
              </Form.Label>
              <InputGroup style={{ width: '50%' }}>
                <Form.Control
                  type="number"
                  placeholder="Ej. 1000.00"
                  name="quantity"
                  value={quantity}
                  onChange={handleInputChange}
                  min="0"
                  required
                  disabled={isSubmitting}
                  isInvalid={!!error}
                />
                <InputGroup.Text>PZA</InputGroup.Text>
              </InputGroup>
            </Form.Group>
          </Form>
        </div>
      }
      buttonGroup={
        <div style={{ display: 'flex', gap: 10 }}>
          <Button
            variant="outline-secondary"
            onClick={handleClose}
            disabled={isSubmitting}
          >
            Cancelar
          </Button>
          <Button
            variant="primary"
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Guardando...' : 'Confirmar'}
          </Button>
        </div>
      }
      handlers={{ onClose: handleClose }}
    />
  );
};

export default AddProductModal;
