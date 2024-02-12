using Microsoft.EntityFrameworkCore;

namespace TiendaAPI.Models
{
    public class ProductosContext : DbContext
    {
        public ProductosContext(DbContextOptions<ProductosContext> options) : base(options)
        {
        }
        public DbSet<Producto> Productos { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
        }
    }
}
