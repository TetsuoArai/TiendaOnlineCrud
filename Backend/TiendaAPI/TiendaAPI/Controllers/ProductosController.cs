
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TiendaAPI.Models;

namespace TiendaAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductosController : ControllerBase
    {
        private readonly ProductosContext _context;
        public ProductosController(ProductosContext context)
        {
            _context = context;
        }

        [HttpPost]
        [Route("Crear")]
        public async Task<IActionResult> CrearProducto(Producto producto)
        {
            await _context.Productos.AddAsync(producto);
            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpGet]
        [Route("Lista")]
        public async Task<ActionResult<IEnumerable<Producto>>>ListaProducto()
        {
            var productos = await _context.Productos.ToListAsync();

            return Ok(productos);
        }

        [HttpGet]
        [Route("UnProducto")]
        public async Task<IActionResult>VerUnProducto(int id)
        {
            Producto producto = await _context.Productos.FindAsync(id);
            if(producto == null)
            {
                return NotFound();
            }
            return Ok(producto);
        }

        [HttpPut]
        [Route("Modificar")]
        public async Task<IActionResult> ActualizarDatos(int id, Producto producto)
        {
            if (producto == null)
            {
                return BadRequest("El producto enviado es nulo.");
            }

            var productoExistente = await _context.Productos.FindAsync(id);

            if (productoExistente == null)
            {
                return NotFound("No se encontró ningún producto con el ID proporcionado.");
            }

            if (producto.Foto != null)
            {
                productoExistente.Foto = producto.Foto;
            }
            if (producto.Nombre != null)
            {
                productoExistente.Nombre = producto.Nombre;
            }
            if (producto.Descripcion != null)
            {
                productoExistente.Descripcion = producto.Descripcion;
            }
            if (producto.Precio != null)
            {
                productoExistente.Precio = producto.Precio;
            }

            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpDelete]
        [Route("Eliminar")]
        public async Task<IActionResult> EliminarDato(int id)
        {
            Producto producto = await _context.Productos.FindAsync(id);

            _context.Productos.Remove(producto!);

            await _context.SaveChangesAsync();

            return Ok();

        }


    }
}

