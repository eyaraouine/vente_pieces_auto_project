import { Row } from "react-bootstrap";
import ProductCard from "../HomePage/productCard";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPiecesByProvider } from "../../apis/piecesApis";
import { ProductProps } from "../../types/ProductProps";
import "../../custom.css"

export function Pieces(){
    const { id } = useParams<{ id: string }>();
    const [products, setProducts] = useState<ProductProps[]>([]);

    useEffect(() => {
        if(id)
        getPiecesByProvider(id).then((res) => {
            setProducts(res);
        });
    }, [id]);


    return (
        <div className="custom-container">
            <h1 className="text-4xl font-bold">Pièces</h1>
            <br/>
            <Row style={{ gap: 30 }}>
            {products.map((product, i) => (
              <ProductCard key={i} product={product} />
            ))}
          </Row>
          </div>
    )
}