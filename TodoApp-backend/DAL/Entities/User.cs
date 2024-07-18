using Data.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Entities
{
    public class User:AuditRecord
    {
        [Key]
        public int UserId { get; set; }

        public required string Username { get; set; }

        public required string Password { get; set; }

        public string? Token { get; set; }
        public string? RefreshToken { get; set; }
        public DateTime RefreshTokenExpiryTime { get; set; }
        public ICollection<Todo>? Todos { get; set; }

    }
}
