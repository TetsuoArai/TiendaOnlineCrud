import { Button, Card, CardBody, ChakraProvider, Input, Stack, WrapItem } from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import 'react-toastify/dist/ReactToastify.css';
import { Toaster, toast } from 'sonner'


export function Forms (){
    const [nuevoProducto, setNuevoProducto]= useState({Foto: "", Nombre: "", Descripcion: "", Precio: 0})
  
  const handleAddData = async () =>{ 
    try{
      await axios.post("https://localhost:7076/api/Productos/Crear", nuevoProducto)
      setNuevoProducto({Foto: "", Nombre: "", Descripcion: "", Precio: 0});
      toast.success('El producto ha sido ingresado')
    }catch (error){
      alert(`El producto "${nuevoProducto.Nombre}" esta repetido `)

    }
  }
    return(
      <ChakraProvider>
          
        <div className="principal">
            <div className="formulario">
              <Toaster richColors position="top-center" />
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
        </div>
      </ChakraProvider>
    )
}