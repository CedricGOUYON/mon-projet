import { databaseClient } from "../../database/clients"; // ✅ Import nommé

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

class AuthRepository {
  async findByEmail(email: string): Promise<User | null> {
    const [rows]: any = await databaseClient.query("SELECT * FROM user WHERE email = ?", [email]);
    return rows.length > 0 ? (rows[0] as User) : null;
  }
}

export default new AuthRepository();
