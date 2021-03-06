﻿// <auto-generated />
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using NgD3.API.Data;

namespace NgD3.API.Migrations
{
    [DbContext(typeof(DataContext))]
    [Migration("20200530103548_InitialCreate")]
    partial class InitialCreate
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.1.4-rtm-31024")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("NgD3.API.Models.Tick", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<double>("Ask");

                    b.Property<double>("Bid");

                    b.Property<long>("Moment");

                    b.Property<string>("Secur");

                    b.Property<double>("VolumeAsk");

                    b.Property<double>("VolumeBid");

                    b.HasKey("Id")
                        .HasAnnotation("SqlServer:Clustered", false);

                    b.HasIndex("Moment")
                        .HasAnnotation("SqlServer:Clustered", true);

                    b.ToTable("Ticks");
                });
#pragma warning restore 612, 618
        }
    }
}
