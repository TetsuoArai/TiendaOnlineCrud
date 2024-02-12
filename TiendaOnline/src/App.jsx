import { useState, useEffect } from "react";

import {
Image,
ChakraProvider,
Input, 
Stack, 
Button, 
WrapItem, 
Card, 
CardBody,
Heading,
CardFooter,
Text
} from '@chakra-ui/react';

import axios from "axios"
import './App.css'

function App() {
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


  return (
    <ChakraProvider>
      <div className="principal">
          <div className="formulario">
            <Card>
              <CardBody>
                <Stack spacing={3}>
                  <label>Url de la foto: </label>
                  <Input placeholder='Ingresa la url de la foto' size='md' value={nuevoProducto.Foto} onChange={(e) => setNuevoProducto((prev)=>({...prev, Foto: e.target.value}))}/>

                  <label>Nombre del producto: </label>
                  <Input placeholder='Ingresa el nombre del producto' size='md' value={nuevoProducto.Nombre} onChange={(e) => setNuevoProducto((prev)=>({...prev, Nombre: e.target.value}))}/>

                  <label>Descripcion del Producto</label>
                  <Input placeholder='Ingresa la descripcion del producto' size='md' value={nuevoProducto.Descripcion} onChange={(e) => setNuevoProducto((prev)=>({...prev, Descripcion: e.target.value}))}/>

                  <label>Descripcion del Producto</label>
                  <Input placeholder='Ingresa el precio' size='md' value={nuevoProducto.Precio} onChange={(e) => setNuevoProducto((prev)=>({...prev,  Precio: parseFloat(e.target.value) || 0}))}/>
                  <WrapItem>
                    <Button colorScheme='blue' onClick={handleAddData}>Agregar</Button>
                  </WrapItem>
                </Stack>
              </CardBody>
            </Card>
          </div>  
          <div className="Card-product">
          {producto.map((product) => (
            <div key={producto.id}>
              <Card direction={{ base: 'column', sm: 'row' }} overflow='hidden' variant='outline'>
                <Image objectFit='cover' maxW={{ base: '100%', sm: '300px' }} src={product.foto} alt='Caffe Latte'/>

                <Stack>
                  <CardBody>
                    <Heading size='md'>{product.nombre}</Heading>

                    <Text py='2'>{product.descripcion}</Text>

                    <Text>{product.precio}</Text>
                  </CardBody>

                  <CardFooter>
                    <Button variant='solid' colorScheme='red'>Eliminar</Button>
                  </CardFooter>
                </Stack>
              </Card>
            </div>
          ))}
          </div>
      </div>
    </ChakraProvider>
  )
}

export default App
