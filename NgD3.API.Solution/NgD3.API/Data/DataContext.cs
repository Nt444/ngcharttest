using Microsoft.EntityFrameworkCore;
using NgD3.API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NgD3.API.Data
{
    public class DataContext : DbContext
    {
        public DbSet<Tick> Ticks { get; set; }

        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Tick>()
                .HasKey(x => x.Id)
                .ForSqlServerIsClustered(false);

            modelBuilder.Entity<Tick>()
                .HasIndex(x => x.Moment)
                .ForSqlServerIsClustered(true);
        }
    }
}
