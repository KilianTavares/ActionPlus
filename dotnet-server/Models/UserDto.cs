namespace dotnet_server.Models;

public class UserRegistrationDto
{
    public required string Username { get; set; }
    public required string Fullname { get; set; }
    public string? Address { get; set; }
    public required string Password { get; set; }
    public required string ConfirmPassword { get; set; }
}
public class UserLoginDto
{
    public required string Username { get; set; }

    // Server logic: hash on registration, verify on login/update
    public required string Password { get; set; }
}