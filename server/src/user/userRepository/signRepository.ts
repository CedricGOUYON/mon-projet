import { databaseClient } from "../../database/clients";

class UserRepository {
  async create(body: { firstName: string; lastName: string; email: string; password: string }) {
    const [result]: any = await databaseClient.query("INSERT INTO user (firstName, lastName, email, password) VALUES (?, ?, ?, ?)", [body.firstName, body.lastName, body.email, body.password]);
    return result.affectedRows > 0;
  }

  async findByEmail(email: string) {
    const [rows]: any = await databaseClient.query("SELECT * FROM user WHERE email = ?", [email]);
    return rows[0] || null;
  }
}

export default new UserRepository();
