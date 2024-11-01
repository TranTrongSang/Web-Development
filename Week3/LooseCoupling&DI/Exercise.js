// DI là một design pattern
//Step 1: Define the Interface
class DatabaseService
{
    connect()
    {
        throw new Error("Method 'connect()' must be implemented");
    }
    getUserData()
    {
        throw new Error("Method 'getUserData()' must be implemented");
    }
}

//Step 2: Create Concrete Implementations for MySQL and SQL Server 

class MySQLDatabaseService extends DatabaseService
{
    connectMySQL()
    {
        console.log("Connected to MySQL Database!");
    }   
    getUserDataMySQL(userID)
    {
        console.log(`Fetched user data for User ID ${userID} from  MySQL DB!`);
        return {id: userID, name: "Alice (MySQL)"}; 
    }
}

class SQLServerDatabaseService extends DatabaseService
{
    connectSQLServer()
    {
        console.log("Connected to SQL Server Database!");
    }   
    getUserDataSQLServer(userID)
    {
        console.log(`Fetched user data for User ID ${userID} from SQL Server DB!`);
        return {id: userID, name: "Bob (SQL Server)"}; 
    }
    closeSQLServerConnection()
    {
        console.log("Closed SQL Server Database Connection!");
    }
}

class PostgreSQLDatabaseService extends DatabaseService
{
    connectSQLServer()
    {
        console.log("Connected to PostgreSQL Database!");
    }   
    getUserDataPostgreSQL(userID)
    {
        console.log(`Fetched user data for User ID ${userID} from PostgreSQL Server DB!`);
        return {id: userID, name: "Charlie (PostgreSQL)"}; 
    }
    rollbackTransaction()
    {
        console.log("Rolled back PostgreSQL Transaction");
    }
}

//Step 3: Inject Dependency into UserService 
//The UserService will accept any implementation of DatabaseService, making it database-agnostic. 
class UserService
{
    constructor(databaseService)
    {
        this.databaseService = databaseService;
    }
    connectToDatabase()
    {
        return this.databaseService();
    }
    fetchUserData()
    {
        return this.databaseService.getUserData();
    }
}

class UserManager
{
    constructor(databaseService)
    {
        this.databaseService = databaseService;
    }
    getUser(userID)
    {
        
        this.databaseService.connect();
        const user = this.databaseService.getUserDataMySQL(userID);
        console.log(`User Details: `, user);
        return user;
    }

}

const userManager = new UserManager();
userManager.getUser(1);

//Step 4: Usage with Dependency Injection 
/*
Now, we can easily switch between MySQLDatabaseService and 
SQLServerDatabaseService when creating UserService. 
*/ 

// const mySQLDatabaseService = new DatabaseService();
// const userServiceMySQL = new UserService(mySQLDatabaseService);

// console.log(userServiceMySQL.connectToDatabase);
// console.log(userServiceMySQL.fetchUserData);

// const sqlServerDatabaseService = new SQLServerDatabaseService();
// const userServiceSQLServer = new UserService(sqlServerDatabaseService);

// console.log(userServiceSQLServer.connectToDatabase);
// console.log(userServiceSQLServer.fetchUserData);


