using Microsoft.EntityFrameworkCore;

namespace dotnet_server.Models.Users;

public class UserContext : DbContext
{
    public UserContext(DbContextOptions<UserContext> options) : base(options)
    {
    }
    public DbSet<User> Users { get; set; } = null!;
    public DbSet<Playlist> Playlists { get; set; } = null!;
}