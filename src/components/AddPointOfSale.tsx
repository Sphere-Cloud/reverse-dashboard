import Modal from './Modal';
import { Button, Form, InputGroup, Alert } from 'react-bootstrap';
import { useState, useEffect } from 'react';

interface PointOfSale {
    POSName: string;
    POSId: number;
    POSStatusIsOpen: boolean;
    POSUserResponsable: string;
}

interface AddPointOfSaleProps {
    show: boolean;
    onClose: () => void;
    AddPointOfSale: (newPointOfSale: PointOfSale) => void;
}

const AddPointOfSale = ({ show, onClose, AddPointOfSale }: AddPointOfSaleProps) => {

    const [error, setError] = useState<string>('');
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const [pointOfSale, setPointOfSale] = useState<PointOfSale>({
        POSName: '',
        POSId: 12,
        POSStatusIsOpen: true,
        POSUserResponsable: '',
    });

    useEffect(() => {
        clean();
    }, [show]);

    const clean = () => {
        setPointOfSale({
            POSName: '',
            POSId: 0,
            POSStatusIsOpen: true,
            POSUserResponsable: '',
        });
        setError('');
        setIsSubmitting(false);
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        try {
            setIsSubmitting(true);

            if (pointOfSale.POSName === '') {
                throw new Error('El nombre del punto de venta es requerido');
            }

            if (pointOfSale.POSUserResponsable === '') {
                throw new Error('El usuario responsable es requerido');
            }

            onSubmit();

        } catch (error) {
            setError(`${error}`);
        } finally {
            setIsSubmitting(false);
        }
    }

    const onSubmit = () => {
        AddPointOfSale(pointOfSale);
        clean();
        onClose();
    }
    
    
    return(
        <Modal
            title='Agregar Punto de Venta'
            show={show}
            buttonGroup={
            <>
                <Button
                    variant="secondary"
                    onClick={onClose}
                >
                    Cancelar
                </Button>
                <Button 
                    variant='primary'
                    onClick={handleSubmit}
                >
                    Guardar
                </Button>

            </>
            }
            content={
                <Form style={{ padding: '0 15px' }}>
                    { error && <Alert variant='danger' >{error}</Alert> }
                    <Form.Group>
                        <Form.Label style={{ width: '100%', textAlign: 'start', fontWeight: '500' }}>Nombre del Punto de Venta</Form.Label>
                        <InputGroup>
                            <Form.Control
                                type="text"
                                placeholder="Nombre del Punto de Venta"
                                value={pointOfSale.POSName}
                                onChange={(e) => setPointOfSale({ ...pointOfSale, POSName: e.target.value })}
                            />
                        </InputGroup>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label style={{ width: '100%', textAlign: 'start', fontWeight: '500' }}>Usuario Responsable</Form.Label>
                        <InputGroup>
                            <Form.Select
                                value={pointOfSale.POSUserResponsable}
                                onChange={(e) => setPointOfSale({ ...pointOfSale, POSUserResponsable: e.target.value })}
                            >
                                <option value="" selected></option>
                                <option value="Carlos">Carlos</option>
                                <option value="Josafat">Josafat</option>
                            </Form.Select>
                        </InputGroup>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label style={{ width: '100%', textAlign: 'start', fontWeight: '500' }}>Estado</Form.Label>
                        <InputGroup>
                            <Form.Select
                                value={pointOfSale.POSStatusIsOpen ? 'Abierto' : 'Cerrado'}
                                onChange={(e) => setPointOfSale({ ...pointOfSale, POSStatusIsOpen: e.target.value === 'Abierto' })}
                            >
                                <option value="Abierto">Abierto</option>
                                <option value="Cerrado">Cerrado</option>
                            </Form.Select>
                        </InputGroup>
                    </Form.Group>
                </Form>
            }
            handlers={{ onClose: onClose }}
            
        >

        </Modal>
    );
}

export default AddPointOfSale;