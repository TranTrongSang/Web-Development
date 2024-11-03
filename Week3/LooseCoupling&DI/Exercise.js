// Step 1: Define the Interface
class DatabaseService {
    connect() {
        throw new Error("Method 'connect()' must be implemented");
    }
    getUserData() {
        throw new Error("Method 'getUserData()' must be implemented");
    }
}

// Step 2: Create Concrete Implementations for MySQL, SQL Server, and PostgreSQL
class MySQLDatabaseService extends DatabaseService {
    connectMySQL() {
        console.log("Connected to MySQL Database!");
    }
    getUserDataMySQL(userID) {
        console.log(`Fetched user data for User ID ${userID} from MySQL DB!`);
        return { id: userID, name: "Alice (MySQL)" }; 
    }
}

class SQLServerDatabaseService extends DatabaseService {
    connectSQLServer() {
        console.log("Connected to SQL Server Database!");
    }
    getUserDataSQLServer(userID) {
        console.log(`Fetched user data for User ID ${userID} from SQL Server DB!`);
        return { id: userID, name: "Bob (SQL Server)" }; 
    }
    closeSQLServerConnection() {
        console.log("Closed SQL Server Database Connection!");
    }
}

class PostgreSQLDatabaseService extends DatabaseService {
    connectPostgreSQL() {
        console.log("Connected to PostgreSQL Database!");
    }
    getUserDataPostgreSQL(userID) {
        console.log(`Fetched user data for User ID ${userID} from PostgreSQL DB!`);
        return { id: userID, name: "Charlie (PostgreSQL)" }; 
    }
    rollbackTransaction() {
        console.log("Rolled back PostgreSQL Transaction");
    }
}

// Step 3: Create the UserManager Class with Separate Methods
class UserManager {
    constructor(databaseService) {
        this.databaseService = databaseService;
    }

    // Method specific to MySQL
    getUserMySQL(userID) {
        if (this.databaseService instanceof MySQLDatabaseService) {
            this.databaseService.connectMySQL();
            const user = this.databaseService.getUserDataMySQL(userID);
            console.log("User Details (MySQL):", user);
            return user;
        } else {
            throw new Error("Invalid database service for MySQL operations");
        }
    }

    // Method specific to SQL Server
    getUserSQLServer(userID) {
        if (this.databaseService instanceof SQLServerDatabaseService) {
            this.databaseService.connectSQLServer();
            const user = this.databaseService.getUserDataSQLServer(userID);
            console.log("User Details (SQL Server):", user);
            return user;
        } else {
            throw new Error("Invalid database service for SQL Server operations");
        }
    }
    
    // Close connection specific to SQL Server
    closeSQLServerConnection() {
        if (this.databaseService instanceof SQLServerDatabaseService) {
            this.databaseService.closeSQLServerConnection();
        } else {
            throw new Error("Invalid database service for closing SQL Server connection");
        }
    }

    // Method specific to PostgreSQL
    getUserPostgreSQL(userID) {
        if (this.databaseService instanceof PostgreSQLDatabaseService) {
            this.databaseService.connectPostgreSQL();
            const user = this.databaseService.getUserDataPostgreSQL(userID);
            console.log("User Details (PostgreSQL):", user);
            return user;
        } else {
            throw new Error("Invalid database service for PostgreSQL operations");
        }
    }
    // Rollback transaction specific to PostgreSQL
    rollbackPostgreSQLTransaction() {
        if (this.databaseService instanceof PostgreSQLDatabaseService) {
            this.databaseService.rollbackTransaction();
        } else {
            throw new Error("Invalid database service for PostgreSQL rollback");
        }
    }
}

// Usage Examples
const mySQLDatabaseService = new MySQLDatabaseService();
const userManagerMySQL = new UserManager(mySQLDatabaseService);
const userMySQL = userManagerMySQL.getUserMySQL(1); // Fetch user data from MySQL

const sqlServerDatabaseService = new SQLServerDatabaseService();
const userManagerSQLServer = new UserManager(sqlServerDatabaseService);
const userSQLServer = userManagerSQLServer.getUserSQLServer(2); // Fetch user data from SQL Server
const closeSQLServerConnection = userManagerSQLServer.closeSQLServerConnection(); // Close SQL Server connection

const postgreSQLDatabaseService = new PostgreSQLDatabaseService();
const userManagerPostgreSQL = new UserManager(postgreSQLDatabaseService);
const userPostgreSQL = userManagerPostgreSQL.getUserPostgreSQL(3); // Fetch user data from PostgreSQL
const rollbackPostgreSQLTransaction = userManagerPostgreSQL.rollbackPostgreSQLTransaction(); // Rollback PostgreSQL transaction