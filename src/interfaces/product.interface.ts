export default interface Product {
    id: number;
    company_id: number;
    category_id: number;
    description: string;
    unit_measurement: string;
    created_at: string;
    updated_at: string;
    barcode: string;
    is_active: boolean; 
}
