namespace dotnet_server.Models.Users;

public class User
{
    public int Id { get; set; }
    public required string Fullname { get; set; }
    public string? Address { get; set; }
    public required string Username { get; set; }
    public required string PasswordHash { get; set; }

    public List<Playlist> Playlists { get; set; } = new List<Playlist>();
}