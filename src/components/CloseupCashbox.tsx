import { useState, useEffect } from 'react';
import Modal from './Modal';
import { Button, Form, InputGroup, Alert } from 'react-bootstrap';


interface CloseupCashboxProps {
    show: boolean;
    title: string;
    user: string;
    cashboxName: string;
    cashboxId: number;
    onClose: () => void;
    handleChangePOS: () => void;
}

const CloseupCashbox = ( {show, title, user, cashboxName, cashboxId, onClose, handleChangePOS} : CloseupCashboxProps ) => {
    
    const [finalAmount, setFinalAmount] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        // Validar formato numérico con máximo 2 decimales
        if (/^\d*\.?\d{0,2}$/.test(value) || value === '') {
            setFinalAmount(value);
            setError('');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!finalAmount || isNaN(Number(finalAmount))) {
            setError('Por favor ingrese un monto válido');
            return;
        }

        if (Number(finalAmount) <= 0) {
            setError('El monto debe ser mayor a cero');
            return;
        }

        setIsSubmitting(true);
        try {
            await onSubmit(Number(finalAmount));
            onClose();
        } catch (err) {
            setError(`${err}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    const onSubmit = async (amount: number) => {
        // Lógica para guardar el monto final
        handleChangePOS();
    };

    useEffect(() => {
        if (!show) {
            setFinalAmount('');
            setError('');
        }
    }, [show]);
    
    return (
        <Modal
            show={show}
            title={title}
            content={
                <div style={{ padding: '0 15px' }}>
                    <div style={{ marginBottom: 20 }}>
                        <div style={{ 
                            display: 'flex',
                            justifyContent: 'space-between',
                            marginBottom: 10
                        }}>
                            <span style={{ fontWeight: 500 }}>Caja:</span>
                            <span style={{ color: '#666' }}>{cashboxName}</span>
                        </div>
                        <div style={{ 
                            display: 'flex',
                            justifyContent: 'space-between'
                        }}>
                            <span style={{ fontWeight: 500 }}>Usuario:</span>
                            <span style={{ color: '#666' }}>{user}</span>
                        </div>
                    </div>

                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="initialAmount">
                            <Form.Label style={{ 
                                fontWeight: 500, 
                                marginBottom: 8 
                            }}>
                                Saldo en caja*
                            </Form.Label>
                            
                            <InputGroup>
                                <InputGroup.Text>$</InputGroup.Text>
                                <Form.Control
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    placeholder="Ej. 1000.00"
                                    value={finalAmount}
                                    onChange={handleInputChange}
                                    isInvalid={!!error}
                                    disabled={isSubmitting}
                                />
                                <InputGroup.Text>MXN</InputGroup.Text>
                            </InputGroup>

                            {error && (
                                <Alert variant="danger" className="mt-2" style={{ fontSize: 14 }}>
                                    {error}
                                </Alert>
                            )}
                        </Form.Group>
                    </Form>
                </div>
            }
            buttonGroup={
                <div style={{ display: 'flex', gap: 10 }}>
                    <Button 
                        variant="outline-secondary" 
                        onClick={onClose}
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
            handlers={{ onClose }}
        />
    );
};

export default CloseupCashbox;