import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

interface CardPOSProps {
    POSName: string;
    POSId: number;

}

const CardPOS = ( { POSName, POSId } : CardPOSProps  ) => {

    const navigate = useNavigate();

    return (
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%', padding: '10px', height: '150px', alignItems: 'center', justifyContent: 'space-between', border: '1px solid #ddd', }}>

            <span> { POSName } </span>

            <Button onClick={ () => navigate(`/punto-venta/${POSId}`) } variant="primary" style={{ width: '50%' }}> 
                ABRIR POS
            </Button>

        </div>
    );
}

export default CardPOS;