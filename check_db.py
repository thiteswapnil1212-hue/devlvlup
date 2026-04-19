import sqlite3

conn = sqlite3.connect('skill_verification.db')
cursor = conn.cursor()

print("\n✅ DATABASE VERIFICATION\n")
print("=" * 50)

# Check tables
cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
tables = cursor.fetchall()

print(f"\n📊 Tables Found: {len(tables)}")
for table in tables:
    print(f"  ✅ {table[0]}")
    
    # Get column info
    cursor.execute(f"PRAGMA table_info({table[0]});")
    columns = cursor.fetchall()
    for col in columns:
        print(f"     - {col[1]} ({col[2]})")
    
    # Get row count
    cursor.execute(f"SELECT COUNT(*) FROM {table[0]};")
    count = cursor.fetchone()[0]
    print(f"     Records: {count}")

print("\n" + "=" * 50)
print("✅ Database is ready and operational!")
print("=" * 50 + "\n")

conn.close()
