import { Button, Card, CardBody, CardFooter, Heading, Image, Stack, Text } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Toaster, toast } from "sonner";


export function Index(){
    const [producto, setProducto] = useState([])
        
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try{
            const request = await axios.get("https://localhost:7076/api/Productos/Lista");
            setProducto(request.data);
        } catch (error){
            console.error("Hay un error para traer los datos", error);
        }
    }

    const HandleDeleteData = async (idProducto) => {
      try{
        await axios.delete(`https://localhost:7076/api/Productos/Eliminar?id=${idProducto}`)
        setProducto((prevProducto) => prevProducto.filter((producto) => producto.id !== idProducto))
        toast.error('El producto ha sido eliminado')
      }catch(error){
        console.error("Hay un error al eliminar datos")
      }
    }
   


    return(
      <div>
        <Toaster richColors position="top-center" />
        <div className="Card-product">
          {producto.map((product) => (
            <div key={producto.id}>
              <Card direction={{ base: 'column', sm: 'row' }} overflow='hidden' variant='outline'>
                <Image objectFit='cover' maxW={{ base: '100%', sm: '300px' }} src={product.foto} alt='Caffe Latte'/>

                <Stack>
                  <CardBody>
                    <Heading size='md'>{product.nombre}</Heading>

                    <Text py='2'>{product.descripcion}</Text>

                    <Text>${product.precio}</Text>
                  </CardBody>

                  <CardFooter>
                    <Button variant='solid' colorScheme='red'
                    onClick={() => HandleDeleteData(product.id)}>Eliminar</Button>
                    <Link to={`/FormsPutData/${encodeURIComponent(product.id)}/${encodeURIComponent(product.foto)}/${encodeURIComponent(product.nombre)}/${encodeURIComponent(product.descripcion)}/${encodeURIComponent(product.precio)}`}>

                      <Button variant='solid' colorScheme='orange'>Modificar</Button> {/* Estilizar el botón */}
                    </Link>
                  </CardFooter>
                </Stack>
              </Card>
            </div>
          ))}
          </div>
        </div>
    )
}