using Microsoft.EntityFrameworkCore;

class ActionPlusDb : DbContext
{
    public ActionPlusDb(DbContextOptions<ActionPlusDb> options) : base(options) { }

    public DbSet<activeUsers> activeUsers => Set<activeUsers>();
}