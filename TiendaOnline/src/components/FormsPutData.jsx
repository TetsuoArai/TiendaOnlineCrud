import { Link, useParams } from 'react-router-dom';
import { useState } from "react"
import { Button, Card, CardBody, ChakraProvider, Input, Stack, WrapItem } from '@chakra-ui/react';
import axios from 'axios';
import { Toaster, toast } from 'sonner';
import '../components/FormsPutData.css'

const FormsPutData = () => {
    const { idProduct, foto, nombre, descripcion, precio } = useParams();
    const [nuevoProducto, setNuevoProducto] = useState({ Foto: foto || "", Nombre: nombre || "", Descripcion: descripcion || "", Precio: precio ? parseFloat(precio) : 0 });

    

    const HandlePutData = async () => {
        try{
            await axios.put(`https://localhost:7076/api/Productos/Modificar?id=${idProduct}`, nuevoProducto)
            setNuevoProducto({Foto: "", Nombre: "", Descripcion: "", Precio: 0});
            toast.success('El producto ha sido modificado')
        }catch (error){
            console.error('Hay un problema al editar los datos')
        }
    }

    return (
        <ChakraProvider>
            <Link to={"/"}>
                <button className='boton'> 
                    <svg
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        viewBox="0 0 24 24"
                        height="3em"
                        width="3em" 
                    >
                        <path stroke="none" d="M0 0h24v24H0z" />
                        <path d="M9 13L5 9l4-4M5 9h11a4 4 0 010 8h-1" />
                    </svg>
                </button>
            </Link>
            <div className="principal">
                <div>
                </div>
                <div className="formulario">
                    <Toaster richColors position="top-center" />
                    <Card>
                        <CardBody>
                            <Stack spacing={3}>
                                <label>Url de la foto: </label>
                                <Input placeholder='Ingresa la url de la foto' size='md' value={nuevoProducto.Foto} onChange={(e) => setNuevoProducto(prev => ({ ...prev, Foto: e.target.value }))} />

                                <label>Nombre del producto: </label>
                                <Input placeholder='Ingresa el nombre del producto' size='md' value={nuevoProducto.Nombre} onChange={(e) => setNuevoProducto(prev => ({ ...prev, Nombre: e.target.value }))} />

                                <label>Descripcion del Producto</label>
                                <Input placeholder='Ingresa la descripcion del producto' size='md' value={nuevoProducto.Descripcion} onChange={(e) => setNuevoProducto(prev => ({ ...prev, Descripcion: e.target.value }))} />

                                <label>Descripcion del Producto</label>
                                <Input placeholder='Ingresa el precio' size='md' value={nuevoProducto.Precio} onChange={(e) => setNuevoProducto(prev => ({ ...prev, Precio: parseFloat(e.target.value) || 0 }))} />
                                <WrapItem>
                                    <Button colorScheme='orange' onClick={HandlePutData}>Modificar</Button>
                                </WrapItem>
                            </Stack>
                        </CardBody>
                    </Card>
                </div>
            </div>
        </ChakraProvider>
    )
}

export default FormsPutData