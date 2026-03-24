using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<ActionPlusDb>(opt => opt.UseInMemoryDatabase("UserAuth"));
builder.Services.AddDatabaseDeveloperPageExceptionFilter();
var app = builder.Build();

app.MapPost("/signUp", async (signUpCredentials credentials, ActionPlusDb db) =>
{
    var user = new activeUsers
    {
        Email = credentials.Email,
        Password = credentials.Password,
        // Map other properties if needed
    };
    db.activeUsers.Add(user);
    await db.SaveChangesAsync();
    return Results.Ok(new { message = "User created successfully" });
});

app.MapPost("/login", async (validUserCredentials credentials, ActionPlusDb db) =>
{
    var userExists = await db.activeUsers
        .AnyAsync(u => u.Email == credentials.Email && u.Password == credentials.Password);

    return Results.Ok(new { success = userExists });
});

app.MapPost("/profile/{id}", async (int id, ActionPlusDb db) =>
{
    var user = await db.activeUsers.FindAsync(id);
    if (user == null)
    {
        return Results.NotFound(new { message = "User not found" });
    }
    return Results.Ok(user);
});

app.MapDelete("/profile/{id}", async (int id, ActionPlusDb db) =>
{
    var user = await db.activeUsers.FindAsync(id);
    if (user != null)
    {
        db.activeUsers.Remove(user);
    }
    if (user == null)
    {
        return Results.NotFound(new { message = "User not found" });
    }
    await db.SaveChangesAsync();
    return Results.NoContent();
});
app.Run();